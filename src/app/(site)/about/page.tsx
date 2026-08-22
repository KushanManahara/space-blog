import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { aboutSetup, author, routes, site, tags, timeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: author.longBio,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        eyebrow="About"
        title={
          <>
            I measure things <span className="text-brand">before I believe them.</span>
          </>
        }
        description={`I'm ${author.name}. I work on inference performance and evaluation, and I write here because the notes are more useful in public than in a private file.`}
        media={<MastheadBadge>{author.initials}</MastheadBadge>}
        actions={
          <>
            <Button asChild variant="primary" size="md">
              <Link href={routes.articles}>
                Read the archive
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button asChild variant="subtle" size="md">
              <Link href={routes.contact}>Get in touch</Link>
            </Button>
          </>
        }
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section>
        <div className="mx-auto max-w-page px-gutter py-band">
          <div className="grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-[300px_1fr]">
            <Reveal>
              <h2 className="text-h3 text-fg-1">What I write about</h2>
            </Reveal>

            <Reveal className="flex max-w-[680px] flex-col gap-5">
              <p className="text-[18px] leading-[1.75] text-fg-prose">
                Four subjects, roughly. How much a token costs and where that cost hides. Why
                evaluation harnesses tell you good news for months before they tell you the truth.
                What a kernel is actually doing when the profiler says it is busy. And the weekend
                experiments that were supposed to take an afternoon.
              </p>
              <p className="text-[18px] leading-[1.75] text-fg-prose">
                Everything here is measured on hardware I have access to. When I can publish the
                traces, I publish the traces. When a finding turns out to be wrong, the correction
                sits on top of the original, {site.correctionCount} times so far.
              </p>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {tags.slice(0, 9).map((tag) => (
                  <Link
                    key={tag.name}
                    href={`${routes.search}?q=${encodeURIComponent(tag.name.replace("#", ""))}`}
                    className="rounded-full border border-line-1 bg-bg-1 px-3.5 py-2 text-[13px] text-fg-2 transition-[color,border-color] duration-300 ease-expo hover:border-line-brand hover:text-brand"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-gutter py-band">
        <div className="grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-[300px_1fr]">
          <Reveal>
            <h2 className="text-h3 text-fg-1">Where I&rsquo;ve worked</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-fg-2">
              Inference and evaluation, mostly at the point where research hands something to
              production.
            </p>
          </Reveal>

          <div className="max-w-[720px]">
            {timeline.map((entry) => (
              <Reveal
                key={entry.years}
                className="grid gap-6 border-t border-line-1 py-6 sm:grid-cols-[108px_1fr]"
              >
                <p className="pt-1 font-mono text-[13px] text-fg-3">{entry.years}</p>
                <div>
                  <p className="text-[18px] font-bold tracking-[-0.015em] text-fg-1">
                    {entry.role}
                  </p>
                  <p className="mt-1 text-[14.5px] font-semibold text-brand">{entry.org}</p>
                  <p className="mt-2.5 text-[15.5px] leading-[1.65] text-fg-2">{entry.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-gutter pb-tail">
        <Reveal className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-line-1 bg-bg-2 p-6.5">
            <h3 className="text-[16px] font-bold text-fg-1">The setup</h3>
            <dl className="mt-3.5 flex flex-col gap-2.5">
              {aboutSetup.map((item) => (
                <div key={item.label} className="flex justify-between gap-3 text-[14.5px]">
                  <dt className="text-fg-3">{item.label}</dt>
                  <dd className="font-semibold text-fg-1">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-line-1 bg-bg-2 p-6.5">
            <h3 className="text-[16px] font-bold text-fg-1">How I publish</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-fg-2">
              One post when it&rsquo;s ready, never on a schedule. Numbers get a method note.
              Corrections are appended and dated, never quietly edited into the original.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-bg-inverse p-6.5">
            <div
              aria-hidden
              className="pointer-events-none absolute top-[-130px] right-[-140px] size-[340px]"
              style={{ background: "var(--glow-violet)" }}
            />
            <div className="relative">
              <h3 className="text-[16px] font-bold text-white">Say hello</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-white/65">
                Corrections, reproductions and disagreements are all welcome, especially the third
                one.
              </p>
              <div className="mt-4.5 flex flex-col gap-2 font-mono text-[13.5px] text-cornflower-200">
                <a href={`mailto:${author.email}`}>{author.email}</a>
                <span>{author.handle}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
