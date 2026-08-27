import type { ComponentProps, CSSProperties } from "react";

import { cn } from "@/lib/utils";

export interface GlareHoverProps extends ComponentProps<"div"> {
  /** Glare colour. Defaults to a token-driven highlight that works in both themes. */
  glare?: string;
  /** Gradient angle in degrees. */
  angle?: number;
  /** Glare tile size as a percentage of the element. */
  size?: number;
  /** Sweep duration in milliseconds. */
  duration?: number;
}

/**
 * Diagonal light sweep on hover, drawn with a ::before gradient.
 *
 * Deliberately transparent by default: it wraps existing surfaces rather than
 * painting its own background, so the card underneath keeps its own tokens.
 * `--glare-tint` is defined in globals.css and flips with the theme.
 */
export function GlareHover({
  children,
  className,
  glare = "var(--glare-tint)",
  angle = -45,
  size = 250,
  duration = 750,
  style,
  ...props
}: GlareHoverProps) {
  const cssVars = {
    "--gh-angle": `${angle}deg`,
    "--gh-duration": `${duration}ms`,
    "--gh-size": `${size}%`,
    "--gh-glare": glare,
    ...style,
  } as CSSProperties;

  return (
    <div
      {...props}
      style={cssVars}
      className={cn(
        "relative overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:z-20 before:bg-no-repeat before:content-['']",
        "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-glare)_70%,transparent,transparent_100%)]",
        "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
        "before:[background-position:-100%_-100%,0_0]",
        "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
        "hover:before:[background-position:100%_100%,0_0]",
        // The sweep is decoration, not information.
        "motion-reduce:before:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
