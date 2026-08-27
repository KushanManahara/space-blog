import { markdownToHtml } from "@/components/article/markdown";
import { cn } from "@/lib/utils";

/**
 * Data table. Scrolls inside its own container rather than pushing the article
 * sideways, which is what a wide table would otherwise do on a phone.
 */
export function ArticleTable({
  headers,
  rows,
  caption,
  numericColumns = [],
  className,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
  numericColumns?: number[];
  className?: string;
}) {
  const numeric = new Set(numericColumns);

  return (
    <figure className={cn("mt-8", className)}>
      <div className="overflow-x-auto rounded-lg border border-line-1">
        <table className="w-full border-collapse text-left text-[14.5px]">
          <thead>
            <tr className="bg-bg-3">
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={cn(
                    "px-4 py-3 font-semibold whitespace-nowrap text-fg-1",
                    numeric.has(index) && "text-right tabular-nums",
                  )}
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(header) }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-line-1 bg-bg-2">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "px-4 py-3 align-top leading-[1.6] text-fg-prose",
                      numeric.has(cellIndex) && "text-right tabular-nums",
                    )}
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(cell) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[13.5px] leading-[1.6] text-fg-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
