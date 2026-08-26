// src/app/(site)/unsubscribe/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Check, MailX } from "lucide-react";

import { unsubscribeAction } from "@/app/actions";
import { BrandMark } from "@/components/layout/brand-mark";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialFormState } from "@/lib/form-state";
import { routes } from "@/lib/content";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [state, formAction, isPending] = React.useActionState(unsubscribeAction, initialFormState);
  const [email, setEmail] = React.useState(emailParam);

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-180px)] max-w-[540px] items-center justify-center px-gutter py-12 sm:py-16">
      <Reveal className="w-full rounded-2xl border border-line-1 bg-bg-2 p-5 shadow-xl sm:p-7 md:rounded-3xl md:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-tint-cornflower text-fg-link">
            <BrandMark size={28} />
          </div>

          <h1 className="text-[24px] font-bold tracking-[-0.02em] text-fg-1 sm:text-[26px]">
            Unsubscribe from Space
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-fg-3 sm:text-[14.5px]">
            Enter your email address below to unsubscribe from our newsletter, article releases, and
            email dispatches.
          </p>

          {state.status === "success" ? (
            <div className="mt-8 flex w-full flex-col items-center rounded-xl border border-line-brand/40 bg-tint-violet p-6 text-center">
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-brand text-white shadow-sm">
                <Check className="size-5" strokeWidth={2.5} />
              </div>
              <h2 className="text-[17px] font-bold text-fg-1">You’ve Been Unsubscribed</h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-2">{state.message}</p>
              <Link
                href={routes.articles}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Back to Articles
              </Link>
            </div>
          ) : (
            <form action={formAction} className="mt-7 w-full text-left">
              <label htmlFor="unsub-email" className="block text-[13px] font-semibold text-fg-2">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="unsub-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@example.com"
                  autoComplete="email"
                  className="h-11 rounded-lg border-line-1 bg-bg-1 px-3.5 text-[16px] text-fg-1 focus-visible:ring-brand sm:text-[14px]"
                />
              </div>

              {state.status === "error" ? (
                <p className="mt-2.5 text-[13px] font-medium text-accent-orchid">{state.message}</p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="submit"
                  variant="dark"
                  size="lg"
                  disabled={isPending || email.trim().length === 0}
                  className="w-full gap-2 text-[14px]"
                >
                  <MailX className="size-4" />
                  {isPending ? "Unsubscribing..." : "Unsubscribe"}
                </Button>

                <Link
                  href={routes.home}
                  className="inline-flex items-center justify-center gap-1.5 py-2 text-[13.5px] font-medium text-fg-3 transition-colors hover:text-fg-1"
                >
                  <ArrowLeft className="size-3.5" />
                  Return to Home
                </Link>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto flex min-h-[50vh] max-w-[540px] items-center justify-center p-8">
          <p className="text-[14px] text-fg-3">Loading...</p>
        </div>
      }
    >
      <UnsubscribeContent />
    </React.Suspense>
  );
}
