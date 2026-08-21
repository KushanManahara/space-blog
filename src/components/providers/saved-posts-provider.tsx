"use client";

import * as React from "react";

type SavedPostsValue = {
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  isLiked: (slug: string) => boolean;
  toggleLiked: (slug: string) => void;
};

const SavedPostsContext = React.createContext<SavedPostsValue | null>(null);

/** Reader-side state shared by every card, row and article on the page. */
export function SavedPostsProvider({
  children,
  initialSaved = [],
  initialLiked = [],
}: {
  children: React.ReactNode;
  initialSaved?: string[];
  initialLiked?: string[];
}) {
  const [saved, setSaved] = React.useState(() => new Set(initialSaved));
  const [liked, setLiked] = React.useState(() => new Set(initialLiked));

  const value = React.useMemo<SavedPostsValue>(
    () => ({
      isSaved: (slug) => saved.has(slug),
      isLiked: (slug) => liked.has(slug),
      toggleSaved: (slug) => setSaved((current) => toggle(current, slug)),
      toggleLiked: (slug) => setLiked((current) => toggle(current, slug)),
    }),
    [saved, liked],
  );

  return <SavedPostsContext value={value}>{children}</SavedPostsContext>;
}

function toggle(set: ReadonlySet<string>, slug: string): Set<string> {
  const next = new Set(set);
  if (!next.delete(slug)) next.add(slug);
  return next;
}

export function useSavedPosts(): SavedPostsValue {
  const context = React.use(SavedPostsContext);
  if (!context) throw new Error("useSavedPosts must be used inside <SavedPostsProvider>");
  return context;
}
