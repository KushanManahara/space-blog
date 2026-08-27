"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "glass" | "inverse" | "ink";

export interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: Variant;
  /** Renders the label only on hover-capable widths; useful in tight rails. */
  iconOnly?: boolean;
}

/**
 * Label slides out, an expanding dot floods the button, and the label returns
 * with an arrow.
 *
 * The dot becomes the whole surface once it scales up, so `dot` and `hoverText`
 * must be a readable pair — not the pair the resting button uses. Every variant
 * here floods with one half of a token contrast pair and writes the other half
 * on top, which keeps it legible in both themes.
 */
const VARIANTS: Record<Variant, { base: string; dot: string; hoverText: string }> = {
  primary: {
    base: "border border-brand/90 bg-brand text-on-brand shadow-glow-sm hover:shadow-glow-md",
    dot: "bg-on-brand",
    hoverText: "text-brand",
  },
  secondary: {
    base: "border border-line-2 bg-bg-2 text-fg-1 hover:shadow-md",
    dot: "bg-brand",
    hoverText: "text-on-brand",
  },
  glass: {
    base: "glass text-fg-1 hover:shadow-md",
    dot: "bg-brand",
    hoverText: "text-on-brand",
  },
  inverse: {
    base: "bg-white text-n-900 hover:shadow-lg",
    dot: "bg-brand",
    hoverText: "text-on-brand",
  },
  ink: {
    base: "bg-ink text-on-ink hover:shadow-md",
    dot: "bg-on-ink",
    hoverText: "text-ink",
  },
};

export function InteractiveHoverButton({
  children,
  className,
  href,
  variant = "primary",
  ...props
}: InteractiveHoverButtonProps) {
  const tokens = VARIANTS[variant];

  const content = (
    <>
      <span className="flex items-center justify-center gap-2">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full transition-all duration-300 ease-out group-hover/ihb:scale-[120] group-hover/ihb:opacity-100",
            tokens.dot,
          )}
        />
        <span className="inline-block transition-all duration-300 ease-out group-hover/ihb:translate-x-8 group-hover/ihb:opacity-0">
          {children}
        </span>
      </span>
      <span
        className={cn(
          "absolute inset-0 z-10 flex size-full translate-x-6 items-center justify-center gap-2 opacity-0 transition-all duration-300 ease-out group-hover/ihb:translate-x-0 group-hover/ihb:opacity-100",
          tokens.hoverText,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="size-4 shrink-0" strokeWidth={2} />
      </span>
    </>
  );

  const classes = cn(
    "group/ihb relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-[26px] py-[14px] text-center text-[15px] font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 active:scale-[0.96] active:duration-150 active:ease-out disabled:pointer-events-none disabled:opacity-60",
    tokens.base,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
