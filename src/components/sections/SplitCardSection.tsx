"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import Button from "@/components/ui/Button";

interface SplitCardSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
  reversed?: boolean;
}

export default function SplitCardSection({
  title,
  description,
  image,
  imageAlt,
  href,
  cta,
  reversed = false,
}: SplitCardSectionProps) {
  return (
    <section className="bg-[#FAFAF8] py-6 md:py-10">
      <div className="container-custom">
        <div
          className={`grid items-stretch gap-6 ${
            reversed ? "lg:grid-cols-[45%_1fr]" : "lg:grid-cols-[1fr_45%]"
          }`}
        >
          {/* Image with clip reveal */}
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative min-h-[320px] md:min-h-[420px] overflow-hidden ${
              reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`flex flex-col justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 lg:p-16 ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.h3
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-elegant text-3xl md:text-4xl font-medium text-[#0A2C7A] dark:text-white"
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#5A5A5A] dark:text-slate-300 leading-[1.8] text-sm md:text-base mt-5"
            >
              {description}
            </motion.p>
            {cta ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-8"
              >
                <Button href={href} variant="outline" className="uppercase text-[11px] tracking-[0.15em] px-6 py-3">
                  {cta}
                </Button>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
