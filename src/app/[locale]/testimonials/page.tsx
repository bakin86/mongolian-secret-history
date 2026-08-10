import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsPage } from "@/lib/cms/page";
import TestimonialsClient from "./client";

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
  const cms = await getCmsPage(locale, "testimonials");
  return <TestimonialsClient heroImage={cms?.thumbnail?.url} />;
}
