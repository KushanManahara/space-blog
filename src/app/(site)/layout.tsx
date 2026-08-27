// src/app/(site)/layout.tsx
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

/** Public site chrome. The studio routes deliberately sit outside this layout. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="w-full max-w-full min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
