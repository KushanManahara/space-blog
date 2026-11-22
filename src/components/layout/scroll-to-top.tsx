// src/components/layout/scroll-to-top.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * FLOATING SCROLL-TO-TOP BUTTON WITH CIRCULAR SCROLL PROGRESS INDICATOR
 * COMPLIES WITH ACCESSIBILITY (48PX TOUCH TARGET, KEYBOARD FOCUS, ARIA)
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isArticle = pathname?.startsWith("/articles/");
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

          // SHOW BUTTON ONLY AFTER USER SCROLLS DOWN (300PX THRESHOLD)
          setVisible(currentScroll > 300);

          // CALCULATE PERCENTAGE SCROLLED (0 TO 100)
          if (totalHeight > 0) {
            const pct = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setProgress(pct);
          } else {
            setProgress(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // INITIAL CHECK
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG PROGRESS RING GEOMETRY (RADIUS 18PX, CIRCUMFERENCE ~ 113.1PX)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(
        "fixed right-4 z-60 transition-all duration-300 ease-expo sm:right-7 sm:bottom-7",
        isArticle
          ? "bottom-[calc(env(safe-area-inset-bottom,0px)+5rem)]"
          : "bottom-[calc(env(safe-area-inset-bottom,0px)+1.25rem)]",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
        className={cn(
          "group relative flex size-11 items-center justify-center rounded-full border border-line-1/80 bg-bg-1/90 shadow-md backdrop-blur-xl transition-[transform,border-color,box-shadow,background-color] duration-300 ease-expo sm:size-12",
          "hover:-translate-y-0.5 hover:border-brand hover:bg-bg-1 hover:shadow-lg dark:hover:shadow-glow-sm",
          "active:scale-95 active:duration-150",
          "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
        )}
      >
        {/* SVG CIRCULAR PROGRESS INDICATOR */}
        <svg
          className="text-fg-muted/20 absolute inset-0 size-full -rotate-90 transition-all"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          {/* BACKGROUND TRACK */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-line-1/50 dark:text-line-1/30"
          />
          {/* ANIMATED PROGRESS FILL */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-brand transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* UP ARROW ICON */}
        <ArrowUp
          className="size-4.5 text-fg-2 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:text-brand sm:size-5"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
