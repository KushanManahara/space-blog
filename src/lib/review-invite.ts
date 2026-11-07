/**
 * One shared limit for every review invitation (end-of-article card and the
 * floating card), kept in the visitor's own browser. Nothing is sent anywhere.
 *
 * - After a review is submitted, no invitation shows again.
 * - After a dismissal, none shows for 60 days.
 * - At most one invitation per visit, from either surface.
 *
 * Every storage call is guarded: private windows and blocked storage just mean
 * no invitation, never an error.
 */

const KEY = "space:review-invite";
const SESSION_KEY = "space:review-invite:session";
const DISMISS_DAYS = 60;

type Stored = { submittedAt?: number; dismissedAt?: number; articlesFinished?: number };
type Session = { shown?: "card" | "float"; pages?: number };

function read<T extends object>(storage: () => Storage, key: string): T {
  try {
    const value: unknown = JSON.parse(storage().getItem(key) ?? "{}");
    return typeof value === "object" && value !== null ? (value as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

function write<T extends object>(storage: () => Storage, key: string, value: T) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the invitation simply won't be remembered.
  }
}

const local = () => window.localStorage;
const session = () => window.sessionStorage;

/** True when this visitor may be invited at all (not submitted, not recently dismissed). */
export function inviteAllowed(): boolean {
  const stored = read<Stored>(local, KEY);
  if (stored.submittedAt) return false;
  if (stored.dismissedAt && Date.now() - stored.dismissedAt < DISMISS_DAYS * 86_400_000) {
    return false;
  }
  return true;
}

/** True when another surface already invited during this visit. */
export function shownThisVisit(other: "card" | "float"): boolean {
  return read<Session>(session, SESSION_KEY).shown === other;
}

export function markShown(surface: "card" | "float") {
  const current = read<Session>(session, SESSION_KEY);
  if (!current.shown) write(session, SESSION_KEY, { ...current, shown: surface });
}

export function markDismissed() {
  write(local, KEY, { ...read<Stored>(local, KEY), dismissedAt: Date.now() });
}

export function markSubmitted() {
  write(local, KEY, { ...read<Stored>(local, KEY), submittedAt: Date.now() });
}

export function hasSubmitted(): boolean {
  return Boolean(read<Stored>(local, KEY).submittedAt);
}

/** Called when a reader reaches the end of an article. */
export function noteArticleFinished() {
  const stored = read<Stored>(local, KEY);
  write(local, KEY, { ...stored, articlesFinished: (stored.articlesFinished ?? 0) + 1 });
}

/** Counts pages seen this visit and returns the new total. */
export function notePageView(): number {
  const current = read<Session>(session, SESSION_KEY);
  const pages = (current.pages ?? 0) + 1;
  write(session, SESSION_KEY, { ...current, pages });
  return pages;
}

/** Engaged: finished an article on an earlier visit, or on a second page now. */
export function isEngaged(pagesThisVisit: number): boolean {
  return (read<Stored>(local, KEY).articlesFinished ?? 0) > 0 || pagesThisVisit >= 2;
}

/** Link into the form with the chosen rating preselected. */
export function reviewHref(rating?: number): string {
  return rating ? `/reviews?rating=${rating}#write` : "/reviews#write";
}
