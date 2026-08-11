"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import { useTranslations } from "next-intl";
import { useCmsPage } from "@/lib/hooks/useCmsPage";
import { stripHtml } from "@/lib/cms/html";

const faqs = [
  {
    question: "What is the best time to visit Mongolia?",
    answer: "The best time to visit Mongolia is from June to September when the weather is mild and most festivals take place. Summer offers green landscapes and the famous Naadam Festival.",
  },
  {
    question: "Do I need a visa to travel to Mongolia?",
    answer: "Many nationalities can visit visa-free for up to 30–90 days. Check with your local Mongolian embassy for current requirements based on your passport.",
  },
  {
    question: "What should I pack for a tour?",
    answer: "Pack layers, comfortable walking shoes, sunscreen, a hat, and a reusable water bottle. We provide a detailed packing list after booking.",
  },
  {
    question: "Are the tours suitable for families?",
    answer: "Yes, we offer family-friendly itineraries with flexible pacing and activities suitable for children of all ages.",
  },
  {
    question: "Can I customize my itinerary?",
    answer: "Absolutely. We specialize in tailor-made tours designed around your interests, dates, and budget.",
  },
  {
    question: "What is accommodation like on tour?",
    answer: "We use a mix of hotels in Ulaanbaatar and traditional ger camps in rural areas, all chosen for comfort and authenticity.",
  },
];

interface FAQClientProps {
  /** Banner image resolved on the server so it does not swap in after hydration. */
  heroImage?: string | null;
  items?: { question: string; answer: string }[];
}

export default function FAQClient({ heroImage, items: cmsItems }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("faq");
  const cms = useCmsPage("faq");
  // The hardcoded set stays as the fallback for an empty or unreachable CMS.
  const items = cmsItems?.length ? cmsItems : faqs;

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={heroImage}
      />

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[900px] px-6 lg:px-0">
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <p className="text-lg leading-[1.7] text-muted-foreground">
              Planning a trip to Mongolia raises many questions. Here are answers to the ones we hear most often.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-display text-lg text-slate-900 dark:text-white pr-4">{faq.question}</span>
                    {isOpen ? (
                      <Minus size={22} className="text-primary shrink-0" />
                    ) : (
                      <Plus size={22} className="text-primary shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-6 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
