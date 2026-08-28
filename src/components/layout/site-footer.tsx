import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { author, footerColumns, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-blue-200/70 bg-gradient-to-b from-[#F0F7FF] via-[#E8F3FE] to-[#DCEEFE] dark:border-blue-900/40 dark:from-[#080D1A] dark:via-[#09152E] dark:to-[#070F24]">
      {/* Ambient Blue Lighting Overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-44 w-full max-w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgb(0_122_255/0.18),transparent)] dark:bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgb(0_122_255/0.25),transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgb(56_189_248/0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgb(0_122_255/0.22),transparent_70%)]" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgb(0_122_255/0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgb(56_189_248/0.20),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-page px-gutter pt-14 pb-[calc(env(safe-area-inset-bottom,0px)+2.5rem)]">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[300px] flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <BrandMark size={24} glow={true} />
              <span className="font-display text-[18px] font-bold tracking-[-0.02em] text-fg-1">
                {site.name}
              </span>
            </div>
            <p className="text-[14.5px] leading-[1.65] text-fg-2">{site.description}</p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-7 sm:gap-[clamp(32px,6vw,72px)]">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 text-[13px] font-bold text-fg-1">{column.title}</p>
                <div className="flex flex-col gap-2">
                  {column.links.map((link) => {
                    const isExternal =
                      "external" in link
                        ? (link as { external?: boolean }).external
                        : link.href.startsWith("http") || link.href.startsWith("//");
                    return isExternal ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-medium text-fg-2 transition-colors duration-300 ease-expo hover:text-brand"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[14px] font-medium text-fg-2 transition-colors duration-300 ease-expo hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-3.5 border-t border-line-1 pt-5 text-[13px] text-fg-3">
          <span>
            © {new Date().getUTCFullYear()} {author.name}. All rights reserved.
          </span>
          <span>Engineering publication on AI & Systems by {author.name}</span>
        </div>
      </div>
    </footer>
  );
}
