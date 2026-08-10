import { notFound } from "next/navigation";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import Image from "@/components/common/Image";
import Link from "next/link";
import FoodMenu from "@/components/blog/FoodMenu";
import CampInfo from "@/components/blog/CampInfo";
import CampPrice from "@/components/blog/CampPrice";
import ResortPrice from "@/components/blog/ResortPrice";
import OngiPrice from "@/components/blog/OngiPrice";
import WinterWeatherGuide from "@/components/blog/WinterWeatherGuide";
import TrainTimetable from "@/components/blog/TrainTimetable";
import WinterInformation from "@/components/blog/WinterInformation";
import OngiInfo from "@/components/blog/OngiInfo";
import EthnicGroups from "@/components/blog/EthnicGroups";
import WinterFestivals from "@/components/blog/WinterFestivals";
import DeerStone from "@/components/blog/DeerStone";
import GerGuide from "@/components/blog/GerGuide";
import WrestlingGuide from "@/components/blog/WrestlingGuide";
import WinterTop10 from "@/components/blog/WinterTop10";
import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST, type CpPostData, type CpPostVariables, type Post } from "@/graphql/cms/queries/post";
import { getCmsPosts } from "@/lib/cms/posts";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

type Block = { type: "p" | "h3"; text: string };

const posts: { slug: string; title: string; date: string; image: string; content: Block[] }[] = [
  {
    slug: "msh-camp-food-menu",
    title: "\"Mongolian Secret History\" camp Food menu",
    date: "September 15, 2024",
    image: "/images/culture-nomads.jpg",
    content: [
      { type: "p", text: "At the Mongolian Secret History camp, every meal is a celebration of nomadic cuisine. Our chefs prepare traditional dishes using fresh local ingredients, cooked in the time-honored way over an open fire." },
      { type: "h3", text: "Breakfast" },
      { type: "p", text: "Start your day with fresh-baked boortsog, homemade jam, clotted cream, eggs, and a bowl of hot suutei tsai — the traditional Mongolian milk tea." },
      { type: "h3", text: "Lunch" },
      { type: "p", text: "Enjoy buuz (steamed dumplings filled with mutton), khuushuur (fried meat pastries), or a hearty noodle soup with pasture-raised beef, served with seasonal salads." },
      { type: "h3", text: "Dinner" },
      { type: "p", text: "Dinner is the highlight of the day. Our signature khorkhog — meat slow-cooked with hot stones inside a sealed container — is prepared for groups, alongside tsuivan (stir-fried noodles) and roasted vegetables." },
      { type: "h3", text: "Traditional drinks" },
      { type: "p", text: "Guests can taste airag (fermented mare's milk) in summer, homemade yogurt, and a selection of teas, coffee, and soft drinks throughout the day." },
      { type: "h3", text: "Dietary requests" },
      { type: "p", text: "Vegetarian, vegan, and gluten-free menus are available on request. Please let our team know your preferences when booking." },
    ],
  },
  {
    slug: "msh-camp-information",
    title: "\"MONGOLIAN SECRET HISTORY\" CAMP INFORMATION",
    date: "August 22, 2024",
    image: "/images/hero-steppe.jpg",
    content: [
      { type: "p", text: "The Mongolian Secret History camp is located in Khentii Province, the homeland of Chinggis Khaan, surrounded by golden forests and open steppe rich with history." },
      { type: "h3", text: "Accommodation" },
      { type: "p", text: "The camp offers comfortable traditional gers with wooden floors, proper beds, warm blankets, and a central stove. Both standard and deluxe gers are available for couples, families, and groups." },
      { type: "h3", text: "Facilities" },
      { type: "p", text: "Guests enjoy a large restaurant ger, clean shower and toilet blocks, electricity in the evenings, and a cozy common area with books and games." },
      { type: "h3", text: "Activities" },
      { type: "p", text: "Horseback riding, hiking to historic sites, archery, traditional games, and evening folk music performances can all be arranged at the camp." },
      { type: "h3", text: "Getting there" },
      { type: "p", text: "The camp is approximately a 3-hour drive from Ulaanbaatar. Transfers can be arranged with our team when you book." },
    ],
  },
  {
    slug: "msh-camp-price",
    title: "MONGOLIAN SECRET HISTORY CAMP PRICE",
    date: "July 10, 2024",
    image: "/images/tour-1.jpg",
    content: [
      { type: "p", text: "Below are the current rates for staying at the Mongolian Secret History camp. Prices are per person per night and include breakfast." },
      { type: "h3", text: "Standard ger" },
      { type: "p", text: "₮180,000 per person per night — shared ger (2–4 guests), breakfast included." },
      { type: "h3", text: "Deluxe ger" },
      { type: "p", text: "₮250,000 per person per night — private ger with upgraded bedding and seating area, breakfast included." },
      { type: "h3", text: "Meals" },
      { type: "p", text: "Lunch ₮25,000 · Dinner ₮35,000 per person. Full-board packages are available at a discounted rate." },
      { type: "h3", text: "Activities" },
      { type: "p", text: "Horseback riding ₮30,000 per hour · Guided historic site tour ₮50,000 per group · Folk music evening free for full-board guests." },
      { type: "h3", text: "Transfers" },
      { type: "p", text: "Round-trip transfer from Ulaanbaatar from ₮250,000 per vehicle (up to 4 passengers)." },
    ],
  },
  {
    slug: "silk-road-resort-price",
    title: "\"SECRET OF THE SILK ROAD\" RESORT PRICE",
    date: "June 5, 2024",
    image: "/images/tour-2.jpg",
    content: [
      { type: "p", text: "The Secret of the Silk Road resort offers 45 luxury gers in Tuv Province, combining Silk Road heritage with modern comfort." },
      { type: "h3", text: "Ger rooms" },
      { type: "p", text: "₮250,000 per person per night including breakfast — king or twin beds, private facilities, and heating." },
      { type: "h3", text: "Family gers" },
      { type: "p", text: "₮400,000 per night for up to 4 guests — ideal for families traveling together." },
      { type: "h3", text: "Dining" },
      { type: "p", text: "Half board (breakfast + dinner) adds ₮45,000 per person per day. Full board adds ₮70,000." },
      { type: "h3", text: "Experiences" },
      { type: "p", text: "Silk Road heritage tour, horseback riding, and spa treatments can be booked at reception. Package rates available for stays of 3 nights or more." },
    ],
  },
  {
    slug: "mongolian-ethnic-groups-costumes",
    title: "Mongolian ethnic groups & costumes",
    date: "May 18, 2024",
    image: "/images/about-nomads.jpg",
    content: [
      { type: "p", text: "Mongolia is home to more than 20 ethnic groups, each with its own dialect, customs, and distinctive traditional clothing." },
      { type: "h3", text: "Khalkh Mongols" },
      { type: "p", text: "The largest group, making up around 86% of the population. The classic deel — a long robe with a high collar and wide sash — is the foundation of Mongolian dress." },
      { type: "h3", text: "Kazakhs" },
      { type: "p", text: "In the western Bayan-Ulgii province, Kazakh communities wear richly embroidered coats and fox-fur hats, and are famous for their golden eagle hunting tradition." },
      { type: "h3", text: "Buryats and Tsaatan" },
      { type: "p", text: "Buryat clothing features bright silk trims and distinctive hats, while the Tsaatan reindeer herders of the northern taiga wear durable hides suited to forest life." },
      { type: "h3", text: "Festival costumes" },
      { type: "p", text: "During Naadam and Tsagaan Sar, families wear their finest deels decorated with silver jewelry, coral, and intricate embroidery passed down through generations." },
    ],
  },
  {
    slug: "winter-festivals",
    title: "Winter Festivals",
    date: "April 30, 2024",
    image: "/images/season-winter.jpg",
    content: [
      { type: "p", text: "Mongolian winter is harsh, but it is also a season of extraordinary festivals that bring color and warmth to the frozen steppe." },
      { type: "h3", text: "Tsagaan Sar (Lunar New Year)" },
      { type: "p", text: "The most important holiday of the year. Families gather for days of feasting, gift-giving, and the traditional zolgokh greeting ceremony." },
      { type: "h3", text: "Ice Festival at Khuvsgul" },
      { type: "p", text: "Held on the frozen surface of Khuvsgul Lake, featuring ice sculptures, horse-drawn sleigh races, skating, and traditional games on ice." },
      { type: "h3", text: "Thousand Camel Festival" },
      { type: "p", text: "In the Gobi, herders celebrate the Bactrian camel with races, camel polo, and beauty contests for the finest animals." },
      { type: "h3", text: "Spring Eagle Festival" },
      { type: "p", text: "Kazakh eagle hunters gather near Ulgii to compete with their golden eagles — a breathtaking display of an ancient partnership." },
    ],
  },
  {
    slug: "winter-weather-guide",
    title: "Weather Guide (Winter)",
    date: "April 12, 2024",
    image: "/images/season-winter.jpg",
    content: [
      { type: "p", text: "Mongolian winter runs from November to March and is among the coldest in the world. Understanding the conditions helps you prepare properly." },
      { type: "h3", text: "Temperatures" },
      { type: "p", text: "Ulaanbaatar averages -15°C to -25°C in January, with nights dropping below -35°C in the countryside. The wind chill can make it feel even colder." },
      { type: "h3", text: "Daylight" },
      { type: "p", text: "Expect around 8 hours of daylight in midwinter — plan outdoor activities for the middle of the day." },
      { type: "h3", text: "Roads and travel" },
      { type: "p", text: "Snow and ice can slow travel between provinces. Always travel with an experienced driver and a well-equipped vehicle." },
      { type: "h3", text: "What to wear" },
      { type: "p", text: "Layering is essential: thermal base layers, insulated boots, a down parka, warm gloves, and a hat that covers your ears." },
    ],
  },
  {
    slug: "top-10-winter-activities",
    title: "Top 10 things to do in Mongolia in Winter",
    date: "March 28, 2024",
    image: "/images/season-winter.jpg",
    content: [
      { type: "p", text: "Winter reveals a side of Mongolia few travelers ever see. Here are ten unforgettable experiences for the cold season." },
      { type: "h3", text: "1–3. Festivals and culture" },
      { type: "p", text: "Attend the Khuvsgul Ice Festival, celebrate Tsagaan Sar with a nomadic family, and watch eagle hunters at the Spring Eagle Festival." },
      { type: "h3", text: "4–6. Winter adventure" },
      { type: "p", text: "Go dog sledding through snowy valleys, ride a horse across the frozen steppe, and try ice fishing on Khuvsgul Lake." },
      { type: "h3", text: "7–8. Wildlife and nature" },
      { type: "p", text: "Track takhi wild horses in Khustai National Park and photograph the Gobi's snow-dusted dunes at sunrise." },
      { type: "h3", text: "9–10. Comfort" },
      { type: "p", text: "Warm up in a traditional ger with hot suutei tsai, and soak in the Tsenkher hot springs surrounded by snow." },
    ],
  },
  {
    slug: "mongolia-train-timetable",
    title: "Mongolian International Train Timetable",
    date: "March 10, 2024",
    image: "/images/tour-3.jpg",
    content: [
      { type: "p", text: "The Trans-Mongolian Railway connects Moscow and Beijing via Ulaanbaatar, offering one of the world's great train journeys." },
      { type: "h3", text: "Moscow – Ulaanbaatar" },
      { type: "p", text: "Trains depart several times per week, with a journey time of around 4 days through Siberia and the shores of Lake Baikal." },
      { type: "h3", text: "Beijing – Ulaanbaatar" },
      { type: "p", text: "Weekly services run in both directions, taking approximately 30 hours across the Gobi Desert." },
      { type: "h3", text: "Domestic routes" },
      { type: "p", text: "Daily trains connect Ulaanbaatar with Zamyn-Uud (Chinese border), Sukhbaatar (Russian border), and Erdenet." },
      { type: "h3", text: "Booking" },
      { type: "p", text: "Tickets can be purchased at Ulaanbaatar railway station or through our team. We recommend booking sleeper berths well in advance during summer." },
    ],
  },
  {
    slug: "mongolia-winter-information",
    title: "Mongolian Winter Information 2019/2020",
    date: "February 25, 2024",
    image: "/images/season-winter.jpg",
    content: [
      { type: "p", text: "Essential information for traveling in Mongolia during the winter season, based on the 2019/2020 conditions." },
      { type: "h3", text: "Season dates" },
      { type: "p", text: "Winter tourism season runs from November through March, with festival highlights in February and March." },
      { type: "h3", text: "Accommodation" },
      { type: "p", text: "Many ger camps close for winter, but heated ger camps near Ulaanbaatar, Khuvsgul, and the Gobi remain open year-round." },
      { type: "h3", text: "Transport" },
      { type: "p", text: "Domestic flights operate on reduced schedules. Overland travel requires 4WD vehicles with winter equipment." },
      { type: "h3", text: "Health and safety" },
      { type: "p", text: "Carry a basic first-aid kit, stay hydrated despite the cold, and allow time to acclimatize to the dry winter air." },
    ],
  },
  {
    slug: "bugan-hushuu-deer-stone",
    title: "Bugan hushuu (deer stone)",
    date: "February 8, 2024",
    image: "/images/about-nomads.jpg",
    content: [
      { type: "p", text: "Scattered across the Mongolian steppe stand mysterious carved stones known as bugan hushuu — deer stones — silent witnesses of the Bronze Age." },
      { type: "h3", text: "What are deer stones?" },
      { type: "p", text: "Deer stones are granite pillars carved with stylized flying deer, dating back roughly 3,000 years. More than 1,200 have been found across Mongolia." },
      { type: "h3", text: "Their meaning" },
      { type: "p", text: "Scholars believe they were erected by ancient nomadic peoples as ceremonial monuments, possibly marking graves or serving as clan symbols." },
      { type: "h3", text: "Where to see them" },
      { type: "p", text: "Some of the finest examples stand at Uushgiin Uvur near Murun in Khuvsgul province, and in the steppes of Arkhangai." },
      { type: "h3", text: "UNESCO recognition" },
      { type: "p", text: "The deer stone monuments of Mongolia are recognized on the UNESCO World Heritage tentative list as masterpieces of Bronze Age art." },
    ],
  },
  {
    slug: "mongolian-ger-yurt",
    title: "Mongolian Ger (yurt)",
    date: "January 20, 2024",
    image: "/images/hero-steppe.jpg",
    content: [
      { type: "p", text: "The ger — known abroad as a yurt — is the traditional dwelling of Mongolian nomads, perfected over thousands of years for life on the move." },
      { type: "h3", text: "Structure" },
      { type: "p", text: "A wooden lattice wall (khana), roof poles (uni), and a central crown (toono) form the frame, covered with layers of felt and canvas." },
      { type: "h3", text: "Interior layout" },
      { type: "p", text: "The door always faces south. The north side is the honored place for guests, the west belongs to men, and the east to women — an arrangement rich with symbolism." },
      { type: "h3", text: "The central stove" },
      { type: "p", text: "At the heart of every ger is the stove, providing warmth and a place to cook. Smoke rises through the toono, the only opening in the roof." },
      { type: "h3", text: "Moving house" },
      { type: "p", text: "A family can dismantle, transport, and rebuild their ger in about an hour — an ingenious design for the nomadic lifestyle." },
    ],
  },
  {
    slug: "mongolian-wrestling",
    title: "Mongolian wrestling",
    date: "January 5, 2024",
    image: "/images/season-summer.jpg",
    content: [
      { type: "p", text: "Bökh, Mongolian wrestling, is one of the Three Manly Games of Naadam and the country's most beloved sport." },
      { type: "h3", text: "The costume" },
      { type: "p", text: "Wrestlers wear the zodog (open-chested jacket) and shuudag (tight trunks), along with traditional boots — a costume full of history and legend." },
      { type: "h3", text: "The rules" },
      { type: "p", text: "There are no weight classes or time limits. A wrestler loses when any part of his body above the knee touches the ground." },
      { type: "h3", text: "Rituals" },
      { type: "p", text: "Before each match, wrestlers perform the eagle dance (devekh), flapping their arms like the great birds of the steppe." },
      { type: "h3", text: "Champions" },
      { type: "p", text: "Legendary wrestlers earn titles such as Falcon, Elephant, Lion, and the supreme title of Titan, celebrated as national heroes." },
    ],
  },
  {
    slug: "secret-of-ongi-camp-information",
    title: "\"SECRET OF ONGI\" TOURIST CAMP'S INFORMATION",
    date: "December 15, 2023",
    image: "/images/tour-4.jpg",
    content: [
      { type: "p", text: "The Secret of Ongi tourist camp sits beside the ruins of Ongi Monastery in Ovorkhangai Province, where the Gobi meets the steppe." },
      { type: "h3", text: "Accommodation" },
      { type: "p", text: "Traditional gers with comfortable beds and stoves, plus a small number of standard rooms for guests who prefer solid walls." },
      { type: "h3", text: "Location" },
      { type: "p", text: "The camp lies on the banks of the Ongi River, a perfect overnight stop between Ulaanbaatar and the southern Gobi." },
      { type: "h3", text: "What to see" },
      { type: "p", text: "Visit the atmospheric ruins of Ongi Monastery, walk the river valley at sunset, and enjoy some of the darkest night skies in Mongolia." },
      { type: "h3", text: "Services" },
      { type: "p", text: "Restaurant ger serving Mongolian and European dishes, hot showers, and guided excursions to nearby attractions." },
    ],
  },
  {
    slug: "secret-of-ongi-camp-price",
    title: "\"SECRET OF ONGI\" TOURIST CAMP'S PRICE",
    date: "November 28, 2023",
    image: "/images/season-autumn.jpg",
    content: [
      { type: "p", text: "Current rates for the Secret of Ongi tourist camp. Prices are per person per night and include breakfast." },
      { type: "h3", text: "Ger stay" },
      { type: "p", text: "₮160,000 per person per night — shared ger (2–4 guests) with stove heating and breakfast." },
      { type: "h3", text: "Private ger" },
      { type: "p", text: "₮220,000 per night for a private double ger — ideal for couples." },
      { type: "h3", text: "Meals" },
      { type: "p", text: "Lunch ₮20,000 · Dinner ₮30,000 per person. Group full-board rates available on request." },
      { type: "h3", text: "Excursions" },
      { type: "p", text: "Ongi Monastery guided visit ₮20,000 per group · Stargazing walk free for overnight guests." },
    ],
  },
];

function formatDate(dateString?: string, locale = "en") {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getCmsPostDetail(locale: string, slug: string): Promise<Post | null> {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<CpPostData, CpPostVariables>({
      query: CP_POST,
      variables: { slug, language: locale },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return data?.cpPost ?? null;
  } catch (error) {
    console.error("Failed to fetch CMS post detail:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const staticPost = posts.find((p) => p.slug === slug);
  if (staticPost) {
    const related = posts.filter((p) => p.slug !== slug).slice(0, 3);
    return (
      <InnerPageLayout>
        <PageHero label="Blog & News" title={staticPost.title} subtitle={staticPost.date} />
        {slug === "msh-camp-food-menu" ? (
          <FoodMenu />
        ) : slug === "msh-camp-information" ? (
          <CampInfo />
        ) : slug === "msh-camp-price" ? (
          <CampPrice />
        ) : slug === "silk-road-resort-price" ? (
          <ResortPrice />
        ) : slug === "secret-of-ongi-camp-price" ? (
          <OngiPrice />
        ) : slug === "winter-weather-guide" ? (
          <WinterWeatherGuide />
        ) : slug === "mongolia-train-timetable" ? (
          <TrainTimetable />
        ) : slug === "mongolia-winter-information" ? (
          <WinterInformation />
        ) : slug === "secret-of-ongi-camp-information" ? (
          <OngiInfo />
        ) : slug === "mongolian-ethnic-groups-costumes" ? (
          <EthnicGroups />
        ) : slug === "winter-festivals" ? (
          <WinterFestivals />
        ) : slug === "bugan-hushuu-deer-stone" ? (
          <DeerStone />
        ) : slug === "mongolian-ger-yurt" ? (
          <GerGuide />
        ) : slug === "mongolian-wrestling" ? (
          <WrestlingGuide />
        ) : slug === "top-10-winter-activities" ? (
          <WinterTop10 />
        ) : (
          <StaticPostLayout locale={locale} post={staticPost} related={related} />
        )}
      </InnerPageLayout>
    );
  }

  const cmsPost = await getCmsPostDetail(locale, slug);
  if (!cmsPost) notFound();

  const allCmsPosts = await getCmsPosts(locale, 100);
  const related = allCmsPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <InnerPageLayout>
      <PageHero
        label="Blog & News"
        title={cmsPost.title || ""}
        subtitle={formatDate(cmsPost.publishedDate, locale)}
      />
      <CmsPostLayout locale={locale} post={cmsPost} related={related} />
    </InnerPageLayout>
  );
}

function StaticPostLayout({
  locale,
  post,
  related,
}: {
  locale: string;
  post: (typeof posts)[number];
  related: (typeof posts);
}) {
  return (
    <section className="bg-background py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          <article className="bg-white rounded-[20px] border border-border p-8 lg:p-10">
            <div className="relative w-full h-[320px] lg:h-[420px] rounded-[16px] overflow-hidden mb-10 border border-border">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-6">
              {post.content.map((block, idx) => {
                if (block.type === "h3") {
                  return <h3 key={idx} className="font-display text-xl text-foreground mt-2">{block.text}</h3>;
                }
                return <p key={idx} className="text-base leading-[1.8] text-muted-foreground">{block.text}</p>;
              })}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="bg-white rounded-[20px] border border-border p-6">
              <h4 className="font-display text-lg text-foreground mb-4">About the Author</h4>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v2h20v-2c0-3.343-6.686-5-10-5z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Written by the travel team at Mongolian Secret History, sharing local insights and practical tips from years of exploring the steppe.
              </p>
            </div>

            <div className="bg-white rounded-[20px] border border-border p-6">
              <h4 className="font-display text-lg text-foreground mb-4">Related Articles</h4>
              <ul className="flex flex-col gap-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${locale}/blog/${item.slug}`} className="group">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function formatBlogContent(content?: string): string {
  if (!content) return "";
  const trimmed = content.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }
  return trimmed
    .split(/\n\s*\n/)
    .map((para) => `<p class="mb-4 text-base leading-relaxed">${para.replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

function CmsPostLayout({
  locale,
  post,
  related,
}: {
  locale: string;
  post: Post;
  related: Post[];
}) {
  const fileBaseUrl = process.env.NEXT_PUBLIC_ERXES_FILE_URL || "https://mongoliansecretstory.next.erxes.io/gateway/read-file?key=";
  const rawImage = post.thumbnail?.url || "";
  const image = rawImage ? (rawImage.startsWith("http") ? rawImage : `${fileBaseUrl}${rawImage}`) : "/images/tour-2.jpg";

  const customMap = (post.customFieldsMap ?? {}) as Record<string, Record<string, unknown>>;
  const customData = (post.customFieldsData ?? {}) as Record<string, unknown>;

  const blogDetails = customMap["blog-details"] || customMap["blog_details"] || {};

  const authorName = String(blogDetails.author_name || customData.author_name || "About the Author");
  const authorBio = String(
    blogDetails.author_bio ||
      customData.author_bio ||
      "Written by the travel team at Mongolian Secret History, sharing local insights and practical tips from years of exploring the steppe."
  );
  const rawAvatar = String(blogDetails.author_avatar || customData.author_avatar || "");
  const authorAvatar = rawAvatar
    ? rawAvatar.startsWith("http")
      ? rawAvatar
      : `${fileBaseUrl}${rawAvatar}`
    : undefined;

  return (
    <section className="bg-background py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          <article className="bg-white rounded-[20px] border border-border p-8 lg:p-10">
            <div className="relative w-full h-[320px] lg:h-[420px] rounded-[16px] overflow-hidden mb-10 border border-border">
              <Image src={image} alt={post.title || ""} fill className="object-cover" />
            </div>

            <div
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
            />
          </article>

          <aside className="flex flex-col gap-6">
            <div className="bg-white rounded-[20px] border border-border p-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-3">
                About the Author
              </span>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full bg-primary/10 overflow-hidden shrink-0 border border-border shadow-sm">
                  {authorAvatar ? (
                    <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v2h20v-2c0-3.343-6.686-5-10-5z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground leading-tight">{authorName}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {authorBio}
              </p>
            </div>

            <div className="bg-white rounded-[20px] border border-border p-6">
              <h4 className="font-display text-lg text-foreground mb-4">Related Articles</h4>
              <ul className="flex flex-col gap-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${locale}/blog/${item.slug}`} className="group">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(item.publishedDate, locale)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return posts.flatMap((post) => [
    { slug: post.slug, locale: "en" },
    { slug: post.slug, locale: "mn" },
  ]);
}
