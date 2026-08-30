// src/components/home/newsletter-block.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";

import { subscribeAction } from "@/app/actions";
import { Reveal } from "@/components/motion/reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { newsletterBenefits } from "@/lib/content";
import { initialFormState } from "@/lib/form-state";
import { cn } from "@/lib/utils";

const benefitTone = [
  "bg-tint-cornflower text-fg-link",
  "bg-tint-violet text-brand-strong",
] as const;

export function NewsletterBlock() {
  const [state, formAction] = useActionState(subscribeAction, initialFormState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <section className="mx-auto max-w-page px-gutter pb-[clamp(76px,9vw,132px)]">
      {/* MagicCard draws the border and the surface, so the grid inside only
          carries padding — keeping the block's own border would double the
          outline against the card's. */}
      <Reveal>
        <MagicCard
          className="rounded-2xl shadow-lg md:rounded-3xl md:shadow-xl"
          surfaceClassName="bg-bg-2"
        >
          <div className="grid items-center gap-[clamp(28px,5vw,64px)] p-5 sm:p-[clamp(28px,4vw,56px)] lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-[clamp(24px,3.2vw,38px)] font-bold tracking-[-0.025em] text-fg-1">
                Join the mailing list
              </h2>
              <p className="mt-3 max-w-[420px] text-[15.5px] leading-[1.6] text-fg-2 sm:text-[16.5px]">
                One email when a post goes out. No digests, no drip sequence, no sponsors.
              </p>

              <ul className="mt-6 flex flex-col gap-3.5">
                {newsletterBenefits.map((benefit, index) => (
                  <li key={benefit} className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "inline-flex size-[30px] shrink-0 items-center justify-center rounded-full font-mono text-[11.5px] font-bold",
                        benefitTone[index % benefitTone.length],
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-semibold text-fg-1 sm:text-[15.5px]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <form ref={formRef} action={formAction} className="relative mt-6.5 max-w-[400px]">
                <HoneypotField id="newsletter-company-website" />
                <div className="relative flex items-center gap-2 rounded-full border border-line-1 bg-bg-2 p-1.5 pl-4 sm:pl-5">
                  <ShineBorder borderWidth={1} duration={12} />
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@work.email"
                    className="min-w-0 flex-1 bg-transparent py-3 text-[16px] text-fg-1 outline-none placeholder:text-fg-3 sm:text-[15px]"
                  />
                  <SubscribeButton />
                </div>
              </form>

              <p
                aria-live="polite"
                className={cn(
                  "mt-3 text-[13px]",
                  state.status === "error" && "text-accent-orchid",
                  state.status === "success" &&
                    "inline-flex items-center gap-1.5 text-brand-strong",
                  state.status === "idle" && "text-fg-3",
                )}
              >
                {state.status === "success" ? <Check className="size-3.5" strokeWidth={2} /> : null}
                {state.status === "idle"
                  ? "Join the technical mailing list. Free updates, unsubscribe in one click."
                  : state.message}
              </p>
            </div>

            {/* NEWSLETTER PREVIEW ARTWORK */}
            <div
              aria-hidden
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line-1 shadow-sm md:rounded-2xl"
            >
              <Image
                src="/newsletter.png"
                alt="Space newsletter preview artwork"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </MagicCard>
      </Reveal>
    </section>
  );
}

function SubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <InteractiveHoverButton
      type="submit"
      disabled={pending}
      aria-label="Subscribe to the mailing list"
      className="relative z-10 shrink-0 px-5 py-[11px] text-[14px]"
    >
      {pending ? <Loader2 className="size-[17px] animate-spin" strokeWidth={1.75} /> : "Subscribe"}
    </InteractiveHoverButton>
  );
}
