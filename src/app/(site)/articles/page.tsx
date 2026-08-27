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

  const topic = isTopicFilter(topicParam) ? topicParam : "All";
  const sort = isSortOrder(sortParam) ? sortParam : "recent";
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const liveStatsMap = await getAllLivePostStatsMap();
  const livePosts = posts.map((p) => {
    const live = liveStatsMap.get(p.slug);
    return live ? { ...p, likes: live.likes, views: live.views, commentCount: live.comments } : p;
  });

  const matching = listPosts({ topic, series, sort }, livePosts);
  const { items: visible, page: currentPage, pageCount } = paginate(matching, page, PER_PAGE);
  const current = {
    topic: topic === "All" ? undefined : topic,
    series,
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
            <InteractiveHoverButton
              href={routes.topics}
              className="px-[22px] py-[11px] text-[14px]"
            >
              Explore topics
            </InteractiveHoverButton>
            <Button asChild variant="subtle" size="md">
              <Link href={routes.about}>About author</Link>
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
            <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-line-1 pb-5">
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
              <SortToggle
                value={sort}
                href={buildHref(routes.articles, current, {
                  sort: sort === "recent" ? "views" : "recent",
                  page: undefined,
                })}
              />
            </Reveal>

            <ViewTransition
              key={`${topic}-${sort}-${currentPage}`}
              enter="content-swap"
              exit="content-swap"
            >
              {visible.length === 0 ? (
                <p className="mt-8 rounded-lg border border-line-1 bg-bg-2 p-8 text-[15px] text-fg-2">
                  No posts under this filter yet. Clear the topic filter to see the whole archive.
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

          <Sidebar />
        </div>
      </section>
    </>
  );
}
