import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsPage } from "@/lib/cms/page";
import BookOnlineClient from "./client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "book-online",
    locale,
    fallbackTitle: "Book Online",
    fallbackDescription: "Reserve your tour, accommodation, or travel services with our team.",
  });
}

export default async function BookOnlinePage({ params }: PageProps) {
  const { locale } = await params;
  const cms = await getCmsPage(locale, "book-online");
  return <BookOnlineClient heroImage={cms?.thumbnail?.url} />;
}
