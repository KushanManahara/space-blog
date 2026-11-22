"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { RatingLinks } from "@/components/reviews/rating-links";
import {
  inviteAllowed,
  isEngaged,
  markDismissed,
  markShown,
  notePageView,
  shownThisVisit,
} from "@/lib/review-invite";
import { cn } from "@/lib/utils";

/** Browsing pages only. Articles, series, reviews and task pages (contact, search…) never show it. */
const ALLOWED = [
  /^\/$/,
  /^\/latest(\/|$)/,
  /^\/about$/,
  /^\/topics(\/|$)/,
  /^\/tags(\/|$)/,
  /^\/paths(\/|$)/,
  /^\/corrections$/,
];

const DELAY_MS = 20_000;
const SCROLL_SHARE = 0.4;

export type InviteQuote = { text: string; name: string };

/**
 * Small, dismissible review invitation in the bottom-left corner (the
 * back-to-top button owns the bottom-right). Desktop and tablet only.
 *
 * Shows once per visit at most, and only to an engaged visitor (finished an
 * article before, or on their second page now), after 20 seconds on the page
 * and scrolling 40% of it. Stays out of the way while the homepage's own
 * newsletter or reviews section is on screen (`data-review-invite-quiet`).
 * Never takes focus; Escape or the close button dismisses it for 60 days.
 */
export function ReviewInviteFloat({ quote }: { quote: InviteQuote | null }) {
  const pathname = usePathname();
  const [eligible, setEligible] = React.useState(false);
  const [quiet, setQuiet] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  // A new page starts hidden again; reset during render, not in an effect.
  const [seenPath, setSeenPath] = React.useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setEligible(false);
  }

  React.useEffect(() => {
    const pages = notePageView();
    if (!ALLOWED.some((pattern) => pattern.test(pathname))) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (!inviteAllowed() || shownThisVisit("card") || shownThisVisit("float")) return;
    if (!isEngaged(pages)) return;

    let waited = false;
    let scrolled = false;
    const maybeShow = () => {
      if (!waited || !scrolled) return;
      markShown("float");
      setEligible(true);
      cleanup();
    };
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY / scrollable >= SCROLL_SHARE) {
        scrolled = true;
        maybeShow();
      }
    };
    const timer = window.setTimeout(() => {
      waited = true;
      maybeShow();
    }, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [pathname]);

  // Pause while a section that already asks for something is on screen.
  React.useEffect(() => {
    if (!eligible) return;
    const targets = document.querySelectorAll("[data-review-invite-quiet]");
    if (targets.length === 0) return;
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setQuiet(onScreen.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [eligible, pathname]);

  const dismiss = React.useCallback(() => {
    markDismissed();
    setDismissed(true);
  }, []);

  React.useEffect(() => {
    if (!eligible || dismissed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [eligible, dismissed, dismiss]);

  if (!eligible || dismissed) return null;

  return (
    <aside
      aria-label="Review invitation"
      className={cn(
        "fixed bottom-7 left-7 z-60 hidden w-[288px] rounded-lg border border-line-1 bg-bg-2 p-4 shadow-xl transition-[opacity,translate] duration-500 ease-expo motion-reduce:transition-none md:block print:hidden",
        "starting:translate-y-3 starting:opacity-0",
        quiet ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss review invitation"
        className="absolute top-2 right-2 rounded-full p-1.5 text-fg-3 transition-colors duration-300 ease-expo hover:bg-bg-3 hover:text-fg-1"
      >
        <X className="size-4" aria-hidden />
      </button>
      {quote ? (
        <figure className="pr-6">
          <blockquote className="line-clamp-3 text-[13.5px] leading-relaxed text-fg-2">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-1.5 text-[12.5px] font-semibold text-fg-3">
            {quote.name}, a reader
          </figcaption>
        </figure>
      ) : (
        <p className="pr-6 text-[14.5px] font-semibold text-fg-1">Enjoying Space?</p>
      )}
      <p className="mt-3 text-[13.5px] font-semibold text-fg-1">
        {quote ? "Add yours" : "Tell other readers what you think"}
      </p>
      <RatingLinks size="sm" className="mt-1.5" />
    </aside>
  );
}
