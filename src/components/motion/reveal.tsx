"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Grid items land in reading order. Capped so long lists never feel laggy. */
const STAGGER_STEP_MS = 55;
const STAGGER_MAX_STEPS = 5;

/**
 * `useLayoutEffect` warns when React renders it on the server, and this
 * component is server-rendered on every page. The effect only ever has work to
 * do in a browser, so it degrades to `useEffect` where there is no layout to
 * read.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * Scroll reveal used across the marketing surfaces. The hidden state is only
 * applied once this component has mounted (see `data-reveal-ready` in
 * globals.css), so content stays visible without JavaScript.
 *
 * Pass `index` for items in a grid or list to stagger their arrival; the delay
 * is a custom property, so `prefers-reduced-motion` still collapses it to zero
 * along with the rest of the reveal.
 */
export function Reveal({
  className,
  children,
  index,
  style,
  ...props
}: React.ComponentProps<"div"> & { index?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);

  /**
   * `useLayoutEffect`, not `useEffect`, and the viewport test matters.
   *
   * `data-reveal-ready` is a single flag on <html>, so the first Reveal to
   * mount — anywhere on the page, including far below the fold — switches on
   * the hidden state for every Reveal at once. Anything already painted by the
   * server then blinked out and animated back in, which for the h1 inside the
   * hero meant the LCP element was being un-painted on hydration and its real
   * paint deferred by an observer callback plus a 500ms transition.
   *
   * Elements already on screen at mount were rendered visible by the server and
   * must stay that way, so they are marked as arrived rather than observed.
   * Running before paint is what makes that safe: React flushes every layout
   * effect in the commit in one pass, so no Reveal can be hidden by a sibling
   * setting the flag first.
   */
  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const { top, bottom } = node.getBoundingClientRect();
    const alreadyOnScreen = top < window.innerHeight && bottom > 0;

    document.documentElement.dataset.revealReady = "true";

    if (alreadyOnScreen) {
      node.setAttribute("data-reveal", "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.02 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const delay =
    index === undefined ? undefined : Math.min(index, STAGGER_MAX_STEPS) * STAGGER_STEP_MS;

  return (
    <div
      ref={ref}
      data-reveal=""
      className={cn(className)}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties) : style}
      {...props}
    >
      {children}
    </div>
  );
}
