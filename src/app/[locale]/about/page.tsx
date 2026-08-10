import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import MongoliaMap from "@/components/about/MongoliaMap";
import AboutSections from "@/components/about/AboutSections";
import ClimateWheel from "@/components/about/ClimateWheel";
import { getCmsPage } from "@/lib/cms/page";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string } >;
}

import { getAboutMongoliaPosts } from "@/lib/cms/posts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const cms = await getCmsPage(locale, "about");
  const t = await getTranslations("about");
  const aboutPosts = await getAboutMongoliaPosts(locale);

  const countryPost = aboutPosts.find(
    (p) =>
      p.categories?.some((c) => c.slug?.includes("country") || c.name?.includes("Улс орон")) ||
      (p.title || "").toLowerCase().includes("country") ||
      (p.title || "").toLowerCase().includes("land")
  );

  const culturePost = aboutPosts.find(
    (p) =>
      p.categories?.some((c) => c.slug?.includes("soyol") || c.name?.includes("Соёл")) ||
      (p.title || "").toLowerCase().includes("culture") ||
      (p.title || "").toLowerCase().includes("nomadic")
  ) || aboutPosts[0];

  const countryData = {
    label: t("countryLabel"),
    title: countryPost?.title || t("countryTitle"),
    desc1: countryPost?.excerpt || t("countryDesc1"),
    desc2: countryPost?.excerpt ? "" : t("countryDesc2"),
    image: countryPost?.thumbnail?.url || "/images/hero-steppe.jpg",
  };

  const cultureData = {
    label: t("cultureLabel"),
    title: culturePost?.title || t("cultureTitle"),
    desc1: culturePost?.excerpt || t("cultureDesc1"),
    desc2: culturePost?.excerpt ? "" : t("cultureDesc2"),
    image: culturePost?.thumbnail?.url || "/images/culture-naadam.jpg",
  };

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={cms?.thumbnail?.url}
      />

      <AboutSections country={countryData} culture={cultureData} />

      <section id="regions" className="bg-white py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="text-center mb-14">
            <span className="section-label">{t("destinationsLabel")}</span>
            <span className="gold-line mx-auto mt-3" />
            <h2 className="font-display text-3xl md:text-[44px] leading-[1.15] mt-3">{t("destinationsTitle")}</h2>
          </div>

          <MongoliaMap />
        </div>
      </section>

      <ClimateWheel
        label={t("climateLabel")}
        title={t("climateTitle")}
        seasons={[
          { season: t("spring"), months: t("springMonths"), desc: t("springDesc"), image: "/images/season-spring.jpg" },
          { season: t("summer"), months: t("summerMonths"), desc: t("summerDesc"), image: "/images/season-summer.jpg" },
          { season: t("autumn"), months: t("autumnMonths"), desc: t("autumnDesc"), image: "/images/season-autumn.jpg" },
          { season: t("winter"), months: t("winterMonths"), desc: t("winterDesc"), image: "/images/season-winter.jpg" },
        ]}
      />
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "about",
    locale,
    fallbackTitle: "About Mongolia",
    fallbackDescription: "Discover the land of eternal blue sky — culture, nature, and nomadic heritage.",
  });
}
