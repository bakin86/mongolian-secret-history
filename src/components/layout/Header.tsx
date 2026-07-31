"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";

const languages = [
  { code: "en", label: "EN" },
  { code: "mn", label: "MN" },
];

const navLinks = [
  { label: "Tours", url: "/portfolio" },
  { label: "About Mongolia", url: "/about" },
  { label: "Accommodation", url: "/accommodation" },
  { label: "Plan your trip", url: "/plan-your-trip" },
  { label: "Blog & News", url: "/blog" },
];

export interface NavItem {
  label: string;
  url: string;
}

export default function Header({ menuItems }: { menuItems?: NavItem[] }) {
  const links = menuItems?.length ? menuItems : navLinks;
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-4 lg:px-6">
        <Link href={`/${locale}`} className="flex items-center">
          <Logo className="h-[56px] w-[56px]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((item) => {
            const itemHref = `/${locale}${item.url}`;
            const isActive = pathWithoutLocale === item.url;
            return (
              <Link
                key={item.url}
                href={itemHref}
                className={cn(
                  "relative text-[14px] font-medium transition-colors duration-200 py-1 group whitespace-nowrap",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute left-0 -bottom-1 h-[2px] bg-gold rounded-full transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <Link
            href={`/${locale}/search`}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={t("search")}
          >
            <Search size={20} />
          </Link>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              aria-label={th("language")}
            >
              <Globe size={16} />
              {currentLang.label} ▾
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-28 rounded-xl bg-white border border-border shadow-lg py-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}${pathWithoutLocale}`}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-muted transition-colors",
                      locale === lang.code ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                    onClick={() => setLangOpen(false)}
                  >
                    {lang.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />
          <Button href={`/${locale}/login`} variant="primary">
            {th("login")}
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {links.map((item) => {
                const itemHref = `/${locale}${item.url}`;
                const isActive = pathWithoutLocale === item.url;
                return (
                  <Link
                    key={item.url}
                    href={itemHref}
                    className={cn(
                      "relative text-lg font-medium py-1 group",
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-gold rounded-full transition-all duration-300",
                        isActive ? "w-8" : "w-0 group-hover:w-8"
                      )}
                    />
                  </Link>
                );
              })}

              <div className="flex items-center gap-4">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}${pathWithoutLocale}`}
                    className={cn(
                      "text-sm px-3 py-1 rounded-full border",
                      locale === lang.code
                        ? "bg-primary text-white border-primary"
                        : "text-muted-foreground border-border hover:border-primary"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {lang.label}
                  </Link>
                ))}
              </div>

              <ThemeToggle />
              <Button href={`/${locale}/login`} variant="primary">
                {th("login")}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
