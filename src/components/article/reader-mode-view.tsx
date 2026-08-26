"use client";

import * as React from "react";
import { AlignLeft, BookOpen, Check, Minus, Plus, Type, X } from "lucide-react";

import { ArticleBody } from "@/components/article/article-body";
import {
  useReaderMode,
  type ReaderColumnWidth,
  type ReaderFontFamily,
  type ReaderFontSize,
  type ReaderTheme,
} from "@/components/article/reader-mode-provider";
import { AuthorAvatar } from "@/components/author/author-byline";
import { author, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const THEME_STYLES: Record<
  ReaderTheme,
  { bg: string; text: string; headerBg: string; border: string; prose: string }
> = {
  system: {
    bg: "bg-bg-1",
    text: "text-fg-1",
    headerBg: "bg-bg-1/90 border-line-1",
    border: "border-line-1",
    prose: "text-fg-prose",
  },
  sepia: {
    bg: "bg-[#FBF0D9]",
    text: "text-[#433422]",
    headerBg: "bg-[#FBF0D9]/90 border-[#EADAC0]",
    border: "border-[#EADAC0]",
    prose: "text-[#5C4A34]",
  },
  slate: {
    bg: "bg-[#0F172A]",
    text: "text-[#F8FAFC]",
    headerBg: "bg-[#0F172A]/90 border-[#1E293B]",
    border: "border-[#1E293B]",
    prose: "text-[#CBD5E1]",
  },
  oled: {
    bg: "bg-black",
    text: "text-white",
    headerBg: "bg-black/90 border-[#222222]",
    border: "border-[#222222]",
    prose: "text-[#E2E8F0]",
  },
};

const FONT_FAMILY_CLASSES: Record<ReaderFontFamily, string> = {
  sans: "font-sans",
  serif: "font-serif font-normal",
  mono: "font-mono font-normal",
};

const FONT_SIZE_CLASSES: Record<ReaderFontSize, { body: string; title: string; heading: string }> =
  {
    sm: {
      body: "text-[16px] leading-[1.75]",
      title: "text-[32px] md:text-[40px]",
      heading: "text-[24px]",
    },
    md: {
      body: "text-[18px] leading-[1.8]",
      title: "text-[38px] md:text-[48px]",
      heading: "text-[28px]",
    },
    lg: {
      body: "text-[20px] leading-[1.85]",
      title: "text-[42px] md:text-[54px]",
      heading: "text-[32px]",
    },
    xl: {
      body: "text-[22px] leading-[1.9]",
      title: "text-[46px] md:text-[60px]",
      heading: "text-[36px]",
    },
  };

const COLUMN_WIDTH_CLASSES: Record<ReaderColumnWidth, string> = {
  narrow: "max-w-[620px]",
  standard: "max-w-[740px]",
  wide: "max-w-[880px]",
};

export function ReaderModeView({ post }: { post: Post }) {
  const {
    isReaderMode,
    setIsReaderMode,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    columnWidth,
    setColumnWidth,
  } = useReaderMode();

  const [isExiting, setIsExiting] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [showTypographyMenu, setShowTypographyMenu] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleClose = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsReaderMode(false);
    }, 260);
  }, [setIsReaderMode]);

  // Handle escape key inside view
  React.useEffect(() => {
    if (!isReaderMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReaderMode, handleClose]);

  // Calculate scroll progress inside reader mode
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const total = scrollHeight - clientHeight;
    setScrollProgress(total > 0 ? Math.min(1, Math.max(0, scrollTop / total)) : 0);
  };

  // Close typography menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowTypographyMenu(false);
      }
    };
    if (showTypographyMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showTypographyMenu]);

  if (!isReaderMode && !isExiting) return null;

  const currentTheme = THEME_STYLES[theme];
  const currentFont = FONT_FAMILY_CLASSES[fontFamily];
  const currentSizes = FONT_SIZE_CLASSES[fontSize];
  const currentWidth = COLUMN_WIDTH_CLASSES[columnWidth];

  const fontSizes: ReaderFontSize[] = ["sm", "md", "lg", "xl"];
  const currentSizeIndex = fontSizes.indexOf(fontSize);

  const decreaseFontSize = () => {
    if (currentSizeIndex > 0) {
      setFontSize(fontSizes[currentSizeIndex - 1]);
    }
  };

  const increaseFontSize = () => {
    if (currentSizeIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentSizeIndex + 1]);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "fixed inset-0 z-100 overflow-y-auto transition-colors duration-300 selection:bg-brand/25",
        isExiting ? "animate-focus-overlay-out pointer-events-none" : "animate-focus-overlay-in",
        currentTheme.bg,
        currentTheme.text,
        currentFont,
      )}
    >
      {/* Top sticky progress & toolbar */}
      <div
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300",
          isExiting ? "opacity-0" : "animate-focus-toolbar-in",
          currentTheme.headerBg,
        )}
      >
        {/* Progress Bar */}
        <div
          className="h-1 bg-brand transition-all duration-150 ease-out"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />

        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 pr-4">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <BookOpen className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-semibold">{post.title}</p>
              <p className="text-[11px] opacity-70">
                {Math.round(scrollProgress * 100)}% read · {post.readingMinutes} min read
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Theme Switcher Pills */}
            <div className="hidden items-center gap-1 rounded-full border bg-black/5 p-1 sm:flex dark:bg-white/5">
              {(["system", "sepia", "slate", "oled"] as ReaderTheme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={cn(
                    "cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium capitalize transition-all",
                    theme === t
                      ? "bg-brand font-semibold text-white shadow-xs"
                      : "opacity-70 hover:opacity-100",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Typography Popover Toggle */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setShowTypographyMenu((prev) => !prev)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
                  showTypographyMenu
                    ? "border-brand bg-brand text-white"
                    : "hover:bg-black/5 dark:hover:bg-white/5",
                )}
                aria-label="Typography settings"
              >
                <Type className="size-4" />
                <span>Aa</span>
              </button>

              {showTypographyMenu ? (
                <div
                  className={cn(
                    "absolute right-0 z-50 mt-2 w-[min(288px,calc(100vw-32px))] [animation:fade-in_.2s_ease-out] rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all",
                    theme === "sepia"
                      ? "border-[#EADAC0] bg-[#F7EBD3] text-[#433422]"
                      : theme === "oled"
                        ? "border-[#2A2A2A] bg-[#111111] text-white"
                        : theme === "slate"
                          ? "border-[#334155] bg-[#1E293B] text-white"
                          : "border-line-1 bg-bg-2 text-fg-1",
                  )}
                >
                  <p className="text-[12px] font-bold tracking-wider uppercase opacity-60">
                    Text Appearance
                  </p>

                  {/* Theme for Mobile (hidden on desktop where top bar pills show) */}
                  <div className="mt-3.5 sm:hidden">
                    <p className="mb-2 text-[13px] font-medium">Theme</p>
                    <div className="grid grid-cols-4 gap-1">
                      {(["system", "sepia", "slate", "oled"] as ReaderTheme[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTheme(t)}
                          className={cn(
                            "cursor-pointer rounded-lg border px-1 py-1.5 text-center text-[11px] font-medium capitalize transition-all",
                            theme === t
                              ? "border-brand bg-brand font-semibold text-white"
                              : "hover:bg-black/5 dark:hover:bg-white/5",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="mt-3.5 flex items-center justify-between border-t pt-3.5 sm:border-t-0 sm:pt-0">
                    <span className="text-[13px] font-medium">Size</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={decreaseFontSize}
                        disabled={currentSizeIndex === 0}
                        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/5"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-[12px] font-bold uppercase">
                        {fontSize}
                      </span>
                      <button
                        type="button"
                        onClick={increaseFontSize}
                        disabled={currentSizeIndex === fontSizes.length - 1}
                        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/5"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="mt-4 border-t pt-3.5">
                    <p className="mb-2 text-[13px] font-medium">Typeface</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: "sans", label: "Sans", font: "font-sans" },
                          { id: "serif", label: "Serif", font: "font-serif" },
                          { id: "mono", label: "Mono", font: "font-mono" },
                        ] as const
                      ).map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFontFamily(f.id)}
                          className={cn(
                            "cursor-pointer rounded-lg border px-2 py-1.5 text-center text-[12.5px] transition-all",
                            f.font,
                            fontFamily === f.id
                              ? "border-brand bg-brand font-semibold text-white"
                              : "hover:bg-black/5 dark:hover:bg-white/5",
                          )}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column Width */}
                  <div className="mt-4 border-t pt-3.5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[13px] font-medium">Width</span>
                      <AlignLeft className="size-3.5 opacity-60" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["narrow", "standard", "wide"] as ReaderColumnWidth[]).map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setColumnWidth(w)}
                          className={cn(
                            "cursor-pointer rounded-lg border px-2 py-1.5 text-center text-[12px] capitalize transition-all",
                            columnWidth === w
                              ? "border-brand bg-brand font-semibold text-white"
                              : "hover:bg-black/5 dark:hover:bg-white/5",
                          )}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Exit Reader Mode */}
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[13px] font-semibold text-on-ink shadow-sm transition-transform active:scale-95"
            >
              <span>Done</span>
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Distraction-Free Article Content */}
      <main
        className={cn(
          "mx-auto px-6 py-12 md:py-20",
          currentWidth,
          isExiting ? "animate-focus-canvas-out" : "animate-focus-canvas-in",
        )}
      >
        {/* Article Metadata Header */}
        <header className="mb-10 border-b border-current/10 pb-8 md:mb-14">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-brand/15 px-3 py-1 text-[12px] font-semibold text-brand">
              {post.topic}
            </span>
            <span className="text-[13px] opacity-70">
              {formatDate(post.publishedAt, "long")} · {post.readingMinutes} min read
            </span>
          </div>

          <h1 className={cn("leading-[1.12] font-bold tracking-[-0.03em]", currentSizes.title)}>
            {post.title}
          </h1>

          <p className="mt-5 text-[20px] leading-[1.5] font-normal opacity-80 md:text-[22px]">
            {post.dek}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <AuthorAvatar className="size-10 text-[14px]" />
            <div>
              <p className="text-[14px] font-bold">{author.name}</p>
              <p className="text-[12px] opacity-70">{author.role}</p>
            </div>
          </div>
        </header>

        {/* Unboxed Markdown Body Content */}
        <div className={cn("reader-mode-body", currentSizes.body, currentTheme.prose)}>
          <ArticleBody id="reader-article-body" blocks={post.body} />
        </div>

        {/* Footer Completion Banner */}
        <footer className="mt-16 border-t border-current/10 pt-10 text-center md:mt-24">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Check className="size-6" />
          </div>
          <h3 className="text-[20px] font-bold">You’ve finished reading</h3>
          <p className="mt-1 text-[14px] opacity-70">
            Written by {author.name} · {post.topic}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[14px] font-semibold text-on-ink shadow-md transition-transform active:scale-95"
          >
            Return to Article Page
            <X className="size-4" />
          </button>
        </footer>
      </main>
    </div>
  );
}
