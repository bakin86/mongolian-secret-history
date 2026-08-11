import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Image from "@/components/common/Image";
import Link from "next/link";

import ExpandableSection from "@/components/accommodation/ExpandableSection";
import { getAccommodation, getAccommodations } from "@/lib/cms/accommodation";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const details: Record<
  string,
  {
    title: string;
    subtitle: string;
    image: string;
    intro: string;
    sections: { title: string; content: string[]; expandable?: boolean }[];
  }
> = {
  "mongolian-secret-history-camp": {
    title: "MONGOLIAN SECRET HISTORY CAMP",
    subtitle:
      "A year-round tourist complex inspired by Mongolian heritage and tradition",
    image: "/images/tour-2.jpg",
    intro:
      "The Mongolian Secret History tourist complex has been operating since November 2005. Open year-round, the complex welcomes travelers and vacationers in a comfortable natural environment while offering high-quality and unique services inspired by Mongolian heritage and tradition.",
    sections: [
      {
        title: "Location",
        expandable: true,
        content: [
          "The complex is located in Jargalant soum, Tuv province, at longitude 106° and latitude 48°, approximately 114 km from Ulaanbaatar on the road to Darkhan.",
          "The area is known as Noyon Mountain, rising about 1500 meters above sea level. It is home to abundant wildlife including deer, elk, wild boar, lynx, corsac fox, hare, red fox, pika, polecat, wolf, marmot, and various bird species.",
          "The mountain also hosts a wide variety of wildflowers and medicinal plants such as peony, pasqueflower, edelweiss, dandelion, jammynmyadag, rosehip, sedge, cinquefoil, egushin, and wild mushrooms.",
        ],
      },
      {
        title: "Capacity",
        expandable: true,
        content: [
          "Hotel with luxury and standard rooms: 16 beds",
          "13th-century style traditional pointed-top gers: 53 beds",
          "Total capacity per session: 69 guests",
        ],
      },
      {
        title: "Restaurant",
        content: [
          "“Michid” restaurant with 60 seats",
          "Private VIP room for 12 guests",
          "Outdoor dining area available",
        ],
      },
      {
        title: "Services & Facilities",
        content: [
          "“Yellow Ger Library” – a cultural library featuring books, scriptures, and artifacts related to The Secret History of the Mongols",
          "Conference hall for 60 people with modern audio-visual equipment",
          "Horse and camel riding, visiting herder families",
          "Archery activities",
          "Winter sports – skiing, sledding",
          "Traditional costume photography",
          "20-seat karaoke bar for families, friends, and groups",
          "Snooker, billiards, table tennis, and outdoor sports & playground areas",
          "Sauna and shower facilities",
          "Laundry and ironing services",
          "Heated garage for vehicles",
        ],
      },
      {
        title: "Distinctive Features & Advantages",
        content: [
          "Promotes and showcases 12th–13th century Mongolian history, culture, and traditional script through the Yellow Ger Library",
          "Fully equipped conference hall suitable for combining work and leisure in a beautiful natural setting",
          "Conveniently located near Ulaanbaatar, Darkhan, and Erdenet",
          "Well-developed infrastructure with Unitel and Mobicom network coverage",
          "Comfortable, cozy environment for relaxation",
          "Professional and skilled staff",
          "Serves fresh organic vegetables, meat, and dairy from the complex’s own farm",
          "Clean purified water sourced from a 120-meter deep well",
          "Open all year round",
        ],
      },
    ],
  },
  "secret-of-the-silk-road": {
    title: "SECRET OF THE SILK ROAD RESORT",
    subtitle:
      "A unique resort blending nomadic culture, historical heritage, and modern comfort",
    image: "/images/tour-1.jpg",
    intro:
      "The Secret of the Silk Road resort was established in 2020 in honor of the 800th anniversary of Kharkhorin. The complex is uniquely designed based on the architectural style of Ögedei Khan’s Tumen Amgalant Palace, featuring the symbolic Silver Tree, traditionally represented with four dragon fountains and a celestial figure at the top. The camp offers visitors a blend of authentic nomadic culture, historical heritage, and modern comfort.",
    sections: [
      {
        title: "Location",
        expandable: true,
        content: [
          "The camp is located in Kharkhorin soum, Övörkhangai province, in the area known as Ongotson Ukhaa, historically used as the horse training grounds of Prince Sain Noyon Gombosüren’s royal lineage.",
          "Being close to Kharkhorin, the ancient capital of the Mongol Empire, visitors can explore surrounding historical sites, archaeological remains, museums, and scenic landscapes.",
        ],
      },
      {
        title: "Capacity",
        expandable: true,
        content: [
          "Deluxe en-suite 45 gers",
          "Standard 15 gers",
          "Deluxe hotel 10 rooms with modern amenities",
          "Total guest capacity: Up to 170 guests per session",
        ],
      },
      {
        title: "Restaurant",
        content: [
          "Main restaurant serving Mongolian and international cuisine with 200 seats",
          "Comfortable dining area with spacious seating",
          "Outdoor terrace available for meals and events",
        ],
      },
      {
        title: "Services & Facilities",
        content: [
          "Historical & cultural exhibition related to the Mongol Empire",
          "Visit to herder families to experience Mongolian customs",
          "Demonstrations of traditional dairy processing and Mongolian cuisine",
          "Folk song & dance lessons and traditional costume photography",
          "National games: archery, wrestling shows, ankle-bone shooting",
          "Gift and handicraft shop",
          "Sauna & shower services",
          "Conference space for meetings, seminars, and events",
          "Coffee shop & fast-food service for travelers",
          "Open terrace for sunbathing and relaxation",
          "Karaoke, snooker, table games",
          "Bicycle rental",
          "All mobile networks available (Unitel, Mobicom, etc.)",
          "3G/4G Internet and Wi-Fi access throughout the complex",
        ],
      },
      {
        title: "Distinctive Features & Advantages",
        content: [
          "Built entirely with historical symbolism, inspired by the XIII-century royal palace",
          "Located along a major tourist route, easily accessible for domestic and international visitors",
          "Near museums, archaeological sites, and cultural attractions of Kharkhorin",
          "Staffed by a highly skilled young professional tourism team",
          "Fresh, eco-friendly food products sourced from local suppliers",
          "A well-designed environment that blends nature, culture, and modern comfort",
          "Suitable for national festivals, corporate events, meetings, and international tours",
          "Collaboration with tourism universities—hosting student internships and training programs",
        ],
      },
    ],
  },
  "secret-of-ongi": {
    title: "SECRET OF ONGI TOURIST CAMP",
    subtitle:
      "Spiritual tranquility, natural harmony, and cultural legacy on the banks of the Ongi River",
    image: "/images/tour-3.jpg",
    intro:
      "Secret of Ongi tourist camp founded in 2008 as a restored cultural heritage site on the banks of the Ongi River and the historical Ongi Monastery, brings together spiritual tranquility, natural harmony, and cultural legacy all in one place.",
    sections: [
      {
        title: "Location",
        expandable: true,
        content: [
          "The Secret of Ongi tourist camp is located in Saikhan-Ovoo soum, Dundgovi province at N 45°19’57” / E 104°00’55”, next to the ancient ruins of Ongi Monastery, surrounded by unique natural formations.",
        ],
      },
      {
        title: "Capacity",
        expandable: true,
        content: [
          "98 beds in 13th-century style Mongolian gers",
          "MSH Restaurant with a capacity of 90 guests",
          "Comfortable VIP room for 12 guests",
          "30 shower rooms",
          "17 toilets (separate for men & women)",
          "Sauna",
          "Art shop",
          "Mobicom network coverage",
          "Connected to the central power system",
          "7-stage wastewater treatment system producing eco-friendly greywater",
        ],
      },
      {
        title: "Services & Facilities",
        content: [
          "Information Center introducing the 250-year history and culture of Ongi Monastery",
          "Conference hall for meetings and seminars",
          "Photo sessions with traditional tsam mask costumes and Mongolian national outfits",
          "Handicraft shop",
          "Mongolian traditional games",
          "Internet service",
          "Steam sauna and relaxing massage services",
        ],
      },
      {
        title: "Trips",
        content: [
          "Visit to the ruins of Ongi Monastery and explore the surrounding sacred landscape",
          "Hike to Yangiirtai Mountain, learn local legends about nature, wildlife, and plants",
          "Explore the Ongi River valley – observe Gobi landscapes and local birdlife",
          "Discover ancient rock paintings, meditation caves used by monks, and historical graves & burial mounds",
          "Experience the strong natural energy concentration believed to exist around the Ongi Monastery area",
        ],
      },
      {
        title: "Distinctive Features & Advantages",
        content: [
          "Ideal environment for relaxation, meditation, and energy rejuvenation",
          "Serves fresh organic vegetables, dairy products, and meat sourced from its own farm",
          "Clean drinking water from a 107-meter deep artesian well",
          "Skilled, polite, and professional service team",
          "Connected to the central power grid; Mobicom, G-Mobile, Skytel networks available",
          "Strategically located at the crossroads of major tourist routes connecting Övörkhangai and Ömnögovi provinces",
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  const fallbackSlugs = Object.keys(details);
  const cmsSlugs = (await getAccommodations("en")).map((entry) => entry.slug);
  const slugs = [...new Set([...fallbackSlugs, ...cmsSlugs])];

  return slugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "mn", slug },
  ]);
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // CMS wins; the hardcoded entries remain for stays not yet authored there.
  const cms = await getAccommodation(locale, slug);
  const data = cms
    ? {
        title: cms.name,
        subtitle: cms.subtitle,
        image: cms.image,
        intro: cms.intro,
        sections: cms.sections,
      }
    : details[slug];

  if (!data) return notFound();

  const t = await getTranslations("accommodation");

  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={data.title}
        subtitle={data.subtitle}
      />

      <section className="bg-white py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-0">
          <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden mb-12 border border-border shadow-lg">
            <Image src={data.image} alt={data.title} fill className="object-cover" />
          </div>

          <p className="text-[17px] md:text-[19px] leading-[1.8] text-muted-foreground">
            {data.intro}
          </p>

          <div className="mt-16 flex flex-col gap-6">
            {data.sections.map((section) => {
              const content = (
                <ul className="list-disc list-inside space-y-2 text-[15px] md:text-[17px] text-muted-foreground leading-[1.8]">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );

              if (section.expandable) {
                return (
                  <ExpandableSection key={section.title} title={section.title}>
                    {content}
                  </ExpandableSection>
                );
              }

              return (
                <div key={section.title} className="border-b border-border pb-6">
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-5">
                    {section.title}
                  </h2>
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/book-online`}
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark"
            >
              Book Now
            </Link>
            <Link
              href={`/${locale}/accommodation`}
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-sm font-medium transition-colors border border-primary text-primary hover:bg-primary-light"
            >
              Back to Stays
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
