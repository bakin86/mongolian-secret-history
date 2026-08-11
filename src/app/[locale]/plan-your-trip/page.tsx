import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import CmsContent from "@/components/cms/CmsContent";
import BuildYourTourSection from "@/components/sections/BuildYourTourSection";
import PricingSection from "@/components/sections/PricingSection";
import TeamCarousel from "@/components/sections/TeamCarousel";
import GalleryMarquee from "@/components/sections/GalleryMarquee";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import BlogSection from "@/components/sections/BlogSection";
import { getCmsPage } from "@/lib/cms/page";
import { getTeamMembers, getGalleryImages } from "@/lib/cms/team";
import { getFaqItems } from "@/lib/cms/faq";
import { getBlogTeasers } from "@/lib/cms/posts";
import { getPricingPlans } from "@/lib/cms/pricing";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const FALLBACK_GALLERY = [
  "/images/tour-1.jpg",
  "/images/tour-2.jpg",
  "/images/tour-3.jpg",
  "/images/tour-4.jpg",
  "/images/tour-5.jpg",
  "/images/tour-6.jpg",
  "/images/hero-steppe.jpg",
  "/images/about-nomads.jpg",
];

export default async function PlanYourTripPage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, team, galleryImages, faqItems, blogPosts, pricingPlans] =
    await Promise.all([
      getCmsPage(locale, "plan-your-trip"),
      getTeamMembers(locale),
      getGalleryImages(locale),
      getFaqItems(locale),
      getBlogTeasers(locale, 3),
      getPricingPlans(locale),
    ]);

  // The marquee reads as two counter-scrolling rows, so split whatever the
  // client uploaded down the middle rather than fixing the count.
  const images = galleryImages.length ? galleryImages : FALLBACK_GALLERY;
  const half = Math.ceil(images.length / 2);
  const galleryRows = [images.slice(0, half), images.slice(half)].filter(
    (row) => row.length > 0
  );

  return (
    <InnerPageLayout>
      <PageHero
        label="Plan your trip"
        title={cms?.name || "Plan Your Trip"}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || "Design your perfect Mongolia journey with our team"}
        image={cms?.thumbnail?.url}
      />

      {cms?.content && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[900px] px-6 lg:px-0">
            <CmsContent html={cms.content} />
          </div>
        </section>
      )}

      <BuildYourTourSection />
      <PricingSection plans={pricingPlans} />
      <TeamCarousel members={team} />

      <section className="bg-background py-20 lg:py-[100px] overflow-hidden">
        <div className="text-center mb-12">
          <span className="section-label">Gallery</span>
          <span className="gold-line mx-auto mt-3" />
          <h2 className="font-display text-3xl md:text-[44px] leading-[1.15] mt-3">Moments from Mongolia</h2>
        </div>
        <GalleryMarquee
          rows={galleryRows.map((rowImages) => ({
            images: rowImages,
            cardWidth: "w-[320px] md:w-[400px]",
            cardHeight: "h-[200px] md:h-[240px]",
          }))}
        />
      </section>

      <TestimonialsSection guide={team[0]} />
      <FAQSection items={faqItems} />
      <BlogSection posts={blogPosts.length ? blogPosts : undefined} />
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "plan-your-trip",
    locale,
    fallbackTitle: "Plan Your Trip",
    fallbackDescription: "Design your perfect Mongolia journey with our team.",
  });
}
