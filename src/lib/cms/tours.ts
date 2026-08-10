import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS, CP_POST } from "@/graphql/cms/queries/post";
import type { CpPostsData, CpPostsVariables, CpPostData, CpPostVariables, Post } from "@/graphql/cms/queries/post";

export interface TourItineraryDay {
  day: string;
  title: string;
  desc: string;
}

export interface TourDetailData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categories?: string[];
  duration: string;
  price: string;
  groupSize: string;
  bestSeason: string;
  image: string;
  images: string[];
  excerpt: string;
  content: string;
  included: string[];
  notIncluded: string[];
  itinerary: TourItineraryDay[];
}

export const fallbackTours: TourDetailData[] = [];

function parseListField(raw?: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((s) => String(s).replace(/^[✓✔☑✕×✖•\-\*\s]+/, "").trim()).filter(Boolean);
  if (typeof raw === "string" && raw.trim()) {
    return raw
      .split(/\r?\n/)
      .map((s) => s.replace(/^[✓✔☑✕×✖•\-\*\s]+/, "").trim())
      .filter(Boolean);
  }
  return [];
}

function parseItineraryField(raw?: unknown): TourItineraryDay[] {
  if (Array.isArray(raw)) {
    return raw.map((item, idx) => {
      if (typeof item === "object" && item !== null) {
        const obj = item as Record<string, string>;
        return {
          day: obj.day || `Day ${idx + 1}`,
          title: obj.title || obj.name || `Day ${idx + 1}`,
          desc: obj.desc || obj.description || "",
        };
      }
      return { day: `Day ${idx + 1}`, title: String(item), desc: "" };
    });
  }

  if (typeof raw === "string" && raw.trim()) {
    const text = raw.trim();
    const dayRegex = /(?:^|\n)(?:Day|Өдөр)\s*(\d+)[\s:\-–|]+([^\n]+)/gi;
    const matches = Array.from(text.matchAll(dayRegex));

    if (matches.length > 0) {
      const days: TourItineraryDay[] = [];
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const dayNum = match[1];
        const title = match[2].trim();

        const startIndex = match.index! + match[0].length;
        const endIndex = i < matches.length - 1 ? matches[i + 1].index! : text.length;
        const desc = text.substring(startIndex, endIndex).trim();

        days.push({
          day: `Day ${dayNum}`,
          title,
          desc,
        });
      }
      return days;
    }

    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    return lines.map((line, idx) => ({
      day: `Day ${idx + 1}`,
      title: line.trim(),
      desc: "",
    }));
  }

  return [];
}

export function transformPostToTour(post: Post): TourDetailData {
  const customMap = (post.customFieldsMap ?? {}) as Record<string, Record<string, unknown>>;
  const customData = (post.customFieldsData ?? {}) as Record<string, unknown>;

  const atAGlance = customMap["at-a-glance"] || customMap["at_a_glance"] || {};
  const includedNotIncluded = customMap["included-not-included"] || customMap["included_not_included"] || {};
  const dayByDay = customMap["DAY-BY-DAY"] || customMap["day-by-day"] || {};
  const tourGallery = customMap["tour-gallery"] || customMap["tour_gallery"] || {};

  const duration = String(atAGlance.duration || customData.duration || customData["tour_details.duration"] || "5 days");
  const price = String(atAGlance.price || customData.price || customData["tour_details.price"] || "$850");
  const groupSize = String(atAGlance.group_size || customData.group_size || customData.groupSize || "2–10 Travelers");
  const bestSeason = String(atAGlance.best_season || customData.best_season || customData.bestSeason || "May–September");

  const included = parseListField(includedNotIncluded.whats_included || customData.whats_included || customData.included);
  const notIncluded = parseListField(includedNotIncluded.not_included || customData.not_included);
  const itinerary = parseItineraryField(dayByDay.day_by_day_itinerary || customData.day_by_day_itinerary || customData.itinerary);

  const fileBaseUrl = process.env.NEXT_PUBLIC_ERXES_FILE_URL || "https://mongoliansecretstory.next.erxes.io/gateway/read-file?key=";

  const rawGallery = (tourGallery.tour_gallery || customData.tour_gallery || []) as string[];
  const galleryUrls = rawGallery.map((k) => (typeof k === "string" && !k.startsWith("http") ? `${fileBaseUrl}${k}` : String(k)));

  const allCategoryNames = (post.categories || []).map((c) => c.name || "").filter(Boolean);
  const categoryName = allCategoryNames[0] || "Adventure Tours";

  const thumbnail = post.thumbnail?.url
    ? post.thumbnail.url.startsWith("http")
      ? post.thumbnail.url
      : `${fileBaseUrl}${post.thumbnail.url}`
    : undefined;

  const firstImage = galleryUrls[0] || thumbnail || "/images/tour-1.jpg";

  return {
    _id: post._id,
    title: post.title || "Mongolia Tour",
    slug: post.slug || post._id,
    category: categoryName,
    categories: allCategoryNames,
    duration,
    price,
    groupSize,
    bestSeason,
    image: firstImage,
    images: galleryUrls.length ? galleryUrls : [firstImage],
    excerpt: post.excerpt || post.title || "",
    content: post.content || "",
    included: included.length ? included : fallbackTours[0].included,
    notIncluded: notIncluded.length ? notIncluded : fallbackTours[0].notIncluded,
    itinerary: itinerary.length ? itinerary : fallbackTours[0].itinerary,
  };
}

export async function getCmsTours(locale: string, limit = 20): Promise<TourDetailData[]> {
  try {
    const client = await getServerApolloClient();

    // Query cpPostList with type "tour" or "tours"
    const { CP_POST_LIST } = await import("@/graphql/cms/queries/post");
    const { data } = await client.query<{ cpPostList?: { posts: Post[] } }>({
      query: CP_POST_LIST,
      variables: { type: "tour", language: locale, limit },
      context: { fetchOptions: { next: { revalidate: 10 } } },
    });

    const cmsPosts: Post[] = (data?.cpPostList?.posts ?? []) as Post[];

    if (!cmsPosts.length) {
      // Fallback query without type filter
      const { data: allData } = await client.query<{ cpPostList?: { posts: Post[] } }>({
        query: CP_POST_LIST,
        variables: { language: locale, limit },
        context: { fetchOptions: { next: { revalidate: 10 } } },
      });
      const allPosts: Post[] = (allData?.cpPostList?.posts ?? []) as Post[];
      const tourPosts = allPosts.filter(
        (p) => p.type === "tour" || p.type === "tours" || p.categories?.some((c) => c.name?.toLowerCase().includes("тур") || c.name?.toLowerCase().includes("аялал") || c.name?.toLowerCase().includes("tour"))
      );
      if (tourPosts.length) {
        return tourPosts.map(transformPostToTour);
      }
      return fallbackTours;
    }
    const transformed = cmsPosts.map(transformPostToTour);
    const uniqueFallbacks = fallbackTours.filter((f) => {
      const fSlugClean = f.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
      const fTitleClean = f.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      return !transformed.some((t) => {
        const tSlugClean = t.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
        const tTitleClean = t.title.toLowerCase().replace(/[^a-z0-9]/g, "");
        return (
          t.slug === f.slug ||
          tSlugClean === fSlugClean ||
          tTitleClean.includes("amarbayasgalant") && fTitleClean.includes("amarbayasgalant")
        );
      });
    });
    return [...transformed, ...uniqueFallbacks];
  } catch (error) {
    console.warn("CMS tours query fallback:", error instanceof Error ? error.message : String(error));
    return fallbackTours;
  }
}

export async function getCmsTourBySlug(locale: string, slug: string): Promise<TourDetailData> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<CpPostData, CpPostVariables>({
      query: CP_POST,
      variables: { slug, language: locale },
      context: { fetchOptions: { next: { revalidate: 10 } } },
    });
    if (data?.cpPost) {
      return transformPostToTour(data.cpPost);
    }
    // Also search in live CMS tours list to find matching title or slug
    const allCmsTours = await getCmsTours(locale, 50);
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cmsMatch = allCmsTours.find((t) => {
      const tClean = t.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
      return (
        t.slug === slug ||
        tClean === cleanSlug ||
        (cleanSlug.includes("amarbayasgalant") && t.slug.includes("amarbayasgalant"))
      );
    });
    if (cmsMatch && cmsMatch._id && !cmsMatch._id.startsWith("tour-")) {
      return cmsMatch;
    }
  } catch (error) {
    console.warn(`CMS tour query fallback (${slug}):`, error instanceof Error ? error.message : String(error));
  }
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  const match = fallbackTours.find((t) => {
    const tSlugClean = t.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    return t.slug === slug || tSlugClean === cleanSlug;
  });
  return match ?? fallbackTours[0];
}
