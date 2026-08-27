"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Lock,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { addCommentAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/lib/content";
import { cn } from "@/lib/utils";

const toneStyles = {
  violet: "bg-tint-violet text-brand-strong",
  cornflower: "bg-tint-cornflower text-fg-link",
  orchid: "bg-tint-orchid text-accent-orchid",
} as const;

const INITIAL_VISIBLE_COUNT = 4;
const STORAGE_KEY = "space_commenter_profile";

/** Response thread with a modal asking for author credentials (Name, Role, Email) before posting. */
export function CommentThread({
  slug,
  comments,
  total,
}: {
  slug?: string;
  comments: Comment[];
  total: number;
}) {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [draft, setDraft] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [posted, setPosted] = React.useState<Comment[]>([]);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Restore saved commenter profile from localStorage on mount
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name) setName(parsed.name);
          if (parsed.role) setRole(parsed.role);
          if (parsed.email) setEmail(parsed.email);
        }
      } catch {
        // Ignore local storage errors
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const allComments = [...posted, ...comments];
  const hasMore = allComments.length > INITIAL_VISIBLE_COUNT;
  const visibleComments = isExpanded ? allComments : allComments.slice(0, INITIAL_VISIBLE_COUNT);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const canConfirmPost =
    name.trim().length > 0 &&
    role.trim().length > 0 &&
    isValidEmail(email) &&
    draft.trim().length >= 2 &&
    !isSubmitting;

  const handleOpenModal = (event: React.FormEvent) => {
    event.preventDefault();
    if (draft.trim().length < 2) return;
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canConfirmPost) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedRole = role.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedBody = draft.trim();

    // Cache commenter profile in localStorage
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: trimmedName, role: trimmedRole, email: trimmedEmail }),
      );
    } catch {
      // Ignore local storage error
    }

    const initials =
      trimmedName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AN";

    const localComment: Comment = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      role: trimmedRole,
      initials,
      postedAgo: "just now",
      likes: 0,
      tone: "cornflower",
      body: trimmedBody,
    };

    setPosted((current) => [localComment, ...current]);
    setDraft("");
    setIsModalOpen(false);

    if (slug) {
      const res = await addCommentAction({
        postSlug: slug,
        name: trimmedName,
        role: trimmedRole,
        email: trimmedEmail,
        body: trimmedBody,
      });

      if (!res.success) {
        setErrorMsg(res.error || "Failed to submit comment.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <section id="responses" className="mt-12 scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[20px] font-bold tracking-[-0.015em] text-fg-1 sm:text-[22px]">
          Responses ({total + posted.length})
        </h2>
        {allComments.length > 0 ? (
          <span className="hidden text-[13px] text-fg-3 sm:inline">
            Peer review & engineering discussion
          </span>
        ) : null}
      </div>

      {/* Main Comment Draft Input */}
      <form
        onSubmit={handleOpenModal}
        className="mt-5 rounded-lg border border-line-1 bg-bg-2 p-5 shadow-xs md:p-6"
      >
        <label htmlFor="comment-body" className="block text-[13px] font-semibold text-fg-2">
          Add to the discussion
        </label>
        <Textarea
          id="comment-body"
          required
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Share your perspective, benchmarks, corrections, or follow-up questions..."
          className="mt-2.5 min-h-24 resize-y rounded-md border-line-1 bg-bg-1 p-3 text-[16px] text-fg-1 focus-visible:ring-brand sm:text-[14px]"
        />

        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-line-1/60 pt-3.5">
          <p className="inline-flex items-center gap-1.5 text-[12px] text-fg-3">
            <Lock className="size-3.5 text-fg-3/80" />
            Verified name, role, and email required before posting.
          </p>

          <div className="flex w-full items-center justify-end gap-2.5 sm:w-auto">
            {draft ? (
              <button
                type="button"
                onClick={() => setDraft("")}
                className="cursor-pointer px-3.5 py-2 text-[13px] font-medium text-fg-3 transition-colors hover:text-fg-1"
              >
                Clear
              </button>
            ) : null}
            <Button
              type="submit"
              variant="dark"
              size="sm"
              disabled={draft.trim().length < 2}
              className="gap-1.5 text-[13.5px]"
            >
              <Send className="size-3.5" />
              Post Response
            </Button>
          </div>
        </div>
      </form>

      {/* Commenter Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[480px] p-4.5 sm:p-7">
          <div className="flex items-center justify-between border-b border-line-1 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="inline-flex size-8 items-center justify-center rounded-lg bg-tint-cornflower text-fg-link">
                <Sparkles className="size-4" />
              </div>
              <DialogTitle className="text-[17px] font-bold text-fg-1">
                Commenter Details
              </DialogTitle>
            </div>
            <DialogClose className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-fg-3 transition-colors hover:bg-bg-3 hover:text-fg-1">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <p className="mt-3.5 text-[13.5px] leading-relaxed text-fg-3">
            Please enter your name, role, and email address before your response is published.
          </p>

          {/* Comment Snippet Preview */}
          <div className="mt-3.5 line-clamp-3 rounded-lg border border-line-1 bg-bg-1 p-3 text-[13px] leading-relaxed text-fg-2">
            <span className="font-semibold text-fg-3">Response: </span>
            &ldquo;{draft}&rdquo;
          </div>

          <form onSubmit={handleFinalSubmit} className="mt-4.5 space-y-3.5">
            <div>
              <label htmlFor="modal-name" className="block text-[12.5px] font-semibold text-fg-2">
                Full Name <span className="text-brand">*</span>
              </label>
              <Input
                id="modal-name"
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="mt-1.5 h-10 rounded-lg border-line-1 bg-bg-1 text-[16px] sm:text-[13.5px]"
              />
            </div>

            <div>
              <label htmlFor="modal-role" className="block text-[12.5px] font-semibold text-fg-2">
                Role <span className="text-brand">*</span>
              </label>
              <Input
                id="modal-role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="mt-1.5 h-10 rounded-lg border-line-1 bg-bg-1 text-[16px] sm:text-[13.5px]"
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-[12.5px] font-semibold text-fg-2">
                Email Address <span className="text-brand">*</span>
              </label>
              <Input
                id="modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="mt-1.5 h-10 rounded-lg border-line-1 bg-bg-1 text-[16px] sm:text-[13.5px]"
              />
              <p className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] text-fg-3">
                <Lock className="size-3" />
                Will never be published or shared publicly.
              </p>
            </div>

            {errorMsg ? (
              <p className="text-[12.5px] font-medium text-accent-orchid">{errorMsg}</p>
            ) : null}

            <div className="mt-5 flex flex-col-reverse items-center justify-end gap-2.5 border-t border-line-1/60 pt-4 sm:flex-row">
              <DialogClose asChild>
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-center text-[13.5px] font-semibold text-fg-3 transition-colors hover:text-fg-1 sm:w-auto sm:py-2"
                >
                  Cancel
                </button>
              </DialogClose>
              <Button
                type="submit"
                variant="dark"
                size="md"
                disabled={!canConfirmPost}
                className="w-full gap-2 text-[13.5px] sm:w-auto"
              >
                <Send className="size-3.5" />
                {isSubmitting ? "Publishing..." : "Confirm & Post"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Existing Responses List */}
      {allComments.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-line-1 py-10 text-center">
          <div className="mb-2.5 inline-flex size-10 items-center justify-center rounded-full bg-bg-2 text-fg-3">
            <MessageSquare className="size-5" />
          </div>
          <p className="text-[14.5px] font-medium text-fg-2">No responses yet</p>
          <p className="mt-1 text-[13px] text-fg-3">
            Be the first to share your thoughts, benchmarks, or feedback above.
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "mt-6 flex flex-col gap-4",
            isExpanded &&
              hasMore &&
              "max-h-[640px] [scrollbar-width:thin] [scrollbar-color:var(--color-line-2)_transparent] overflow-y-auto pr-2",
          )}
        >
          {visibleComments.map((comment) => (
            <article key={comment.id} className="flex gap-3.5">
              <span
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold shadow-xs",
                  toneStyles[comment.tone],
                )}
              >
                {comment.initials}
              </span>
              <div className="min-w-0 flex-1 rounded-lg border border-line-1 bg-bg-2 px-4 py-3.5 break-words shadow-xs sm:px-5 sm:py-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <p className="text-[14.5px] font-bold text-fg-1">{comment.name}</p>
                  {comment.role ? (
                    <span className="inline-flex items-center rounded-md bg-tint-cornflower px-2 py-0.5 text-[11.5px] font-medium text-fg-link">
                      {comment.role}
                    </span>
                  ) : null}
                  <span className="text-[12.5px] text-fg-3">· {comment.postedAgo}</span>
                </div>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] whitespace-pre-wrap text-fg-2">
                  {comment.body}
                </p>
                <div className="mt-3.5 flex items-center gap-4 text-[12.5px] text-fg-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="size-[13px]" strokeWidth={1.75} />
                    {comment.likes}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {hasMore ? (
        <div className="mt-6 text-center">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 text-[14px]"
          >
            {isExpanded ? (
              <>
                Show fewer responses
                <ChevronUp className="size-4" />
              </>
            ) : (
              <>
                View all {total + posted.length} responses
                <ChevronDown className="size-4" />
              </>
            )}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
