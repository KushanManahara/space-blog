"use client";

import * as React from "react";
import { Check, Copy, Link2, Mail, Printer, Share, X } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  author,
  copyArticleToClipboard,
  getPostBySlug,
  type Post,
  type PostSummary,
} from "@/lib/content";

/** Share targets, including Copy Link, Copy Article (with watermark), and Print. */
export function ShareSheet({
  open,
  onOpenChange,
  title,
  url,
  slug,
  post,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  slug?: string;
  post?: Post | PostSummary;
}) {
  const [copyLinkState, setCopyLinkState] = React.useState<"idle" | "copied" | "failed">("idle");
  const [copyArticleState, setCopyArticleState] = React.useState<"idle" | "copied" | "failed">(
    "idle",
  );

  const linkCopied = copyLinkState === "copied";
  const articleCopied = copyArticleState === "copied";

  const handleOpenChange = (next: boolean) => {
    setCopyLinkState("idle");
    setCopyArticleState("idle");
    onOpenChange(next);
  };

  const handleCopyArticle = async () => {
    const targetSlug = slug ?? (post ? post.slug : undefined);
    const fullPost =
      post && "body" in post ? (post as Post) : targetSlug ? getPostBySlug(targetSlug) : undefined;
    if (!fullPost) return;

    if (await copyArticleToClipboard(fullPost)) {
      setCopyArticleState("copied");
      setTimeout(() => setCopyArticleState("idle"), 2000);
      return;
    }
    setCopyArticleState("failed");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      onOpenChange(false);
      setTimeout(() => window.print(), 200);
    }
  };

  const targets = [
    {
      label: copyLinkState === "failed" ? "Press Ctrl/Cmd+C to copy" : "Copy link",
      note: url,
      icon: linkCopied ? Check : Link2,
      action: async () => {
        if (await copyToClipboard(url)) {
          setCopyLinkState("copied");
          setTimeout(() => setCopyLinkState("idle"), 2000);
          return;
        }
        setCopyLinkState("failed");
      },
    },
    {
      label: articleCopied ? "Article copied!" : "Copy full article",
      note: "Formatted text with copyright watermark",
      icon: articleCopied ? Check : Copy,
      action: handleCopyArticle,
    },
    {
      label: "Print article",
      note: "Clean layout with watermark (⌘P)",
      icon: Printer,
      action: handlePrint,
    },
    {
      label: "Share on X",
      note: author.handle,
      icon: Share,
      href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on LinkedIn",
      note: "Post to feed",
      icon: Share,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Email a colleague",
      note: "Opens your mail client",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[420px] p-5.5">
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-[16px]">Share or export article</DialogTitle>
          <DialogClose className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-full text-fg-3 transition-colors duration-300 ease-expo hover:bg-bg-3">
            <X className="size-[15px]" strokeWidth={2} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="mt-3.5 flex flex-col gap-1.5">
          {targets.map((target) => {
            const Icon = target.icon;
            const content = (
              <>
                <span className="inline-flex size-8.5 shrink-0 items-center justify-center rounded-full bg-tint-violet text-brand-strong">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold text-fg-1">
                    {target.label}
                  </span>
                  <span className="block truncate text-[12.5px] text-fg-3 select-all">
                    {target.note}
                  </span>
                </span>
              </>
            );

            const className =
              "flex w-full cursor-pointer items-center gap-3 rounded-md px-3.5 py-3 text-left transition-[background-color,transform] duration-300 ease-bounce hover:translate-x-0.5 hover:bg-veil/70";

            return target.href ? (
              <a
                key={target.label}
                href={target.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <button
                key={target.label}
                type="button"
                onClick={target.action}
                className={className}
              >
                {content}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Async clipboard with a synchronous fallback for blocked or legacy contexts. */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to legacy path
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
