/**
 * Semantic search over the archive.
 *
 * Three articles here explain retrieval, embeddings and cosine similarity; this
 * is that pipeline pointed at the posts themselves. Article vectors are built
 * ahead of time by `scripts/build-embeddings.ts` and shipped as JSON. The query
 * vector is produced in the browser by `public/embed-query.js`. Both come from
 * the same model, which is the only reason the numbers are comparable.
 */

/** Shape of the generated `embeddings.json`. */
export type EmbeddingIndex = {
  model: string;
  dimensions: number;
  builtAt: string;
  /** One post maps to several chunk vectors; a post scores as its best chunk. */
  vectors: Record<string, number[][]>;
};

/**
 * Both sides are L2-normalised at build and query time, so the dot product is
 * already the cosine of the angle between them and there is nothing to divide.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let total = 0;
  for (let i = 0; i < a.length; i += 1) total += a[i] * b[i];
  return total;
}

/**
 * Rank slugs against a query vector, best first.
 *
 * `minScore` drops the tail: with only 40 posts, everything scores something
 * against everything, and a page of near-random results reads worse than a
 * short one. The floor is calibrated against this model and this archive, not
 * guessed: off-topic queries ("banana bread recipe", "weather in reykjavik", a
 * keyboard mash) peak at 0.45–0.48, while genuine questions put their best
 * match at 0.61–0.78. Re-measure it if the model in the build script changes —
 * the scale is not portable between models.
 */
export function rankBySimilarity(
  index: EmbeddingIndex,
  queryVector: number[],
  { limit = 8, minScore = 0.55 }: { limit?: number; minScore?: number } = {},
): Array<{ slug: string; score: number }> {
  return Object.entries(index.vectors)
    .map(([slug, chunks]) => ({
      slug,
      // Max over chunks, not mean: one passage answering the question is a hit,
      // and averaging would let the rest of a long article dilute it away.
      score: chunks.reduce(
        (best, chunk) => Math.max(best, cosineSimilarity(chunk, queryVector)),
        0,
      ),
    }))
    .filter((entry) => entry.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
