"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

let mermaidPromise: Promise<typeof import("mermaid").default> | null = null;

/**
 * Mermaid is ~500KB, so it is imported on demand rather than bundled into every
 * article. The promise is module-level so several diagrams on one page share a
 * single download and a single initialize().
 */
function loadMermaid() {
  mermaidPromise ??= import("mermaid").then((mod) => mod.default);
  return mermaidPromise;
}

/** Reads design tokens so the diagram matches the surrounding article. */
function themeVariables() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    background: token("--color-bg-2", "#ffffff"),
    primaryColor: token("--color-tint-cornflower", "#e8f2fe"),
    primaryBorderColor: token("--color-brand", "#0062d2"),
    primaryTextColor: token("--color-fg-1", "#0f172a"),
    lineColor: token("--color-line-2", "#94a3b8"),
    secondaryColor: token("--color-tint-violet", "#e5f2ff"),
    tertiaryColor: token("--color-bg-3", "#f1f5f9"),
    fontSize: "15px",
  };
}

export function ArticleMermaid({
  code,
  caption,
  className,
}: {
  code: string;
  caption?: string;
  className?: string;
}) {
  const [svg, setSvg] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);
  const reactId = React.useId();

  React.useEffect(() => {
    let cancelled = false;
    // Mermaid ids must be valid CSS selectors; React's useId contains colons.
    const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

    const render = async () => {
      try {
        const mermaid = await loadMermaid();
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: themeVariables(),
          fontFamily: "inherit",
        });
        const { svg: rendered } = await mermaid.render(id, code);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    void render();

    // Re-render on theme change so the diagram's baked-in colours stay correct.
    const observer = new MutationObserver(() => void render());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [code, reactId]);

  if (failed) {
    // A broken diagram should not cost the reader the content, so fall back to
    // the source rather than rendering nothing.
    return (
      <figure className={cn("mt-8", className)}>
        <pre className="overflow-x-auto rounded-lg border border-line-1 bg-bg-2 p-4 font-mono text-[13px] text-fg-2">
          {code}
        </pre>
        <figcaption className="mt-3 text-[13.5px] text-fg-3">
          {caption ? `${caption} (diagram could not be rendered)` : "Diagram source"}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={cn("mt-8", className)}>
      <div className="overflow-x-auto rounded-lg border border-line-1 bg-bg-2 px-4 py-6">
        {svg ? (
          <div
            /* Mermaid emits width="100%" with no height, so the SVG needs a
               parent of definite width. A flex/min-w-fit parent sizes to its
               content, which makes the percentage circular and collapses it
               to 0x0. A plain block element resolves it against the column. */
            className="mermaid-figure w-full [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          // Reserve height so the surrounding paragraphs do not jump on load.
          <div className="flex h-[180px] items-center justify-center text-[13.5px] text-fg-3">
            Rendering diagram…
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[13.5px] leading-[1.6] text-fg-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
