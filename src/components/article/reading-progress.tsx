"use client";

import * as React from "react";

type ReadingProgress = { progress: number; activeHeadingId: string | null };

const ReadingProgressContext = React.createContext<ReadingProgress>({
  progress: 0,
  activeHeadingId: null,
});

/**
 * Tracks how far the article body has scrolled and which heading is in view.
 * One listener feeds the top bar, the table of contents and the reading bar.
 */
export function ReadingProgressProvider({
  bodyId,
  headingIds,
  children,
}: {
  bodyId: string;
  headingIds: string[];
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<ReadingProgress>({
    progress: 0,
    activeHeadingId: headingIds[0] ?? null,
  });

  // Which heading is current is a pure visibility question, so it rides an
  // IntersectionObserver rather than measuring every heading on every frame.
  React.useEffect(() => {
    const headings = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.boundingClientRect.top < 0 || entry.isIntersecting);
        }
        // The active heading is the last one whose top has passed the line.
        let active = headingIds[0] ?? null;
        for (const id of headingIds) {
          if (seen.get(id)) active = id;
        }
        setState((current) =>
          current.activeHeadingId === active ? current : { ...current, activeHeadingId: active },
        );
      },
      // A band across the upper third: a heading becomes current once it
      // crosses it, and stays current until the next one does.
      { rootMargin: "0px 0px -65% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [headingIds]);

  // Percentage read is a continuous value that the TOC and the reading rail
  // render as a number, so it stays on a scroll listener by design. CSS
  // `animation-timeline` could drive the bar's width off the main thread, but
  // it cannot hand a number back to JavaScript, and polling computed styles
  // per frame would cost more than this does. One listener, rAF-batched,
  // `{ passive: true }`, shared through context by all three consumers.
  React.useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const body = document.getElementById(bodyId);
      if (!body) return;

      const rect = body.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollable = Math.max(1, rect.height - viewport * 0.5);
      const progress = Math.min(1, Math.max(0, (viewport * 0.5 - rect.top) / scrollable));

      setState((current) =>
        Math.abs(current.progress - progress) < 0.004 ? current : { ...current, progress },
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [bodyId]);

  return <ReadingProgressContext value={state}>{children}</ReadingProgressContext>;
}

export function useReadingProgress(): ReadingProgress {
  return React.use(ReadingProgressContext);
}

/** Thin accent bar pinned to the very top of the viewport. */
export function ReadingProgressBar() {
  const { progress } = useReadingProgress();

  return (
    <div
      aria-hidden
      // Sits below the notch rather than under it: at top:0 the bar is a 3px
      // indicator hidden behind the Dynamic Island on every notched phone.
      className="fixed top-[env(safe-area-inset-top,0px)] left-0 z-90 h-[3px] rounded-r-[3px] transition-[width] duration-100 ease-linear"
      style={{ width: `${Math.round(progress * 100)}%`, background: "var(--gradient-accent)" }}
    />
  );
}
