"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "@/components/common/Image";
import Link from "next/link";

export interface AccommodationItem {
  index: string;
  province: string;
  name: string;
  slug?: string;
  description: string;
  price: string;
  unit: string;
  image: string;
}

interface Props {
  items: AccommodationItem[];
  locale: string;
}

function Slide({
  image,
  progress,
  i,
  total,
}: {
  image: string;
  progress: MotionValue<number>;
  i: number;
  total: number;
}) {
  const step = 1 / total;
  const start = i * step;
  const end = start + step;

  // Each image wipes up over the one before it and stays fully opaque
  // throughout. Cross-fading them looked like a double exposure: the outgoing
  // image never faded out, so both were visible for the whole transition — and
  // stopping mid-scroll froze the blend.
  const settled = Math.min(start + step * 0.5, end);
  const y = useTransform(progress, [start, settled], ["100%", "0%"]);

  return (
    <motion.div
      // The first image is the backdrop the rest slide over.
      style={i === 0 ? undefined : { y }}
      className="absolute inset-0 overflow-hidden rounded-2xl"
    >
      <Image src={image} alt="" fill className="object-cover" />
    </motion.div>
  );
}

function TextBlock({
  item,
  locale,
}: {
  item: AccommodationItem;
  locale: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen flex-col justify-center gap-4"
    >
      <span className="text-sm tracking-[2px] text-muted-foreground uppercase">
        {item.index} · {item.province}
      </span>
      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground">
        {item.name}
      </h3>
      <p className="text-[15px] md:text-[17px] text-muted-foreground leading-[1.7]">
        {item.description}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
        <div className="text-foreground">
          <span className="font-display text-2xl md:text-3xl">{item.price}</span>
          {item.unit && (
            <span className="text-muted-foreground text-base ml-1">/ {item.unit}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/book-online`}
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark"
          >
            Book Now
          </Link>
          <Link
            href={
              item.slug
                ? `/${locale}/accommodation/${item.slug}`
                : `/${locale}/book-online`
            }
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-colors border border-primary text-primary hover:bg-primary-light"
          >
            More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function AccommodationSticky({ items, locale }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Desktop: pinned left column, scrolling right text */}
      <section ref={sectionRef} className="relative hidden lg:block bg-background">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0 grid grid-cols-2 gap-16">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-[4/3] w-full bg-muted border border-border shadow-lg rounded-2xl overflow-hidden">
              {items.map((item, i) => (
                <Slide
                  key={item.name}
                  image={item.image}
                  progress={scrollYProgress}
                  i={i}
                  total={items.length}
                />
              ))}
            </div>
          </div>

          <div>
            {items.map((item) => (
              <TextBlock key={item.name} item={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: simple stacked layout */}
      <section className="lg:hidden bg-background py-20">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col gap-16">
          {items.map((item) => (
            <div key={item.name} className="flex flex-col gap-8 pb-16 border-b border-border last:border-b-0 last:pb-0">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-muted border border-border shadow-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <TextBlockMobile item={item} locale={locale} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function TextBlockMobile({
  item,
  locale,
}: {
  item: AccommodationItem;
  locale: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm tracking-[2px] text-muted-foreground uppercase">
        {item.index} · {item.province}
      </span>
      <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
      <p className="text-[15px] text-muted-foreground leading-[1.7]">
        {item.description}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
        <div className="text-foreground">
          <span className="font-display text-2xl">{item.price}</span>
          {item.unit && (
            <span className="text-muted-foreground text-base ml-1">/ {item.unit}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/book-online`}
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark"
          >
            Book Now
          </Link>
          <Link
            href={
              item.slug
                ? `/${locale}/accommodation/${item.slug}`
                : `/${locale}/book-online`
            }
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-colors border border-primary text-primary hover:bg-primary-light"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
}
