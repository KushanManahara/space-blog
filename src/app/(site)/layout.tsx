// src/app/(site)/layout.tsx
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { KeyboardShortcuts } from "@/components/nav/keyboard-shortcuts";
import { ReviewInviteFloat, type InviteQuote } from "@/components/reviews/review-invite-float";
import { getApprovedReviews } from "@/lib/reviews";

/** A featured review, cut at a word boundary, to quote in the floating invitation. */
async function inviteQuote(): Promise<InviteQuote | null> {
  const [top] = (await getApprovedReviews(1, 1)).items;
  if (!top?.featured) return null;
  const text =
    top.body.length > 120 ? `${top.body.slice(0, 120).replace(/\s+\S*$/, "")}…` : top.body;
  return { text, name: top.displayName };
}

/** Public site chrome, plus the site-wide skip link and shortcut sheet. */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const quote = await inviteQuote();
  return (
    <>
      {/* First thing in the tab order: a keyboard or screen-reader user should
          not have to walk the whole nav on every page to reach the article. */}
      <a
        href="#main"
        className="sr-only rounded-md bg-brand px-4 py-2.5 text-[14px] font-semibold text-on-brand focus-visible:not-sr-only focus-visible:absolute focus-visible:top-[calc(env(safe-area-inset-top,0px)+12px)] focus-visible:left-4 focus-visible:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="w-full max-w-full min-w-0 flex-1 overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
      <ScrollToTop />
      <KeyboardShortcuts />
      <ReviewInviteFloat quote={quote} />
    </>
  );
}
