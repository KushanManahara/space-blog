import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

import { Reveal } from "@/components/motion/reveal";
import { FilterChips } from "@/components/nav/filter-chips";
import { Pagination } from "@/components/nav/pagination";
import { SortToggle } from "@/components/nav/sort-toggle";
import { PostCard } from "@/components/post/post-card";
import { SearchHero } from "@/components/search/search-hero";
import { TopicCard } from "@/components/topic/topic-tile";
import { isSortOrder, routes, searchPosts, site, tags, topics } from "@/lib/content";
import { buildHref } from "@/lib/url";
import { paginate } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Search",
  description: `Search across all ${site.issue} posts, topics and tags.`,
  alternates: { canonical: "/search" },
};

const TABS = ["Articles", "Topics", "Tags"] as const;
type Tab = (typeof TABS)[number];

function isTab(value: string | undefined): value is Tab {
  return value !== undefined && (TABS as readonly string[]).includes(value);
}

/** Matches the slice the results list used before it was paginated. */
const PER_PAGE = 8;

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const requestedTab = typeof params.tab === "string" ? params.tab : undefined;
  const requestedSort = typeof params.sort === "string" ? params.sort : undefined;
  const pageParam = typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;

  const tab: Tab = isTab(requestedTab) ? requestedTab : "Articles";
  const sort = isSortOrder(requestedSort) ? requestedSort : "recent";
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const results = searchPosts(query, sort);
  const { items: visibleResults, page: currentPage, pageCount } = paginate(results, page, PER_PAGE);
  const current = { q: query || undefined, tab, sort, page: String(currentPage) };

  return (
    <>
      <SearchHero query={query} resultCount={results.length} />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(40px,5vw,64px)] pb-tail">
        <Reveal className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <FilterChips
            label="Search result type"
            options={TABS.map((option) => ({
              label: option,
              href: buildHref(routes.search, current, { tab: option, page: undefined }),
              active: option === tab,
            }))}
          />
          <SortToggle
            value={sort}
            href={buildHref(routes.search, current, {
              sort: sort === "recent" ? "views" : "recent",
              page: undefined,
            })}
          />
        </Reveal>

        <ViewTransition key={tab} enter="content-swap" exit="content-swap">
          {tab === "Articles" ? (
            results.length === 0 ? (
              <p className="rounded-lg border border-line-1 bg-bg-2 p-8 text-[15px] text-fg-2">
                Nothing matches “{query}”. Try a topic name, a tag, or{" "}
                <Link href={routes.articles} className="font-semibold text-brand">
                  browse the archive
                </Link>
                .
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {visibleResults.map((post) => (
                  <PostCard key={post.slug} post={post} variant="search" />
                ))}
              </div>
            )
          ) : null}

          {tab === "Topics" ? (
            <div className="grid gap-4.5 sm:grid-cols-2 xl:grid-cols-4">
              {topics.map((topic) => (
                <TopicCard key={topic.slug} topic={topic} />
              ))}
            </div>
          ) : null}

          {tab === "Tags" ? (
            <div className="flex flex-wrap gap-2.5 rounded-lg border border-line-1 bg-bg-2 p-7.5">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={buildHref(routes.search, {}, { q: tag.name.replace("#", "") })}
                  className="rounded-full border border-line-1 bg-bg-1 px-4.5 py-2.5 text-[14px] text-fg-2 transition-[color,border-color,transform] duration-300 ease-bounce hover:-translate-y-0.5 hover:border-line-brand hover:text-brand"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          ) : null}
        </ViewTransition>

        {tab === "Articles" && results.length > 0 ? (
          <Pagination
            className="mt-11"
            align="center"
            page={currentPage}
            total={pageCount}
            hrefFor={(next) =>
              buildHref(routes.search, current, { page: next === 1 ? undefined : String(next) })
            }
          />
        ) : null}
      </section>
    </>
  );
}
