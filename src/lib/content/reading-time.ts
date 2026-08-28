import { blockText } from "./block-text";
import type { ArticleBlock } from "./schemas";

/**
 * Words a minute. The low end of the usual 200–250 range for adults, because
 * this is technical prose with code in it — people stop and re-read.
 */
const WORDS_PER_MINUTE = 200;

/**
 * Reading time, derived from the body rather than stored alongside it.
 *
 * It used to be a hand-written field on every post, which meant it silently
 * went stale the moment an article was edited. Deriving it costs one pass at
 * module load and cannot drift.
 */
export function readingMinutes(body: ArticleBlock[]): number {
  const words = body
    .map(blockText)
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
