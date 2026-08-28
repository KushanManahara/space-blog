"use client";

import * as React from "react";

import { author, site, siteUrl, type Post } from "@/lib/content";

/**
 * Attaches an author & copyright attribution watermark whenever a reader
 * copies a substantial excerpt (> 100 characters) from the article.
 */
export function CopySelectionWatermark({ post }: { post: Post }) {
  React.useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      // If the copy originated from inside an input/textarea or runnable editor, don't alter it
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const selectedText = selection.toString().trim();
      if (selectedText.length < 100) return;

      const articleUrl = `${siteUrl}/articles/${post.slug}`;
      const currentYear = new Date().getFullYear();
      const attribution = `\n\n— Excerpt from "${post.title}" by ${author.name} on ${site.name} (${articleUrl}) © ${currentYear} ${author.name}. All rights reserved.`;

      if (e.clipboardData) {
        e.preventDefault();
        e.clipboardData.setData("text/plain", `${selectedText}${attribution}`);
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [post]);

  return null;
}
