"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Search } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { useCommandMenu } from "@/components/nav/command-menu";
import { MobileNav } from "@/components/nav/mobile-nav";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { primaryNav, routes, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Floating glass navigation. It tightens and gains depth once the page scrolls,
 * then collapses to the brand and primary actions while the reader scrolls down —
 * scrolling up (or returning to the top) expands it again.
 */
/**
 * Blur radius doubles per layer while each mask stops shorter than the last,
 * so the top of the strip gets every layer compounded and the bottom gets only
 * the 1px one on its way out. Effective blur at the top is about
 * sqrt(1 + 4 + 16 + 64 + 256), roughly 18px, decaying to zero by 220px.
 * `fade` runs well past `solid` on every layer: the wide feather is what stops
 * any single layer registering as a band.
 */
const BLUR_LAYERS = [
  { radius: "1px", solid: "40%", fade: "100%" },
  { radius: "2px", solid: "28%", fade: "75%" },
  { radius: "4px", solid: "16%", fade: "55%" },
  { radius: "8px", solid: "8%", fade: "38%" },
  { radius: "12px", solid: "0%", fade: "22%" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const commandMenu = useCommandMenu();
  const { direction, isPast, isAtTop } = useScrollDirection({ threshold: 50, delta: 10 });
  const [hasFocus, setHasFocus] = React.useState(false);

  const isScrolled = !isAtTop;
  // Keyboard users tabbing into the header keep the full bar, collapsed or not.
  const isCollapsed = isPast && direction === "down" && !hasFocus;

  const isActive = (href: string) =>
    href === routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <div
      className={cn(
        "sticky top-0 z-60 px-4 transition-[padding] duration-500 ease-expo",
        "sm:px-[clamp(16px,4vw,40px)]",
        isScrolled ? "pt-2.5" : "pt-4.5",
      )}
    >
      {/*
        Progressive blur behind the bar, tightly scoped to header height (80px)
        so page headings, cards, and content below remain 100% sharp.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20">
        {BLUR_LAYERS.map((layer) => (
          <span
            key={layer.radius}
            className="progressive-blur-layer"
            style={
              {
                "--pb-height": "80px",
                "--pb-radius": layer.radius,
                "--pb-solid": layer.solid,
                "--pb-fade": layer.fade,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <nav
        aria-label="Primary"
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
        }}
        className={cn(
          "mx-auto flex w-full items-center gap-2.5 rounded-full border transition-[max-width,padding,background-color,box-shadow,border-color] duration-500 ease-expo",
          isCollapsed ? "max-w-140" : "max-w-page",
          isScrolled
            ? "border-line-1 bg-veil/85 py-[7px] pr-2 pl-4.5 shadow-[var(--shadow-lg),0_1px_2px_rgb(15_23_42/0.06),inset_0_1px_0_rgb(255_255_255/0.75)] backdrop-blur-[24px] backdrop-saturate-[180%]"
            : "border-line-1 bg-veil/90 py-[9px] pr-2.5 pl-5.5 shadow-sm backdrop-blur-[14px] backdrop-saturate-140",
        )}
      >
        <Link href={routes.home} className="flex shrink-0 items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-[19px] font-bold tracking-[-0.02em] text-fg-1">
            {site.name}
          </span>
        </Link>

        <div
          className={cn(
            "hidden overflow-hidden transition-[max-width,opacity,transform] duration-500 ease-expo md:block",
            isCollapsed
              ? "pointer-events-none max-w-0 -translate-x-2 opacity-0"
              : "max-w-[460px] translate-x-0 opacity-100",
          )}
          // Links keep their tab order out of the way while the bar is collapsed.
          inert={isCollapsed}
        >
          <div className="ml-6.5 flex gap-0.5">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-[15px] py-[9px] text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ease-expo",
                  isActive(item.href)
                    ? "bg-bg-3 text-fg-1"
                    : "text-fg-2 hover:bg-veil/60 hover:text-fg-1",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={commandMenu.open}
            title="Search (⌘K)"
            className="inline-flex h-[38px] cursor-pointer items-center gap-[9px] rounded-full border border-line-1 bg-bg-2 pr-2 pl-3.5 text-fg-3 transition-[transform,box-shadow,color] duration-300 ease-bounce hover:-translate-y-px hover:text-fg-2 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out"
          >
            <Search className="size-4" strokeWidth={1.75} />
            <span
              className={cn(
                "hidden overflow-hidden text-[13px] whitespace-nowrap transition-[max-width,opacity] duration-500 ease-expo md:inline-block",
                isCollapsed ? "max-w-0 opacity-0" : "max-w-20 opacity-100",
              )}
            >
              Search
            </span>
            <span className="rounded-[7px] border border-line-1 bg-bg-3 px-[7px] py-1 text-[11.5px] font-semibold text-fg-3">
              ⌘K
            </span>
          </button>

          <AnimatedThemeToggler className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-3 transition-[transform,box-shadow,color] duration-300 ease-bounce hover:-translate-y-px hover:text-fg-2 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out" />

          <Link
            href={routes.studio}
            title="Studio"
            className="hidden size-[38px] shrink-0 items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-3 transition-[transform,box-shadow,color] duration-300 ease-bounce hover:-translate-y-px hover:text-fg-2 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out md:inline-flex"
          >
            <LayoutGrid className="size-4" strokeWidth={1.75} />
            <span className="sr-only">Studio</span>
          </Link>

          <MobileNav isActive={isActive} />
        </div>
      </nav>
    </div>
  );
}
