"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "@/components/common/Image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const tours = [
  { title: "Gobi Desert Adventure", duration: "8 days", price: "$1,100", slug: "gobi-desert-adventure", image: "/images/tour-1.jpg" },
  { title: "Central Mongolia Heritage Tour", duration: "6 days", price: "$950", slug: "central-mongolia-heritage", image: "/images/about-nomads.jpg" },
  { title: "Khustai & Terelj National Parks", duration: "4 days", price: "$700", slug: "khustai-terelj", image: "/images/culture-nomads.jpg" },
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

export default function PortfolioSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="bg-background py-20 lg:py-[140px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <SectionHeader
          label={t("toursLabel")}
          title={t("toursTitle")}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tours.map((tour) => (
            <motion.div
              key={tour.slug || tour.title}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(18,63,174,0.08)" }}
              className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
            >
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={tour.image || "/images/tour-1.jpg"}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">{tour.duration}</span>
                <h3 className="font-display text-xl text-slate-900 dark:text-white">{tour.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-display text-lg font-bold">{tour.price}</span>
                  <Link
                    href={`/${locale}/portfolio/${tour.slug}`}
                    className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    {t("toursButton")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
