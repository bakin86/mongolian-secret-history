"use client";

import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import GalleryMarquee from "@/components/sections/GalleryMarquee";
import { useTranslations } from "next-intl";
import { useCmsPage } from "@/lib/hooks/useCmsPage";
import { stripHtml } from "@/lib/cms/html";

/**
 * Three bands of differing card sizes give the marquee its rhythm; only the
 * pictures come from the CMS, so the client cannot flatten the layout.
 */
const ROW_STYLES = [
  { cardWidth: "w-[260px] md:w-[390px]", cardHeight: "h-[200px] md:h-[260px]" },
  { cardWidth: "w-[340px] md:w-[590px]", cardHeight: "h-[240px] md:h-[320px]" },
  { cardWidth: "w-[260px] md:w-[390px]", cardHeight: "h-[200px] md:h-[260px]" },
];

const FALLBACK_ROWS = [
  ["/images/tour-1.jpg", "/images/tour-2.jpg", "/images/tour-3.jpg"],
  ["/images/tour-4.jpg", "/images/tour-5.jpg"],
  ["/images/tour-2.jpg", "/images/tour-3.jpg", "/images/tour-1.jpg"],
];

/** Deal the uploads across the three bands so every row keeps scrolling. */
function toRows(images: string[]): string[][] {
  if (!images.length) return FALLBACK_ROWS;
  const rows: string[][] = [[], [], []];
  images.forEach((image, i) => rows[i % ROW_STYLES.length].push(image));
  return rows.filter((row) => row.length > 0);
}

interface GalleryClientProps {
  /** Banner image resolved on the server so it does not swap in after hydration. */
  heroImage?: string | null;
  images?: string[];
}

export default function GalleryClient({ heroImage, images = [] }: GalleryClientProps) {
  const rows = toRows(images).map((rowImages, i) => ({
    images: rowImages,
    ...ROW_STYLES[i % ROW_STYLES.length],
  }));

  const t = useTranslations("gallery");
  const cms = useCmsPage("gallery");

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={heroImage}
      />

      <section className="bg-background py-20 lg:py-[120px] overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <p className="text-lg leading-[1.7] text-muted-foreground">
              A glimpse into the landscapes, people, and experiences that make Mongolia one of the world&apos;s most extraordinary travel destinations.
            </p>
          </div>
        </div>

        <GalleryMarquee rows={rows} />
      </section>
    </InnerPageLayout>
  );
}
