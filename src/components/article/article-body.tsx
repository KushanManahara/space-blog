"use client";

import * as React from "react";
import { Info, PencilLine } from "lucide-react";

import { useArticleAudio } from "@/components/article/article-audio-provider";
import { ArticleFormula } from "@/components/article/article-formula";
import { ArticleGraph } from "@/components/article/article-graph";
import { ArticleImage } from "@/components/article/article-image";
import { ArticleMermaid } from "@/components/article/article-mermaid";
import { ArticleTable } from "@/components/article/article-table";
import { CodeBlock } from "@/components/article/code-block";
import { markdownToHtml } from "@/components/article/markdown";
import { RunnableCode } from "@/components/article/runnable-code";
import type { ArticleBlock } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Renders the clean, unboxed markdown article content. */
export function ArticleBody({ blocks, id }: { blocks: ArticleBlock[]; id: string }) {
  const audio = useArticleAudio();
  const activeBlockIndex = audio?.currentSegment?.blockIndex;
  const isAudioActive = audio?.isAudioActive ?? false;

  return (
    <div
      id={id}
      className="article-body-markdown w-full max-w-[780px] min-w-0 break-words text-fg-prose"
    >
      {blocks.map((block, index) => {
        const isActive = isAudioActive && activeBlockIndex === index;
        return (
          <div
            key={index}
            id={`article-block-${index}`}
            data-audio-block-index={index}
            className={cn(
              "transition-[box-shadow,background-color,border-color] duration-300 rounded-xl",
              isActive && "ring-2 ring-brand/40 bg-brand/[0.04] p-3 -mx-3 dark:ring-brand/35 dark:bg-brand/[0.08]",
            )}
          >
            <ArticleBlockView block={block} isFirst={index === 0} />
          </div>
        );
      })}
    </div>
  );
}

function ArticleBlockView({ block, isFirst }: { block: ArticleBlock; isFirst: boolean }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p
          className={isFirst ? bodyText : `mt-6 ${bodyText}`}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(block.html) }}
        />
      );

    case "heading":
      return (
        <h2
          id={block.id}
          className="mt-12 mb-4 scroll-mt-28 text-[24px] font-bold tracking-[-0.02em] break-words text-fg-1 sm:text-[28px] md:text-[32px]"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(block.text) }}
        />
      );

    case "list":
      return (
        <ul className="mt-5 flex list-disc flex-col gap-2.5 pl-5 sm:pl-6">
          {block.items.map((item, idx) => (
            <li
              key={idx}
              className="text-[16px] leading-[1.7] break-words text-fg-prose sm:text-[17.5px] sm:leading-[1.75]"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(item) }}
            />
          ))}
        </ul>
      );

    case "chart":
      return <ChartFigure block={block} />;

    case "formula":
      return <ArticleFormula tex={block.tex} html={block.html} caption={block.caption} />;

    case "callout":
      return (
        <aside className="mt-8 flex w-full max-w-full min-w-0 gap-3.5 rounded-lg bg-tint-cornflower p-4 sm:gap-4 sm:px-6 sm:py-5.5">
          <span className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-bg-2 text-fg-link shadow-xs">
            <Info className="size-[17px]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="text-[14.5px] font-bold text-accent-indigo"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(block.title) }}
            />
            <p
              className="mt-1.5 text-[15px] leading-[1.6] text-fg-prose sm:text-[15.5px] sm:leading-[1.65]"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(block.body) }}
            />
          </div>
        </aside>
      );

    case "correction":
      return (
        <aside className="mt-8 w-full max-w-full min-w-0 border-l-[3px] border-fg-1 bg-bg-2 py-4 pr-4 pl-4 sm:py-5 sm:pr-6 sm:pl-6">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <PencilLine className="size-[15px] text-fg-1" strokeWidth={2} />
            <p className="text-[12px] font-bold tracking-[0.16em] text-fg-1 uppercase">
              Correction
            </p>
            <time dateTime={block.date} className="text-[12.5px] font-medium text-fg-3">
              {formatDate(block.date)}
            </time>
          </div>
          {block.was ? (
            <p className="mt-3 text-[14.5px] leading-[1.6] text-fg-3 line-through">{block.was}</p>
          ) : null}
          <p
            className="mt-2 text-[15px] leading-[1.65] text-fg-prose sm:text-[15.5px]"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(block.note) }}
          />
        </aside>
      );

    case "code":
      return block.runnable ? (
        <RunnableCode filename={block.filename} code={block.code} className="mt-6" />
      ) : (
        <CodeBlock filename={block.filename} code={block.code} className="mt-6" />
      );

    case "figure":
      return (
        <ArticleGraph
          variant={block.variant}
          title={block.title}
          caption={block.caption}
          note={block.note}
          xKey={block.xKey}
          xLabel={block.xLabel}
          yLabel={block.yLabel}
          series={block.series}
          data={block.data}
        />
      );

    case "mermaid":
      return <ArticleMermaid code={block.code} caption={block.caption} />;

    case "image":
      return (
        <ArticleImage
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          width={block.width}
          height={block.height}
          wide={block.wide}
        />
      );

    case "table":
      return (
        <ArticleTable
          headers={block.headers}
          rows={block.rows}
          caption={block.caption}
          numericColumns={block.numericColumns}
        />
      );

    case "footnotes":
      return (
        <div className="mt-12 border-t border-line-1 pt-6">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
            Footnotes
          </p>
          <ol className="mt-3.5 flex list-decimal flex-col gap-2 pl-5">
            {block.items.map((item, idx) => (
              <li
                key={idx}
                className="text-[13px] leading-[1.6] break-words text-fg-3"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(item) }}
              />
            ))}
          </ol>
        </div>
      );
  }
}

const bodyText =
  "text-[17px] sm:text-[18px] leading-[1.75] sm:leading-[1.8] text-fg-prose font-normal break-words";

function ChartFigure({ block }: { block: Extract<ArticleBlock, { kind: "chart" }> }) {
  return (
    <figure className="mt-8 w-full max-w-full min-w-0 overflow-x-auto rounded-lg border border-line-1 bg-bg-2 p-4 sm:px-6.5 sm:pt-6.5 sm:pb-5">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <figcaption className="text-[14.5px] font-bold text-fg-1">{block.title}</figcaption>
        <p className="text-[12.5px] text-fg-3">{block.note}</p>
      </div>

      <div
        className="mt-6 grid h-[190px] items-end gap-3.5"
        style={{ gridTemplateColumns: `repeat(${block.bars.length}, minmax(0, 1fr))` }}
      >
        {block.bars.map((bar) => (
          <div
            key={bar.label}
            className="flex h-full flex-col justify-end gap-2"
            style={{ height: `${bar.heightPercent}%` }}
          >
            <p className="text-center text-[12px] font-semibold text-fg-2">{bar.value}</p>
            <div
              className="h-full rounded-[8px_8px_3px_3px]"
              style={{ background: `linear-gradient(180deg, ${bar.from}, ${bar.to})` }}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-3 grid gap-3.5 text-center text-[12px] text-fg-3"
        style={{ gridTemplateColumns: `repeat(${block.bars.length}, minmax(0, 1fr))` }}
      >
        {block.bars.map((bar) => (
          <span key={bar.label}>{bar.label}</span>
        ))}
      </div>

      <p className="mt-4 border-t border-line-1 pt-3.5 text-[13.5px] leading-[1.6] text-fg-3">
        {block.caption}
      </p>
    </figure>
  );
}
