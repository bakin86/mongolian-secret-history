import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsTours } from "@/lib/cms/tours";
import { getCmsPage } from "@/lib/cms/page";
import PortfolioClient from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "portfolio",
    locale,
    fallbackTitle: "Tours",
    fallbackDescription: "Signature tours across Mongolia — from the Gobi to Khuvsgul.",
  });
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  const [tours, cms] = await Promise.all([
    getCmsTours(locale, 20),
    getCmsPage(locale, "portfolio"),
  ]);
  return <PortfolioClient initialTours={tours} heroImage={cms?.thumbnail?.url} />;
}
