import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/services/ServiceCard";
import { getCmsPage } from "@/lib/cms/page";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string } >;
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const cms = await getCmsPage(locale, "services");
  const t = await getTranslations("services");

  const services = [
    {
      title: t("groupTours"),
      subtitle: t("groupToursSubtitle"),
      desc: t("groupToursDesc"),
    },
    {
      title: t("privateTours"),
      subtitle: t("privateToursSubtitle"),
      desc: t("privateToursDesc"),
    },
    {
      title: t("cultural"),
      subtitle: t("culturalSubtitle"),
      desc: t("culturalDesc"),
    },
    {
      title: t("adventure"),
      subtitle: t("adventureSubtitle"),
      desc: t("adventureDesc"),
    },
    {
      title: t("transport"),
      subtitle: t("transportSubtitle"),
      desc: t("transportDesc"),
    },
    {
      title: t("accommodation"),
      subtitle: t("accommodationSubtitle"),
      desc: t("accommodationDesc"),
    },
  ];

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={cms?.thumbnail?.url}
      />
      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <p className="text-center text-muted-foreground max-w-[800px] mx-auto mb-16">
            {t("intro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                subtitle={service.subtitle}
                desc={service.desc}
              />
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "services",
    locale,
    fallbackTitle: "Services",
    fallbackDescription: "Tours, accommodation, transport, and full travel services across Mongolia.",
  });
}
