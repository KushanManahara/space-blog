import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { RankedPostRow } from "@/components/post/post-row";
import { getPopularPosts, routes, site, topics } from "@/lib/content";

export function MostReadSection() {
  const popular = getPopularPosts(5);

  return (
    <section className="mx-auto max-w-page px-gutter pb-tail">
      <div className="grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1fr_380px]">
        <Reveal>
          <h2 className="mb-1.5 text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em] text-fg-1">
            Most read this year
          </h2>
          <div className="mt-5.5 border-t border-line-1">
            {popular.map((post, index) => (
              <RankedPostRow key={post.slug} post={post} rank={index + 1} />
            ))}
          </div>
        </Reveal>

        <Reveal className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg-inverse p-5 shadow-xl sm:p-8.5 md:rounded-3xl md:shadow-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[-160px] right-[-180px] size-[420px]"
            style={{ background: "var(--glow-violet)" }}
          />
          <div className="relative">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-cornflower-300 uppercase">
              The archive
            </p>
            <h3 className="mt-4 text-[24px] leading-[1.15] font-light tracking-[-0.02em] text-white sm:text-[28px]">
              {site.issue} posts, four years, no reposts.
            </h3>
            <p className="mt-3.5 text-[14px] leading-[1.65] text-white/65 sm:text-[15px]">
              Everything is dated and versioned. When a finding turns out to be wrong, the
              correction sits on top of the original, not in place of it.
            </p>

            <div className="mt-6.5 grid grid-cols-2 gap-3">
              <ArchiveStat value={site.issue} label="Articles published" />
              <ArchiveStat value={topics.length} label="Topics covered" />
            </div>

            <Link
              href={routes.articles}
              className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-5.5 py-[13px] text-[14.5px] font-semibold text-n-900 transition-[transform,box-shadow] duration-[350ms] ease-bounce hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.96] active:duration-150 active:ease-out sm:w-auto"
            >
              Open the archive
              <ArrowRight className="size-[15px]" strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-white/12 bg-white/3 p-4">
      <p className="bg-[linear-gradient(180deg,#BAE6FD,#007AFF)] bg-clip-text font-display text-[30px] leading-none font-light text-transparent">
        {value}
      </p>
      <p className="mt-2 text-[13px] text-white/58">{label}</p>
    </div>
  );
}
