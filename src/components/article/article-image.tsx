import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Article figure. Handles local files under /public and absolute URLs; remote
 * hosts must also be listed in `next.config.ts` under `images.remotePatterns`.
 *
 * SVGs skip the optimizer: it rasterises them, which throws away the one thing
 * an SVG is good for.
 */
export function ArticleImage({
  src,
  alt,
  caption,
  width,
  height,
  wide,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  wide?: boolean;
  /**
   * Opts one figure into eager loading and a preload hint. Reserved for the
   * first figure in an article, which is the only one that can plausibly be
   * the LCP element. Every figure used to set this, so an article's images all
   * announced themselves as highest priority and none of them actually was.
   */
  priority?: boolean;
  className?: string;
}) {
  const isSvg = src.toLowerCase().endsWith(".svg");
  const hasIntrinsicSize = width !== undefined && height !== undefined;

  return (
    <figure
      className={cn(
        "mt-8",
        // Break out of the 780px prose column without escaping the page gutter.
        wide && "md:-mx-[clamp(0px,6vw,110px)]",
        className,
      )}
    >
      <div
        className="mx-auto overflow-hidden rounded-lg border border-line-1 bg-bg-2 print:break-inside-avoid print:border-neutral-200 print:bg-white"
        // Never scale past the intrinsic size. Upscaling a screenshot to fill
        // the column just makes its text soft.
        style={hasIntrinsicSize ? { maxWidth: width } : undefined}
      >
        {hasIntrinsicSize ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            preload={priority}
            loading={priority ? "eager" : "lazy"}
            unoptimized={isSvg}
            sizes="(max-width: 768px) 100vw, 780px"
            className="h-auto w-full"
          />
        ) : (
          // No dimensions given: reserve a sensible box so the article below
          // does not shift once the file loads.
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={src}
              alt={alt}
              fill
              preload={priority}
              loading={priority ? "eager" : "lazy"}
              unoptimized={isSvg}
              sizes="(max-width: 768px) 100vw, 780px"
              className="object-contain"
            />
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[13.5px] leading-[1.6] text-fg-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
