"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Check } from "lucide-react";

const features = [
  "Authentic Nomadic Experience",
  "Private Traditional Ger",
  "Panoramic Steppe Views",
  "Modern Comfort",
  "Local Cuisine",
];

export default function GerCampFeature() {
  const locale = useLocale();
  const withLocale = (path: string) => {
    if (!path.startsWith("/")) return path;
    if (path === "/") return `/${locale}`;
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) return path;
    return `/${locale}${path}`;
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF]">
      <div className="mx-auto max-w-[1280px] px-6 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[55%_1fr] lg:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative min-h-[380px] overflow-hidden rounded-[20px] lg:min-h-[520px]"
          >
            <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
              <Image
                src="/images/hero-steppe.jpg"
                alt="Ger camp on the Mongolian steppe"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2117]/60 via-transparent to-transparent" />
          </motion.div>

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col justify-center rounded-[20px] bg-white/80 p-8 backdrop-blur-sm md:p-10 lg:p-12"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9B6A2F]">
              Stay with us
            </span>
            <h2 className="font-elegant mt-4 text-3xl text-[#2C2117] md:text-4xl">
              Ger Camp Accommodation
            </h2>
            <span className="mt-5 block h-px w-14 bg-[#D4B27A]" />
            <p className="mt-6 text-[15px] leading-[1.9] text-[#2C2117]/75">
              Experience traditional Mongolian living in beautifully crafted
              gers, where authentic heritage meets modern comfort. Wake to
              endless steppe views, peaceful landscapes, and genuine nomadic
              hospitality.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#9B6A2F]/10">
                    <Check size={13} className="text-[#9B6A2F]" />
                  </span>
                  <span className="text-sm text-[#2C2117]/85">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href={withLocale("/book-online")}
                className="inline-flex items-center justify-center rounded-full bg-[#2C2117] px-8 py-3.5 text-sm font-medium text-[#F8F5EF] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9B6A2F] hover:shadow-lg"
              >
                Book Your Journey
              </Link>
              <Link
                href={withLocale("/accommodation")}
                className="inline-flex items-center justify-center rounded-full border border-[#9B6A2F] px-8 py-3.5 text-sm font-medium text-[#9B6A2F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9B6A2F] hover:text-white hover:shadow-lg"
              >
                Explore Camps
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
