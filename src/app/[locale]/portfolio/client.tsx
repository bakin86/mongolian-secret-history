"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Image from "@/components/common/Image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useCmsPage } from "@/lib/hooks/useCmsPage";
import { stripHtml } from "@/lib/cms/html";

const categoryKeys = [
  "all",
  "adventureTours",
  "bestSellers",
  "festivalTours",
  "tailoredTours",
  "winterTours",
  "classicTours",
];

const categoryAliases: Record<string, string[]> = {
  all: [],
  adventureTours: ["adventure", "барт", "адал явдалт", "fishing", "survival", "reindeer", "shamanism"],
  bestSellers: ["best", "bestseller", "бэстселлер", "эрэлттэй", "gobi & kharkhorin", "10 days highlight", "naadam"],
  festivalTours: ["festival", "баяр", "наадам", "эвент"],
  tailoredTours: ["tailor", "custom", "хувийн", "захиалгат", "horse riding near amarbayasgalant"],
  winterTours: ["winter", "өвөл", "өвлийн"],
  classicTours: ["classic", "классик", "уламжлалт", "khustai & terelj", "ancient city", "khovsgol lake tour"],
};

function formatTourCategory(cat?: string, locale = "en"): string {
  if (!cat) return "Adventure Tours";
  if (locale === "en") {
    const lower = cat.toLowerCase();
    if (lower.includes("барт") || lower.includes("адал явдалт") || lower.includes("adventure")) return "Adventure Tours";
    if (lower.includes("классик") || lower.includes("уламжлалт") || lower.includes("classic")) return "Classic Tours";
    if (lower.includes("баяр") || lower.includes("наадам") || lower.includes("эвент") || lower.includes("festival")) return "Festival Tours";
    if (lower.includes("эрэлттэй") || lower.includes("бэстселлер") || lower.includes("bestseller") || lower.includes("best")) return "Best Sellers";
    if (lower.includes("хувийн") || lower.includes("захиалгат") || lower.includes("tailor")) return "Tailored Tours";
    if (lower.includes("өвөл") || lower.includes("winter")) return "Winter Tours";
    return cat;
  }
  return cat;
}

function isCategoryMatch(tour: TourDetailData, selectedCategoryKey: string): boolean {
  if (selectedCategoryKey === "all") return true;
  const keywords = categoryAliases[selectedCategoryKey] || [];
  const combined = [
    tour.category || "",
    ...(tour.categories || []),
    tour.title || "",
    tour.slug || "",
  ]
    .join(" ")
    .toLowerCase();

  return keywords.some((kw) => combined.includes(kw.toLowerCase()));
}

const tours = [
  {
    title: "Gobi Desert Adventure",
    slug: "gobi-desert-adventure",
    category: "Adventure Tours",
    duration: "8 days",
    price: "$1,100",
    image: "/images/tour-1.jpg",
  },
  {
    title: "Central Mongolia Heritage Tour",
    slug: "central-mongolia-heritage",
    category: "classic tours",
    duration: "6 days",
    price: "$950",
    image: "/images/about-nomads.jpg",
  },
  {
    title: "Khustai & Terelj National Parks",
    slug: "khustai-terelj",
    category: "Best Sellers",
    duration: "4 days",
    price: "$700",
    image: "/images/culture-nomads.jpg",
  },
  {
    title: "Nomadic Lifestyle Experience",
    slug: "nomadic-lifestyle",
    category: "Tailored Tours",
    duration: "5 days",
    price: "$850",
    image: "/images/about-nomads.jpg",
  },
  {
    title: "10-Day Highlights of Mongolia",
    slug: "highlights-of-mongolia",
    category: "Best Sellers",
    duration: "10 days",
    price: "$1,500",
    image: "/images/tour-1.jpg",
  },
  {
    title: "Naadam Festival Tour",
    slug: "naadam-festival-tour",
    category: "Festival tours",
    duration: "7 days",
    price: "$1,250",
    image: "/images/culture-nomads.jpg",
  },
  {
    title: "Winter Mongolia Expedition",
    slug: "winter-mongolia-expedition",
    category: "Winter tours",
    duration: "9 days",
    price: "$1,350",
    image: "/images/tour-1.jpg",
  },
  {
    title: "Horse Trekking in the Altai",
    slug: "altai-horse-trek",
    category: "Adventure Tours",
    duration: "12 days",
    price: "$1,800",
    image: "/images/tour-1.jpg",
  },
  {
    title: "Golden Eagle Festival Journey",
    slug: "golden-eagle-festival",
    category: "Festival tours",
    duration: "10 days",
    price: "$1,650",
    image: "/images/tour-2.jpg",
  },
  {
    title: "Khuvsgul Lake Winter Adventure",
    slug: "khuvsgul-winter",
    category: "Winter tours",
    duration: "6 days",
    price: "$980",
    image: "/images/tour-3.jpg",
  },
  {
    title: "Custom Private Mongolia Tour",
    slug: "custom-private-tour",
    category: "Tailored Tours",
    duration: "Flexible",
    price: "On request",
    image: "/images/tour-4.jpg",
  },
  {
    title: "Classic Mongolia Discovery",
    slug: "classic-mongolia-discovery",
    category: "classic tours",
    duration: "8 days",
    price: "$1,150",
    image: "/images/tour-5.jpg",
  },
];

import type { TourDetailData } from "@/lib/cms/tours";
import { fallbackTours } from "@/lib/cms/tours";

interface PortfolioClientProps {
  initialTours?: TourDetailData[];
  /** Banner image resolved on the server so it does not swap in after hydration. */
  heroImage?: string | null;
}

export default function PortfolioClient({ initialTours, heroImage }: PortfolioClientProps) {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations("tours");
  const cms = useCmsPage("portfolio");
  const tc = useTranslations("common");
  const [activeCategory, setActiveCategory] = useState("all");

  const tourList = initialTours && initialTours.length ? initialTours : fallbackTours;

  const filteredTours = tourList.filter((tour) => isCategoryMatch(tour, activeCategory));

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={cms?.name || t("heroTitle")}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || t("heroSubtitle")}
        image={heroImage}
      />

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="text-center max-w-[800px] mx-auto mb-10">
            <p className="text-lg leading-[1.7] text-slate-600 dark:text-slate-300">{t("intro")}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categoryKeys.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium border transition-colors",
                  activeCategory === category
                    ? "bg-primary text-white border-primary"
                    : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary"
                )}
              >
                {t(category)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTours.map((tour) => (
                <motion.div
                  key={tour.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(18,63,174,0.08)" }}
                  className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
                >
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 dark:text-slate-400">{tour.duration}</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-primary font-medium">{formatTourCategory(tour.category, locale)}</span>
                    </div>
                    <h3 className="font-display text-xl text-slate-900 dark:text-white">{tour.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-display text-lg font-bold">{tour.price}</span>
                      <Link
                        href={`/${locale}/portfolio/${tour.slug}`}
                        className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                      >
                        {tc("viewDetails")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </InnerPageLayout>
  );
}
