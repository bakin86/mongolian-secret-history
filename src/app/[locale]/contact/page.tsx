import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getCmsPage } from "@/lib/cms/page";
import { stripHtml } from "@/lib/cms/html";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const cms = await getCmsPage(locale, "contact");
  const t = await getTranslations("contact");

  const contactInfo = [
    { icon: MapPin, label: t("addressLabel"), value: t("addressValue") },
    { icon: Phone, label: t("phoneLabel"), value: t("phoneValue") },
    { icon: Mail, label: "Email", value: t("emailValue") },
    { icon: Clock, label: t("hoursLabel"), value: t("hoursValue") },
  ];

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={cms?.thumbnail?.url}
      />

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white rounded-[20px] p-8 lg:p-10 shadow-sm border border-border">
              <h2 className="font-display text-xl text-foreground mb-6">{t("formTitle")}</h2>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm text-muted-foreground">{t("nameLabel")}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full rounded-[10px] border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm text-muted-foreground">{t("emailLabel")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-[10px] border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm text-muted-foreground">{t("messageLabel")}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-[10px] border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" className="self-start mt-1"
                >
                  {t("sendInquiry")}
                </Button>
              </form>
            </div>

            <div className="pt-2">
              <h2 className="font-display text-xl text-foreground mb-6">{t("infoTitle")}</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary shrink-0"
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                        <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 mt-6 border-t border-border">
                <p className="text-base font-medium text-foreground mb-1">{t("callTitle")}</p>
                <p className="text-sm text-muted-foreground mb-4">{t("callDesc")}</p>
                <Button href="tel:+97670000450" variant="primary" className="gap-2"
                >
                  <Phone size={16} />
                  {t("callButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "contact",
    locale,
    fallbackTitle: "Contact",
    fallbackDescription: "Get in touch — we reply within one business day.",
  });
}
