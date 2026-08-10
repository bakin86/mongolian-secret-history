"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

const plans = [
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PricingSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="bg-white py-20 lg:py-[140px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <SectionHeader
          label={t("pricingLabel")}
          title={t("pricingTitle")}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(18,63,174,0.08)" }}
              className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 flex flex-col gap-4 transition-all"
            >
              <span className="text-sm text-slate-500 dark:text-slate-400">{plan.duration}</span>
              <span className="font-display text-3xl text-primary">{plan.price}</span>
              <h3 className="font-display text-2xl text-slate-900 dark:text-white">{plan.title}</h3>
              <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{plan.desc}</p>
              <ul className="flex flex-col gap-3 mt-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check size={16} className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center justify-center rounded-full w-full px-7 py-3.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark"
                >
                  {t("requestQuote")}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-[20px] bg-primary-dark p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-[700px]">
            <h3 className="font-display text-2xl lg:text-[28px] text-white">{t("pricingCtaTitle")}</h3>
            <p className="text-white/85 mt-2 leading-relaxed">{t("pricingCtaDesc")}</p>
          </div>
          <Button href={`/${locale}/pricing`} variant="gold">
            {t("pricingCtaButton")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
