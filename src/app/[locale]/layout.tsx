import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ApolloClientProvider from "@/lib/apollo/provider";
import ThemeProvider from "@/components/common/ThemeProvider";
import SmoothScroll from "@/components/common/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCmsMenus } from "@/lib/cms/menus";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mongolian Secret History Restaurant | Authentic Mongolian Cuisine",
  description:
    "Experience authentic Mongolian cuisine in an elegant setting. Premium dining inspired by centuries of heritage, tradition, and the timeless flavors of the steppe.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "mn" }];
}

async function getMenuItems(kind: "header" | "footer", locale: string) {
  try {
    const menus = await getCmsMenus(locale);
    const items = menus[kind]
      .filter((m) => m.label && m.url)
      .map((m) => ({ label: m.label as string, url: m.url as string }));
    return items.length ? items : undefined;
  } catch {
    return undefined;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const messages = await getMessages();
  const [headerMenu, footerMenu] = await Promise.all([
    getMenuItems("header", locale),
    getMenuItems("footer", locale),
  ]);

  return (
    <div lang={locale} className="min-h-full flex flex-col">
      <NextIntlClientProvider messages={messages}>
        <ApolloClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <SmoothScroll />
            <Header menuItems={headerMenu} />
            <main className="flex-1">{children}</main>
            <Footer menuItems={footerMenu} />
          </ThemeProvider>
        </ApolloClientProvider>
      </NextIntlClientProvider>
    </div>
  );
}
