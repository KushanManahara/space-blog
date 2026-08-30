import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GlareHover } from "@/components/ui/glare-hover";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { aboutSetup, author, listTags, routes, timeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  // `bio` rather than `longBio`: 135 characters survives a search result,
  // 246 does not. The longer one still carries the link preview below, where
  // there is room for it.
  description: author.bio,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${author.name} · Space`,
    description: author.longBio,
    images: [{ url: author.avatar, width: 1200, height: 1200, alt: author.name }],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        eyebrow="About"
        title={
          <>
            I learn things <span className="text-brand">by taking them apart.</span>
          </>
        }
        description={`I'm ${author.name}, a machine learning engineer. I write here because the notes are more useful in public than sitting in a private file.`}
        media={
          <Image
            src={author.avatar}
            alt={author.name}
            width={120}
            height={120}
            priority
            className="size-full object-cover"
          />
        }
        actions={
          <>
            <InteractiveHoverButton
              href={routes.articles}
              className="px-[22px] py-[11px] text-[14px]"
            >
              Read the archive
            </InteractiveHoverButton>
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
              <p className="text-[18px] leading-[1.75] text-fg-prose">Four things, roughly.</p>
              <div className="flex flex-col gap-4 text-[17px] leading-[1.7] text-fg-prose">
                <p>
                  <strong className="font-semibold text-fg-1">Machine learning and AI</strong>,
                  especially what is actually happening underneath the abstractions &mdash; from
                  mathematical foundations and model training to neural networks, inference,
                  fine-tuning, and modern LLM systems.
                </p>
                <p>
                  <strong className="font-semibold text-fg-1">
                    AI agents and the systems around them
                  </strong>{" "}
                  &mdash; tool calling, MCP, RAG, agent architectures, orchestration, evaluation,
                  and the protocols that connect models to real software, data, and services.
                </p>
                <p>
                  <strong className="font-semibold text-fg-1">The engineering underneath AI</strong>{" "}
                  &mdash; Python, TypeScript, Linux, distributed systems, cloud infrastructure,
                  containers, Kubernetes, Kafka, APIs, databases, and the tooling needed to turn an
                  AI prototype into something that can actually run in production.
                </p>
                <p>
                  <strong className="font-semibold text-fg-1">
                    Milestones and lessons from the journey
                  </strong>{" "}
                  &mdash; things I&rsquo;ve learned while moving from software engineering and AI/ML
                  research into machine learning engineering and production AI systems.
                </p>
              </div>
              <p className="text-[18px] leading-[1.75] text-fg-prose">
                Most of what I write starts as something I&rsquo;m trying to understand myself. I
                learn by taking things apart, following the reasoning all the way down, building
                something with it, and writing down what I wish I had understood the first time.
              </p>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {listTags()
                  .slice(0, 18)
                  .map((tag) => (
                    <Link
                      key={tag.name}
                      href={`${routes.tags}/${tag.slug}`}
                      className="rounded-full border border-line-1 bg-bg-1 px-3.5 py-2 text-[13px] text-fg-2 transition-[color,border-color] duration-300 ease-expo hover:border-line-brand hover:text-brand"
                    >
                      {tag.name}
                    </Link>
                  ))}
                <Link
                  href={routes.tags}
                  className="rounded-full border border-line-1 bg-bg-1 px-3.5 py-2 text-[13px] font-semibold text-brand transition-colors duration-300 ease-expo hover:border-line-brand"
                >
                  All tags
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-gutter py-band">
        <div className="grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-[300px_1fr]">
          <Reveal>
            <h2 className="text-h3 text-fg-1">Milestones</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-fg-2">
              Where the engineering side of this actually got its footing.
            </p>
          </Reveal>

          <div className="max-w-[720px]">
            {timeline.map((entry) => (
              <Reveal
                key={`${entry.years}-${entry.role}-${entry.org}`}
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
            <dl className="mt-4 flex flex-col gap-3">
              {aboutSetup.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-b border-line-1/40 pb-2.5 last:border-b-0 last:pb-0"
                >
                  <dt className="text-[12px] font-semibold tracking-wider text-fg-3 uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-[14px] font-semibold text-fg-1">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-line-1 bg-bg-2 p-6.5">
            <h3 className="text-[16px] font-bold text-fg-1">How I publish</h3>
            <div className="mt-3.5 flex flex-col gap-3 text-[14.5px] leading-[1.7] text-fg-2">
              <p>One post when it&rsquo;s ready, never on a schedule.</p>
              <p>
                Most posts begin as something I&rsquo;m learning, debugging, building, or trying to
                explain to myself. I prefer understanding the mechanism over memorizing the
                terminology.
              </p>
              <p>
                When a post relies on someone else&rsquo;s research, numbers, or findings, I try to
                make the source clear.
              </p>
            </div>
          </div>

          <GlareHover className="h-full rounded-lg">
            <div className="relative h-full overflow-hidden rounded-lg bg-bg-inverse p-6.5">
              <div
                aria-hidden
                className="pointer-events-none absolute top-[-130px] right-[-140px] size-[340px]"
                style={{ background: "var(--glow-violet)" }}
              />
              <div className="relative">
                <h3 className="text-[16px] font-bold text-white">Say hello</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-white/65">
                  Corrections, questions, ideas, and disagreements are all welcome &mdash;
                  especially the last one.
                </p>
                <div className="mt-4.5 flex flex-col gap-2.5 font-mono text-[13.5px] text-cornflower-200">
                  <a href={`mailto:${author.email}`} className="hover:underline">
                    {author.email}
                  </a>
                  <div className="flex flex-wrap items-center gap-2 font-sans text-[13px] text-white/80">
                    <a
                      href={author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 px-3 py-1.5 font-medium transition-colors hover:bg-white/20 hover:text-white active:scale-95"
                    >
                      GitHub
                    </a>
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 px-3 py-1.5 font-medium transition-colors hover:bg-white/20 hover:text-white active:scale-95"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 px-3 py-1.5 font-medium transition-colors hover:bg-white/20 hover:text-white active:scale-95"
                    >
                      X (Twitter)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GlareHover>
        </Reveal>
      </section>
    </>
  );
}
