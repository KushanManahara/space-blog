"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { hasSubmitted, reviewHref } from "@/lib/review-invite";

/**
 * "Write a review", or a thank-you for a visitor who already sent one from
 * this browser. The server snapshot is the button, so hydration matches and the
 * thank-you appears right after.
 */
const subscribe = () => () => {};

export function WriteReviewCta() {
  const submitted = React.useSyncExternalStore(subscribe, hasSubmitted, () => false);

  if (submitted) {
    return (
      <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-strong">
        <Check className="size-4" aria-hidden />
        Thanks for your review
      </p>
    );
  }
  return (
    <InteractiveHoverButton href={reviewHref()} className="px-6 py-3">
      Write a review
    </InteractiveHoverButton>
  );
}
