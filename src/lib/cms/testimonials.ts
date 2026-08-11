import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST_LIST } from "@/graphql/cms/queries/post";
import type { Post } from "@/graphql/cms/queries/post";
import { stripHtml } from "@/lib/cms/html";

export const TESTIMONIALS_POST_TYPE = "Testimonials";

export type TestimonialItem = {
  quote: string;
  author: string;
  tour: string;
};

type FieldGroups = Record<string, Record<string, unknown> | undefined>;

function readCustomField(post: Post, code: string): string {
  const map = post.customFieldsMap as FieldGroups | undefined;
  if (map) {
    for (const groupKey of Object.keys(map)) {
      const group = map[groupKey];
      if (group && typeof group[code] === "string" && (group[code] as string).trim()) {
        return (group[code] as string).trim();
      }
    }
  }
  const data = post.customFieldsData as Record<string, unknown> | undefined;
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item && typeof item === "object" && "value" in item && typeof item.value === "string") {
        return item.value.trim();
      }
    }
  } else if (data && typeof data[code] === "string") {
    return (data[code] as string).trim();
  }
  return "";
}

function readSortOrder(post: Post): number {
  const val = readCustomField(post, "sort_order");
  const parsed = Number.parseInt(val, 10);
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

export async function getTestimonialItems(locale: string): Promise<TestimonialItem[]> {
  try {
    const client = await getServerApolloClient();

    // Fetch all published posts without restricting by type parameter,
    // because erxes CMS returns type as opaque ID (e.g. atR2mh9lgHVtsKUv1p30_)
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: {
        language: locale,
        status: "published",
        limit: 100,
      },
      context: {
        fetchOptions: {
          next: { revalidate: 0 },
        },
      },
    });

    const allPosts = data?.cpPostList?.posts ?? [];
    
    // Filter posts that belong to testimonials (has testimonial custom field group or type)
    const testimonialPosts = allPosts.filter((post) => {
      const map = post.customFieldsMap as FieldGroups | undefined;
      const hasTestimonialGroup = Boolean(map?.testimonial || map?.testimonials);
      const isKnownTypeId = post.type === "atR2mh9lgHVtsKUv1p30_";
      return hasTestimonialGroup || isKnownTypeId;
    });

    return testimonialPosts
      .map((post) => ({ post, order: readSortOrder(post) }))
      .sort((a, b) => a.order - b.order)
      .map(({ post }) => {
        const author = post.title?.trim() ?? "";
        // Clean quote string: remove surrounding quotes if present in content
        let quote = stripHtml(post.content ?? post.excerpt ?? "").trim();
        if (quote.startsWith('"') && quote.endsWith('"')) {
          quote = quote.slice(1, -1).trim();
        }
        const tour = readCustomField(post, "tour");
        return { author, quote, tour };
      })
      .filter((item) => item.author || item.quote);
  } catch (error) {
    console.warn(
      "Testimonials query error:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}
