import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { RankedPostRow } from "@/components/post/post-row";
import { GlareHover } from "@/components/ui/glare-hover";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { getPopularPosts, routes, site, topics, type Post } from "@/lib/content";

export function MostReadSection({ posts }: { posts: Post[] }) {
  const popular = getPopularPosts(5, posts);

  /*
   * Views start at 0 for every post, and `byViews` tie-breaks on recency — so
   * on a fresh deployment this section ranks by date while claiming to rank by
   * readership. Until there is at least one view, say what the list actually
   * is.
   */
  const hasViewData = posts.some((post) => post.views > 0);

  return (
    <section className="mx-auto max-w-page px-gutter pb-tail">
      <div className="grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1fr_380px]">
        <Reveal>
          <h2 className="mb-1.5 text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em] text-fg-1">
            {hasViewData ? "Most read this year" : "Recent highlights"}
          </h2>
          <div className="mt-5.5 border-t border-line-1">
            {popular.map((post, index) => (
              <RankedPostRow key={post.slug} post={post} rank={index + 1} />
            ))}
          </div>
        </Reveal>

        <GlareHover className="rounded-2xl md:rounded-3xl">
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
              {/* The claim links to the page that backs it. This was the only
                  place on the homepage that states the corrections policy, and
                  it pointed nowhere — leaving /corrections reachable from the
                  footer alone. */}
              <p className="mt-3.5 text-[14px] leading-[1.65] text-white/65 sm:text-[15px]">
                Everything is dated and versioned. When a finding turns out to be wrong, the{" "}
                <Link
                  href={routes.corrections}
                  className="font-medium text-white underline decoration-white/35 underline-offset-4 transition-colors duration-300 ease-expo hover:decoration-white"
                >
                  correction sits on top of the original
                </Link>
                , not in place of it.
              </p>

              <div className="mt-6.5 grid grid-cols-2 gap-3">
                <ArchiveStat value={site.issue} label="Articles published" />
                <ArchiveStat value={topics.length} label="Topics covered" />
              </div>

              <InteractiveHoverButton
                href={routes.articles}
                variant="inverse"
                className="mt-6 w-full px-5.5 py-[13px] text-[14.5px] sm:w-auto"
              >
                Open the archive
              </InteractiveHoverButton>
            </div>
          </Reveal>
        </GlareHover>
      </div>
    </section>
  );
}

function ArchiveStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-white/12 bg-white/3 p-4">
      <p className="bg-[linear-gradient(180deg,#BAE6FD,#007AFF)] bg-clip-text font-display text-[30px] leading-none font-light text-transparent">
        <NumberTicker value={value} className="font-display font-light text-transparent" />
      </p>
      <p className="mt-2 text-[13px] text-white/58">{label}</p>
    </div>
  );
}
