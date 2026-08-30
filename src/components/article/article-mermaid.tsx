"use client";

import * as React from "react";
import { Check, Copy, Maximize2, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Diagram rendering.
 *
 * Article diagrams are authored as Mermaid and displayed in Excalidraw's
 * hand-drawn style. There is no editor and nothing here is interactive beyond
 * viewing: the scene is converted once and exported to a static SVG.
 *
 * Two constraints shape the code below.
 *
 * 1. `@excalidraw/mermaid-to-excalidraw` and this component share one Mermaid
 *    singleton. The library caches the config it last applied and skips
 *    re-initialising when it looks unchanged, so anything that calls
 *    `mermaid.initialize` while a conversion is in flight silently changes the
 *    DOM the library is about to measure. Mermaid is therefore only touched on
 *    the fallback path, and all diagram work is serialised through `queue`.
 *
 * 2. Mermaid 11.14 began prefixing subgraph cluster ids with the render id,
 *    which the library's subgraph lookup does not expect — every subgraph then
 *    throws and the diagram silently degrades to a flat bitmap. Mermaid is
 *    pinned to 11.13.0 (see the `pnpm.overrides` entry) until upstream catches
 *    up. `pnpm why mermaid` should report a single version.
 */

type MermaidModule = typeof import("mermaid").default;

type ExcalidrawBundle = {
  parseMermaidToExcalidraw: typeof import("@excalidraw/mermaid-to-excalidraw").parseMermaidToExcalidraw;
  exportToSvg: typeof import("@excalidraw/excalidraw").exportToSvg;
  convertToExcalidrawElements: typeof import("@excalidraw/excalidraw").convertToExcalidrawElements;
};

let mermaidPromise: Promise<MermaidModule> | null = null;
let excalidrawPromise: Promise<ExcalidrawBundle> | null = null;

function loadMermaid() {
  mermaidPromise ??= import("mermaid").then((mod) => mod.default);
  return mermaidPromise;
}

function loadExcalidraw() {
  excalidrawPromise ??= Promise.all([
    import("@excalidraw/mermaid-to-excalidraw"),
    import("@excalidraw/excalidraw"),
  ]).then(([mermaidToExcalidraw, excalidraw]) => ({
    parseMermaidToExcalidraw: mermaidToExcalidraw.parseMermaidToExcalidraw,
    exportToSvg: excalidraw.exportToSvg,
    convertToExcalidrawElements: excalidraw.convertToExcalidrawElements,
  }));
  return excalidrawPromise;
}

/**
 * One diagram at a time, app-wide.
 *
 * An article renders its body more than once (the reader-mode view mounts its
 * own copy), so several diagrams convert concurrently by default. They all
 * drive the same Mermaid instance, and overlapping renders were what produced
 * the "SubGraph element not found" failures.
 */
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

/** Design tokens for the fallback Mermaid rendering. */
function themeVariables() {
  if (typeof document === "undefined") return {};
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    background: token("--color-bg-2", "#ffffff"),
    primaryColor: token("--color-tint-cornflower", "#e8f2fe"),
    primaryBorderColor: token("--color-brand", "#0062d2"),
    primaryTextColor: token("--color-fg-1", "#0f172a"),
    textColor: token("--color-fg-1", "#0f172a"),
    nodeTextColor: token("--color-fg-1", "#0f172a"),
    lineColor: token("--color-line-2", "#94a3b8"),
    secondaryColor: token("--color-tint-violet", "#e5f2ff"),
    tertiaryColor: token("--color-bg-3", "#f1f5f9"),
    edgeLabelBackground: token("--color-bg-2", "#ffffff"),
    clusterBkg: token("--color-bg-1", "#ffffff"),
    clusterBorder: token("--color-line-1", "#e2e8f0"),
    titleColor: token("--color-fg-1", "#0f172a"),
    fontSize: "14px",
  };
}

/**
 * The subset of an Excalidraw element this component reads or overrides. The
 * library's element types are not exported in a shape that survives being
 * mapped over here, so this names only the fields actually touched.
 */
type SceneElement = {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor?: string;
  [key: string]: unknown;
};

/** Whether `outer` fully encloses `inner`. */
function contains(outer: SceneElement, inner: SceneElement): boolean {
  if (outer === inner) return false;
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.width <= outer.x + outer.width &&
    inner.y + inner.height <= outer.y + outer.height
  );
}

const SHAPE_TYPES = new Set(["rectangle", "diamond", "ellipse"]);

/**
 * Gives the scene Space's look: translucent hachure subgraph containers, solid
 * nodes, brand-coloured connectors.
 *
 * Subgraph containers and nodes both arrive as plain rectangles with nothing
 * marking which is which, so containment is what separates them. Size does not:
 * the MCP diagram has a node measuring 260×233, larger than two of the real
 * subgraphs beside it.
 */
function enhanceExcalidrawElements(
  elements: readonly SceneElement[],
  isDark: boolean,
): SceneElement[] {
  const brandStroke = isDark ? "#38bdf8" : "#0062d2";
  const defaultStroke = isDark ? "#e2e8f0" : "#1e293b";
  const containerBg = isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(232, 242, 254, 0.65)";
  const nodeBg = isDark ? "#1e293b" : "#ffffff";

  const shapes = elements.filter((el) => SHAPE_TYPES.has(el.type));
  const containers = new Set(
    shapes.filter((outer) => shapes.some((inner) => contains(outer, inner))),
  );

  return elements.map((el) => {
    const updated: SceneElement = { ...el };

    if (containers.has(el)) {
      updated.strokeColor = brandStroke;
      updated.backgroundColor = containerBg;
      updated.fillStyle = "hachure";
      updated.strokeWidth = 1.5;
      updated.roughness = 1;
      updated.roundness = { type: 3 };
      return updated;
    }

    if (SHAPE_TYPES.has(el.type)) {
      updated.strokeColor =
        el.strokeColor && el.strokeColor !== "#000000" ? el.strokeColor : defaultStroke;
      updated.backgroundColor = nodeBg;
      updated.fillStyle = "solid";
      updated.strokeWidth = 1.25;
      updated.roughness = 1.2;
      updated.roundness = { type: 3 };
      return updated;
    }

    if (el.type === "arrow" || el.type === "line") {
      updated.strokeColor = brandStroke;
      updated.strokeWidth = 1.75;
      updated.roughness = 0.8;
      return updated;
    }

    if (el.type === "text") {
      updated.strokeColor = defaultStroke;
      return updated;
    }

    return updated;
  });
}

/**
 * Inline markup Mermaid accepts in labels but the Excalidraw converter renders
 * literally. `<br>` becomes a real newline; the rest is dropped.
 */
function sanitizeMermaidForExcalidraw(mermaidCode: string): string {
  return mermaidCode
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(?:b|strong|i|em)>/gi, "")
    .replace(/<\/?span[^>]*>/gi, "");
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
  const [isSketch, setIsSketch] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const reactId = React.useId();

  /**
   * Nothing is converted until the figure is near the viewport.
   *
   * Excalidraw and Mermaid together are about 4.4 MB of JavaScript. Loading
   * them on mount meant every reader of a diagram article paid for them whether
   * or not they ever scrolled far enough to see one — on an article whose
   * visible content is text.
   */
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!container || visible) return;

    // Without IntersectionObserver, just convert — better a heavy page than no
    // diagram. Scheduled rather than set inline: a synchronous setState in an
    // effect body cascades an extra render.
    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const MARGIN = 600;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      // Start early enough that the diagram is usually ready by the time it is
      // scrolled to.
      { rootMargin: `${MARGIN}px 0px` },
    );

    observer.observe(container);

    // One deterministic check alongside the observer. A diagram already on
    // screen at mount should not wait for a callback, and this means a browser
    // that delivers no intersection at all still renders anything visible
    // rather than leaving an empty frame.
    const box = container.getBoundingClientRect();
    if (box.top < window.innerHeight + MARGIN && box.bottom > -MARGIN) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [container, visible]);

  React.useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    const render = () =>
      enqueue(async () => {
        if (cancelled) return;
        const isDark = document.documentElement.classList.contains("dark");

        // Preferred path: convert to an Excalidraw scene and export a static
        // SVG. Mermaid is driven entirely by the library here.
        try {
          const { parseMermaidToExcalidraw, exportToSvg, convertToExcalidrawElements } =
            await loadExcalidraw();

          const parsed = await parseMermaidToExcalidraw(sanitizeMermaidForExcalidraw(code), {
            themeVariables: { fontSize: "15px" },
          });

          if (parsed.elements?.length) {
            const scene = enhanceExcalidrawElements(
              convertToExcalidrawElements(parsed.elements) as unknown as readonly SceneElement[],
              isDark,
            );

            const el = await exportToSvg({
              elements: scene as unknown as Parameters<typeof exportToSvg>[0]["elements"],
              appState: {
                // Always export in light mode. `exportWithDarkMode` applies
                // Excalidraw's own inversion filter, which would invert the
                // dark palette chosen above and hand back light nodes with
                // near-invisible labels. Dark mode is handled entirely by the
                // colours in `enhanceExcalidrawElements`.
                theme: "light",
                exportWithDarkMode: false,
                exportBackground: false,
                viewBackgroundColor: "transparent",
              },
              files: parsed.files ?? null,
              skipInliningFonts: true,
            });

            if (!cancelled && el) {
              setSvg(el.outerHTML);
              setIsSketch(true);
              return;
            }
          }
        } catch {
          // Falls through to plain Mermaid below.
        }

        if (cancelled) return;

        // Fallback: plain Mermaid. This reconfigures the shared singleton, which
        // is why it only runs once the Excalidraw path has already given up.
        try {
          const mermaid = await loadMermaid();
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            darkMode: isDark,
            themeVariables: themeVariables(),
            fontFamily: "inherit",
          });
          const { svg: rendered } = await mermaid.render(
            `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`,
            code,
          );
          if (!cancelled) {
            setSvg(rendered);
            setIsSketch(false);
          }
        } catch {
          if (!cancelled) setFailed(true);
        }
      });

    void render();

    // Re-render on theme change so the scene's ink matches.
    const observer = new MutationObserver(() => void render());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [code, reactId, visible]);

  const handleCopySvg = async () => {
    if (!svg) return;
    try {
      await navigator.clipboard.writeText(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; nothing useful to say.
    }
  };

  if (failed && !svg) {
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

  const diagramClass = isSketch ? "excalidraw-diagram" : "mermaid-diagram";

  return (
    <>
      <figure className={cn("mt-8 w-full max-w-full min-w-0", className)}>
        <div className="group shadow-card relative overflow-hidden rounded-2xl border border-line-1/80 bg-bg-2/70 backdrop-blur-sm transition-all duration-300 hover:border-line-2 dark:border-white/10 dark:bg-bg-2/50">
          {/* View-only affordances. Nothing here edits the diagram. */}
          <div className="flex items-center justify-end gap-1.5 border-b border-line-1/60 bg-bg-1/40 px-3.5 py-2 sm:px-4.5 dark:border-white/5 dark:bg-white/[0.02]">
            <button
              type="button"
              onClick={handleCopySvg}
              title="Copy diagram SVG"
              aria-label="Copy diagram SVG"
              className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-lg text-fg-3 transition-colors hover:bg-black/5 hover:text-fg-1 active:scale-95 dark:hover:bg-white/10"
            >
              {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              title="Expand diagram"
              aria-label="Expand diagram"
              className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-lg text-fg-3 transition-colors hover:bg-black/5 hover:text-fg-1 active:scale-95 dark:hover:bg-white/10"
            >
              <Maximize2 className="size-3.5" />
            </button>
          </div>

          <div ref={setContainer} className="overflow-x-auto p-4 sm:p-6 md:p-8">
            {svg ? (
              <div
                className={cn(
                  "mx-auto flex w-full items-center justify-center",
                  "[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full",
                  diagramClass,
                )}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <div className="flex h-[200px] items-center justify-center text-[13.5px] text-fg-3">
                <span className={visible ? "animate-pulse font-medium" : "font-medium"}>
                  {visible ? "Drawing diagram…" : "Diagram"}
                </span>
              </div>
            )}
          </div>
        </div>

        {caption ? (
          <figcaption className="mt-3 text-center text-[13px] leading-[1.6] text-fg-3 sm:text-left sm:text-[13.5px]">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {isFullscreen && svg ? (
        <div
          role="dialog"
          aria-modal="true"
          className="animate-focus-overlay-in fixed inset-0 z-[150] flex flex-col items-center justify-center bg-bg-1/90 p-4 backdrop-blur-xl sm:p-8 dark:bg-black/90"
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 sm:top-6 sm:right-6">
            <button
              type="button"
              onClick={handleCopySvg}
              title="Copy diagram SVG"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-1 bg-bg-1 px-3 py-1.5 text-[12.5px] font-semibold text-fg-1 shadow-sm transition-colors hover:bg-bg-2 dark:border-white/15 dark:bg-bg-2"
            >
              {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copied" : "Copy SVG"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              title="Close (Esc)"
              aria-label="Close fullscreen diagram"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-ink text-on-ink shadow-md transition-transform active:scale-95"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex max-h-[85vh] w-full max-w-5xl items-center justify-center overflow-auto p-4 sm:p-8">
            <div
              className={cn(
                "w-full max-w-full [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-h-[75vh] [&_svg]:w-full",
                diagramClass,
              )}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          {caption ? (
            <p className="mt-4 max-w-2xl text-center text-[13.5px] text-fg-2">{caption}</p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
