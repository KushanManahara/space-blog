import type { Metadata } from "next";
import Link from "next/link";
import { Check, Layers } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { FilterChips } from "@/components/nav/filter-chips";
import { Pagination } from "@/components/nav/pagination";
import { SortToggle } from "@/components/nav/sort-toggle";
import { PostCover } from "@/components/post/post-cover";
import { TopicBadge } from "@/components/post/topic-badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  isSeriesSort,
  isTopicFilter,
  listSeries,
  listSeriesTopics,
  routes,
  seriesSortLabels,
  type SeriesSort,
} from "@/lib/content";
import { formatCount, formatDate } from "@/lib/format";
import { paginate } from "@/lib/pagination";
import { buildHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Series",
  description:
    "Multi-part runs through one subject, in the order they were written. Filter by topic, sort by length or by what gets read.",
  alternates: { canonical: "/series" },
};

const PER_PAGE = 6;

/** Cycles through the next sort rather than toggling, since there are three. */
const NEXT_SORT: Record<SeriesSort, SeriesSort> = {
  recent: "longest",
  longest: "views",
  views: "recent",
};

export default async function SeriesPage({ searchParams }: PageProps<"/series">) {
  const params = await searchParams;
  const topicParam = typeof params.topic === "string" ? params.topic : undefined;
  const sortParam = typeof params.sort === "string" ? params.sort : undefined;
  const pageParam = typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;

  const topic = isTopicFilter(topicParam) ? topicParam : "All";
  const sort = isSeriesSort(sortParam) ? sortParam : "recent";
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const matching = listSeries({ topic, sort });
  const { items: visible, page: currentPage, pageCount } = paginate(matching, page, PER_PAGE);
  const current = {
    topic: topic === "All" ? undefined : topic,
    sort,
    page: String(currentPage),
  };

  const totalParts = matching.reduce((total, series) => total + series.partCount, 0);

  return (
    <>
      <PageMasthead
        eyebrow="Series"
        title={
          <>
            Longer arguments, <span className="text-brand">split into parts.</span>
          </>
        }
        description="Some subjects took more than one post. These are the runs, in the order they were written — every part published, none of them a cliffhanger."
        media={<MastheadBadge icon={Layers} />}
        actions={
          <InteractiveHoverButton
            href={routes.paths}
            variant="secondary"
            className="px-[22px] py-[11px] text-[14px]"
          >
            Where to start
          </InteractiveHoverButton>
        }
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)] pb-tail">
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line-1 pb-5">
          {/* Only the topics that actually appear in a series get a chip, so a
              filter can never return an empty page. */}
          <FilterChips
            label="Filter series by topic"
            size="sm"
            options={[
              {
                label: "All",
                href: buildHref(routes.series, current, { topic: undefined, page: undefined }),
                active: topic === "All",
              },
              ...listSeriesTopics().map((name) => ({
                label: name,
                href: buildHref(routes.series, current, { topic: name, page: undefined }),
                active: topic === name,
              })),
            ]}
          />
          <SortToggle
            className="ml-auto"
            value={sort}
            label={seriesSortLabels[sort]}
            nextLabel={seriesSortLabels[NEXT_SORT[sort]]}
            href={buildHref(routes.series, current, { sort: NEXT_SORT[sort], page: undefined })}
          />
        </Reveal>

        <p className="mt-5 text-[13.5px] text-fg-3">
          {matching.length} {matching.length === 1 ? "series" : "series"}, {totalParts} parts in
          total.
        </p>

        {visible.length === 0 ? (
          <p className="mt-6 rounded-lg border border-line-1 bg-bg-2 p-8 text-[15px] text-fg-2">
            No series under this topic yet.{" "}
            <Link href={routes.series} className="font-semibold text-brand">
              Clear the filter
            </Link>{" "}
            to see them all.
          </p>
        ) : (
          <div className="mt-2">
            {visible.map((series, index) => (
              <Reveal key={series.slug} index={index}>
                <article className="grid gap-x-10 gap-y-6 border-b border-line-1 py-[clamp(26px,3.5vw,40px)] lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                  <div>
                    <div className="flex items-start gap-4">
                      {/* Part one's artwork, so a series is recognisable by the
                          same image its first article carries. The part count
                          moved to the metadata line, where the other numbers are. */}
                      <PostCover
                        topic={series.coverTopic}
                        image={series.cover}
                        alt={series.title}
                        zoom={false}
                        pattern={false}
                        className="size-[58px] shrink-0 rounded-md"
                      />
                      <div className="min-w-0">
                        <h2 className="text-[20px] leading-[1.25] font-bold tracking-[-0.015em] text-fg-1">
                          <Link
                            href={`${routes.series}/${series.slug}`}
                            className="transition-colors duration-300 ease-expo hover:text-brand-strong"
                          >
                            {series.title}
                          </Link>
                        </h2>
                        <p className="mt-1.5 text-[14.5px] leading-[1.6] text-fg-2">{series.dek}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {series.topics.map((name) => (
                        <TopicBadge key={name} topic={name} />
                      ))}
                    </div>

                    <p className="mt-3 text-[12.5px] text-fg-3">
                      {series.partCount} parts · {formatDate(series.firstPublished)} –{" "}
                      {formatDate(series.lastPublished)} · {series.minutes} min ·{" "}
                      {formatCount(series.views)} views
                    </p>
                  </div>

                  <ol className="flex flex-col gap-1.5">
                    {series.posts.map((post, partIndex) => (
                      <li key={post.slug} className="flex items-start gap-3 text-[14px]">
                        <span
                          aria-hidden
                          className="inline-flex size-[19px] shrink-0 items-center justify-center rounded-full bg-brand text-on-brand"
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <Link
                          href={`${routes.articles}/${post.slug}`}
                          className="leading-[1.45] text-fg-1 transition-colors duration-300 ease-expo hover:text-brand"
                        >
                          <span className="font-mono text-[12.5px] text-fg-faint">
                            {partIndex + 1}.
                          </span>{" "}
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Pagination
          page={currentPage}
          total={pageCount}
          hrefFor={(target) => buildHref(routes.series, current, { page: String(target) })}
        />
      </section>
    </>
  );
}
