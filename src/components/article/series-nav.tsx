import type { Series } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Sidebar list of the parts in a series, with the current part marked. */
export function SeriesNav({ series, currentPart }: { series: Series; currentPart: number }) {
  return (
    <section className="rounded-lg border border-line-1 bg-bg-2 p-5.5">
      <p className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">Series</p>
      <h2 className="mt-3 text-[15.5px] font-bold text-fg-1">{series.title}</h2>

      <ol className="mt-3.5 flex flex-col gap-2.5">
        {series.parts.map((part, index) => {
          const isCurrent = index + 1 === currentPart;

          return (
            <li key={part} className="flex items-start gap-3">
              <span
                className={cn(
                  "inline-flex size-5.5 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold",
                  isCurrent ? "bg-brand text-on-brand" : "bg-bg-3 text-fg-2",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "text-[14px] leading-[1.4]",
                  isCurrent ? "font-bold text-fg-1" : "text-fg-2",
                )}
              >
                {part}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
