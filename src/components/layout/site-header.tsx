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
  const { direction, isPast, isAtTop } = useScrollDirection({ threshold: 40, delta: 12 });
  const [hasFocus, setHasFocus] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const isScrolled = !isAtTop;
  // Keyboard users tabbing into the header or open mobile nav keep the bar expanded
  const isCollapsed = isPast && direction === "down" && !hasFocus && !mobileNavOpen;

  const isActive = (href: string) =>
    href === routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <div
      className={cn(
        "sticky top-0 z-60 w-full px-4 transition-[padding] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "sm:px-[clamp(16px,4vw,40px)]",
        isScrolled
          ? "pt-[calc(env(safe-area-inset-top,0px)+0.375rem)] sm:pt-2.5"
          : "pt-[calc(env(safe-area-inset-top,0px)+0.625rem)] sm:pt-4.5",
      )}
    >
      {/*
        Progressive blur behind the bar, scoped to header height + iOS safe area
        so page headings, cards, and content below remain 100% sharp.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(env(safe-area-inset-top,0px)+5rem)] overflow-hidden"
      >
        {BLUR_LAYERS.map((layer) => (
          <span
            key={layer.radius}
            className="progressive-blur-layer"
            style={
              {
                "--pb-height": "calc(env(safe-area-inset-top, 0px) + 80px)",
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
          "mx-auto flex w-full items-center justify-between rounded-full border transition-[max-width,padding,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Dynamic narrowing: shrinks on mobile to 285px and desktop to max-w-140; expands to 100% on mobile and max-w-page on desktop
          isCollapsed ? "max-w-[285px] sm:max-w-140" : "max-w-full sm:max-w-page",
          // Refined frosted glass surface
          "backdrop-blur-[24px] backdrop-saturate-[180%]",
          isCollapsed
            ? "border-white/60 bg-white/75 py-1 pr-1.5 pl-3.5 shadow-[0_12px_32px_rgb(0_0_0/0.12),0_2px_6px_rgb(0_0_0/0.06),inset_0_1px_1px_rgb(255_255_255/0.95)] dark:border-white/12 dark:bg-[#070e22]/80 dark:shadow-[0_16px_36px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.14)]"
            : isScrolled
              ? "border-white/60 bg-white/70 py-[7px] pr-2 pl-4.5 shadow-[0_8px_24px_rgb(0_0_0/0.08),0_1px_3px_rgb(0_0_0/0.04),inset_0_1px_1px_rgb(255_255_255/0.85)] dark:border-white/12 dark:bg-[#070e22]/75 dark:shadow-[0_12px_28px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.12)]"
              : "border-white/50 bg-white/60 py-[9px] pr-2.5 pl-5.5 shadow-sm dark:border-white/10 dark:bg-[#070e22]/65 dark:shadow-[0_4px_16px_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]",
        )}
      >
        <Link
          href={routes.home}
          className={cn(
            "flex shrink-0 items-center transition-[gap] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isCollapsed ? "gap-2" : "gap-2.5",
          )}
        >
          <BrandMark size={isCollapsed ? 22 : 24} />
          <span
            className={cn(
              "font-display font-bold tracking-[-0.02em] text-fg-1 transition-[font-size] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
              isCollapsed ? "text-[16.5px] sm:text-[18.5px]" : "text-[18.5px] sm:text-[19px]",
            )}
          >
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
                    ? "bg-black/[0.06] text-fg-1 dark:bg-white/[0.08]"
                    : "text-fg-2 hover:bg-black/[0.04] hover:text-fg-1 dark:hover:bg-white/[0.05]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "ml-auto flex shrink-0 items-center transition-[gap] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isCollapsed ? "gap-1.5" : "gap-2",
          )}
        >
          <button
            type="button"
            onClick={commandMenu.open}
            title="Search (⌘K)"
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-full border transition-[width,height,padding,transform,box-shadow,color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
              "border-black/[0.06] bg-black/[0.03] text-fg-3 hover:-translate-y-px hover:bg-black/[0.06] hover:text-fg-2 hover:shadow-sm active:scale-[0.95]",
              "dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:hover:text-fg-1",
              isCollapsed
                ? "size-8.5 px-0 sm:size-[34px]"
                : "size-[38px] px-0 sm:h-[38px] sm:w-auto sm:gap-[9px] sm:pr-2 sm:pl-3.5",
            )}
          >
            <Search className={cn("shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]", isCollapsed ? "size-3.5" : "size-4")} strokeWidth={1.75} />
            <span
              className={cn(
                "hidden overflow-hidden text-[13px] whitespace-nowrap transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:inline-block",
                isCollapsed ? "max-w-0 opacity-0" : "max-w-20 opacity-100",
              )}
            >
              Search
            </span>
            <span
              className={cn(
                "hidden rounded-[7px] border border-black/10 bg-black/5 px-[7px] py-0.5 text-[11.5px] font-semibold text-fg-3 transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] dark:border-white/10 dark:bg-white/10 sm:inline-block",
                isCollapsed ? "sm:hidden" : "sm:inline-block",
              )}
            >
              ⌘K
            </span>
          </button>

          <AnimatedThemeToggler
            className={cn(
              "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[width,height,transform,box-shadow,color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
              "border-black/[0.06] bg-black/[0.03] text-fg-3 hover:-translate-y-px hover:bg-black/[0.06] hover:text-fg-2 hover:shadow-sm active:scale-[0.95]",
              "dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:hover:text-fg-1",
              isCollapsed ? "size-8.5 sm:size-[34px]" : "size-[38px]",
            )}
          />

          <Link
            href={routes.studio}
            title="Studio"
            className={cn(
              "hidden shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[width,height,transform,box-shadow,color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:inline-flex",
              "border-black/[0.06] bg-black/[0.03] text-fg-3 hover:-translate-y-px hover:bg-black/[0.06] hover:text-fg-2 hover:shadow-sm active:scale-[0.95]",
              "dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:hover:text-fg-1",
              isCollapsed ? "size-8.5 sm:size-[34px]" : "size-[38px]",
            )}
          >
            <LayoutGrid className={cn("transition-transform duration-300", isCollapsed ? "size-3.5" : "size-4")} strokeWidth={1.75} />
            <span className="sr-only">Studio</span>
          </Link>

          <MobileNav
            isActive={isActive}
            onOpenChange={setMobileNavOpen}
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>
    </div>
  );
}
