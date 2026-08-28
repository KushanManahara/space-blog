"use client";

import * as React from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { routes } from "@/lib/content";

/**
 * Catches render and data errors inside the public site so a failure still
 * looks like Space instead of Next's default error page. Article pages read
 * live stats from Turso on every request, which is the most likely thing here
 * to throw.
 */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Site error boundary caught:", error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-page flex-col items-center px-gutter py-[clamp(72px,12vw,140px)] text-center">
      <p className="font-mono text-[12px] tracking-[0.14em] text-fg-3 uppercase">Error</p>

      <h1 className="mt-5 max-w-[18ch] text-[clamp(30px,4.4vw,46px)] leading-[1.1] font-bold tracking-[-0.025em] text-balance text-fg-1">
        That page didn&rsquo;t load.
      </h1>

      <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.65] text-fg-2">
        Something broke on our side, not yours. Reloading usually clears it. If it keeps happening,
        the archive and search are still worth a try.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-[26px] py-[14px] text-[15px] font-semibold text-on-brand shadow-glow-sm transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-glow-md active:scale-[0.96]"
        >
          <RotateCw className="size-4" strokeWidth={2} />
          Try again
        </button>
        <InteractiveHoverButton
          href={routes.articles}
          variant="secondary"
          className="px-[22px] py-[13px] text-[14.5px]"
        >
          Go to the archive
        </InteractiveHoverButton>
      </div>

      {error.digest ? (
        <p className="mt-9 font-mono text-[12px] text-fg-3">
          Reference <span className="text-fg-2">{error.digest}</span> —{" "}
          <Link href={routes.contact} className="text-brand hover:underline">
            report it
          </Link>
        </p>
      ) : null}
    </section>
  );
}
