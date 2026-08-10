import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST_LIST } from "@/graphql/cms/queries/post";
import type { Post } from "@/graphql/cms/queries/post";
import { stripHtml } from "@/lib/cms/html";

/**
 * Home page sections are authored in the erxes CMS as posts of the
 * `Homepage` custom post type ("Нүүр хуудас"), one post per section.
 *
 * The gateway filters on the post type's *key*, not its `_id` — the `type`
 * field on a returned post is the id, so the two never match. Filter with the
 * key.
 */
export const HOME_BLOCK_POST_TYPE = "Homepage";

/** Which side the imagery sits on — driven by the post's child category. */
const IMAGE_RIGHT_SLUG = "baruun-zuragtai";

export type HomeBlockImage = { src: string; alt: string };

export type HomeBlock = {
  id: string;
  title: string;
  description: string;
  images: HomeBlockImage[];
  ctaLabel: string;
  ctaUrl: string;
  imageOnRight: boolean;
  order: number;
};

type CustomFields = { homepage?: Record<string, unknown> };

function readField(post: Post, code: string): string {
  const map = (post.customFieldsMap ?? {}) as CustomFields;
  const value = map.homepage?.[code];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Editors upload artwork either into the gallery or as the featured image, so
 * accept both. Order matters: the gallery is the deliberate choice.
 */
function readImages(post: Post): HomeBlockImage[] {
  const alt = post.title ?? "";
  const gallery = (post.images ?? [])
    .map((img) => img?.url)
    .filter((url): url is string => Boolean(url))
    .map((src) => ({ src, alt }));

  if (gallery.length) return gallery;

  const thumbnail = post.thumbnail?.url;
  return thumbnail ? [{ src: thumbnail, alt }] : [];
}

function readOrder(post: Post): number {
  const parsed = Number.parseInt(readField(post, "sort_order"), 10);
  // Unnumbered blocks sink to the bottom instead of jumping to the front.
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

function toBlock(post: Post): HomeBlock | null {
  const title = post.title?.trim();
  if (!title) return null;

  const images = readImages(post);
  if (!images.length) return null;

  return {
    id: post._id,
    title,
    // Content is rich text; the section design expects a plain paragraph, so
    // headings/tables typed into the editor cannot break the layout.
    description: stripHtml(post.content ?? ""),
    images,
    ctaLabel: readField(post, "cta_label"),
    ctaUrl: readField(post, "cta_url"),
    imageOnRight: (post.categories ?? []).some(
      (category) => category.slug === IMAGE_RIGHT_SLUG
    ),
    order: readOrder(post),
  };
}

export async function getHomeBlocks(locale: string): Promise<HomeBlock[]> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: {
        language: locale,
        type: HOME_BLOCK_POST_TYPE,
        status: "published",
        limit: 100,
      },
    });

    return (data?.cpPostList?.posts ?? [])
      .map(toBlock)
      .filter((block): block is HomeBlock => block !== null)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.warn(
      "Home blocks query error:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}
