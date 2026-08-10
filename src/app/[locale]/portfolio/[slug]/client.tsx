"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Image from "@/components/common/Image";
import { useTranslations } from "next-intl";
import type { TourDetailData } from "@/lib/cms/tours";
import { stripHtml } from "@/lib/cms/html";

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg"
    >
      <motion.div
        ref={ref}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1.05 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y }}
        className="absolute inset-[-15%]"
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

function RevealGalleryImage({
  src,
  delay = 0,
  className = "",
}: {
  src: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 ${className}`}
    >
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
      >
        <Image src={src} alt="Tour gallery" fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

interface TourDetailClientProps {
  tour: TourDetailData;
  locale: string;
}

export default function TourDetailClient({ tour, locale }: TourDetailClientProps) {
  const t = useTranslations("tours");
  const tc = useTranslations("common");

  const quickInfo = [
    { label: t("duration"), value: tour.duration },
    { label: t("groupSize"), value: tour.groupSize },
    { label: t("price"), value: tour.price },
    { label: t("bestSeason"), value: tour.bestSeason },
  ];

  const galleryImages =
    tour.images && tour.images.length > 0
      ? tour.images
      : [
          tour.image,
          "/images/tour-2.jpg",
          "/images/tour-3.jpg",
          "/images/tour-4.jpg",
          "/images/tour-5.jpg",
        ];

  const cleanContent = stripHtml(tour.content || tour.excerpt);

  return (
    <InnerPageLayout>
      <PageHero label="Tour Details" title={tour.title} subtitle={tour.excerpt} />

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <ParallaxImage src={tour.image} alt={tour.title} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-5 max-w-[520px]"
            >
              <span className="section-label text-gold">{t("overviewLabel")}</span>
              <span className="gold-line" />
              <h2 className="font-display text-3xl md:text-[40px] leading-[1.15] text-slate-900 dark:text-white">
                {tour.title}
              </h2>
              <p className="text-base leading-[1.7] text-slate-600 dark:text-slate-300">
                {cleanContent}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="text-center mb-12">
            <span className="section-label">{t("atAGlance")}</span>
            <span className="gold-line mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickInfo.map((info) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 text-center transition-shadow hover:shadow-[0_10px_15px_-3px_rgba(18,63,174,0.08)]"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{info.label}</p>
                <p className="font-display text-[22px] text-primary font-bold mt-2">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10"
            >
              <h3 className="font-display text-[28px] text-slate-900 dark:text-white mb-6">{tc("whatIsIncluded")}</h3>
              <ul className="flex flex-col gap-4">
                {tour.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    {item.replace(/^[✓✔☑✕×✖•\-\*\s]+/, "")}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10"
            >
              <h3 className="font-display text-[28px] text-slate-900 dark:text-white mb-6">{tc("notIncluded")}</h3>
              <ul className="flex flex-col gap-4">
                {tour.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                    <span className="text-red-500 font-bold mt-0.5">×</span>
                    {item.replace(/^[✓✔☑✕×✖•\-\*\s]+/, "")}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[900px] px-6 lg:px-0">
          <div className="text-center mb-12">
            <span className="section-label">{tc("itinerary")}</span>
            <span className="gold-line mx-auto mt-3" />
          </div>

          <div className="flex flex-col gap-4">
            {tour.itinerary.map((day, index) => (
              <motion.div
                key={`${day.day}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row gap-6"
              >
                <span className="font-display text-2xl text-gold font-bold shrink-0">{day.day}</span>
                <div>
                  <h3 className="font-display text-xl text-slate-900 dark:text-white">{day.title}</h3>
                  {day.desc && <p className="text-[15px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{day.desc}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-12 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-[700px] text-center md:text-left">
              <h2 className="font-display text-[28px] text-white">{tc("readyToBook")}</h2>
              <p className="text-white/80 mt-2">{tc("reserveSpot")}</p>
            </div>
            <Button href={`/${locale}/book-online`} variant="gold">
              {t("bookThisTour")}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="text-center mb-12">
            <span className="section-label">{tc("gallery")}</span>
            <span className="gold-line mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.slice(0, 3).map((src, i) => (
              <RevealGalleryImage key={`gal1-${i}`} src={src} delay={i * 0.15} className="aspect-[3/2]" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {galleryImages.slice(3).map((src, i) => (
              <RevealGalleryImage key={`gal2-${i}`} src={src} delay={0.45 + i * 0.15} className="aspect-[16/9]" />
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
