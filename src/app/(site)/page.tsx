import { HomeView } from "@/components/home/home-view";

/**
 * Static, regenerated at most once a minute — the same window as the cached
 * live stats it shows.
 *
 * It used to read `searchParams` for the latest-writing topic filter, which
 * made the busiest route on the site render on every request. `?topic=` is now
 * rewritten to a prerendered page per topic (`/latest/[topic]`, see
 * `next.config.ts`), so the filter links still work without JavaScript and
 * this page can be served from the edge cache.
 */
export const revalidate = 60;

export default function HomePage() {
  return <HomeView activeTopic="All" />;
}
