"use client";

import * as React from "react";

import type { CodeLine } from "@/components/article/code-highlight";
import { languageFromFilename } from "@/components/article/code-language";
import { plainCodeStyle, tokenStyle } from "@/components/article/code-theme";
import { cn } from "@/lib/utils";

/** Dark code panel with syntax highlighting and a copy affordance. */
export function CodeBlock({
  filename,
  code,
  lines,
  label,
  className,
}: {
  filename: string;
  code: string;
  /** Pre-highlighted tokens (`highlightCode`); the block itself never tokenises. */
  lines: CodeLine[];
  /** Accessible name for the scrollable region; defaults to the filename. */
  label?: string;
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
      <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-n-950 px-4 py-2.5 sm:px-4.5 sm:py-3 print:border-neutral-300 print:bg-neutral-100">
        <span className="truncate font-mono text-[12px] text-white/55 sm:text-[12.5px] print:font-semibold print:text-neutral-800">
          {filename}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {language !== "plain" ? (
            <span className="hidden font-mono text-[11px] tracking-[0.08em] text-white/60 uppercase sm:inline print:inline print:text-neutral-600">
              {language}
            </span>
          ) : null}
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-7.5 shrink-0 cursor-pointer items-center justify-center rounded px-3 text-[12px] font-semibold text-white/60 transition-[background-color,color,transform] duration-200 ease-expo hover:bg-white/10 hover:text-white active:scale-95 print:hidden"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <pre
        // Scrollable, so it has to be keyboard-focusable (WCAG 2.1.1).
        tabIndex={0}
        role="region"
        aria-label={label ?? `${filename} code`}
        className={cn(
          "w-full max-w-full min-w-0 overflow-x-auto bg-n-900 p-3.5 font-mono text-[12.5px] leading-[1.8] sm:p-5.5 sm:text-[13.5px] sm:leading-[1.85]",
          `language-${language}`,
        )}
        style={plainCodeStyle}
      >
        {lines.map((line, i) => (
          <div key={i} className="token-line">
            {line.map(([content, ...types], key) => (
              <span key={key} style={tokenStyle(types)}>
                {content}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}
