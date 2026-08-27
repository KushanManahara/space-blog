"use client";

import * as React from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

import { languageFromFilename } from "@/components/article/code-language";
import { Prism } from "@/components/article/prism-languages";
import { cn } from "@/lib/utils";

/**
 * Panel colours are fixed rather than token-driven: the code surface is dark in
 * both themes, so the syntax palette only has to work against one background.
 */
const theme: PrismTheme = {
  plain: { color: "#e2e8f0", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "cdata"], style: { color: "#64748b", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#94a3b8" } },
    { types: ["keyword", "selector", "changed"], style: { color: "#c4b5fd" } },
    { types: ["operator"], style: { color: "#93c5fd" } },
    { types: ["string", "char", "attr-value", "inserted"], style: { color: "#86efac" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#fdba74" } },
    { types: ["function", "class-name", "builtin"], style: { color: "#7dd3fc" } },
    { types: ["variable", "parameter"], style: { color: "#f9a8d4" } },
    { types: ["tag", "deleted"], style: { color: "#fca5a5" } },
    { types: ["attr-name", "property"], style: { color: "#a5b4fc" } },
    { types: ["namespace"], style: { opacity: 0.7 } },
  ],
};

/** Dark code panel with syntax highlighting and a copy affordance. */
export function CodeBlock({
  filename,
  code,
  className,
}: {
  filename: string;
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const language = languageFromFilename(filename);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn("w-full max-w-full min-w-0 overflow-hidden rounded-lg shadow-md", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-n-950 px-4 py-2.5 sm:px-4.5 sm:py-3">
        <span className="truncate font-mono text-[12px] text-white/55 sm:text-[12.5px]">
          {filename}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {language !== "plain" ? (
            <span className="hidden font-mono text-[11px] tracking-[0.08em] text-white/35 uppercase sm:inline">
              {language}
            </span>
          ) : null}
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-7.5 shrink-0 cursor-pointer items-center justify-center rounded px-3 text-[12px] font-semibold text-white/60 transition-[background-color,color,transform] duration-200 ease-expo hover:bg-white/10 hover:text-white active:scale-95"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <Highlight prism={Prism} theme={theme} code={code} language={language}>
        {({ className: preClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              "w-full max-w-full min-w-0 overflow-x-auto bg-n-900 p-3.5 font-mono text-[12.5px] leading-[1.8] sm:p-5.5 sm:text-[13.5px] sm:leading-[1.85]",
              preClass,
            )}
            // The theme carries `backgroundColor: transparent`, and an inline
            // style beats the utility class — which left light text on the page
            // background in light mode. Drop it so `bg-n-900` wins.
            style={{ ...style, backgroundColor: undefined }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
