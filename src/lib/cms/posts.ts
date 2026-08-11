import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import type { CpPostsData, CpPostsVariables, Post } from "@/graphql/cms/queries/post";
import { HOME_BLOCK_POST_TYPE } from "@/lib/cms/homeBlocks";
import { ACCOMMODATION_POST_TYPE } from "@/lib/cms/accommodation";
import { TEAM_POST_TYPE } from "@/lib/cms/team";
import { FAQ_POST_TYPE } from "@/lib/cms/faq";
import { PRICING_POST_TYPE } from "@/lib/cms/pricing";
import { TESTIMONIALS_POST_TYPE } from "@/lib/cms/testimonials";
import { stripHtml } from "@/lib/cms/html";

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

/**
 * Post types that drive their own part of the site and must never surface as
 * blog articles.
 *
 * This is an exclusion list, which is the wrong shape: any custom post type
 * added in erxes leaks into the blog until it is named here — it has already
 * happened twice. Replace this with the blog type's own key as soon as it is
 * known, and the whole problem goes away.
 */
const NON_BLOG_POST_TYPE_KEYS = [
  HOME_BLOCK_POST_TYPE,
  ACCOMMODATION_POST_TYPE,
  TEAM_POST_TYPE,
  FAQ_POST_TYPE,
  PRICING_POST_TYPE,
  TESTIMONIALS_POST_TYPE,
  "Testimonial",
  "Testimonials",
  "atR2mh9lgHVtsKUv1p30_",
];

/** Tours predate the keyed types and are only known by id. */
const TOUR_POST_TYPE_IDS = ["USl4jFjiPIkPDcZz5uQEK", "tour", "tours"];

export async function getCmsPosts(locale: string, limit = 100) {
  try {
    const client = await getServerApolloClient();
    const { CP_POST_LIST } = await import("@/graphql/cms/queries/post");

    const fetchList = (variables: Record<string, unknown>) =>
      client.query<{ cpPostList?: { posts: Post[] } }>({
        query: CP_POST_LIST,
        variables: { language: locale, ...variables },
        context: { fetchOptions: { next: { revalidate: 0 } } },
      });

    // Resolve each type by key: a post's `type` is an opaque id the API never
    // accepts back as a filter, so the ids cannot be hardcoded.
    const [all, ...excluded] = await Promise.all([
      fetchList({ limit }),
      ...NON_BLOG_POST_TYPE_KEYS.map((type) => fetchList({ type, limit: 100 })),
    ]);

    const excludedTypeIds = new Set(
      excluded
        .flatMap((result) => result.data?.cpPostList?.posts ?? [])
        .map((post) => post.type)
        .filter((type): type is string => Boolean(type))
    );

    const allPosts: Post[] = (all.data?.cpPostList?.posts ?? []) as Post[];
    const NON_BLOG_GROUP_KEYS = [
      "testimonial",
      "testimonials",
      "team",
      "faq",
      "pricing",
      "stay_list",
      "stay_detail",
      "home_block",
    ];

    return allPosts.filter((p) => {
      if (p.type && TOUR_POST_TYPE_IDS.includes(p.type)) return false;
      if (p.type && excludedTypeIds.has(p.type)) return false;
      if (p.type === "atR2mh9lgHVtsKUv1p30_") return false;

      const mapKeys = Object.keys(p.customFieldsMap ?? {});
      if (mapKeys.some((key) => NON_BLOG_GROUP_KEYS.includes(key))) return false;

      return true;
    });
  } catch (error) {
    console.warn("CMS posts query error:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export type BlogTeaser = {
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
  image?: string;
};

function formatDate(dateString?: string, locale = "en") {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(
    locale === "mn" ? "mn-MN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

/** Newest blog articles, shaped for the teaser grid on other pages. */
export async function getBlogTeasers(
  locale: string,
  limit = 3
): Promise<BlogTeaser[]> {
  const posts = await getCmsPosts(locale, 100);

  return posts
    .slice()
    .sort((a, b) =>
      (b.publishedDate ?? b.createdAt ?? "").localeCompare(
        a.publishedDate ?? a.createdAt ?? ""
      )
    )
    .slice(0, limit)
    .map((post) => ({
      title: post.title?.trim() ?? "",
      date: formatDate(post.publishedDate ?? post.createdAt, locale),
      excerpt: stripHtml(post.excerpt || post.content || "").slice(0, 160),
      slug: post.slug,
      image: post.thumbnail?.url ?? post.images?.[0]?.url,
    }))
    .filter((post) => post.title);
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
