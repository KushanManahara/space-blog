"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { useCommandMenu } from "@/components/nav/command-menu";
import { MobileNav } from "@/components/nav/mobile-nav";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { primaryNav, routes, siteIdentity as site } from "@/lib/content/config";
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

const EASE = "cubic-bezier(0.25, 1, 0.5, 1)";
const MORPH_MS = 500;

type Box = { x: number; y: number; w: number; h: number };
const box = (el: HTMLElement | null): Box | undefined =>
  el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : undefined;

/** Each child's box relative to `parent`, whether or not `parent` is positioned. */
const childBoxes = (parent: HTMLElement | null): Box[] =>
  parent
    ? Array.from(parent.children, (child) => {
        const el = child as HTMLElement;
        const own = el.offsetParent === parent;
        return {
          x: el.offsetLeft - (own ? 0 : parent.offsetLeft),
          y: el.offsetTop - (own ? 0 : parent.offsetTop),
          w: el.offsetWidth,
          h: el.offsetHeight,
        };
      })
    : [];

/**
 * Reads where a running morph has got an element to — translate, uniform scale,
 * opacity — then cancels it so a new morph can take over from that point.
 * Tailwind's `translate-*`/`scale-*` use the individual CSS properties, not
 * `transform`, so hover lifts are unaffected.
 */
function takeOver(el: HTMLElement) {
  const style = getComputedStyle(el);
  const matrix = new DOMMatrixReadOnly(style.transform === "none" ? undefined : style.transform);
  const flight = { tx: matrix.e, ty: matrix.f, s: matrix.a || 1, opacity: Number(style.opacity) };
  el.getAnimations().forEach((animation) => animation.cancel());
  return flight;
}

/** Whether a group is in the bar in its resting state (call after `takeOver`). */
const isShown = (el: HTMLElement) => getComputedStyle(el).opacity !== "0" && el.offsetWidth > 0;

/**
 * Animates the bar's top → scrolled → collapsed changes without animating
 * layout.
 *
 * The pill used to transition `max-width`, padding, gaps and font sizes, so
 * every frame of a collapse re-laid-out the bar while it re-centred: a sticky
 * element moving under the reader, scored as layout shift on every page
 * (~0.017 CLS, the last source left on the site). Now the new layout applies
 * in one step and is animated back from where it was with transforms (FLIP):
 * the pill translates while its surface — a separate layer pinned to its
 * top-left — resizes, the brand translates and scales, and the link and action
 * groups that leave the bar fade out from where they stood. Offsets are read
 * with `offset*`, which ignore transforms, so a change that lands mid-animation
 * still measures true layout.
 */
function useHeaderMorph(state: string) {
  const navRef = React.useRef<HTMLElement>(null);
  const navBgRef = React.useRef<HTMLSpanElement>(null);
  const brandRef = React.useRef<HTMLAnchorElement>(null);
  const linksRef = React.useRef<HTMLDivElement>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);
  const last = React.useRef<Record<string, Box | undefined>>({});
  const lastButtons = React.useRef<Box[]>([]);
  const lastVisible = React.useRef<Record<string, boolean>>({});
  const previousState = React.useRef(state);

  React.useLayoutEffect(() => {
    if (previousState.current === state) return;
    previousState.current = state;

    const nav = navRef.current;
    const navBg = navBgRef.current;
    const old = last.current;
    if (!nav || !navBg || !old.nav) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timing = { duration: MORPH_MS, easing: EASE };

    // Scrolling can change state again before the last morph finishes. Each new
    // morph starts from where the running one has got to, not from the old
    // layout, or the bar would visibly jump by whatever was still in flight.
    const now = box(nav)!;
    const navFlight = takeOver(nav);
    const bgStyle = getComputedStyle(navBg);
    const bgFrom = { width: bgStyle.width, height: bgStyle.height };
    navBg.getAnimations().forEach((animation) => animation.cancel());
    nav.animate(
      [
        {
          transform: `translate(${old.nav.x - now.x + navFlight.tx}px, ${old.nav.y - now.y + navFlight.ty}px)`,
        },
        { transform: "none" },
      ],
      timing,
    );
    navBg.animate([bgFrom, { width: `${now.w}px`, height: `${now.h}px` }], timing);

    const brand = brandRef.current;
    const brandNow = box(brand);
    if (brand && brandNow && old.brand) {
      const flight = takeOver(brand);
      const scale = (old.brand.h * flight.s) / brandNow.h;
      brand.animate(
        [
          {
            transform: `translate(${old.brand.x - brandNow.x + flight.tx}px, ${old.brand.y - brandNow.y + flight.ty}px) scale(${scale})`,
          },
          { transform: "none" },
        ],
        timing,
      );
    }

    const actionsWereShown = lastVisible.current.actions;

    // Groups that can leave the bar: fade out from where they stood, or fade
    // in where they now are.
    for (const [key, el] of [
      ["links", linksRef.current],
      ["actions", actionsRef.current],
    ] as const) {
      if (!el) continue;
      const flight = takeOver(el);
      const visible = isShown(el);
      const was = lastVisible.current[key];
      lastVisible.current[key] = visible;
      const from = old[key];
      const to = box(el);
      if (was && !visible && from && to) {
        const dx = from.x - to.x + flight.tx;
        const dy = from.y - to.y + flight.ty;
        el.animate(
          [
            { opacity: flight.opacity, transform: `translate(${dx}px, ${dy}px)` },
            { opacity: 0, transform: `translate(${dx - 8}px, ${dy}px) scale(0.9)` },
          ],
          { duration: MORPH_MS * 0.5, easing: EASE },
        );
      } else if (!was && visible) {
        el.animate(
          [
            { opacity: 0, transform: "translateX(-8px) scale(0.9)" },
            { opacity: 1, transform: "none" },
          ],
          timing,
        );
      } else if (visible && from && to) {
        el.animate(
          [
            {
              transform: `translate(${from.x - to.x + flight.tx}px, ${from.y - to.y + flight.ty}px)`,
            },
            { transform: "none" },
          ],
          timing,
        );
      }
    }

    // The action buttons change size with the bar (38px → 34px, and the search
    // pill folds to a circle), which moves each one inside the group. Each is
    // started from its old place and size; scale follows height so the circles
    // stay round.
    const actions = actionsRef.current;
    if (actions && actionsWereShown && lastVisible.current.actions) {
      const nowButtons = childBoxes(actions);
      Array.from(actions.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const from = lastButtons.current[index];
        const to = nowButtons[index];
        if (!from || !to || to.h === 0 || from.h === 0) return;
        const flight = takeOver(el);
        const scale = (from.h * flight.s) / to.h;
        el.animate(
          [
            {
              transformOrigin: "top left",
              transform: `translate(${from.x - to.x + flight.tx}px, ${from.y - to.y + flight.ty}px) scale(${scale})`,
            },
            { transformOrigin: "top left", transform: "none" },
          ],
          timing,
        );
      });
    }
  }, [state]);

  // Where everything sits after each commit, for the next change to start from.
  React.useLayoutEffect(() => {
    lastButtons.current = childBoxes(actionsRef.current);
    last.current = {
      nav: box(navRef.current),
      brand: box(brandRef.current),
      links: box(linksRef.current),
      actions: box(actionsRef.current),
    };
    for (const [key, el] of [
      ["links", linksRef.current],
      ["actions", actionsRef.current],
    ] as const) {
      // While a fade is running, computed opacity is mid-animation; the morph
      // above has already recorded the resting state for that case.
      if (el && el.getAnimations().length === 0) lastVisible.current[key] = isShown(el);
    }
  });

  return { navRef, navBgRef, brandRef, linksRef, actionsRef };
}

export function SiteHeader() {
  const pathname = usePathname();
  const commandMenu = useCommandMenu();
  const { direction, isPast, isAtTop } = useScrollDirection({ threshold: 40, delta: 12 });
  const [hasFocus, setHasFocus] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const isScrolled = !isAtTop;
  // Keyboard users tabbing into the header or open mobile nav keep the bar expanded
  const isCollapsed = isPast && direction === "down" && !hasFocus && !mobileNavOpen;

  const { navRef, navBgRef, brandRef, linksRef, actionsRef } = useHeaderMorph(
    isCollapsed ? "collapsed" : isScrolled ? "scrolled" : "top",
  );

  const isActive = (href: string) =>
    href === routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-60 w-full px-4",
        "sm:px-[clamp(16px,4vw,40px)]",
        /*
         * A fixed layout height: the bar's top-of-page size. Collapsing on
         * scroll used to shrink this sticky box (77px → 59px, and taller for a
         * few frames while the pill narrowed and its contents wrapped), which
         * moved the whole document under the reader's thumb — measured as
         * ~0.03 CLS on every mobile scroll. The pill still animates inside; it
         * just no longer pushes anything. Click-through outside the pill.
         */
        "pointer-events-none h-[calc(env(safe-area-inset-top,0px)+68px)] sm:h-[calc(env(safe-area-inset-top,0px)+76px)] md:h-[calc(env(safe-area-inset-top,0px)+77px)]",
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
        ref={navRef}
        aria-label="Primary"
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
        }}
        className={cn(
          // Transparent border keeps the box model the surface layer below draws.
          "pointer-events-auto relative isolate mx-auto flex w-full items-center justify-between rounded-full border border-transparent",
          // Dynamic narrowing: shrinks on mobile to fit only the logo, and on desktop to max-w-140
          isCollapsed ? "max-w-[114px] sm:max-w-140" : "max-w-full sm:max-w-page",
          isCollapsed
            ? // min-h: the groups that leave the bar used to stay in the flow at
              // zero width but full height — the 34px actions on phones, the
              // 39px links from md — and that height set the pill's. Out of the
              // flow now, so it is held explicitly at the same 44px / 49px.
              "min-h-11 px-3 py-1 sm:pr-2 sm:pl-3.5 md:min-h-[49px]"
            : isScrolled
              ? "py-[7px] pr-2 pl-4.5"
              : "py-[9px] pr-2.5 pl-5.5",
        )}
      >
        {/* The pill's frosted surface, separate from its contents so it can
            resize while they translate (see useHeaderMorph). */}
        <span
          ref={navBgRef}
          aria-hidden
          className={cn(
            "absolute -top-px -left-px -z-10 h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-full border",
            "backdrop-blur-[24px] backdrop-saturate-[180%] transition-[background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isCollapsed
              ? "border-white/60 bg-white/75 shadow-[0_12px_32px_rgb(0_0_0/0.12),0_2px_6px_rgb(0_0_0/0.06),inset_0_1px_1px_rgb(255_255_255/0.95)] dark:border-white/12 dark:bg-[#070e22]/80 dark:shadow-[0_16px_36px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.14)]"
              : isScrolled
                ? "border-white/60 bg-white/70 shadow-[0_8px_24px_rgb(0_0_0/0.08),0_1px_3px_rgb(0_0_0/0.04),inset_0_1px_1px_rgb(255_255_255/0.85)] dark:border-white/12 dark:bg-[#070e22]/75 dark:shadow-[0_12px_28px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.12)]"
                : "border-white/50 bg-white/60 shadow-sm dark:border-white/10 dark:bg-[#070e22]/65 dark:shadow-[0_4px_16px_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]",
          )}
        />
        <Link
          ref={brandRef}
          href={routes.home}
          className={cn(
            "flex shrink-0 origin-top-left items-center",
            isCollapsed ? "mx-auto gap-2 sm:mx-0" : "gap-2.5",
          )}
        >
          <BrandMark size={isCollapsed ? 22 : 24} />
          <span
            className={cn(
              "font-display font-bold tracking-[-0.02em] text-fg-1",
              isCollapsed ? "text-[16.5px] sm:text-[18.5px]" : "text-[18.5px] sm:text-[19px]",
            )}
          >
            {site.name}
          </span>
        </Link>

        <div
          ref={linksRef}
          className={cn(
            "hidden overflow-hidden md:block",
            isCollapsed
              ? // Out of flow, so the pill narrows in one step (see useHeaderMorph).
                "pointer-events-none absolute opacity-0"
              : "max-w-[560px]",
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

        {/* Phones: stands in for the collapsed actions' auto margin, which
            used to take a share of the free space and set where the centred
            brand sits. */}
        <span aria-hidden className={cn("hidden", isCollapsed && "max-sm:ml-auto max-sm:block")} />
        <div
          ref={actionsRef}
          className={cn(
            "ml-auto flex shrink-0 items-center",
            isCollapsed
              ? // Phones collapse to the brand alone; the actions leave the flow.
                "pointer-events-none absolute right-3 opacity-0 sm:pointer-events-auto sm:static sm:gap-1.5 sm:opacity-100"
              : // Cap has to clear the widest expanded content (search pill +
                // toggle + studio + gaps ≈ 223px at md). At 200px the shrink-0
                // children spilled out of the nav pill. max-width only caps, so
                // the group still renders at its content width.
                "pointer-events-auto max-w-[320px] gap-2",
          )}
        >
          <button
            type="button"
            onClick={commandMenu.open}
            title="Search (⌘K)"
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-full border transition-[transform,box-shadow,color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
              "border-black/[0.06] bg-black/[0.03] text-fg-3 hover:-translate-y-px hover:bg-black/[0.06] hover:text-fg-2 hover:shadow-sm active:scale-[0.95]",
              "dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:hover:text-fg-1",
              isCollapsed
                ? "size-8.5 px-0 sm:size-[34px]"
                : // Icon-only at md: the six links leave no room for the label, which
                  // used to run "Contact" underneath the search pill.
                  "size-[38px] px-0 sm:h-[38px] sm:w-auto sm:gap-[9px] sm:pr-2 sm:pl-3.5 md:w-[38px] md:px-0 lg:w-auto lg:pr-2 lg:pl-3.5",
            )}
          >
            <Search
              className={cn("shrink-0", isCollapsed ? "size-3.5" : "size-4")}
              strokeWidth={1.75}
            />
            <span
              className={cn(
                "hidden text-[13px] whitespace-nowrap",
                isCollapsed ? null : "lg:inline-block",
              )}
            >
              Search
            </span>
            <span
              className={cn(
                "hidden rounded-xs border border-black/10 bg-black/5 px-[7px] py-0.5 text-[11.5px] font-semibold text-fg-3 dark:border-white/10 dark:bg-white/10",
                isCollapsed ? null : "sm:inline-block md:hidden lg:inline-block",
              )}
            >
              ⌘K
            </span>
          </button>

          <AnimatedThemeToggler
            className={cn(
              "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[transform,box-shadow,color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
              "border-black/[0.06] bg-black/[0.03] text-fg-3 hover:-translate-y-px hover:bg-black/[0.06] hover:text-fg-2 hover:shadow-sm active:scale-[0.95]",
              "dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:hover:text-fg-1",
              isCollapsed ? "size-8.5 sm:size-[34px]" : "size-[38px]",
            )}
          />

          <MobileNav
            isActive={isActive}
            onOpenChange={setMobileNavOpen}
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>
    </header>
  );
}
