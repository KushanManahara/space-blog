// src/components/studio/broadcast-button.tsx
"use client";

import * as React from "react";
import { Check, Loader2, Send } from "lucide-react";
import { broadcastArticleAction } from "@/app/actions";

interface BroadcastButtonProps {
  postSlug: string;
  postTitle: string;
}

export function BroadcastButton({ postSlug, postTitle }: BroadcastButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [count, setCount] = React.useState<number | null>(null);

  async function handleBroadcast() {
    // PREVENT DUPLICATE CLICKS WHILE DISPATCHING
    if (loading) return;

    // USER CONFIRMATION GUARD
    const confirmed = window.confirm(
      `Broadcast notification email for:\n"${postTitle}"\nto all registered newsletter subscribers?`,
    );
    if (!confirmed) return;

    setLoading(true);
    setStatus("idle");

    try {
      const res = await broadcastArticleAction(postSlug);
      if (res.success) {
        setStatus("success");
        setCount(res.count ?? 0);
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        alert(res.error || "FAILED TO DISPATCH BROADCAST");
      }
    } catch (err) {
      console.error("BROADCAST BUTTON EXCEPTION:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  if (status === "success") {
    return (
      <span className="bg-tint-emerald text-accent-moss inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold">
        <Check className="size-3" strokeWidth={2.5} />
        Sent ({count})
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBroadcast}
      disabled={loading}
      title="Broadcast article to newsletter subscribers"
      className="inline-flex items-center gap-1.5 rounded-full border border-line-1 bg-bg-2 px-2.5 py-1 text-[12px] font-medium text-fg-2 transition-[background-color,color,border-color] duration-200 hover:border-brand/50 hover:bg-tint-cornflower hover:text-brand-strong disabled:pointer-events-none disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="size-3 animate-spin text-brand" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="size-3 text-fg-3" />
          <span>Broadcast</span>
        </>
      )}
    </button>
  );
}
