import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** Compact page list: 1, 2, 3, …, last. */
function pageWindow(page: number, total: number): Array<number | "gap"> {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1);
  const head: Array<number | "gap"> = [1, 2, 3];
  if (page > 3 && page < total) head[2] = page;
  return [...head, "gap", total];
}

export function Pagination({
  page,
  total,
  hrefFor,
  align = "between",
  className,
}: {
  page: number;
  total: number;
  hrefFor: (page: number) => string;
  align?: "between" | "center";
  className?: string;
}) {
  const pages = pageWindow(page, total);

  const numbers = (
    <div className="flex items-center gap-1.5">
      {pages.map((entry, index) =>
        entry === "gap" ? (
          <span key={`gap-${index}`} className="px-1.5 text-[14px] text-fg-2">
            …
          </span>
        ) : (
          <Link
            key={entry}
            href={hrefFor(entry)}
            scroll={false}
            aria-current={entry === page ? "page" : undefined}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-full text-[14px] font-semibold transition-colors duration-300 ease-expo",
              entry === page ? "bg-ink text-on-ink" : "text-fg-2 hover:bg-bg-3",
            )}
          >
            {entry}
          </Link>
        ),
      )}
    </div>
  );

  if (align === "center") {
    return (
      <nav aria-label="Pagination" className={cn("flex justify-center", className)}>
        {numbers}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-between gap-4", className)}
    >
      <PageStep direction="previous" href={hrefFor(Math.max(1, page - 1))} disabled={page === 1} />
      {numbers}
      <PageStep
        direction="next"
        href={hrefFor(Math.min(total, page + 1))}
        disabled={page === total}
      />
    </nav>
  );
}

function PageStep({
  direction,
  href,
  disabled,
}: {
  direction: "previous" | "next";
  href: string;
  disabled: boolean;
}) {
  const label = direction === "previous" ? "Previous" : "Next";
  const icon =
    direction === "previous" ? (
      <ArrowLeft className="size-[15px]" strokeWidth={1.75} />
    ) : (
      <ArrowRight className="size-[15px]" strokeWidth={1.75} />
    );

  if (disabled) {
    return (
      <span aria-disabled className="inline-flex items-center gap-2 text-[14px] text-fg-3">
        {direction === "previous" ? icon : null}
        {label}
        {direction === "next" ? icon : null}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "inline-flex items-center gap-2 text-[14px] transition-colors duration-300 ease-expo hover:text-fg-1",
        direction === "next" ? "font-semibold text-fg-1" : "text-fg-3",
      )}
    >
      {direction === "previous" ? icon : null}
      {label}
      {direction === "next" ? icon : null}
    </Link>
  );
}
