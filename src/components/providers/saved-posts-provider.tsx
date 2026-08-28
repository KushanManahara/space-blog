"use client";

import * as React from "react";

type SavedPostsValue = {
  /**
   * False until localStorage has been read. Surfaces that render *from* the
   * saved set need this, or they flash an empty state on first paint.
   */
  hydrated: boolean;
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  isLiked: (slug: string) => boolean;
  toggleLiked: (slug: string) => void;
};

const SavedPostsContext = React.createContext<SavedPostsValue | null>(null);

const STORAGE_KEYS = {
  saved: "space_saved_posts",
  liked: "space_liked_posts",
} as const;

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
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedSaved = localStorage.getItem(STORAGE_KEYS.saved);
      if (storedSaved) {
        const parsed = JSON.parse(storedSaved);
        if (Array.isArray(parsed)) {
          queueMicrotask(() => setSaved(new Set(parsed)));
        }
      }
      const storedLiked = localStorage.getItem(STORAGE_KEYS.liked);
      if (storedLiked) {
        const parsed = JSON.parse(storedLiked);
        if (Array.isArray(parsed)) {
          queueMicrotask(() => setLiked(new Set(parsed)));
        }
      }
    } catch {
      // Ignore storage read errors
    }
    // Queued like the reads above so the flag lands with the values it describes.
    queueMicrotask(() => setHydrated(true));
  }, []);

  const toggleSaved = React.useCallback((slug: string) => {
    setSaved((current) => {
      const next = toggle(current, slug);
      try {
        localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify([...next]));
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  }, []);

  const toggleLiked = React.useCallback((slug: string) => {
    setLiked((current) => {
      const next = toggle(current, slug);
      try {
        localStorage.setItem(STORAGE_KEYS.liked, JSON.stringify([...next]));
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  }, []);

  const value = React.useMemo<SavedPostsValue>(
    () => ({
      hydrated,
      isSaved: (slug) => saved.has(slug),
      isLiked: (slug) => liked.has(slug),
      toggleSaved,
      toggleLiked,
    }),
    [hydrated, saved, liked, toggleSaved, toggleLiked],
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
