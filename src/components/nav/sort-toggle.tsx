import Link from "next/link";
import { ArrowDownWideNarrow } from "lucide-react";

import { sortLabels, type SortOrder } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Flips between “Most recent” and “Most viewed”. */
export function SortToggle({
  value,
  href,
  className,
}: {
  value: SortOrder;
  href: string;
  className?: string;
}) {
  const next: SortOrder = value === "recent" ? "views" : "recent";

  return (
    <Link
      href={href}
      scroll={false}
      title={`Sort by ${sortLabels[next].toLowerCase()}`}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-4 py-2.5 text-[13px] font-semibold text-fg-2 transition-shadow duration-300 ease-expo hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out",
        className,
      )}
    >
      <ArrowDownWideNarrow className="size-3.5" strokeWidth={1.75} />
      {sortLabels[value]}
    </Link>
  );
}
