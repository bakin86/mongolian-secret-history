import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Link from "next/link";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { getCmsPage } from "@/lib/cms/page";
import { getPricingPlans } from "@/lib/cms/pricing";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Fallback tiers for an empty or unreachable CMS.
const defaultPlans = [
  {
    duration: "2–5 days",
    price: "$700–$900",
    title: "Short Tours",
    desc: "Perfect for a quick escape into Mongolia's nature and culture",
    features: ["Airport transfers", "English-speaking guide", "Ger camp stays"],
  },
  {
    duration: "6–9 days",
    price: "$900–$1,300",
    title: "Mid-Length Tours",
    desc: "A deeper journey across multiple regions and landscapes",
    features: ["All transport", "Most meals", "National park fees"],
  },
  {
    duration: "10+ days",
    price: "$1,500+",
    title: "Extended Tours",
    desc: "The complete Mongolia experience, fully customized",
    features: ["Full board option", "Remote destinations", "Private vehicle"],
  },
];

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, cmsPlans, t] = await Promise.all([
    getCmsPage(locale, "pricing"),
    getPricingPlans(locale),
    getTranslations("pricing"),
  ]);
  const plans = cmsPlans.length ? cmsPlans : defaultPlans;

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
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <p className="text-lg leading-[1.7] text-muted-foreground">
              Our tour prices vary based on duration, group size, accommodation level, and activities.
              Below are starting prices for our most common tour categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className="rounded-[20px] bg-white border border-border p-10 flex flex-col gap-4 transition-all hover:shadow-[0_10px_15px_-3px_rgba(18,63,174,0.08)]"
              >
                <span className="text-sm text-muted-foreground">{plan.duration}</span>
                <span className="font-display text-2xl md:text-3xl text-primary">{plan.price}</span>
                <h3 className="font-display text-2xl text-foreground">{plan.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{plan.desc}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center rounded-full w-full px-7 py-3.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[20px] bg-gold p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-[700px]">
              <h3 className="font-display text-2xl lg:text-[28px] text-[#0A2C7A]">Need a Custom Itinerary?</h3>
              <p className="text-[#0A2C7A]/85 mt-2 leading-relaxed">
                Tell us your travel dates, interests, and budget. We&apos;ll design a tailor-made Mongolia journey just for you.
              </p>
            </div>
            <Button href={`/${locale}/contact`} variant="primary">
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "pricing",
    locale,
    fallbackTitle: "Pricing",
    fallbackDescription: "Transparent pricing for tours, camps, and custom itineraries.",
  });
}
