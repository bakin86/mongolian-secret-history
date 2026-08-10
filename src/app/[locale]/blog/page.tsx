import BlogPageClient from "@/components/blog/BlogPageClient";
import UsefulLinks from "@/components/blog/UsefulLinks";
import type { Post } from "@/graphql/cms/queries/post";
import type { Metadata } from "next";
import { getCmsMetadata } from "@/lib/cms/seo";
import { getCmsPosts } from "@/lib/cms/posts";

const staticPosts: Post[] = [
  {
    _id: "1",
    clientPortalId: "",
    title: "\"Mongolian Secret History\" camp Food menu",
    slug: "msh-camp-food-menu",
    excerpt: "Explore the traditional Mongolian dishes and dining options served at the Mongolian Secret History camp.",
    publishedDate: "2024-09-15",
    thumbnail: { name: "", url: "/images/culture-nomads.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat1", name: "Info", slug: "info" }],
  },
  {
    _id: "2",
    clientPortalId: "",
    title: "\"MONGOLIAN SECRET HISTORY\" CAMP INFORMATION",
    slug: "msh-camp-information",
    excerpt: "Everything you need to know about staying at the Mongolian Secret History camp — facilities, services, and location.",
    publishedDate: "2024-08-22",
    thumbnail: { name: "", url: "/images/hero-steppe.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat1", name: "Info", slug: "info" }],
  },
  {
    _id: "3",
    clientPortalId: "",
    title: "MONGOLIAN SECRET HISTORY CAMP PRICE",
    slug: "msh-camp-price",
    excerpt: "Rates and packages for ger stays, meals, and activities at the Mongolian Secret History camp.",
    publishedDate: "2024-07-10",
    thumbnail: { name: "", url: "/images/tour-1.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat2", name: "Price", slug: "price" }],
  },
  {
    _id: "4",
    clientPortalId: "",
    title: "\"SECRET OF THE SILK ROAD\" RESORT PRICE",
    slug: "silk-road-resort-price",
    excerpt: "Pricing for rooms, ger suites, and resort services at the Secret of the Silk Road resort.",
    publishedDate: "2024-06-05",
    thumbnail: { name: "", url: "/images/tour-2.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat2", name: "Price", slug: "price" }],
  },
  {
    _id: "5",
    clientPortalId: "",
    title: "Mongolian ethnic groups & costumes",
    slug: "mongolian-ethnic-groups-costumes",
    excerpt: "Discover the diverse ethnic groups of Mongolia and the beautiful traditional costumes they wear.",
    publishedDate: "2024-05-18",
    thumbnail: { name: "", url: "/images/about-nomads.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat3", name: "Culture", slug: "culture" }],
  },
  {
    _id: "6",
    clientPortalId: "",
    title: "Winter Festivals",
    slug: "winter-festivals",
    excerpt: "Ice festivals, camel polo, and winter celebrations across Mongolia's frozen landscapes.",
    publishedDate: "2024-04-30",
    thumbnail: { name: "", url: "/images/season-winter.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat3", name: "Culture", slug: "culture" }],
  },
  {
    _id: "7",
    clientPortalId: "",
    title: "Weather Guide (Winter)",
    slug: "winter-weather-guide",
    excerpt: "Temperatures, conditions, and what to expect from Mongolia's extreme winter weather.",
    publishedDate: "2024-04-12",
    thumbnail: { name: "", url: "/images/season-winter.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat1", name: "Info", slug: "info" }],
  },
  {
    _id: "8",
    clientPortalId: "",
    title: "Top 10 things to do in Mongolia in Winter",
    slug: "top-10-winter-activities",
    excerpt: "From dog sledding to ice fishing — the best winter experiences Mongolia has to offer.",
    publishedDate: "2024-03-28",
    thumbnail: { name: "", url: "/images/season-winter.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat4", name: "Nature", slug: "nature" }],
  },
  {
    _id: "9",
    clientPortalId: "",
    title: "Mongolian International Train Timetable",
    slug: "mongolia-train-timetable",
    excerpt: "Schedules and routes for the Trans-Mongolian railway and international train connections.",
    publishedDate: "2024-03-10",
    thumbnail: { name: "", url: "/images/tour-3.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat1", name: "Info", slug: "info" }],
  },
  {
    _id: "10",
    clientPortalId: "",
    title: "Mongolian Winter Information 2019/2020",
    slug: "mongolia-winter-information",
    excerpt: "Seasonal travel information, road conditions, and tips for visiting Mongolia in winter 2019/2020.",
    publishedDate: "2024-02-25",
    thumbnail: { name: "", url: "/images/season-winter.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat1", name: "Info", slug: "info" }],
  },
  {
    _id: "11",
    clientPortalId: "",
    title: "Bugan hushuu (deer stone)",
    slug: "bugan-hushuu-deer-stone",
    excerpt: "The mysterious ancient deer stones of Mongolia — Bronze Age monuments scattered across the steppe.",
    publishedDate: "2024-02-08",
    thumbnail: { name: "", url: "/images/about-nomads.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat3", name: "Culture", slug: "culture" }],
  },
  {
    _id: "12",
    clientPortalId: "",
    title: "Mongolian Ger (yurt)",
    slug: "mongolian-ger-yurt",
    excerpt: "The traditional Mongolian dwelling — its structure, symbolism, and role in nomadic life.",
    publishedDate: "2024-01-20",
    thumbnail: { name: "", url: "/images/hero-steppe.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat3", name: "Culture", slug: "culture" }],
  },
  {
    _id: "13",
    clientPortalId: "",
    title: "Mongolian wrestling",
    slug: "mongolian-wrestling",
    excerpt: "Bökh — the ancient art of Mongolian wrestling, its rituals, champions, and place in Naadam.",
    publishedDate: "2024-01-05",
    thumbnail: { name: "", url: "/images/season-summer.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat3", name: "Culture", slug: "culture" }],
  },
  {
    _id: "14",
    clientPortalId: "",
    title: "\"SECRET OF ONGI\" TOURIST CAMP'S INFORMATION",
    slug: "secret-of-ongi-camp-information",
    excerpt: "Facilities, services, and travel details for the Secret of Ongi tourist camp in Ovorkhangai.",
    publishedDate: "2023-12-15",
    thumbnail: { name: "", url: "/images/tour-4.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat1", name: "Info", slug: "info" }],
  },
  {
    _id: "15",
    clientPortalId: "",
    title: "\"SECRET OF ONGI\" TOURIST CAMP'S PRICE",
    slug: "secret-of-ongi-camp-price",
    excerpt: "Rates for ger stays, meals, and services at the Secret of Ongi tourist camp.",
    publishedDate: "2023-11-28",
    thumbnail: { name: "", url: "/images/season-autumn.jpg", type: "image", size: 0 },
    categories: [{ _id: "cat2", name: "Price", slug: "price" }],
  },
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const cmsPosts = await getCmsPosts(locale, 50);
  const posts = cmsPosts.length > 0 ? cmsPosts : staticPosts;
  return (
    <>
      <BlogPageClient posts={posts} />
      <UsefulLinks />
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getCmsMetadata({
    slug: "blog",
    locale,
    fallbackTitle: "Blog & News",
    fallbackDescription: "Stories, guides, and updates from the steppe.",
  });
}
