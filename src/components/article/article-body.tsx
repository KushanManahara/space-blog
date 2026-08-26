import * as React from "react";
import { Info } from "lucide-react";

import { CodeBlock } from "@/components/article/code-block";
import type { ArticleBlock } from "@/lib/content";

/**
 * Converts markdown inline syntax (**bold**, *italic*, `code`, [link](url), ~~strike~~)
 * to valid HTML strings while preserving any existing HTML tags.
 */
export function markdownToHtml(raw: string): string {
  if (!raw) return "";

  // Code spans come out first and go back in last. Otherwise the emphasis rules
  // chew through their contents: `GOOGLE_API_KEY` would render as GOOGLE<em>API</em>KEY.
  const codeSpans: string[] = [];
  const withoutCode = raw.replace(/`([^`]+)`/g, (_, code: string) => {
    codeSpans.push(code);
    return `\u0000${codeSpans.length - 1}\u0000`;
  });

  return (
    withoutCode
      // Links: [text](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-fg-link underline decoration-line-brand underline-offset-4 transition-colors hover:text-brand">$1</a>',
      )
      // Ensure raw HTML external links open in a new tab
      .replace(/<a\s+([^>]*href=["']https?:\/\/[^"']+["'][^>]*)>/gi, (match, attrs) => {
        if (/target\s*=/i.test(attrs)) return match;
        return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
      })
      // Bold: **text** or __text__
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-fg-1">$1</strong>')
      .replace(/__([^_]+)__/g, '<strong class="font-bold text-fg-1">$1</strong>')
      // Italic: *text* or _text_ (excluding inside HTML tags)
      .replace(/(^|[^\*])\*([^*]+)\*([^\*]|$)/g, '$1<em class="text-fg-prose italic">$2</em>$3')
      .replace(/(^|[^_])_([^_]+)_([^_]|$)/g, '$1<em class="text-fg-prose italic">$2</em>$3')
      // Strikethrough: ~~text~~
      .replace(/~~([^~]+)~~/g, '<del class="text-fg-3 line-through">$1</del>')
      // Inline code: restored verbatim
      .replace(
        /\u0000(\d+)\u0000/g,
        (_, index: string) =>
          `<code class="rounded border border-line-1 bg-bg-2 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-brand">${codeSpans[Number(index)]}</code>`,
      )
  );
}

/** Renders the clean, unboxed markdown article content. */
export function ArticleBody({ blocks, id }: { blocks: ArticleBlock[]; id: string }) {
  return (
    <div
      id={id}
      className="article-body-markdown w-full max-w-[780px] min-w-0 break-words text-fg-prose"
    >
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
      return (
        <div className="mt-8 overflow-x-auto rounded-lg border border-line-1 bg-bg-2 px-4 py-5 text-center sm:px-6.5 sm:py-6">
          <p
            className="font-mono text-[15px] leading-[1.8] text-fg-prose sm:text-[17px] sm:leading-[1.9]"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
          <p className="mt-3.5 text-[13px] text-fg-3 sm:text-[13.5px]">{block.caption}</p>
        </div>
      );

    case "callout":
      return (
        <aside className="mt-8 flex gap-3.5 rounded-lg bg-tint-cornflower p-4 sm:gap-4 sm:px-6 sm:py-5.5">
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

    case "code":
      return <CodeBlock filename={block.filename} code={block.code} className="mt-6" />;

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
                className="text-[14px] leading-[1.6] break-words text-fg-2 sm:text-[14.5px]"
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
    <figure className="mt-8 overflow-x-auto rounded-lg border border-line-1 bg-bg-2 p-4 sm:px-6.5 sm:pt-6.5 sm:pb-5">
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
