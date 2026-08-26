import type { Metadata } from "next";
import { Search } from "lucide-react";

import { Pagination } from "@/components/nav/pagination";
import { PostsTable } from "@/components/studio/posts-table";
import { StudioHeader } from "@/components/studio/studio-header";
import { getStudioPosts, routes, site } from "@/lib/content";
import { buildHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false },
};

export default async function StudioPage({ searchParams }: PageProps<"/studio">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const pageParam = typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const rows = getStudioPosts().filter(({ post }) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  );
  const draftCount = rows.filter((row) => row.status === "Draft").length;

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-bg-2">
      <StudioHeader />

      <div className="mx-auto w-full max-w-page px-gutter pt-[clamp(32px,4vw,52px)] pb-[clamp(76px,9vw,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="text-h2 text-fg-1">Posts</h1>
            <p className="mt-2 text-[15.5px] text-fg-2">
              {site.issue} published · {draftCount} draft · {site.correctionCount} corrections
            </p>
          </div>

          <form
            action={routes.studio}
            method="get"
            className="flex items-center gap-2.5 rounded-full border border-line-1 bg-bg-1 p-2 pl-4.5"
          >
            <Search className="size-4 shrink-0 text-fg-3" strokeWidth={1.75} />
            <label htmlFor="studio-filter" className="sr-only">
              Filter posts
            </label>
            <input
              id="studio-filter"
              name="q"
              defaultValue={query}
              placeholder="Filter posts"
              className="w-full min-w-0 bg-transparent py-1 text-[16px] text-fg-1 outline-none placeholder:text-fg-3 sm:w-40 sm:text-[14px]"
            />
          </form>
        </div>

        <div className="mt-7">
          {rows.length === 0 ? (
            <p className="rounded-lg border border-line-1 bg-bg-1 p-8 text-[15px] text-fg-2">
              No posts match “{query}”.
            </p>
          ) : (
            <PostsTable rows={rows} />
          )}
        </div>

        <Pagination
          className="mt-7.5"
          page={page}
          total={site.archivePageCount}
          hrefFor={(next) =>
            buildHref(
              routes.studio,
              { q: query || undefined },
              { page: next === 1 ? undefined : String(next) },
            )
          }
        />
      </div>
    </div>
  );
}
