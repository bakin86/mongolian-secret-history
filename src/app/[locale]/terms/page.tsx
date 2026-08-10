import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import TermsContent from "@/components/legal/TermsContent";
import CmsContent from "@/components/cms/CmsContent";
import { getCmsPage } from "@/lib/cms/page";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string } >;
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const cms = await getCmsPage(locale, "terms");
  const t = await getTranslations("terms");

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={cms?.thumbnail?.url}
      />
      <section className="bg-white py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[900px] px-6 lg:px-0">
          {cms?.content ? <CmsContent html={cms.content} /> : <TermsContent />}
        </div>
      </section>
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "terms",
    locale,
    fallbackTitle: "Terms & Conditions",
    fallbackDescription: "Booking terms, cancellation policy, and travel conditions.",
  });
}
