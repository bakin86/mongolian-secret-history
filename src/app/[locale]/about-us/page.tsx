import { getCmsPage } from "@/lib/cms/page";
import CmsPageShell from "@/components/cms/CmsPageShell";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutUsPage({ params }: PageProps) {
  const { locale } = await params;
  const page = await getCmsPage(locale, "about-us");
  return <CmsPageShell page={page} namespace="about-us" />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "about-us",
    locale,
    fallbackTitle: "About Us",
    fallbackDescription: "Mongolian Secret History — local tour agency since 2005.",
  });
}
