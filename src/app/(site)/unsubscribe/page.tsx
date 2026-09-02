// src/app/(site)/unsubscribe/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { MailX } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Reveal } from "@/components/motion/reveal";
import { verifyUnsubscribe } from "@/lib/newsletter-token";
import { routes } from "@/lib/content";
import { alternates } from "@/lib/metadata";

/**
 * Unsubscribe confirmation.
 *
 * This page never removes anybody. It only renders the confirmation for a
 * signed link and hands the actual removal to `/api/newsletter/unsubscribe`,
 * which verifies the token again and only mutates on POST.
 *
 * It used to post a bare address to a server action that deleted the row
 * outright, which meant anyone could unsubscribe anyone by typing their
 * address — the exact hole `newsletter-token.ts` exists to close. There is now
 * one code path to removal, and it is signed.
 */
export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving Space post notifications.",
  alternates: alternates("/unsubscribe"),
  // A utility page with no reason to be in an index, and previously the only
  // page inheriting the site's root canonical — which pointed search engines
  // at the homepage.
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({ searchParams }: PageProps<"/unsubscribe">) {
  const params = await searchParams;
  const rawEmail = typeof params.email === "string" ? params.email : undefined;
  const token = typeof params.t === "string" ? params.t : null;
  const email = rawEmail?.trim().toLowerCase();
  const isSigned = Boolean(email) && verifyUnsubscribe(email!, token);

  return (
    <div className="relative mx-auto flex min-h-[calc(100dvh-180px)] max-w-[540px] items-center justify-center px-gutter py-12 sm:py-16">
      <Reveal className="w-full rounded-2xl border border-line-1 bg-bg-2 p-5 shadow-xl sm:p-7 md:rounded-3xl md:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-tint-cornflower text-fg-link">
            <BrandMark size={28} />
          </div>

          <h1 className="text-[24px] font-bold tracking-[-0.02em] text-fg-1 sm:text-[26px]">
            Unsubscribe from Space
          </h1>

          {isSigned ? (
            <>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-3 sm:text-[14.5px]">
                <span className="font-semibold text-fg-2">{email}</span> will stop receiving post
                notifications. You can resubscribe at any time.
              </p>

              {/* A plain POST to the signed route. Mail scanners issue GETs and
                  so cannot trip this, which is what RFC 8058 assumes. */}
              <form
                method="post"
                action={`/api/newsletter/unsubscribe?email=${encodeURIComponent(email!)}&t=${encodeURIComponent(token!)}`}
                className="mt-7 flex w-full flex-col gap-3"
              >
                <button
                  type="submit"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-on-ink transition-opacity hover:opacity-90"
                >
                  <MailX className="size-4" />
                  Confirm unsubscribe
                </button>
                <Link
                  href={routes.home}
                  className="inline-flex items-center justify-center py-2 text-[13.5px] font-medium text-fg-3 transition-colors hover:text-fg-1"
                >
                  No, keep me subscribed
                </Link>
              </form>
            </>
          ) : (
            <>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-3 sm:text-[14.5px]">
                Unsubscribe links are tied to one address, so this page needs the link from an email
                rather than a typed address. Open any Space email and use the unsubscribe link at
                the bottom — or reply to it and it will be handled by hand.
              </p>

              <div className="mt-7 flex w-full flex-col gap-3">
                <Link
                  href={routes.articles}
                  className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-on-ink transition-opacity hover:opacity-90"
                >
                  Back to articles
                </Link>
                <Link
                  href={routes.contact}
                  className="inline-flex items-center justify-center py-2 text-[13.5px] font-medium text-fg-3 transition-colors hover:text-fg-1"
                >
                  Get in touch
                </Link>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}
