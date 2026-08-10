"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  className = "",
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center gap-4 text-center ${className}`}
    >
      <span
        className={`text-sm font-medium tracking-[0.2em] uppercase ${
          light ? "text-gold" : "text-gold"
        }`}
      >
        {label}
      </span>
      <span className="gold-line" />
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-[44px] leading-tight ${
          light ? "text-white" : "text-slate-900 dark:text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-[640px] text-lg leading-relaxed ${light ? "text-white/85" : "text-slate-600 dark:text-slate-300"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
