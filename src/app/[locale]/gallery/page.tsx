import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsPage } from "@/lib/cms/page";
import { getGalleryImages } from "@/lib/cms/team";
import GalleryClient from "./client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "gallery",
    locale,
    fallbackTitle: "Gallery",
    fallbackDescription: "Moments from Mongolia — landscapes, culture, and life on the steppe.",
  });
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, images] = await Promise.all([
    getCmsPage(locale, "gallery"),
    getGalleryImages(locale),
  ]);
  return <GalleryClient heroImage={cms?.thumbnail?.url} images={images} />;
}
