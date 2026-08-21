"use client";

import * as React from "react";
import { Check, Link2, Mail, Share, X } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { author } from "@/lib/content";

/** Share targets. “Copy link” is the only one wired to a browser API. */
export function ShareSheet({
  open,
  onOpenChange,
  title,
  url,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const targets = [
    {
      label: "Copy link",
      note: url,
      icon: copied ? Check : Link2,
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      },
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-5.5">
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-[16px]">Share this post</DialogTitle>
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
                  <span className="block truncate text-[12.5px] text-fg-3">{target.note}</span>
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
