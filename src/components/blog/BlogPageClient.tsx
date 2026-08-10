"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Image from "@/components/common/Image";
import { useTranslations, useLocale } from "next-intl";
import type { Post } from "@/graphql/cms/queries/post";

interface BlogPageProps {
  posts: Post[];
}

function formatDate(dateString?: string, locale = "en") {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryMap: Record<string, string[]> = {
  All: [],
  Бүгд: [],
  "Info & Tips": ["info", "мэдээлэл", "зөвлөгөө", "ayallyn-medeelel"],
  "Аяллын мэдээлэл ба Зөвлөгөө": ["info", "мэдээлэл", "зөвлөгөө", "ayallyn-medeelel"],
  "Price & Rates": ["price", "үнэ", "төсөв", "une-ba-tusviin"],
  "Үнэ ба Төсвийн зөвлөмж": ["price", "үнэ", "төсөв", "une-ba-tusviin"],
  "Travel Stories": ["story", "stories", "түүх", "түүхүүд", "ayallyn-tuukhuud"],
  "Аяллын түүхүүд": ["story", "stories", "түүх", "түүхүүд", "ayallyn-tuukhuud"],
};

function formatCategoryName(name?: string, locale = "en"): string {
  if (!name) return "";
  if (locale === "en") {
    const lower = name.toLowerCase();
    if (lower.includes("мэдээлэл") || lower.includes("зөвлөгөө") || lower.includes("info")) return "Info & Tips";
    if (lower.includes("үнэ") || lower.includes("төсөв") || lower.includes("price")) return "Price & Rates";
    if (lower.includes("түүх") || lower.includes("story") || lower.includes("stories")) return "Travel Stories";
  }
  return name;
}

function matchesCategory(post: Post, activeCategory: string): boolean {
  if (activeCategory === "All" || activeCategory === "Бүгд") return true;
  const keywords = categoryMap[activeCategory] || [activeCategory.toLowerCase()];
  const combined = [
    ...(post.categories?.map((c) => c.name || "") || []),
    ...(post.categories?.map((c) => c.slug || "") || []),
    post.title || "",
  ]
    .join(" ")
    .toLowerCase();

  return keywords.some((kw) => combined.includes(kw.toLowerCase()));
}

export default function BlogPage({ posts }: BlogPageProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const defaultCat = locale === "mn" ? "Бүгд" : "All";
  const [activeCategory, setActiveCategory] = useState(defaultCat);

  const categories = useMemo(() => {
    return locale === "mn"
      ? ["Бүгд", "Аяллын мэдээлэл ба Зөвлөгөө", "Үнэ ба Төсвийн зөвлөмж", "Аяллын түүхүүд"]
      : ["All", "Info & Tips", "Price & Rates", "Travel Stories"];
  }, [locale]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => matchesCategory(post, activeCategory));
  }, [posts, activeCategory]);

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <section className="bg-background py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
          <div className="text-center max-w-[800px] mx-auto mb-10">
            <p className="text-lg leading-[1.7] text-muted-foreground">{t("intro")}</p>
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === category
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug || post._id || `post-${idx}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(18,63,174,0.08)" }}
                className="rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
              >
                <div className="relative h-[220px] w-full overflow-hidden"
                >
                  <Image
                    src={post.thumbnail?.url || "/images/tour-2.jpg"}
                    alt={post.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(post.publishedDate, locale)}
                    </span>
                    {post.categories?.[0]?.name && (
                      <span className="text-xs text-primary font-semibold">
                        {formatCategoryName(post.categories[0].name, locale)}
                      </span>
                    )}
                  </div>
                  <Link href={`/${locale}/blog/${post.slug}`} className="group">
                    <h3 className="font-display text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
