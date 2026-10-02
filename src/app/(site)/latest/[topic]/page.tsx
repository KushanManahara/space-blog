import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeView } from "@/components/home/home-view";
import { isTopicFilter, topicFilters } from "@/lib/content";
import { alternates } from "@/lib/metadata";

/**
 * The home page with its latest-writing list filtered to one topic.
 *
 * Readers reach it as `/?topic=<Topic>`; `next.config.ts` rewrites that here so
 * each variant is prerendered instead of `/` rendering per request. It is the
 * home page, not a page of its own, so it points search engines back there.
 */
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return topicFilters.filter((topic) => topic !== "All").map((topic) => ({ topic }));
}

export const metadata: Metadata = {
  alternates: alternates("/"),
  robots: { index: false, follow: true },
};

export default async function HomeTopicPage({ params }: PageProps<"/latest/[topic]">) {
  const { topic } = await params;
  const decoded = decodeURIComponent(topic);
  if (!isTopicFilter(decoded) || decoded === "All") notFound();

  return <HomeView activeTopic={decoded} />;
}
