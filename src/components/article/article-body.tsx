import { Info } from "lucide-react";

import { CodeBlock } from "@/components/article/code-block";
import type { ArticleBlock } from "@/lib/content";

/** Renders the block list a post is written in. */
export function ArticleBody({ blocks, id }: { blocks: ArticleBlock[]; id: string }) {
  return (
    <div id={id} className="max-w-[720px]">
      {blocks.map((block, index) => (
        <ArticleBlockView key={index} block={block} isFirst={index === 0} />
      ))}
    </div>
  );
}

function ArticleBlockView({ block, isFirst }: { block: ArticleBlock; isFirst: boolean }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p
          className={isFirst ? bodyText : `mt-5 ${bodyText}`}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "heading":
      return (
        <h2
          id={block.id}
          className="mt-11 scroll-mt-28 text-[30px] font-bold tracking-[-0.02em] text-fg-1"
        >
          {block.text}
        </h2>
      );

    case "list":
      return (
        <ul className="mt-4.5 flex list-disc flex-col gap-2 pl-5.5">
          {block.items.map((item) => (
            <li key={item} className="text-[18px] leading-[1.7] text-fg-prose">
              {item}
            </li>
          ))}
        </ul>
      );

    case "chart":
      return <ChartFigure block={block} />;

    case "formula":
      return (
        <div className="mt-7 rounded-lg border border-line-1 bg-bg-2 px-6.5 py-6 text-center">
          <p
            className="font-mono text-[17px] leading-[1.9] text-fg-prose"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
          <p className="mt-3.5 text-[13.5px] text-fg-3">{block.caption}</p>
        </div>
      );

    case "callout":
      return (
        <aside className="mt-7 flex gap-4 rounded-lg bg-tint-cornflower px-6 py-5.5">
          <span className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-bg-2 text-fg-link shadow-xs">
            <Info className="size-[17px]" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[14.5px] font-bold text-accent-indigo">{block.title}</p>
            <p className="mt-1.5 text-[15.5px] leading-[1.65] text-fg-prose">{block.body}</p>
          </div>
        </aside>
      );

    case "code":
      return <CodeBlock filename={block.filename} code={block.code} className="mt-6" />;

    case "footnotes":
      return (
        <div className="mt-10 border-t border-line-1 pt-5.5">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
            Footnotes
          </p>
          <ol className="mt-3.5 flex list-decimal flex-col gap-2 pl-5">
            {block.items.map((item) => (
              <li key={item} className="text-[14.5px] leading-[1.6] text-fg-2">
                {item}
              </li>
            ))}
          </ol>
        </div>
      );
  }
}

const bodyText = "text-[18px] leading-[1.75] text-fg-prose";

function ChartFigure({ block }: { block: Extract<ArticleBlock, { kind: "chart" }> }) {
  return (
    <figure className="mt-8 rounded-lg border border-line-1 bg-bg-2 px-6.5 pt-6.5 pb-5">
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
