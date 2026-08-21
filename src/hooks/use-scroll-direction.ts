"use client";

import * as React from "react";

export type ScrollDirection = "up" | "down";

type Options = {
  /** Distance from the top before hiding is allowed, so the top of the page never flickers. */
  threshold?: number;
  /** Minimum movement that counts as a direction change, which debounces micro-scrolls. */
  delta?: number;
};

/**
 * Scroll direction plus whether the page has moved past a threshold. Reads are
 * batched into a frame and the listener is passive, so scrolling stays smooth.
 *
 * This is a deliberate scroll listener, not an oversight. `isPast` and
 * `isAtTop` alone would be cheaper as IntersectionObserver sentinels, but the
 * header also needs *direction* to collapse on the way down and expand on the
 * way up, and an observer only fires at threshold crossings, so it cannot
 * report direction mid-page. Dropping direction would change the interaction,
 * so the listener stays: one handler, rAF-batched, `{ passive: true }`, state
 * only written when a value actually changes.
 */
export function useScrollDirection({ threshold = 50, delta = 10 }: Options = {}) {
  const [state, setState] = React.useState({
    direction: "up" as ScrollDirection,
    isPast: false,
    isAtTop: true,
  });

  React.useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const movement = y - lastY;

      setState((current) => {
        const direction =
          Math.abs(movement) >= delta ? (movement > 0 ? "down" : "up") : current.direction;
        const next = { direction, isPast: y > threshold, isAtTop: y < 20 };

        if (Math.abs(movement) >= delta) lastY = y;

        return next.direction === current.direction &&
          next.isPast === current.isPast &&
          next.isAtTop === current.isAtTop
          ? current
          : next;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold, delta]);

  return state;
}
