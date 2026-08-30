"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { MagicCard } from "@/components/ui/magic-card";
import { Check } from "lucide-react";

import { contactAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactTopics } from "@/lib/content";
import { initialFormState } from "@/lib/form-state";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [state, formAction] = useActionState(contactAction, initialFormState);
  const [subject, setSubject] = React.useState<string>(contactTopics[0]);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Reset on success, derived during render rather than in an effect — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [resetOnStatus, setResetOnStatus] = React.useState(state.status);
  if (resetOnStatus !== state.status) {
    setResetOnStatus(state.status);
    if (state.status === "success") setSubject(contactTopics[0]);
  }

  React.useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    // MagicCard draws the border and the surface, so the form only carries padding.
    // Leaving the form's own border on would double the outline against the card's.
    <MagicCard className="rounded-lg shadow-sm" surfaceClassName="bg-bg-2">
      <form
        ref={formRef}
        action={formAction}
        className="relative rounded-[inherit] p-5 sm:p-[clamp(24px,3vw,34px)]"
      >
        <HoneypotField id="contact-company-website" />
        <div className="flex flex-col gap-5">
          <Field label="Your name" htmlFor="contact-name">
            <Input id="contact-name" name="name" required placeholder="Ada Rehman" />
          </Field>

          <Field label="Email address" htmlFor="contact-email">
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@work.email"
            />
          </Field>

          <fieldset>
            <legend className="mb-2 block text-[13.5px] font-semibold text-fg-1">
              What&rsquo;s this about?
            </legend>
            <input type="hidden" name="subject" value={subject} />
            <div className="flex flex-wrap gap-2">
              {contactTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={subject === topic}
                  onClick={() => setSubject(topic)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-[background-color,color,border-color] duration-300 ease-expo",
                    subject === topic
                      ? "border-ink bg-ink text-on-ink"
                      : "border-line-1 bg-bg-1 text-fg-2 hover:border-line-2",
                  )}
                >
                  {topic}
                </button>
              ))}
            </div>
          </fieldset>

          <Field label="Message" htmlFor="contact-message">
            <Textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              placeholder="If it's a correction, a link to what I got wrong helps."
              className="min-h-37.5"
            />
          </Field>

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
      {pending ? "Sending…" : "Send message"}
    </InteractiveHoverButton>
  );
}
