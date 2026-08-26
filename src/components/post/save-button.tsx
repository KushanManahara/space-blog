"use client";

import { Bookmark } from "lucide-react";

import { useSavedPosts } from "@/components/providers/saved-posts-provider";
import { IconToggle } from "@/components/ui/icon-toggle";
import { cn } from "@/lib/utils";

/** `onCover` is the round button that floats over cover artwork. */
export function SaveButton({
  slug,
  title,
  placement = "row",
}: {
  slug: string;
  title: string;
  placement?: "row" | "onCover";
}) {
  const { isSaved, toggleSaved } = useSavedPosts();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove “${title}” from saved posts` : `Save “${title}” for later`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSaved(slug);
      }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center transition-[transform,background-color,color] duration-300 ease-bounce",
        placement === "row" &&
          "size-9 -my-2 -mr-2 rounded-full hover:bg-bg-3/80 hover:-translate-y-px active:scale-90",
        placement === "onCover" &&
          "size-9 rounded-full bg-white/85 shadow-xs backdrop-blur-[14px] backdrop-saturate-150 hover:scale-[1.08] active:scale-[0.96] active:duration-150 active:ease-out dark:bg-bg-2/85",
        saved ? "text-brand-strong" : "text-fg-3",
      )}
    >
      <IconToggle icon={Bookmark} active={saved} className="size-3.5" />
    </button>
  );
}
