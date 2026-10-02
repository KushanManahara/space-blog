import { Hero } from "@/components/home/hero";
import { LatestWriting } from "@/components/home/latest-writing";
import { MostReadSection } from "@/components/home/most-read-section";
import { MostViewed } from "@/components/home/most-viewed";
import { NewsletterBlock } from "@/components/home/newsletter-block";
import { PublicationStrip } from "@/components/home/publication-strip";
import { SeriesGrid } from "@/components/home/series-grid";
import { TopicsSection } from "@/components/home/topics-section";
import { getFeaturedPost, toSummaries, type TopicFilter } from "@/lib/content";
import { getLivePosts } from "@/lib/db/queries";

/**
 * The home page, shared by `/` and the per-topic variants that `?topic=` is
 * rewritten to (see `next.config.ts`).
 *
 * Live engagement counts are read once here and shared by the sections below.
 * `getLivePosts` is cached (see `lib/db/queries.ts`), so this is a cache read on
 * all but the first request in each revalidation window.
 *
 * These sections deliberately do *not* sit behind Suspense boundaries. Wrapping
 * them streamed the shell slightly sooner but left `MostViewed` unhydrated: its
 * topic tabs rendered and then did nothing, because React never attached to a
 * client component inside a boundary resolved by an async server component.
 */
export async function HomeView({ activeTopic }: { activeTopic: TopicFilter }) {
  const livePosts = await getLivePosts();

  return (
    <>
      <Hero featured={getFeaturedPost(livePosts)} />
      <PublicationStrip />
      <MostViewed posts={toSummaries(livePosts)} />
      <LatestWriting topic={activeTopic} />
      <SeriesGrid />
      <TopicsSection />
      <NewsletterBlock />
      <MostReadSection posts={livePosts} />
    </>
  );
}
