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
    <div className={cn("overflow-hidden rounded-lg shadow-md", className)}>
      <div className="flex items-center justify-between border-b border-white/8 bg-n-950 px-4.5 py-3">
        <span className="font-mono text-[12.5px] text-white/55">{filename}</span>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer text-[12px] font-semibold text-white/55 transition-colors duration-300 ease-expo hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-n-900 p-5.5">
        <code className="font-mono text-[13.5px] leading-[1.85] text-n-200">{code}</code>
      </pre>
    </div>
  );
}
