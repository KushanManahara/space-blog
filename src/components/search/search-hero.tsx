import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { PageMasthead } from "@/components/layout/page-masthead";
import { routes, searchSuggestions, site } from "@/lib/content";

/** Search masthead. A GET form, so results work without JavaScript. */
export function SearchHero({ query, resultCount }: { query: string; resultCount: number }) {
  return (
    <PageMasthead
      eyebrow="Search"
      title={query || "Search"}
      description={
        query
          ? `${resultCount} ${resultCount === 1 ? "result" : "results"} for “${query}”`
          : `Search across all ${site.issue} posts`
      }
    >
      <form
        action={routes.search}
        method="get"
        className="mt-6.5 flex items-center gap-2.5 rounded-full border border-line-1 bg-bg-1 p-1.5 pl-5"
      >
        <Search className="size-4.5 shrink-0 text-fg-3" strokeWidth={1.75} />
        <label htmlFor="search-query" className="sr-only">
          Search {site.issue} posts
        </label>
        <input
          id="search-query"
          name="q"
          defaultValue={query}
          placeholder={`Search ${site.issue} posts`}
          className="min-w-0 flex-1 bg-transparent py-3 text-[16px] text-fg-1 outline-none placeholder:text-fg-3 sm:text-[15.5px]"
        />
        <button
          type="submit"
          aria-label="Search"
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-on-ink transition-transform duration-300 ease-bounce hover:-translate-y-px active:scale-[0.96] active:duration-150 active:ease-out"
        >
          <ArrowRight className="size-[17px]" strokeWidth={1.75} />
        </button>
      </form>

      <div className="mt-4.5 flex flex-wrap items-center gap-2.5 text-[13.5px] text-fg-3">
        <span>Try:</span>
        {searchSuggestions.map((suggestion) => (
          <Link
            key={suggestion}
            href={`${routes.search}?q=${encodeURIComponent(suggestion)}`}
            className="text-fg-2 underline decoration-n-300 underline-offset-[3px] transition-colors duration-300 ease-expo hover:text-brand"
          >
            {suggestion}
          </Link>
        ))}
      </div>
    </PageMasthead>
  );
}
