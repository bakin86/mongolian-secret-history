"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "@/components/common/Image";

interface TextContent {
  label: string;
  title: string;
  desc1: string;
  desc2: string;
  image?: string;
}

interface AboutSectionsProps {
  country: TextContent;
  culture: TextContent;
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.1, 1]);

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative aspect-square rounded-3xl overflow-hidden bg-muted border border-border shadow-lg"
    >
      <motion.div ref={ref} style={{ y, scale }} className="absolute inset-[-20%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

function TextColumn({ content, order }: { content: TextContent; order?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col gap-5 ${order ?? ""}`}
    >
      <span className="section-label text-gold">{content.label}</span>
      <span className="gold-line" />
      <h2 className="font-display text-3xl md:text-[44px] leading-[1.15]">{content.title}</h2>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-[17px] leading-[1.7] text-muted-foreground"
      >
        {content.desc1}
      </motion.p>
      {content.desc2 ? (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[17px] leading-[1.7] text-muted-foreground"
        >
          {content.desc2}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export default function AboutSections({ country, culture }: AboutSectionsProps) {
  return (
    <>
      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ParallaxImage src={country.image || "/images/hero-steppe.jpg"} alt={country.title} />
            <TextColumn content={country} />
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <TextColumn content={culture} order="order-2 lg:order-1" />
            <div className="order-1 lg:order-2">
              <ParallaxImage src={culture.image || "/images/culture-naadam.jpg"} alt={culture.title} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
