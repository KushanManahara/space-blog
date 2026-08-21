"use client";

import { useReadingProgress } from "@/components/article/reading-progress";
import { cn } from "@/lib/utils";

/** “On this page” with live progress and the active heading highlighted. */
export function TableOfContents({ headings }: { headings: Array<{ id: string; text: string }> }) {
  const { progress, activeHeadingId } = useReadingProgress();
  const percent = Math.round(progress * 100);

  return (
    <nav aria-label="On this page" className="rounded-lg border border-line-1 bg-bg-2 p-5.5">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-fg-1">On this page</h2>
        <span className="text-[12px] text-fg-3">{percent}%</span>
      </div>

      <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-bg-3">
        <div
          className="h-full transition-[width] duration-100 ease-linear"
          style={{ width: `${percent}%`, background: "var(--gradient-accent)" }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            aria-current={heading.id === activeHeadingId ? "location" : undefined}
            className={cn(
              "rounded-sm px-3 py-2 text-[14px] leading-[1.45] transition-[background-color,color] duration-300 ease-expo",
              heading.id === activeHeadingId
                ? "bg-tint-violet font-semibold text-brand-strong"
                : "text-fg-2 hover:text-fg-1",
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
