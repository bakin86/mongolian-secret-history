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
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlanYourTripPage({ params }: PageProps) {
  const { locale } = await params;
  const cms = await getCmsPage(locale, "plan-your-trip");
  return (
    <InnerPageLayout>
      <PageHero
        label="Plan your trip"
        title={cms?.name || "Plan Your Trip"}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || "Design your perfect Mongolia journey with our team"}
      />

      {cms?.content && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[900px] px-6 lg:px-0">
            <CmsContent html={cms.content} />
          </div>
        </section>
      )}

      <BuildYourTourSection />
      <PricingSection />
      <TeamCarousel />

      <section className="bg-background py-20 lg:py-[100px] overflow-hidden">
        <div className="text-center mb-12">
          <span className="section-label">Gallery</span>
          <span className="gold-line mx-auto mt-3" />
          <h2 className="font-display text-3xl md:text-[44px] leading-[1.15] mt-3">Moments from Mongolia</h2>
        </div>
        <GalleryMarquee
          rows={[
            {
              images: ["/images/tour-1.jpg", "/images/tour-2.jpg", "/images/tour-3.jpg", "/images/tour-4.jpg"],
              cardWidth: "w-[320px] md:w-[400px]",
              cardHeight: "h-[200px] md:h-[240px]",
            },
            {
              images: ["/images/tour-5.jpg", "/images/tour-6.jpg", "/images/hero-steppe.jpg", "/images/about-nomads.jpg"],
              cardWidth: "w-[320px] md:w-[400px]",
              cardHeight: "h-[200px] md:h-[240px]",
            },
          ]}
        />
      </section>

      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
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
