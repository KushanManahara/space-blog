"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Star } from "lucide-react";

import { submitReviewAction } from "@/app/actions";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { Input } from "@/components/ui/input";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MagicCard } from "@/components/ui/magic-card";
import { Textarea } from "@/components/ui/textarea";
import { initialFormState } from "@/lib/form-state";
import { markSubmitted } from "@/lib/review-invite";
import { cn } from "@/lib/utils";

const BODY_MAX = 1000;
const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

/** Cloudflare's documented always-pass test site key, used only when none is configured outside production. */
const TEST_SITE_KEY = "1x00000000000000000000AA";
const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "" : TEST_SITE_KEY);

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Loads Cloudflare's script once per page, only on pages that show the form. */
function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing")),
    );
    script.addEventListener("error", () => reject(new Error("Turnstile failed to load")));
  });
}

/** `initialRating` comes from `?rating=` when the reader picked a star on an invitation. */
export function ReviewForm({ initialRating = 0 }: { initialRating?: number }) {
  const [state, formAction] = useActionState(submitReviewAction, initialFormState);
  const formRef = React.useRef<HTMLFormElement>(null);
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const widgetId = React.useRef<string | null>(null);
  const [rating, setRating] = React.useState(Number(state.values?.rating) || initialRating);
  const [bodyLength, setBodyLength] = React.useState(state.values?.body?.length ?? 0);
  const [challengeError, setChallengeError] = React.useState(false);

  // Render the challenge once; it lives in the form and adds the
  // `cf-turnstile-response` field the server action reads.
  React.useEffect(() => {
    if (!siteKey || !widgetRef.current) return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetRef.current || widgetId.current) return;
        widgetId.current = turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          action: "review",
          theme: "auto",
          size: "flexible",
        });
      })
      .catch(() => setChallengeError(true));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  // Clear the controlled fields after a successful send, derived during render
  // rather than in an effect (as in ContactForm).
  const [seenState, setSeenState] = React.useState(state);
  if (seenState !== state) {
    setSeenState(state);
    if (state.status === "success") {
      setRating(0);
      setBodyLength(0);
    }
  }

  // A token is single use, so every submission (pass or fail) needs a new one.
  React.useEffect(() => {
    if (state.status === "idle") return;
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    if (state.status === "success") {
      formRef.current?.reset();
      // No more review invitations for this visitor.
      markSubmitted();
    }
  }, [state]);

  if (!siteKey) {
    return (
      <p className="rounded-lg border border-dashed border-line-1 bg-bg-2 p-6 text-[15px] text-fg-2">
        Reviews are closed for the moment. Please check back soon.
      </p>
    );
  }

  return (
    <MagicCard className="rounded-lg shadow-sm" surfaceClassName="bg-bg-2">
      <form
        ref={formRef}
        action={formAction}
        className="relative rounded-[inherit] p-5 sm:p-[clamp(24px,3vw,34px)]"
      >
        <HoneypotField id="review-company-website" />
        <div className="flex flex-col gap-5">
          <fieldset>
            <legend className="mb-2 block text-[13.5px] font-semibold text-fg-1">
              Your rating
            </legend>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex" role="radiogroup" aria-label="Rating">
                {ratingLabels.map((label, index) => {
                  const value = index + 1;
                  return (
                    <label
                      key={value}
                      className="tap-target cursor-pointer rounded-full p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        required
                        checked={rating === value}
                        onChange={() => setRating(value)}
                        className="sr-only"
                      />
                      <span className="sr-only">
                        {value} star{value > 1 ? "s" : ""}, {label}
                      </span>
                      <Star
                        aria-hidden
                        className={cn(
                          "size-7 transition-[color,fill,transform] duration-300 ease-expo hover:scale-110",
                          value <= rating ? "fill-star text-star" : "fill-transparent text-line-2",
                        )}
                      />
                    </label>
                  );
                })}
              </div>
              <span aria-hidden className="text-[13.5px] text-fg-2">
                {rating ? ratingLabels[rating - 1] : "Choose 1 to 5 stars"}
              </span>
            </div>
          </fieldset>

          <Field label="Your review" htmlFor="review-body">
            <Textarea
              id="review-body"
              name="body"
              required
              minLength={20}
              maxLength={BODY_MAX}
              defaultValue={state.values?.body}
              onChange={(event) => setBodyLength(event.target.value.length)}
              placeholder="What did you find useful? What would you like to read next?"
              className="min-h-37.5"
              aria-describedby="review-body-count"
            />
            <p id="review-body-count" className="mt-1.5 text-right text-[12.5px] text-fg-3">
              {bodyLength}/{BODY_MAX}
            </p>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Display name" htmlFor="review-name">
              <Input
                id="review-name"
                name="displayName"
                required
                minLength={2}
                maxLength={60}
                autoComplete="name"
                placeholder="Shown with your review"
                defaultValue={state.values?.displayName}
              />
            </Field>
            <Field label="Email (optional)" htmlFor="review-email">
              <Input
                id="review-email"
                name="email"
                type="email"
                maxLength={254}
                autoComplete="email"
                placeholder="Never shown publicly"
                defaultValue={state.values?.email}
              />
            </Field>
          </div>

          <div ref={widgetRef} className="min-h-[65px]" />
          {challengeError && (
            <p className="text-[13.5px] text-accent-orchid">
              The spam check couldn&rsquo;t load. Disable any content blocker for this page and
              reload.
            </p>
          )}

          <p className="text-[13px] leading-relaxed text-fg-3">
            Reviews are checked before they appear. Your email is only used if I need to reply.
          </p>

          <SubmitButton />

          <p
            aria-live="polite"
            className={cn(
              "text-[13.5px]",
              state.status === "error" && "text-accent-orchid",
              state.status === "success" && "inline-flex items-center gap-2 text-brand-strong",
            )}
          >
            {state.status === "success" ? <Check className="size-4" strokeWidth={2} /> : null}
            {state.message}
          </p>
        </div>
      </form>
    </MagicCard>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[13.5px] font-semibold text-fg-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <InteractiveHoverButton
      type="submit"
      disabled={pending}
      className="w-full px-7 py-3.5 sm:w-auto sm:self-start"
    >
      {pending ? "Sending…" : "Submit review"}
    </InteractiveHoverButton>
  );
}
