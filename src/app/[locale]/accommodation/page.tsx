import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import AccommodationSticky from "@/components/sections/AccommodationSticky";
import { getCmsPage } from "@/lib/cms/page";
import { getAccommodations } from "@/lib/cms/accommodation";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const accommodations = [
  {
    index: "01",
    province: "Tuv Province",
    name: "Silk road resort",
    description:
      "A luxurious resort of 45 gers that lets you feel the unique spirit of the Silk Road.",
    price: "₮250,000",
    unit: "night",
    image: "/images/tour-1.jpg",
  },
  {
    index: "02",
    province: "Khentii Province",
    name: "Mongolian secret history camp",
    slug: "mongolian-secret-history-camp",
    description:
      "A traditional ger camp located among the golden autumn forests, close to historic sites.",
    price: "₮180,000",
    unit: "night",
    image: "/images/tour-2.jpg",
  },
  {
    index: "03",
    province: "Ovorkhangai Province",
    name: "Secret of Ongi tourist camp",
    description:
      "A peaceful ger camp where you can rest under a star-filled night sky.",
    price: "₮160,000",
    unit: "night",
    image: "/images/tour-3.jpg",
  },
  {
    index: "04",
    province: "Restaurant",
    name: "MSH restaurant",
    description:
      "Enjoy traditional and modern Mongolian cuisine in an elegant setting.",
    price: "By reservation",
    unit: "",
    image: "/images/tour-4.jpg",
  },
];

export default async function AccommodationPage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, stays, t] = await Promise.all([
    getCmsPage(locale, "accommodation"),
    getAccommodations(locale),
    getTranslations("accommodation"),
  ]);

  // The hardcoded list stays as the fallback for an empty or unreachable CMS.
  const items = stays.length ? stays : accommodations;

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={cms?.thumbnail?.url}
      />

      <AccommodationSticky items={items} locale={locale} />
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "accommodation",
    locale,
    fallbackTitle: "Accommodation",
    fallbackDescription: "Stay in comfort — from city hotels to traditional ger camps under the stars.",
  });
}
