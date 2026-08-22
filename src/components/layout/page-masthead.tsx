import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Visual badge container for page masthead cards: Apple Blue gradient, grid pattern,
 * sheen overlay, and high-contrast centered icon or monogram.
 */
export function MastheadBadge({
  children,
  icon: Icon,
  className,
}: {
  children?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
}) {
  return (
    <div className={cn("relative size-full", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#38BDF8_0%,#007AFF_60%,#0A2540_100%)]">
        <div className="cover-sheen absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.12)_1px,transparent_1px)] bg-[length:22px_22px]" />
      </div>
      <div className="relative z-10 flex size-full items-center justify-center">
        {Icon ? (
          <Icon className="size-8 text-white/90 sm:size-9" strokeWidth={1.75} />
        ) : (
          <span className="font-display text-[32px] font-bold tracking-tight text-white/90 sm:text-[36px]">
            {children}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Standardized horizontal hero / masthead card across routes.
 *
 * Layout:
 * - Container: Wide horizontal card with rounded-2xl / rounded-3xl, shadow, border, and backdrop-blur.
 * - Left: Fixed-size square container (rounded-2xl) for avatar, initials, or icon graphic.
 * - Center: Pill badge, bold headline, and 1-2 lines of descriptive text.
 * - Right: Action button group (Primary solid pill CTA + Secondary outline pill CTA).
 */
export function PageMasthead({
  eyebrow,
  title,
  description,
  meta,
  media,
  actions,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative mx-auto max-w-page px-gutter pt-[clamp(28px,4.5vw,48px)]", className)}
    >
      <Reveal className="flex flex-col justify-between gap-6 rounded-2xl border border-line-1 bg-bg-2 p-6 shadow-lg backdrop-blur-md sm:p-7 md:p-8 lg:flex-row lg:items-center lg:gap-8 lg:p-9">
        <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-center md:gap-6">
          {media ? (
            <div className="size-20 shrink-0 overflow-hidden rounded-xl shadow-md sm:size-24 md:size-26 [&>*]:size-full">
              {media}
            </div>
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full bg-tint-cornflower px-3 py-1 text-[12px] font-semibold text-fg-link">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="text-[20px] leading-snug font-bold tracking-[-0.02em] text-fg-1 sm:text-[22px] md:text-[24px] lg:text-[26px]">
              {title}
            </h1>

            {description ? (
              <p className="max-w-[620px] text-[14.5px] leading-[1.65] text-fg-2 md:text-[15.5px]">
                {description}
              </p>
            ) : null}

            {meta ? (
              <div className="mt-1 flex items-center gap-2 text-[13px] text-fg-3">{meta}</div>
            ) : null}

            {children}
          </div>
        </div>

        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>
        ) : null}
      </Reveal>
    </section>
  );
}
