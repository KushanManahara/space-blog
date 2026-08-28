/*
 * Builds the article vectors that semantic search ranks against.
 *
 *   pnpm embeddings
 *
 * Run this whenever article bodies change. The output is committed, so no model
 * runs at build time or on the server — only the reader's query is embedded,
 * in their browser, and only if they turn semantic search on.
 *
 * The model here MUST match `public/embed-query.js`. Vectors from two different
 * models are not comparable, and the failure is silent: you get results, they
 * are just meaningless.
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { pipeline } from "@huggingface/transformers";

import { blockText } from "../src/lib/content/block-text";
import { posts } from "../src/lib/content/posts";
import type { EmbeddingIndex } from "../src/lib/semantic";

/**
 * A retrieval model, not a general sentence encoder. Swapped from
 * all-MiniLM-L6-v2, which conflated Django's "models, views, templates" with a
 * question about language models; BGE went from 4/8 to 5/8 top-1 and 6/8 to 7/8
 * top-3 on the same set of questions.
 *
 * BGE expects the QUERY side to carry an instruction prefix and the DOCUMENT
 * side to carry none. `public/embed-query.js` adds it; nothing is added here.
 */
const MODEL = "Xenova/bge-small-en-v1.5";
/**
 * Written to `public/`, not into `src/`. Importing it would put a 700KB JSON
 * blob into both the client chunk graph and the server bundle; as a static file
 * it is fetched only when a reader asks for semantic search, and Vercel serves
 * it straight from the CDN.
 */
const OUT = join(process.cwd(), "public/embeddings.json");

/** Roughly the model's 256-word-piece window, in characters. */
const CHUNK_CHARS = 900;
const CHUNK_OVERLAP = 200;

/**
 * Split an article the way the RAG article says to: overlapping windows, so a
 * sentence that straddles a boundary still lands whole in one of them.
 *
 * One vector per article was not enough. The model truncates at 256 word
 * pieces, so a single vector only ever saw the opening and a query about
 * something discussed later in the piece could not match it — "stop my model
 * making things up" ranked an article about stopping conda above the article
 * about hallucination. Scoring a post by its best chunk fixes that.
 */
function chunk(text: string): string[] {
  const clean = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= CHUNK_CHARS) return [clean];

  const chunks: string[] = [];
  let start = 0;

  while (start < clean.length) {
    let end = Math.min(start + CHUNK_CHARS, clean.length);

    // Prefer to break on a sentence, then on a word, rather than mid-token.
    if (end < clean.length) {
      const window = clean.slice(start, end);
      const sentence = window.lastIndexOf(". ");
      const space = window.lastIndexOf(" ");
      const cut = sentence > CHUNK_CHARS * 0.5 ? sentence + 1 : space > 0 ? space : window.length;
      end = start + cut;
    }

    chunks.push(clean.slice(start, end).trim());
    if (end >= clean.length) break;
    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks.filter(Boolean);
}

/**
 * The chunks for one post. The first always carries the title, dek, topic and
 * tags, so a post is findable by what it is called as well as by what it says.
 */
function documentChunks(post: (typeof posts)[number]): string[] {
  const heading = `${post.title}. ${post.dek} ${post.topic}. ${post.tags.join(" ")}.`;
  const body = post.body.map(blockText).join(" ");
  return [heading, ...chunk(body)];
}

async function main() {
  console.log(`Loading ${MODEL}…`);
  const extract = await pipeline("feature-extraction", MODEL, { dtype: "q8" });

  const vectors: Record<string, number[][]> = {};
  let dimensions = 0;
  let total = 0;

  for (const post of posts) {
    const chunks = documentChunks(post);
    const embedded: number[][] = [];

    for (const text of chunks) {
      const output = await extract(text, { pooling: "mean", normalize: true });
      // Four decimals is well inside the noise floor for a normalised vector
      // and keeps the shipped index to a size worth downloading.
      const vector = Array.from(output.data as Float32Array).map((value) =>
        Number(value.toFixed(4)),
      );
      dimensions = vector.length;
      embedded.push(vector);
    }

    vectors[post.slug] = embedded;
    total += embedded.length;
    console.log(`  ${post.slug} (${embedded.length} chunks)`);
  }

  const index: EmbeddingIndex = {
    model: MODEL,
    dimensions,
    builtAt: new Date().toISOString().slice(0, 10),
    vectors,
  };

  await writeFile(OUT, `${JSON.stringify(index)}\n`, "utf8");
  console.log(
    `\nWrote ${total} chunk vectors across ${Object.keys(vectors).length} posts to ${OUT}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
