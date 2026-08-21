"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Share } from "lucide-react";

import { useReadingProgress } from "@/components/article/reading-progress";
import { ShareSheet } from "@/components/article/share-sheet";
import type { PostSummary } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * True once the page footer is within 200px of entering the viewport. The
 * scroll-based `progress` value alone can't tell us this — it's derived from
 * the article body's own position and stays pinned near 1 for the entire
 * "Keep reading" + footer stretch below the body, which is exactly the
 * section this bar must never cover.
 */
function useFooterApproaching(): boolean {
  const [approaching, setApproaching] = React.useState(false);

  React.useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setApproaching(entry.isIntersecting), {
      rootMargin: "0px 0px 200px 0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return approaching;
}

/** Floating bar that appears once the reader is into the article. */
export function ReadingBar({ post, next }: { post: PostSummary; next: PostSummary }) {
  const { progress } = useReadingProgress();
  const [shareOpen, setShareOpen] = React.useState(false);
  const footerApproaching = useFooterApproaching();

  if (progress <= 0.06) return null;

  return (
    <div
      aria-hidden={footerApproaching}
      inert={footerApproaching}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-70 flex justify-center px-4 pb-4.5 transition-[opacity,translate] duration-300 ease-out",
        footerApproaching
          ? "translate-y-2 opacity-0"
          : "translate-y-0 [animation:bar-up_.5s_var(--ease-expo)] opacity-100",
      )}
    >
      <div
        className={cn(
          "glass flex w-full max-w-[780px] items-center gap-2.5 rounded-full py-2 pr-3 pl-4.5",
          !footerApproaching && "pointer-events-auto",
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-fg-3 uppercase">
            {next.series ? "Next in series" : "Read next"}
          </p>
          <p className="mt-0.5 truncate text-[14px] font-semibold tracking-[-0.01em] text-fg-1">
            {next.title}
          </p>
        </div>

        <span className="hidden text-[12.5px] font-semibold whitespace-nowrap text-fg-3 md:inline">
          {Math.round(progress * 100)}%
        </span>

        <button
          type="button"
          onClick={() => setShareOpen(true)}
          aria-label="Share this post"
          className="inline-flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-1 bg-veil/70 text-fg-2 transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out"
        >
          <Share className="size-4" strokeWidth={1.75} />
        </button>

        <Link
          href={`/articles/${next.slug}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-on-ink transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.96] active:duration-150 active:ease-out"
        >
          Read next
          <ArrowRight className="size-[15px]" strokeWidth={1.75} />
        </Link>
      </div>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={post.title}
        url={`https://space.dev/articles/${post.slug}`}
      />
    </div>
  );
}
