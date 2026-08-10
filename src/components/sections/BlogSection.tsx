"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Image from "@/components/common/Image";
import { useLocale, useTranslations } from "next-intl";

export interface BlogSectionPost {
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
}

const defaultPosts: BlogSectionPost[] = [
  { title: "10 Reasons to Visit Mongolia This Summer", date: "June 15, 2026", excerpt: "Discover why summer is the perfect season to explore Mongolia." },
  { title: "A Guide to Mongolian Nomadic Culture", date: "May 28, 2026", excerpt: "Learn about ger life, hospitality, and timeless traditions." },
  { title: "What to Pack for a Mongolia Tour", date: "May 10, 2026", excerpt: "Essential items for a comfortable journey across the steppe." },
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

export default function BlogSection({ posts = defaultPosts }: { posts?: BlogSectionPost[] }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const withLocale = (path: string) => {
    if (!path.startsWith("/")) return path;
    if (path === "/") return `/${locale}`;
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) return path;
    return `/${locale}${path}`;
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <SectionHeader
          label={t("blogLabel")}
          title={t("blogTitle")}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(18,63,174,0.08)" }}
              className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
            >
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src="/images/tour-2.jpg"
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">{post.date}</span>
                <Link href={post.slug ? withLocale(`/blog/${post.slug}`) : withLocale("/blog")} className="group">
                  <h3 className="font-display text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{post.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button href="/blog" variant="dark">
            {t("blogButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
