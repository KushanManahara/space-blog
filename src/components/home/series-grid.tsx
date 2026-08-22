import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { seriesList, type Series } from "@/lib/content";
import { cn } from "@/lib/utils";

const seriesTone = [
  "bg-tint-violet text-brand-strong",
  "bg-tint-cornflower text-fg-link",
  "bg-tint-orchid text-accent-orchid",
] as const;

/**
 * Series read as ladders, not as cards: each one is a full-width row that
 * names its parts and shows how far the arc has got. The card-grid family is
 * already spent on `LatestWriting` further up the page.
 */
export function SeriesGrid() {
  return (
    <section>
      <div className="mx-auto max-w-page px-gutter py-band">
        <Reveal className="mb-7.5">
          <h2 className="text-h2 text-fg-1">Series</h2>
          <p className="mt-2.5 text-[16.5px] text-fg-2">Longer arguments, split into parts.</p>
        </Reveal>

        <div>
          {seriesList.map((series, index) => (
            <SeriesRow
              key={series.slug}
              series={series}
              index={index}
              tone={seriesTone[index % seriesTone.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SeriesRow({ series, tone, index }: { series: Series; tone: string; index: number }) {
  return (
    <Reveal index={index}>
      <Link
        href={`/articles?series=${series.slug}`}
        className="group grid gap-x-8 gap-y-5 border-b border-line-1 py-7 transition-colors duration-300 ease-expo hover:border-line-2 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
      >
        <div className="flex items-start gap-4">
          <span
            className={cn(
              "inline-flex size-[46px] shrink-0 items-center justify-center rounded-md text-[15px] font-bold",
              tone,
            )}
          >
            {series.partCount}
          </span>
          <div>
            <h3 className="text-[20px] leading-[1.25] font-bold tracking-[-0.015em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
              {series.title}
            </h3>
            <p className="mt-1.5 text-[14.5px] leading-[1.6] text-fg-2">{series.dek}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand">
              {series.status}
              <ArrowRight className="size-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

        <ol className="flex flex-col gap-1.5">
          {series.parts.map((part, index) => {
            const done = index + 1 <= series.currentPart;
            return (
              <li key={part} className="flex items-center gap-3 text-[14px]">
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-[19px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold",
                    done ? "bg-brand text-on-brand" : "border border-line-2 text-fg-faint",
                  )}
                >
                  {done ? <Check className="size-3" strokeWidth={3} /> : index + 1}
                </span>
                <span className={cn("leading-[1.45]", done ? "text-fg-1" : "text-fg-3")}>
                  {part}
                </span>
              </li>
            );
          })}
        </ol>
      </Link>
    </Reveal>
  );
}
