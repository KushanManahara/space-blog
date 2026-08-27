import katex from "katex";

import { cn } from "@/lib/utils";

/**
 * Display equation rendered with KaTeX.
 *
 * `renderToString` is synchronous, so this works unchanged in both the server
 * article and the client reader-mode view. `throwOnError: false` means a typo
 * in the source shows the offending TeX in red rather than taking the page
 * down with it.
 */
export function ArticleFormula({
  tex,
  html,
  caption,
  className,
}: {
  tex?: string;
  html?: string;
  caption: string;
  className?: string;
}) {
  const rendered = tex
    ? katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
        strict: false,
        // Default output emits a MathML layer alongside the visual HTML, which
        // is what screen readers actually read. "html" alone drops it.
        output: "htmlAndMathml",
      })
    : null;

  return (
    <figure
      className={cn(
        "mt-8 w-full max-w-full min-w-0 rounded-lg border border-line-1 bg-bg-2 px-4 py-6 sm:px-6.5",
        className,
      )}
    >
      {rendered ? (
        // KaTeX sizes itself; the wrapper only needs to allow a long equation
        // to scroll rather than force the article sideways.
        <div
          className="katex-figure overflow-x-auto overflow-y-hidden py-1 text-center text-fg-prose"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      ) : (
        <p
          className="text-center font-mono text-[15px] leading-[1.8] text-fg-prose sm:text-[17px] sm:leading-[1.9]"
          dangerouslySetInnerHTML={{ __html: html ?? "" }}
        />
      )}
      <figcaption className="mt-4 text-center text-[13px] leading-[1.6] text-fg-3 sm:text-[13.5px]">
        {caption}
      </figcaption>
    </figure>
  );
}
