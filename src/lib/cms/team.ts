import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST_LIST } from "@/graphql/cms/queries/post";
import type { Post } from "@/graphql/cms/queries/post";
import { getCmsPage } from "@/lib/cms/page";
import { stripHtml } from "@/lib/cms/html";

/**
 * Team members are authored in the erxes CMS as posts of the `Team` custom post
 * type ("Баг"), one post per person.
 *
 * The gateway filters on the post type's *key*, not its `_id` — a returned
 * post's `type` field is the id, and the two never match.
 */
export const TEAM_POST_TYPE = "Team";
const TEAM_GROUP = "team";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

function readField(post: Post, code: string): string {
  const group = ((post.customFieldsMap ?? {}) as Record<
    string,
    Record<string, unknown> | undefined
  >)[TEAM_GROUP];
  const value = group?.[code];
  return typeof value === "string" ? value.trim() : "";
}

function readOrder(post: Post): number {
  const parsed = Number.parseInt(readField(post, "sort_order"), 10);
  // Unnumbered members sink to the bottom instead of jumping to the front.
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

export async function getTeamMembers(locale: string): Promise<TeamMember[]> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: {
        language: locale,
        type: TEAM_POST_TYPE,
        status: "published",
        limit: 100,
      },
    });

    return (data?.cpPostList?.posts ?? [])
      .map((post) => ({ post, order: readOrder(post) }))
      .sort((a, b) => a.order - b.order)
      .map(({ post }) => ({
        name: post.title?.trim() ?? "",
        role: readField(post, "role"),
        bio: stripHtml(post.content ?? ""),
        image: post.thumbnail?.url ?? post.images?.[0]?.url ?? "",
      }))
      .filter((member) => member.name);
  } catch (error) {
    console.warn(
      "Team query error:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}

/**
 * Gallery imagery lives on the `gallery` CMS page's Image Gallery, so the
 * /gallery page and the marquee elsewhere on the site share one source the
 * client edits in a single place.
 */
export async function getGalleryImages(locale: string): Promise<string[]> {
  const page = await getCmsPage(locale, "gallery");
  return (page?.pageImages ?? [])
    .map((image) => image?.url)
    .filter((url): url is string => Boolean(url));
}
