"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Border width in pixels. */
  borderWidth?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Shine colour(s). Defaults to the brand tokens so it tracks the theme. */
  shineColor?: string | string[];
}

/**
 * Animated gradient border. Absolutely positioned, so the parent needs
 * `relative` and a matching `rounded-*` (the border inherits its radius).
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = ["var(--color-brand)", "var(--color-accent-orchid)"],
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      aria-hidden
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent,transparent, ${
            Array.isArray(shineColor) ? shineColor.join(",") : shineColor
          },transparent,transparent)`,
          backgroundSize: "300% 300%",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine",
        className,
      )}
      {...props}
    />
  );
}
