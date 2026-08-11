import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST_LIST } from "@/graphql/cms/queries/post";
import type { Post } from "@/graphql/cms/queries/post";
import { stripHtml } from "@/lib/cms/html";

/**
 * Questions are authored in the erxes CMS as posts of the `FAQ` custom post
 * type ("Түгээмэл асуулт") — the question is the title, the answer the body.
 *
 * The gateway filters on the post type's *key*, not its `_id` — a returned
 * post's `type` field is the id, and the two never match.
 */
export const FAQ_POST_TYPE = "FAQ";

const FAQ_GROUP = "faq";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Ordering is automatic: questions appear in the order they were created, so
 * nothing has to be filled in. `sort_order` is honoured when present, which
 * lets a question be pinned to the top later without a code change — the field
 * does not have to exist for this to work.
 */
function readSortOrder(post: Post): number | null {
  const group = ((post.customFieldsMap ?? {}) as Record<
    string,
    Record<string, unknown> | undefined
  >)[FAQ_GROUP];
  const value = group?.["sort_order"];
  if (typeof value !== "string") return null;
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function compare(a: Post, b: Post): number {
  const orderA = readSortOrder(a);
  const orderB = readSortOrder(b);

  // Pinned questions lead, in their given order; the rest keep creation order.
  if (orderA !== null && orderB !== null) return orderA - orderB;
  if (orderA !== null) return -1;
  if (orderB !== null) return 1;

  return (a.createdAt ?? "").localeCompare(b.createdAt ?? "");
}

export async function getFaqItems(locale: string): Promise<FaqItem[]> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: {
        language: locale,
        type: FAQ_POST_TYPE,
        status: "published",
        limit: 100,
      },
    });

    return [...(data?.cpPostList?.posts ?? [])]
      .sort(compare)
      .map((post) => ({
        question: post.title?.trim() ?? "",
        answer: stripHtml(post.content ?? ""),
      }))
      .filter((item) => item.question);
  } catch (error) {
    console.warn(
      "FAQ query error:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}
