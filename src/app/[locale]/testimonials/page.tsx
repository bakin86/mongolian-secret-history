import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsPage } from "@/lib/cms/page";
import { getTestimonialItems } from "@/lib/cms/testimonials";
import TestimonialsClient from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "testimonials",
    locale,
    fallbackTitle: "Testimonials",
    fallbackDescription: "What our guests say about traveling with us.",
  });
}

export default async function TestimonialsPage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, cmsTestimonials] = await Promise.all([
    getCmsPage(locale, "testimonials"),
    getTestimonialItems(locale),
  ]);

  return (
    <TestimonialsClient
      heroImage={cms?.thumbnail?.url}
      cmsTestimonials={cmsTestimonials}
    />
  );
}

