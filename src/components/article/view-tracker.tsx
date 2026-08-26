"use client";

import * as React from "react";

import { recordViewAction } from "@/app/actions";

/**
 * Records one view per article per browser session.
 *
 * Session-scoped rather than per-render because React strict mode mounts twice
 * in development, and a reader scrolling back to an article they already opened
 * should not count twice.
 */
export function ViewTracker({ slug }: { slug: string }) {
  React.useEffect(() => {
    const key = `space:viewed:${slug}`;

    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode or storage disabled: fall through and record the view.
    }

    void recordViewAction(slug);
  }, [slug]);

  return null;
}
