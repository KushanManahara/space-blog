"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Dark code panel with a copy affordance in the filename bar. */
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
      <div className="flex items-center justify-between border-b border-white/8 bg-n-950 px-4 py-2.5 sm:px-4.5 sm:py-3">
        <span className="truncate font-mono text-[12px] text-white/55 sm:text-[12.5px]">
          {filename}
        </span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 cursor-pointer px-2 py-1 text-[12px] font-semibold text-white/55 transition-colors duration-300 ease-expo hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-n-900 p-3.5 sm:p-5.5">
        <code className="font-mono text-[12.5px] leading-[1.8] text-n-200 sm:text-[13.5px] sm:leading-[1.85]">
          {code}
        </code>
      </pre>
    </div>
  );
}
