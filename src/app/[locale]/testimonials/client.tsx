"use client";

import { motion } from "framer-motion";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import { useTranslations } from "next-intl";
import { useCmsPage } from "@/lib/hooks/useCmsPage";
import { stripHtml } from "@/lib/cms/html";
import { type TestimonialItem } from "@/lib/cms/testimonials";

const fallbackTestimonials: TestimonialItem[] = [
  {
    quote: "Of all the awesome new friends we made on our trip, the guides were the best. We plan to return in a few years and head East.",
    author: "Sarah & Tom, USA",
    tour: "10-Day Highlights of Mongolia",
  },
  {
    quote: "The high level of service that the team at Mongolian Secret History provided made this a happy memory to take on my next adventure.",
    author: "Marie, France",
    tour: "Gobi Desert Adventure",
  },
  {
    quote: "An unforgettable journey through the Gobi. Every day brought something new and authentic.",
    author: "David, UK",
    tour: "Gobi Desert Adventure",
  },
  {
    quote: "The nomadic homestay was the highlight of our trip. We felt truly welcomed by the herder family.",
    author: "Elena, Germany",
    tour: "Nomadic Lifestyle Experience",
  },
  {
    quote: "Horse trekking in the Altai was the adventure of a lifetime. The landscapes are beyond words.",
    author: "James & Laura, Australia",
    tour: "Horse Trekking in the Altai",
  },
  {
    quote: "Naadam festival tour exceeded all expectations. The energy, colors, and traditions were mesmerizing.",
    author: "Yuki, Japan",
    tour: "Naadam Festival Tour",
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

interface TestimonialsClientProps {
  /** Banner image resolved on the server so it does not swap in after hydration. */
  heroImage?: string | null;
  cmsTestimonials?: TestimonialItem[];
}

export default function TestimonialsClient({
  heroImage,
  cmsTestimonials,
}: TestimonialsClientProps) {
  const t = useTranslations("testimonials");
  const cms = useCmsPage("testimonials");
  const items = cmsTestimonials?.length ? cmsTestimonials : fallbackTestimonials;

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
              We are proud to have shared Mongolia with travelers from around the world. Here&apos;s what some of them had to say about their journey with us.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            {items.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={item}
                className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-4 transition-all hover:shadow-[0_10px_15px_-3px_rgba(18,63,174,0.08)]"
              >
                <blockquote className="font-display text-lg lg:text-xl leading-relaxed text-slate-900 dark:text-white">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.author}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{testimonial.tour}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
