import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

import { BookOpen } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Sidebar } from "@/components/layout/sidebar";
import { Reveal } from "@/components/motion/reveal";
import { FilterChips } from "@/components/nav/filter-chips";
import { Pagination } from "@/components/nav/pagination";
import { SortToggle } from "@/components/nav/sort-toggle";
import { PostRow } from "@/components/post/post-row";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  getSeriesBySlug,
  listYears,
  isArchiveYear,
  isSortOrder,
  isTopicFilter,
  listPosts,
  posts,
  routes,
  site,
  topicFilters,
} from "@/lib/content";
import { getAllLivePostStatsMap } from "@/lib/db/queries";
import { paginate } from "@/lib/pagination";
import { buildHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Archive",
  description: `All ${site.issue} posts, newest first. Corrections are appended, never silently edited.`,
  alternates: { canonical: "/articles" },
};

const PER_PAGE = 6;

export default async function ArticlesPage({ searchParams }: PageProps<"/articles">) {
  const params = await searchParams;
  const topicParam = typeof params.topic === "string" ? params.topic : undefined;
  const sortParam = typeof params.sort === "string" ? params.sort : undefined;
  const pageParam = typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;
  const series = typeof params.series === "string" ? params.series : undefined;
  const yearParam = typeof params.year === "string" ? params.year : undefined;

  const topic = isTopicFilter(topicParam) ? topicParam : "All";
  const sort = isSortOrder(sortParam) ? sortParam : "recent";
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const year = isArchiveYear(yearParam) ? yearParam : undefined;

  const liveStatsMap = await getAllLivePostStatsMap();
  const livePosts = posts.map((p) => {
    const live = liveStatsMap.get(p.slug);
    return live ? { ...p, likes: live.likes, views: live.views, commentCount: live.comments } : p;
  });

  const matching = listPosts({ topic, series, year, sort }, livePosts);
  const { items: visible, page: currentPage, pageCount } = paginate(matching, page, PER_PAGE);
  const current = {
    topic: topic === "All" ? undefined : topic,
    series,
    year,
    sort,
    page: String(currentPage),
  };
  const activeSeries = series ? getSeriesBySlug(series) : undefined;

  return (
    <>
      <PageMasthead
        eyebrow="Articles"
        title={
          <>
            All {site.issue} posts, <span className="text-brand">newest first.</span>
          </>
        }
        description="Everything published here so far. Filter by topic, or sort by what gets read most."
        media={<MastheadBadge icon={BookOpen} />}
        actions={
          <>
            {/* Someone meeting 40 posts for the first time needs a route more
                than they need a topic filter, so this leads. */}
            <InteractiveHoverButton href={routes.paths} className="px-[22px] py-[11px] text-[14px]">
              Where to start
            </InteractiveHoverButton>
            <Button asChild variant="subtle" size="md">
              <Link href={routes.topics}>Explore topics</Link>
            </Button>
          </>
        }
      >
        {activeSeries ? (
          <p className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-tint-violet px-4 py-1.5 text-[13px] font-semibold text-brand-strong">
            Series · {activeSeries.title}
            <Link
              href={buildHref(routes.articles, current, { series: undefined })}
              className="text-fg-3 hover:text-fg-1"
            >
              Clear
            </Link>
          </p>
        ) : null}
      </PageMasthead>

      <section className="mx-auto max-w-page px-gutter pt-[clamp(28px,4vw,44px)] pb-[clamp(84px,10vw,150px)]">
        <div className="grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1fr_344px]">
          <div>
            <Reveal className="flex flex-wrap items-center gap-4">
              <FilterChips
                label="Filter posts by topic"
                size="sm"
                options={topicFilters.map((option) => ({
                  label: option,
                  href: buildHref(routes.articles, current, {
                    topic: option === "All" ? undefined : option,
                    page: undefined,
                  }),
                  active: option === topic,
                }))}
              />
            </Reveal>

            {/* Chronology gets its own row rather than competing with topics:
                they are independent axes and combine freely. The sort toggle
                rides along here so it keeps a stable spot as topics wrap. */}
            <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line-1 pt-4 pb-5">
              <span className="text-[12px] font-semibold tracking-[0.12em] text-fg-3 uppercase">
                Year
              </span>
              <FilterChips
                label="Filter posts by year"
                size="sm"
                options={[
                  {
                    label: "Any",
                    href: buildHref(routes.articles, current, { year: undefined, page: undefined }),
                    active: year === undefined,
                  },
                  ...listYears().map((entry) => ({
                    label: `${entry.year} (${entry.count})`,
                    href: buildHref(routes.articles, current, {
                      year: entry.year,
                      page: undefined,
                    }),
                    active: year === entry.year,
                  })),
                ]}
              />
              <SortToggle
                className="ml-auto"
                value={sort}
                href={buildHref(routes.articles, current, {
                  sort: sort === "recent" ? "views" : "recent",
                  page: undefined,
                })}
              />
            </Reveal>

            <ViewTransition
              key={`${topic}-${year ?? "any"}-${sort}-${currentPage}`}
              enter="content-swap"
              exit="content-swap"
            >
              {visible.length === 0 ? (
                <p className="mt-8 rounded-lg border border-line-1 bg-bg-2 p-8 text-[15px] text-fg-2">
                  No posts match these filters. Clear the topic or year filter to see the whole
                  archive.
                </p>
              ) : (
                <div>
                  {visible.map((post) => (
                    <PostRow key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </ViewTransition>

            <Pagination
              className="mt-9"
              page={currentPage}
              total={pageCount}
              hrefFor={(next) =>
                buildHref(routes.articles, current, { page: next === 1 ? undefined : String(next) })
              }
            />
          </div>

          <Sidebar posts={livePosts} />
        </div>
      </section>
    </>
  );
}
