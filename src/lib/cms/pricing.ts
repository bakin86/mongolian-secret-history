import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST_LIST } from "@/graphql/cms/queries/post";
import type { Post } from "@/graphql/cms/queries/post";
import { stripHtml } from "@/lib/cms/html";

/**
 * Price tiers are authored in the erxes CMS as posts of the `Pricing` custom
 * post type ("Үнийн багц"), one post per tier.
 *
 * The gateway filters on the post type's *key*, not its `_id` — a returned
 * post's `type` field is the id, and the two never match.
 */
export const PRICING_POST_TYPE = "Pricing";

const PRICING_GROUP = "pricing";

export type PricingPlan = {
  duration: string;
  price: string;
  title: string;
  desc: string;
  features: string[];
};

function readField(post: Post, code: string): string {
  const group = ((post.customFieldsMap ?? {}) as Record<
    string,
    Record<string, unknown> | undefined
  >)[PRICING_GROUP];
  const value = group?.[code];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Ordering is automatic: tiers appear in the order they were created, so
 * nothing has to be filled in. `sort_order` is honoured when present, which
 * lets a tier be moved later without a code change — the field does not have
 * to exist for this to work.
 */
function readSortOrder(post: Post): number | null {
  const parsed = Number.parseInt(readField(post, "sort_order"), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function compare(a: Post, b: Post): number {
  const orderA = readSortOrder(a);
  const orderB = readSortOrder(b);

  if (orderA !== null && orderB !== null) return orderA - orderB;
  if (orderA !== null) return -1;
  if (orderB !== null) return 1;

  return (a.createdAt ?? "").localeCompare(b.createdAt ?? "");
}

export async function getPricingPlans(locale: string): Promise<PricingPlan[]> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: {
        language: locale,
        type: PRICING_POST_TYPE,
        status: "published",
        limit: 100,
      },
    });

    return [...(data?.cpPostList?.posts ?? [])]
      .sort(compare)
      .map((post) => ({
        title: post.title?.trim() ?? "",
        duration: readField(post, "duration"),
        price: readField(post, "price"),
        desc: stripHtml(post.content ?? ""),
        // The textarea holds one included item per line.
        features: readField(post, "features")
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean),
      }))
      .filter((plan) => plan.title);
  } catch (error) {
    console.warn(
      "Pricing query error:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}
