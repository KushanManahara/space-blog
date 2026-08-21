import { Hero } from "@/components/home/hero";
import { LatestWriting } from "@/components/home/latest-writing";
import { MostReadSection } from "@/components/home/most-read-section";
import { MostViewed } from "@/components/home/most-viewed";
import { NewsletterBlock } from "@/components/home/newsletter-block";
import { PublicationStrip } from "@/components/home/publication-strip";
import { SeriesGrid } from "@/components/home/series-grid";
import { TopicsSection } from "@/components/home/topics-section";
import { getFeaturedPost, isTopicFilter, posts, toSummaries } from "@/lib/content";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const { topic } = await searchParams;
  const requested = typeof topic === "string" ? topic : undefined;
  const activeTopic = isTopicFilter(requested) ? requested : "All";
  const summaries = toSummaries(posts);

  return (
    <>
      <Hero featured={getFeaturedPost()} />
      <PublicationStrip />
      <MostViewed posts={summaries} />
      <LatestWriting topic={activeTopic} />
      <SeriesGrid />
      <TopicsSection />
      <NewsletterBlock />
      <MostReadSection />
    </>
  );
}
