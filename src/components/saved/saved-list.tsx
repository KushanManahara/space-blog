"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";

import { PostRow } from "@/components/post/post-row";
import { useSavedPosts } from "@/components/providers/saved-posts-provider";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { routes, type PostSummary } from "@/lib/content";

/**
 * Saved articles live in localStorage, so the list can only be built in the
 * browser. The whole archive's summaries are passed in from the server and
 * filtered here — 40 summaries is a small payload, and it avoids a round trip
 * just to resolve slugs the client already knows.
 */
export function SavedList({ posts }: { posts: PostSummary[] }) {
  // `hydrated` comes from the provider: until localStorage has been read the
  // saved set is empty, and rendering "nothing saved" in that frame is wrong.
  const { isSaved, hydrated } = useSavedPosts();

  const saved = React.useMemo(
    () => (hydrated ? posts.filter((post) => isSaved(post.slug)) : []),
    [hydrated, posts, isSaved],
  );

  if (!hydrated) {
    return (
      <div className="mt-8 flex flex-col gap-4" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[92px] animate-pulse rounded-lg bg-bg-3" />
        ))}
      </div>
    );
  }

  if (saved.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-line-1 px-6 py-14 text-center">
        <span className="mb-3 inline-flex size-11 items-center justify-center rounded-full bg-bg-2 text-fg-3">
          <Bookmark className="size-5" strokeWidth={1.75} />
        </span>
        <p className="text-[16px] font-semibold text-fg-1">Nothing saved yet</p>
        <p className="mt-1.5 max-w-[42ch] text-[14.5px] leading-[1.6] text-fg-2">
          The bookmark icon on any article or card keeps it here. Saves stay in this browser, so
          there is no account to create.
        </p>
        <InteractiveHoverButton
          href={routes.articles}
          variant="secondary"
          className="mt-6 px-5 py-[11px] text-[14px]"
        >
          Browse the archive
        </InteractiveHoverButton>
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 text-[14px] text-fg-3">
        {saved.length} saved {saved.length === 1 ? "article" : "articles"}, newest first.{" "}
        <Link href={routes.articles} className="text-brand hover:underline">
          Find more
        </Link>
      </p>
      <div className="mt-2">
        {saved.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
