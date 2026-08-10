import HeroHome from "@/components/sections/HeroHome";
import WelcomeIntro from "@/components/sections/WelcomeIntro";
import SplitCardSection from "@/components/sections/SplitCardSection";
import DoubleImageSection from "@/components/sections/DoubleImageSection";
import SpaSection from "@/components/sections/SpaSection";
import HomeBlocks from "@/components/sections/HomeBlocks";
import { getHomeBlocks } from "@/lib/cms/homeBlocks";
import { getServerApolloClient } from "@/lib/apollo/server-client";
import {
  CP_PAGE,
  type CpPageData,
  type CpPageVariables,
} from "@/graphql/cms/queries/page";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface HomeSectionImage {
  src: string;
  alt: string;
}

interface HomeSectionContent {
  title: string;
  description: string;
  cta: string;
  href: string;
}

interface HomeContent {
  heroKicker: string;
  heroHeading: string;
  heroSubtitle: string;
  heroPrimaryLabel: string;
  heroPrimaryUrl: string;
  heroSecondaryLabel: string;
  heroSecondaryUrl: string;
  heroBackgroundImage: string;
  heroImage: string;
  intro: string;
  discover: HomeSectionContent & { image: string };
  recreation: HomeSectionContent & { images: HomeSectionImage[] };
  wellness: HomeSectionContent & { images: HomeSectionImage[] };
  tours: HomeSectionContent & { image: string };
}

const defaultHomeContent: HomeContent = {
  heroKicker: "Discover Mongolia",
  heroHeading: "Journey Through Mongolia's Secret History",
  heroSubtitle:
    "Group tours, private adventures, and tailor-made itineraries across the steppe, desert, and nomadic heartland.",
  heroPrimaryLabel: "Explore Tours",
  heroPrimaryUrl: "/portfolio",
  heroSecondaryLabel: "Request Custom Trip",
  heroSecondaryUrl: "/plan-your-trip",
  heroBackgroundImage: "/images/mongolia-destinations-bg.jpg",
  heroImage: "/images/hero-steppe.jpg",
  intro:
    "Immerse yourself in the captivating beauty of Mongolia at Mongolian Secret History. A unique retreat set within the vast steppe, offering authentic ger accommodation, refined Mongolian cuisine, and curated cultural journeys.",
  discover: {
    title: "Discover Mongolia",
    description:
      "Mongolia is a country of dramatic contrasts — vast deserts, rolling grasslands, pristine lakes, and ancient forests. Discover the rich tapestry of nomadic culture, UNESCO-listed sites, and untouched wilderness that has captivated travelers for centuries.",
    cta: "About Mongolia",
    href: "/about",
    image: "/images/about-nomads.jpg",
  },
  recreation: {
    title: "Recreation & Activities",
    description:
      "Enjoy a refined stay with access to exceptional indoor and outdoor experiences. Horseback riding across the open plains, archery, traditional crafts, and evenings of folk music — there is something unforgettable for every traveler.",
    cta: "Recreation & Activities",
    href: "/portfolio",
    images: [
      { src: "/images/mongolia-destinations-bg.jpg", alt: "Horseback riding" },
      { src: "/images/hero-steppe.jpg", alt: "Steppe activity" },
      { src: "/images/about-nomads.jpg", alt: "Cultural experience" },
    ],
  },
  wellness: {
    title: "Wellness & Relaxation",
    description:
      "Our wellness spaces exist to restore balance — not through indulgence, but through quiet care. Unwind in a serene setting, reconnect with nature, and enjoy treatments inspired by Mongolian traditions and the healing power of the landscape.",
    cta: "View Wellness",
    href: "/services",
    images: [
      { src: "/images/culture-nomads.jpg", alt: "Wellness space" },
      { src: "/images/hero-steppe.jpg", alt: "Relaxation area" },
    ],
  },
  tours: {
    title: "Tours & Experiences",
    description:
      "From horseback riding across the open plains to visiting ancient monasteries and meeting local nomadic families, our tours are designed to connect you with the soul of Mongolia. Choose from ready-made itineraries or let us craft a custom adventure.",
    cta: "Explore Tours",
    href: "/portfolio",
    image: "/images/mongolia-destinations-bg.jpg",
  },
};

function mergeHomeContent(raw?: string | null): HomeContent | null {
  const content = raw?.trim();
  if (!content || !content.startsWith("{")) return null;
  try {
    const parsed = JSON.parse(content) as Partial<HomeContent>;
    if (!parsed || typeof parsed !== "object" || !parsed.heroHeading) return null;
    return {
      ...defaultHomeContent,
      ...parsed,
      discover: { ...defaultHomeContent.discover, ...parsed.discover },
      recreation: { ...defaultHomeContent.recreation, ...parsed.recreation },
      wellness: { ...defaultHomeContent.wellness, ...parsed.wellness },
      tours: { ...defaultHomeContent.tours, ...parsed.tours },
    };
  } catch {
    return null;
  }
}

const HOME_SLUGS = ["home", "home_4"];

async function getHomeContent(locale: string): Promise<HomeContent> {
  try {
    const client = await getServerApolloClient();
    for (const slug of HOME_SLUGS) {
      const { data } = await client.query<CpPageData, CpPageVariables>({
        query: CP_PAGE,
        variables: { slug, language: locale },
      });
      const merged = mergeHomeContent(data?.cpCmsPageDetail?.content);
      if (merged) return merged;
    }
    return defaultHomeContent;
  } catch {
    return defaultHomeContent;
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const [cms, blocks] = await Promise.all([
    getHomeContent(locale),
    getHomeBlocks(locale),
  ]);

  return (
    <>
      <HeroHome
        kicker={cms.heroKicker}
        heading={cms.heroHeading}
        subtitle={cms.heroSubtitle}
        primaryLabel={cms.heroPrimaryLabel}
        primaryUrl={cms.heroPrimaryUrl}
        secondaryLabel={cms.heroSecondaryLabel}
        secondaryUrl={cms.heroSecondaryUrl}
        backgroundImage={cms.heroBackgroundImage}
        heroImage={cms.heroImage}
      />

      <WelcomeIntro text={cms.intro} />

      {/* Sections come from the CMS once they are authored; the hardcoded set
          below is the fallback for an empty or unreachable CMS. */}
      {blocks.length > 0 ? (
        <HomeBlocks blocks={blocks} locale={locale} />
      ) : (
        <>
          <SplitCardSection
            title={cms.discover.title}
            description={cms.discover.description}
            image={cms.discover.image}
            imageAlt="Mongolian landscape"
            href={cms.discover.href}
            cta={cms.discover.cta}
          />

          <DoubleImageSection
            title={cms.recreation.title}
            description={cms.recreation.description}
            images={cms.recreation.images}
            href={cms.recreation.href}
            cta={cms.recreation.cta}
          />

          <SpaSection
            title={cms.wellness.title}
            description={cms.wellness.description}
            images={cms.wellness.images}
            href={cms.wellness.href}
            cta={cms.wellness.cta}
          />

          <SplitCardSection
            title={cms.tours.title}
            description={cms.tours.description}
            image={cms.tours.image}
            imageAlt="Mongolian tour experience"
            href={cms.tours.href}
            cta={cms.tours.cta}
            reversed
          />
        </>
      )}
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "home",
    locale,
    fallbackTitle: "Journey Through Mongolia's Secret History",
    fallbackDescription: "Group tours, private adventures, and tailor-made itineraries across the steppe, desert, and nomadic heartland.",
  });
}
