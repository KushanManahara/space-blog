import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { author, footerColumns, routes, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-1 bg-bg-1">
      <div className="mx-auto max-w-page px-gutter pt-14 pb-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[300px] flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <BrandMark size={24} glow={false} />
              <span className="font-display text-[18px] font-bold tracking-[-0.02em] text-fg-1">
                {site.name}
              </span>
            </div>
            <p className="text-[14.5px] leading-[1.65] text-fg-2">{site.description}</p>
          </div>

          <div className="flex flex-wrap gap-[clamp(32px,6vw,72px)]">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 text-[13px] font-bold text-fg-1">{column.title}</p>
                <div className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[14px] text-fg-3 transition-colors duration-300 ease-expo hover:text-fg-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-3.5 border-t border-line-1 pt-5 text-[13px] text-fg-3">
          <span>
            © {new Date().getUTCFullYear()} {author.name}
          </span>
          <Link
            href={routes.system}
            className="transition-colors duration-300 ease-expo hover:text-fg-1"
          >
            Built with Next.js · Gimhara design system
          </Link>
        </div>
      </div>
    </footer>
  );
}
