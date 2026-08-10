"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Star, Mail, Award, Compass } from "lucide-react";

const float = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function TestimonialsSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="bg-background py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label">{t("testimonialsLabel")}</span>
          <span className="gold-line mx-auto mt-4" />
          <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl">
            {t("testimonialsTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div
              {...float}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
              className="inline-flex items-center gap-3 self-start rounded-full bg-primary-dark px-4 py-2 text-white"
            >
              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-primary-dark">
                <Star className="h-3 w-3 fill-primary-dark" />
                5 Stars
              </span>
              <span className="text-sm">Trusted by travelers worldwide</span>
            </motion.div>

            <motion.div
              {...float}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-[26px] bg-white dark:bg-slate-900 p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light dark:bg-slate-800">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display mt-5 text-2xl text-slate-900 dark:text-white">Authentic Journeys</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                Every trip is crafted to connect you with Mongolia’s landscapes, culture, and nomadic traditions.
              </p>
            </motion.div>

            <motion.div
              {...float}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="rounded-[26px] bg-white dark:bg-slate-900 p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light dark:bg-slate-800">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <blockquote className="font-display mt-5 text-xl leading-relaxed text-slate-900 dark:text-white">
                &ldquo;Of all the awesome new friends we made, the guides were the best. We plan to return and head East.&rdquo;
              </blockquote>
              <span className="mt-5 block text-sm text-slate-500 dark:text-slate-400">Sarah & Tom, USA</span>
            </motion.div>
          </div>

          {/* Center phone mockup */}
          <motion.div
            {...float}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 mx-auto flex h-[570px] w-[310px] flex-col overflow-hidden rounded-[44px] border-[8px] border-slate-900 dark:border-slate-800 bg-slate-900 shadow-2xl"
          >
            <div className="relative flex h-11 items-center justify-between bg-slate-900 px-5 text-white">
              <span className="text-sm font-medium">9:41</span>
              <div className="absolute left-1/2 top-1/2 h-5 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3z" />
                </svg>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.95 7.08 2.95 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                </svg>
                <svg className="h-4 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="6" width="18" height="12" rx="2" ry="2" />
                  <rect x="4" y="8" width="14" height="8" fill="foreground" />
                </svg>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5">
              <div className="rounded-[24px] bg-primary-dark p-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px]">
                  <Image src="/images/tour-6.jpg" alt="Featured guide" fill className="object-cover" />
                </div>
                <div className="mt-4 text-white">
                  <h3 className="font-display text-lg text-white">Boldbaatar</h3>
                  <span className="text-xs uppercase tracking-wider text-white/60">Founder & Lead Guide</span>
                </div>
              </div>

              <div className="rounded-[24px] bg-white dark:bg-slate-800 p-6">
                <h3 className="font-display text-xl text-slate-900 dark:text-white">Dr. James McKelvie</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Specialist in Advanced Mongolia Expeditions</p>
                <div className="mt-5 flex items-center gap-2">
                  <Link
                    href={`/${locale}/book-online`}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                  >
                    Book Now
                  </Link>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <motion.div
              {...float}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="rounded-[26px] bg-white dark:bg-slate-900 p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-primary-light dark:bg-slate-800">
                  <Image src="/images/tour-6.jpg" alt="Marie" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-slate-900 dark:text-white">Marie Dupont</h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Cultural Traveler, France</span>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                The high level of service that the team provided made this a happy memory to take on my next adventure.
              </p>
            </motion.div>

            <motion.div
              {...float}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="rounded-[26px] bg-white dark:bg-slate-900 p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light dark:bg-slate-800">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display mt-5 text-2xl text-slate-900 dark:text-white">Why Travelers Choose Us</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  20+ years of experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Local expert guides
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Sustainable tourism
                </li>
              </ul>
            </motion.div>

            <motion.div
              {...float}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              className="overflow-hidden rounded-[26px] bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="bg-primary-dark px-6 py-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">FREE</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Zero Cost Guarantee</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-slate-900 dark:text-white">Custom Itinerary Planning</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Get a personalized trip plan with no upfront fees. We design it around your dates and interests.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${locale}/testimonials`}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
                  >
                    View All Testimonials
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white underline underline-offset-4"
                  >
                    Start Planning
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
