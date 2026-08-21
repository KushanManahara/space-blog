import type { Metadata } from "next";

import { Overline } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { componentInventory } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Component inventory",
  description: "Every surface in this site mapped to the component that renders it.",
  alternates: { canonical: "/system" },
};

const ROUTES = [
  "app/(site)/page.tsx",
  "app/(site)/articles/page.tsx",
  "app/(site)/articles/[slug]/page.tsx",
  "app/(site)/topics/[slug]/page.tsx",
  "app/(site)/search/page.tsx",
];

export default function SystemPage() {
  return (
    <section className="mx-auto max-w-page px-gutter pt-[clamp(44px,6vw,80px)] pb-[clamp(96px,11vw,168px)]">
      <Reveal className="max-w-[700px]">
        <Overline>Handoff</Overline>
        <h1 className="mt-4.5 text-[clamp(32px,4vw,50px)] leading-[1.06] font-light tracking-[-0.03em] text-fg-1">
          Component inventory
          <br />
          for Next.js.
        </h1>
        <p className="mt-4.5 text-[17.5px] text-fg-2">
          Every surface in these pages maps to one component below. Server components by default,
          client only where a prop is marked interactive.
        </p>
      </Reveal>

      <Reveal className="mt-9 overflow-hidden rounded-lg border border-line-1 bg-bg-2">
        <div className="hidden grid-cols-[1.1fr_1.3fr_1.5fr_0.7fr] gap-4.5 border-b border-line-1 bg-bg-3 px-6 py-4 text-[12px] font-bold tracking-[0.1em] text-fg-3 uppercase lg:grid">
          <span>Component</span>
          <span>Path</span>
          <span>Props</span>
          <span>Runtime</span>
        </div>

        {componentInventory.map((item) => (
          <div
            key={item.name}
            className="grid gap-2 border-b border-line-1 px-6 py-4 transition-colors duration-300 ease-expo last:border-b-0 hover:bg-bg-1 lg:grid-cols-[1.1fr_1.3fr_1.5fr_0.7fr] lg:items-start lg:gap-4.5"
          >
            <span className="text-[14.5px] font-bold text-fg-1">{item.name}</span>
            <span className="font-mono text-[12.5px] break-all text-fg-2">{item.path}</span>
            <span className="font-mono text-[12.5px] leading-[1.7] text-fg-3">{item.props}</span>
            <span>
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1.5 text-[11.5px] font-semibold whitespace-nowrap",
                  item.runtime === "Client"
                    ? "bg-tint-cornflower text-fg-link"
                    : "bg-tint-violet text-brand-strong",
                )}
              >
                {item.runtime}
              </span>
            </span>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-6.5 grid gap-4.5 lg:grid-cols-3">
        <article className="rounded-lg border border-line-1 bg-bg-2 p-6">
          <h2 className="text-[16px] font-bold text-fg-1">Routes</h2>
          <p className="mt-3 font-mono text-[12.5px] leading-8 text-fg-2">
            {ROUTES.map((route) => (
              <span key={route} className="block">
                {route}
              </span>
            ))}
          </p>
        </article>

        <article className="rounded-lg border border-line-1 bg-bg-2 p-6">
          <h2 className="text-[16px] font-bold text-fg-1">Tokens</h2>
          <p className="mt-2.5 text-[14.5px] leading-[1.65] text-fg-2">
            All colour, type, radius, shadow and motion values come from the Gimhara token layer, no
            local hex codes. Exposed once in{" "}
            <span className="font-mono text-[13px]">app/globals.css</span>.
          </p>
        </article>

        <article className="rounded-lg border border-line-1 bg-bg-2 p-6">
          <h2 className="text-[16px] font-bold text-fg-1">Motion contract</h2>
          <p className="mt-2.5 text-[14.5px] leading-[1.65] text-fg-2">
            Hover lift −6px / 550ms, press scale 0.97 / 160ms, reveal 700ms, filter crossfade 260ms
            all on <span className="font-mono text-[13px]">--ease-expo</span>. Respects{" "}
            <span className="font-mono text-[13px]">prefers-reduced-motion</span>.
          </p>
        </article>
      </Reveal>
    </section>
  );
}
