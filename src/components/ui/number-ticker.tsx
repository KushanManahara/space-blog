"use client";

import { useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

export interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
}

/**
 * A count that animates up to its value when scrolled into view.
 *
 * The rendered fallback is the real number, not the animation's starting
 * point. It used to render `startValue`, so the server sent "Browse all 0
 * posts" and "0 articles published" and only JavaScript corrected them —
 * which meant a crawler, a reader with scripting off, or anyone who never
 * scrolled the element into view saw a claim of zero. The animation now
 * overwrites a value that was already true.
 */
export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const format = useCallback(
    (input: number) =>
      Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(input.toFixed(decimalPlaces))),
    [decimalPlaces],
  );

  // Only rewind to the animation's starting point once it is clear the
  // animation can actually run. Without this the correct server-rendered
  // number would be replaced by a 0 that never moves if the spring never
  // starts.
  useEffect(() => {
    if (!isInView || !ref.current) return;
    ref.current.textContent = format(direction === "down" ? value : startValue);
  }, [isInView, direction, value, startValue, format]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value);
      }, delay * 1000);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    [springValue, format],
  );

  return (
    <span
      ref={ref}
      className={cn("inline-block tracking-tight text-fg-1 tabular-nums", className)}
      {...props}
    >
      {format(value)}
    </span>
  );
}
