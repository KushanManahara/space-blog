import { ViewTransition } from "react";

/**
 * Templates (unlike layouts) remount on every navigation within this segment,
 * which is exactly the hook `<ViewTransition>` needs to treat a route change
 * as an exit/enter pair — see the "Suspense reveals" pattern this borrows
 * its asymmetric timing from: https://nextjs.org/docs/app/guides/view-transitions.
 * `default="none"` keeps this from also firing on unrelated same-page
 * transitions, such as the filter-grid crossfades nested inside some pages.
 */
export default function SiteTemplate({ children }: LayoutProps<"/">) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
