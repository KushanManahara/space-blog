import type { Metadata } from "next";
import Link from "next/link";
import { Route } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { TopicBadge } from "@/components/post/topic-badge";
import { listReadingPaths, routes, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Where to start",
  description: `Curated routes through the ${site.issue} posts in this archive, for anyone who has not read any of it yet.`,
  alternates: { canonical: "/paths" },
};

export default function PathsPage() {
  const paths = listReadingPaths();

  return (
    <>
      <PageMasthead
        eyebrow="Reading paths"
        title={
          <>
            Forty posts is a record. <span className="text-brand">These are the routes.</span>
          </>
        }
        description="Reverse-chronological order tells you what happened most recently, not where to begin. Each path below crosses topics and years on purpose, and says why each step comes where it does."
        media={<MastheadBadge icon={Route} />}
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)] pb-tail">
        <Reveal className="flex flex-col">
          {paths.map((path, index) => {
            const minutes = path.steps.reduce((total, step) => total + step.post.readingMinutes, 0);

            return (
              <article
                key={path.slug}
                className="grid gap-x-10 gap-y-6 border-b border-line-1 py-[clamp(28px,4vw,44px)] lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[13px] font-bold text-fg-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[21px] leading-[1.2] font-bold tracking-[-0.02em] text-fg-1">
                      {path.title}
                    </h2>
                  </div>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-fg-2">{path.dek}</p>
                  <p className="mt-3.5 text-[13.5px] leading-[1.55] text-fg-3 italic">
                    {path.forWho}
                  </p>
                  <p className="mt-4 text-[12.5px] font-semibold text-fg-3">
                    {path.steps.length} posts · about {minutes} minutes
                  </p>
                </div>

                <ol className="flex flex-col">
                  {path.steps.map((step, stepIndex) => (
                    <li key={step.slug} className="flex gap-4">
                      {/* The rule between the markers is the path: it runs from
                          the first step to the last and stops there. */}
                      <div className="flex flex-col items-center">
                        <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-bg-3 text-[12px] font-bold text-fg-2">
                          {stepIndex + 1}
                        </span>
                        {stepIndex < path.steps.length - 1 ? (
                          <span aria-hidden className="w-px flex-1 bg-line-1" />
                        ) : null}
                      </div>

                      <div className={stepIndex < path.steps.length - 1 ? "pb-6" : ""}>
                        <Link
                          href={`${routes.articles}/${step.post.slug}`}
                          className="group inline-flex flex-wrap items-center gap-x-2.5 gap-y-1"
                        >
                          <span className="text-[15.5px] leading-[1.35] font-bold text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
                            {step.post.title}
                          </span>
                          <TopicBadge topic={step.post.topic} />
                        </Link>
                        <p className="mt-1.5 text-[14px] leading-[1.6] text-fg-2">{step.why}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </Reveal>
      </section>
    </>
  );
}
