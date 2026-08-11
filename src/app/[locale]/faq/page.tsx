import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsPage } from "@/lib/cms/page";
import { getFaqItems } from "@/lib/cms/faq";
import FAQClient from "./client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "faq",
    locale,
    fallbackTitle: "Frequently Asked Questions",
    fallbackDescription: "Answers to the most common questions about traveling in Mongolia.",
  });
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, items] = await Promise.all([
    getCmsPage(locale, "faq"),
    getFaqItems(locale),
  ]);
  return <FAQClient heroImage={cms?.thumbnail?.url} items={items} />;
}
