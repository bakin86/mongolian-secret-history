import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import type { CpPostsData, CpPostsVariables, Post } from "@/graphql/cms/queries/post";
import { HOME_BLOCK_POST_TYPE } from "@/lib/cms/homeBlocks";

const fallbackPosts: Post[] = [
  {
    _id: "1",
    title: "10 Reasons to Visit Mongolia This Summer",
    slug: "10-reasons-to-visit-mongolia-this-summer",
    excerpt: "Discover why summer is the perfect season to explore Mongolia's endless steppe, ancient culture, and outdoor adventures.",
    content: "",
    publishedDate: "2026-06-15",
    clientPortalId: "",
  },
  {
    _id: "2",
    title: "A Guide to Mongolian Nomadic Culture",
    slug: "guide-to-mongolian-nomadic-culture",
    excerpt: "Learn about ger life, traditional hospitality, herding customs, and festivals that define Mongolian identity.",
    content: "",
    publishedDate: "2026-05-22",
    clientPortalId: "",
  },
  {
    _id: "3",
    title: "What to Pack for a Mongolia Tour",
    slug: "what-to-pack-for-a-mongolia-tour",
    excerpt: "Essential packing tips for Mongolia's variable weather, remote regions, and outdoor activities.",
    content: "",
    publishedDate: "2026-04-10",
    clientPortalId: "",
  },
];

export async function getCmsPosts(locale: string, limit = 100) {
  try {
    const client = await getServerApolloClient();
    const { CP_POST_LIST } = await import("@/graphql/cms/queries/post");

    // The blog list is an exclusion list, so every new custom post type shows up
    // here until it is named. Home page sections are resolved by their type key
    // rather than a hardcoded id, which the API only ever returns opaque.
    const [all, homeBlocks] = await Promise.all([
      client.query<{ cpPostList?: { posts: Post[] } }>({
        query: CP_POST_LIST,
        variables: { language: locale, limit },
        context: { fetchOptions: { next: { revalidate: 0 } } },
      }),
      client.query<{ cpPostList?: { posts: Post[] } }>({
        query: CP_POST_LIST,
        variables: { language: locale, type: HOME_BLOCK_POST_TYPE, limit: 100 },
        context: { fetchOptions: { next: { revalidate: 0 } } },
      }),
    ]);

    const allPosts: Post[] = (all.data?.cpPostList?.posts ?? []) as Post[];
    const homeBlockTypes = new Set(
      (homeBlocks.data?.cpPostList?.posts ?? [])
        .map((p) => p.type)
        .filter((type): type is string => Boolean(type))
    );

    return allPosts.filter(
      (p) =>
        p.type !== "USl4jFjiPIkPDcZz5uQEK" &&
        p.type !== "tour" &&
        p.type !== "tours" &&
        !(p.type && homeBlockTypes.has(p.type))
    );
  } catch (error) {
    console.warn("CMS posts query error:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export async function getAboutMongoliaPosts(locale: string) {
  try {
    const client = await getServerApolloClient();
    const { CP_POST_LIST } = await import("@/graphql/cms/queries/post");
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: { language: locale, limit: 50 },
      context: { fetchOptions: { next: { revalidate: 0 } } },
    });
    const allPosts: Post[] = (data?.cpPostList?.posts ?? []) as Post[];
    return allPosts.filter(
      (p) =>
        p.type === "bHrQRkNv4dzraWjXi7ggb" ||
        p.categories?.some(
          (c) =>
            c.slug?.includes("soyol") ||
            c.slug?.includes("country") ||
            c.name?.includes("Соёл") ||
            c.name?.includes("Улс орон")
        )
    );
  } catch (error) {
    console.warn("Failed to fetch About Mongolia posts:", error);
    return [];
  }
}
