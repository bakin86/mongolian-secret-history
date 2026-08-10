import type { Metadata } from "next";
import { getCmsTourBySlug } from "@/lib/cms/tours";
import { getCmsMetadata } from "@/lib/cms/seo";
import TourDetailClient from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = await getCmsTourBySlug(locale, slug);
  return getCmsMetadata({
    slug: `portfolio/${slug}`,
    locale,
    fallbackTitle: tour.title,
    fallbackDescription: tour.excerpt,
  });
}

export default async function TourDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const tour = await getCmsTourBySlug(locale, slug);
  return <TourDetailClient tour={tour} locale={locale} />;
}
