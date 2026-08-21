import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchShortcutButton } from "@/components/nav/search-shortcut-button";
import { getPopularPosts, routes } from "@/lib/content";

export default function NotFound() {
  const popular = getPopularPosts(3);

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-center justify-center px-gutter py-[clamp(56px,8vw,120px)]">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[36%] left-1/2 size-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(114_68_192/0.14),rgb(82_113_255/0.06)_52%,rgb(114_68_192/0))]"
          />

          <div className="glass-panel relative w-full max-w-[620px] rounded-xl p-[clamp(34px,4vw,54px)] text-center">
            <p className="text-gradient font-display text-[clamp(64px,9vw,104px)] leading-none font-light tracking-[-0.04em]">
              404
            </p>
            <h1 className="mt-4.5 text-[clamp(24px,2.8vw,32px)] font-bold tracking-[-0.02em] text-fg-1">
              This page never shipped.
            </h1>
            <p className="mt-3 text-[16.5px] leading-[1.65] text-fg-2">
              Either the URL is wrong or I removed the draft. Nothing published here is ever
              deleted, so try the archive.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={routes.home}
                className="rounded-full bg-ink px-6.5 py-3.5 text-[15px] font-semibold text-on-ink transition-[transform,box-shadow] duration-[350ms] ease-bounce hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.96] active:duration-150 active:ease-out"
              >
                Back home
              </Link>
              <SearchShortcutButton />
            </div>

            <div className="mt-7.5 border-t border-line-1 pt-5.5 text-left">
              <p className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
                Most read instead
              </p>
              <div className="mt-2">
                {popular.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/articles/${post.slug}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-3.5 border-t border-line-1 py-3.5"
                  >
                    <span className="text-[14.5px] leading-[1.4] font-semibold text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
                      {post.title}
                    </span>
                    <ArrowRight className="size-[15px] text-fg-faint" strokeWidth={1.75} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
