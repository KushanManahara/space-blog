// src/app/(site)/layout.tsx
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { KeyboardShortcuts } from "@/components/nav/keyboard-shortcuts";

/** Public site chrome, plus the site-wide skip link and shortcut sheet. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
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
    </>
  );
}
