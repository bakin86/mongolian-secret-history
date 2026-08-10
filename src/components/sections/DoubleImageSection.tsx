"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import Button from "@/components/ui/Button";

interface DoubleImageSectionProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  href: string;
  cta: string;
  reversed?: boolean;
}

function RevealImage({
  src,
  alt,
  delay = 0,
  className = "",
}: {
  src?: string;
  alt?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
}

export default function DoubleImageSection({
  title,
  description,
  images,
  href,
  cta,
  reversed = false,
}: DoubleImageSectionProps) {
  return (
    <section className="bg-[#FAFAF8] py-6 md:py-10">
      <div className="container-custom">
        <div
          className={`grid items-stretch gap-6 ${
            reversed ? "lg:grid-cols-[1fr_45%]" : "lg:grid-cols-[45%_1fr]"
          }`}
        >
          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`flex flex-col justify-center bg-white p-8 md:p-12 lg:p-16 ${
              reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <motion.h3
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-elegant text-3xl md:text-4xl font-medium text-[#0A2C7A]"
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#5A5A5A] leading-[1.8] text-sm md:text-base mt-5"
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

          {/* Images grid */}
          <div
            className={`grid grid-cols-2 gap-4 ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <RevealImage
              src={images[0]?.src}
              alt={images[0]?.alt}
              delay={0}
              className="col-span-2 aspect-[16/10]"
            />
            <RevealImage
              src={images[1]?.src}
              alt={images[1]?.alt}
              delay={0.15}
              className="aspect-[4/3]"
            />
            <RevealImage
              src={images[2]?.src}
              alt={images[2]?.alt}
              delay={0.3}
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
