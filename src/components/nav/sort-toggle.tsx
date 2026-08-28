import Link from "next/link";
import { ArrowDownWideNarrow } from "lucide-react";

import { sortLabels, type SortOrder } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Cycles the sort order.
 *
 * Two-way by default — “Most recent” / “Most viewed” — and the labels come from
 * `sortLabels`. Surfaces with their own set of orders (series sort by parts as
 * well) pass `label` and `nextLabel` instead.
 */
export function SortToggle({
  value,
  href,
  label,
  nextLabel,
  className,
}: {
  value: string;
  href: string;
  label?: string;
  nextLabel?: string;
  className?: string;
}) {
  const isDefaultOrder = value === "recent" || value === "views";
  const currentLabel = label ?? (isDefaultOrder ? sortLabels[value as SortOrder] : value);
  const next =
    nextLabel ?? (isDefaultOrder ? sortLabels[value === "recent" ? "views" : "recent"] : undefined);

  return (
    <Link
      href={href}
      scroll={false}
      title={next ? `Sort by ${next.toLowerCase()}` : undefined}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-4 py-2.5 text-[13px] font-semibold text-fg-2 transition-[transform,box-shadow,color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:border-line-2 hover:text-fg-1 hover:shadow-xs active:scale-[0.95] active:duration-150 active:ease-out",
        className,
      )}
    >
      <ArrowDownWideNarrow className="size-3.5" strokeWidth={1.75} />
      {currentLabel}
    </Link>
  );
}
