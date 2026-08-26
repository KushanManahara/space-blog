import { Hero } from "@/components/home/hero";
import { LatestWriting } from "@/components/home/latest-writing";
import { MostReadSection } from "@/components/home/most-read-section";
import { MostViewed } from "@/components/home/most-viewed";
import { NewsletterBlock } from "@/components/home/newsletter-block";
import { PublicationStrip } from "@/components/home/publication-strip";
import { TopicsSection } from "@/components/home/topics-section";
import { getFeaturedPost, isTopicFilter, posts, toSummaries } from "@/lib/content";
import { getAllLivePostStatsMap } from "@/lib/db/queries";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const { topic } = await searchParams;
  const requested = typeof topic === "string" ? topic : undefined;
  const activeTopic = isTopicFilter(requested) ? requested : "All";

  const liveStatsMap = await getAllLivePostStatsMap();
  const livePosts = posts.map((p) => {
    const live = liveStatsMap.get(p.slug);
    return live
      ? { ...p, likes: live.likes, views: live.views, commentCount: live.comments }
      : p;
  });

  const summaries = toSummaries(livePosts);

  return (
    <>
      <Hero featured={getFeaturedPost(livePosts)} />
      <PublicationStrip />
      <MostViewed posts={summaries} />
      <LatestWriting topic={activeTopic} />
      <TopicsSection />
      <NewsletterBlock />
      <MostReadSection />
    </>
  );
}
