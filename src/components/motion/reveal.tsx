"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Grid items land in reading order. Capped so long lists never feel laggy. */
const STAGGER_STEP_MS = 55;
const STAGGER_MAX_STEPS = 5;

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

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    document.documentElement.dataset.revealReady = "true";

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
