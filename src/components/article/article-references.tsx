import { ArrowUpRight } from "lucide-react";

type ReferenceItem = {
  label: string;
  href: string;
  source?: string;
  note?: string;
};

/**
 * Outbound sources for an article — official docs, specs, and papers.
 *
 * Server-rendered: it is article content and must be in the HTML for crawlers
 * and for readers without JavaScript. Links are external by definition, so they
 * all open in a new tab with `rel="noopener noreferrer"`.
 */
export function ArticleReferences({
  title = "References",
  items,
}: {
  title?: string;
  items: ReferenceItem[];
}) {
  return (
    <div className="mt-12 border-t border-line-1 pt-6">
      <p className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">{title}</p>
      <ol className="mt-3.5 flex flex-col gap-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-[13.5px] leading-[1.6]">
            <span className="mt-0.5 shrink-0 font-mono text-[12px] text-fg-3 tabular-nums">
              [{idx + 1}]
            </span>
            <span className="min-w-0">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline font-medium text-fg-link underline decoration-line-brand underline-offset-4 transition-colors hover:text-brand"
              >
                {item.label}
                <ArrowUpRight
                  className="ml-0.5 inline size-3.5 -translate-y-px opacity-60 transition-opacity group-hover:opacity-100"
                  strokeWidth={2}
                />
              </a>
              {item.source ? <span className="text-fg-3"> · {item.source}</span> : null}
              {item.note ? (
                <span className="mt-0.5 block text-[13px] text-fg-3">{item.note}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
