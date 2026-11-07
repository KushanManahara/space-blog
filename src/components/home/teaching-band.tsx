import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { YouTubeLogo } from "@/components/icons/social-icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { routes, teachingChannel } from "@/lib/content";

/**
 * The homepage pointer to Brain Link. The full description lives on the about
 * page; this only has to say what the channel is and get a reader there.
 *
 * Always on the inverse surface, which is dark in both themes, so the red logo
 * keeps the same contrast whichever one is active.
 */
export function TeachingBand() {
  const channel = teachingChannel;

  return (
    <section className="mx-auto max-w-page px-gutter">
      <Reveal className="relative overflow-hidden rounded-lg border border-white/10 bg-bg-inverse shadow-xl md:shadow-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-180px] right-[-120px] size-[520px]"
          style={{ background: "var(--glow-violet)" }}
        />

        <div className="relative grid items-center gap-[clamp(28px,5vw,64px)] p-5 sm:p-[clamp(28px,4vw,56px)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="flex items-center gap-2.5 text-[11.5px] font-semibold tracking-[0.14em] text-white/60 uppercase">
              <YouTubeLogo className="h-3.5 w-auto" />
              Teaching on {channel.platform}
            </p>
            <h2 className="mt-4">
              <Image
                src={channel.wordmark}
                alt={channel.name}
                width={2400}
                height={600}
                sizes="320px"
                className="-ml-2 h-[clamp(60px,6.5vw,80px)] w-auto"
              />
            </h2>
            <p className="mt-2.5 font-mono text-[13.5px] font-semibold tracking-[0.02em] text-cornflower-200">
              {channel.tagline}
            </p>
            <p className="mt-4 max-w-[520px] text-[16px] leading-[1.65] text-white/70 sm:text-[17px]">
              {channel.summary}
            </p>

            <div className="mt-6.5 flex flex-wrap items-center gap-x-6 gap-y-3.5">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-transparent bg-white text-n-900"
              >
                <a href={channel.url} target="_blank" rel="noopener noreferrer">
                  <YouTubeLogo className="h-4 w-auto" />
                  Watch on {channel.platform}
                </a>
              </Button>
              <Link
                href={`${routes.about}#teaching`}
                className="tap-target inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/80 transition-colors duration-300 ease-expo hover:text-white"
              >
                What it covers
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <a
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${channel.name} on ${channel.platform}`}
            className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black transition-colors duration-300 ease-expo hover:border-white/25"
          >
            <Image
              src={channel.logo}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain transition-transform duration-[550ms] ease-expo group-hover:scale-105"
            />
            <YouTubeLogo className="absolute right-4 bottom-3.5 h-7 w-auto" />
            <span className="absolute bottom-3.5 left-4 font-mono text-[12.5px] text-white/60">
              {channel.handle}
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
