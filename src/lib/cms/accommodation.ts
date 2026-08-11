import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST_LIST } from "@/graphql/cms/queries/post";
import type { Post } from "@/graphql/cms/queries/post";
import { stripHtml } from "@/lib/cms/html";

/**
 * Stays are authored in the erxes CMS as posts of the `accommodation` custom
 * post type ("Байрлах газар"), one post per property.
 *
 * The gateway filters on the post type's *key*, not its `_id` — a returned
 * post's `type` field is the id, and the two never match.
 */
export const ACCOMMODATION_POST_TYPE = "accommodation";

const LIST_GROUP = "stay_list";
const DETAIL_GROUP = "stay_detail";

/**
 * Detail sections are fixed fields rather than repeatable rows, so editors get
 * named boxes instead of a builder. Order here is the order on the page, and
 * the first two collapse the way the original layout did.
 */
const DETAIL_SECTIONS = [
  { code: "location", en: "Location", mn: "Байршил", expandable: true },
  { code: "capacity", en: "Capacity", mn: "Багтаамж", expandable: true },
  { code: "restaurant", en: "Restaurant", mn: "Ресторан" },
  { code: "services", en: "Services & Facilities", mn: "Үйлчилгээ ба Тохижилт" },
  {
    code: "advantages",
    en: "Distinctive Features & Advantages",
    mn: "Онцлог давуу тал",
  },
] as const;

export type AccommodationSection = {
  title: string;
  content: string[];
  expandable?: boolean;
};

export type AccommodationEntry = {
  index: string;
  province: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  subtitle: string;
  intro: string;
  sections: AccommodationSection[];
};

type FieldGroups = Record<string, Record<string, unknown> | undefined>;

function readField(post: Post, group: string, code: string): string {
  const value = ((post.customFieldsMap ?? {}) as FieldGroups)[group]?.[code];
  return typeof value === "string" ? value.trim() : "";
}

/** Textarea fields hold one bullet per line. */
function readLines(post: Post, group: string, code: string): string[] {
  return readField(post, group, code)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function readOrder(post: Post): number {
  const parsed = Number.parseInt(readField(post, LIST_GROUP, "sort_order"), 10);
  // Unnumbered stays sink to the bottom instead of jumping to the front.
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

function toEntry(post: Post, locale: string): AccommodationEntry | null {
  const name = post.title?.trim();
  const slug = post.slug?.trim();
  if (!name || !slug) return null;

  const sections = DETAIL_SECTIONS.map((section): AccommodationSection | null => {
    const content = readLines(post, DETAIL_GROUP, section.code);
    if (!content.length) return null;
    return {
      title: locale === "mn" ? section.mn : section.en,
      content,
      expandable: "expandable" in section ? section.expandable : undefined,
    };
  }).filter((section): section is AccommodationSection => section !== null);

  const description = stripHtml(post.content ?? "");

  return {
    // Filled in once the list is sorted — position, not an editor-typed number.
    index: "",
    province: readField(post, LIST_GROUP, "province"),
    name,
    slug,
    description,
    price: readField(post, LIST_GROUP, "price"),
    unit: readField(post, LIST_GROUP, "price_unit"),
    image: post.thumbnail?.url ?? post.images?.[0]?.url ?? "",
    subtitle: readField(post, DETAIL_GROUP, "subtitle"),
    intro: description,
    sections,
  };
}

export async function getAccommodations(
  locale: string
): Promise<AccommodationEntry[]> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: {
        language: locale,
        type: ACCOMMODATION_POST_TYPE,
        status: "published",
        limit: 100,
      },
    });

    const posts = data?.cpPostList?.posts ?? [];
    return posts
      .map((post) => ({ post, order: readOrder(post) }))
      .sort((a, b) => a.order - b.order)
      .map(({ post }) => toEntry(post, locale))
      .filter((entry): entry is AccommodationEntry => entry !== null)
      .map((entry, i) => ({ ...entry, index: String(i + 1).padStart(2, "0") }));
  } catch (error) {
    console.warn(
      "Accommodation query error:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}

export async function getAccommodation(
  locale: string,
  slug: string
): Promise<AccommodationEntry | null> {
  const entries = await getAccommodations(locale);
  return entries.find((entry) => entry.slug === slug) ?? null;
}
