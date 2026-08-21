"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { subscribeAction } from "@/app/actions";
import { Reveal } from "@/components/motion/reveal";
import { newsletterBenefits, site } from "@/lib/content";
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
      <Reveal className="grid items-center gap-[clamp(28px,5vw,64px)] rounded-xl bg-bg-3 p-[clamp(28px,4vw,56px)] lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h2 className="text-[clamp(26px,3.2vw,38px)] font-bold tracking-[-0.025em] text-fg-1">
            Join the mailing list
          </h2>
          <p className="mt-3 max-w-[420px] text-[16.5px] leading-[1.6] text-fg-2">
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
                <span className="text-[15.5px] font-semibold text-fg-1">{benefit}</span>
              </li>
            ))}
          </ul>

          <form ref={formRef} action={formAction} className="mt-6.5 max-w-[400px]">
            <div className="flex items-center gap-2 rounded-full border border-line-1 bg-bg-2 p-1.5 pl-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@work.email"
                className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-fg-1 outline-none placeholder:text-fg-3"
              />
              <SubscribeButton />
            </div>
          </form>

          <p
            aria-live="polite"
            className={cn(
              "mt-3 text-[13px]",
              state.status === "error" && "text-accent-orchid",
              state.status === "success" && "inline-flex items-center gap-1.5 text-brand-strong",
              state.status === "idle" && "text-fg-3",
            )}
          >
            {state.status === "success" ? <Check className="size-3.5" strokeWidth={2} /> : null}
            {state.status === "idle"
              ? `${site.subscriberCount.toLocaleString("en-US")} readers. Unsubscribe in one click.`
              : state.message}
          </p>
        </div>

        <div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
          <div className="absolute inset-0 bg-[linear-gradient(150deg,#93C5FD_0%,#007AFF_54%,#0F172A_100%)]">
            <div className="cover-sheen absolute inset-0" />
            <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_30%_24%,rgb(255_255_255/0.16)_0_1px,rgb(255_255_255/0)_1px_20px)]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Subscribe to the mailing list"
      className="inline-flex size-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-on-ink transition-transform duration-300 ease-bounce hover:-translate-y-px active:scale-[0.96] active:duration-150 active:ease-out disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="size-[17px] animate-spin" strokeWidth={1.75} />
      ) : (
        <ArrowRight className="size-[17px]" strokeWidth={1.75} />
      )}
    </button>
  );
}
