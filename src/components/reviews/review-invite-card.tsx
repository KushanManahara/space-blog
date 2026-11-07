"use client";

import * as React from "react";
import { X } from "lucide-react";

import { RatingLinks } from "@/components/reviews/rating-links";
import {
  inviteAllowed,
  markDismissed,
  markShown,
  noteArticleFinished,
  shownThisVisit,
} from "@/lib/review-invite";

/**
 * End-of-article review invitation. Placed after the article, so only a
 * reader who got there sees it. Reaching it also counts as finishing the
 * article, which is what later makes the floating invitation eligible.
 * Subject to the shared limit in `lib/review-invite.ts`.
 */
export function ReviewInviteCard() {
  const sentinel = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    // Decided once, on mount: hidden for anyone already invited or done.
    const allowed = inviteAllowed() && !shownThisVisit("float");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        noteArticleFinished();
        if (allowed) {
          markShown("card");
          setVisible(true);
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinel} className="print:hidden">
      {visible && (
        <aside
          aria-label="Review invitation"
          className="relative mt-9 flex flex-col gap-3 overflow-hidden rounded-lg border border-line-brand bg-tint-cornflower p-5 shadow-glow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="pr-8 sm:pr-0">
            <p className="text-[16px] font-semibold text-fg-1">Was this useful?</p>
            <p className="mt-1 text-[14px] leading-relaxed text-fg-2">
              A short review helps other readers find Space.
            </p>
          </div>
          <RatingLinks className="sm:mr-8" />
          <button
            type="button"
            onClick={() => {
              markDismissed();
              setVisible(false);
            }}
            aria-label="Dismiss review invitation"
            className="absolute top-3 right-3 tap-target rounded-full p-1.5 text-fg-3 transition-colors duration-300 ease-expo hover:bg-bg-3 hover:text-fg-1"
          >
            <X className="size-4" aria-hidden />
          </button>
        </aside>
      )}
    </div>
  );
}
