/*
 * Query embedder for semantic search.
 *
 * The article vectors are computed ahead of time and shipped with the site;
 * this only has to embed whatever the reader typed. It runs in a worker so the
 * first-time model download cannot block the page, and the model comes from the
 * CDN rather than the bundle, so nothing is fetched unless semantic search is
 * actually switched on.
 *
 * The model AND the library version here must stay in step with
 * `scripts/build-embeddings.ts`. Two different models produce vectors that are
 * not comparable, and the failure is silent: results still come back, they are
 * just wrong.
 */

const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0";
const MODEL = "Xenova/bge-small-en-v1.5";
// BGE is trained with an asymmetric prefix: queries carry this instruction,
// stored passages carry nothing. Dropping it measurably degrades ranking.
const QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";

let extractorReady = null;

function post(type, payload) {
  self.postMessage({ type, ...payload });
}

async function getExtractor() {
  if (extractorReady) return extractorReady;

  extractorReady = (async () => {
    post("status", { message: "Downloading the embedding model…" });
    const { pipeline, env } = await import(`${TRANSFORMERS_URL}`);
    // No local model directory to look in; everything comes from the hub.
    env.allowLocalModels = false;
    return await pipeline("feature-extraction", MODEL, { dtype: "q8" });
  })();

  return extractorReady;
}

self.onmessage = async (event) => {
  const { query, id } = event.data;

  try {
    const extractor = await getExtractor();
    post("status", { message: "Embedding your query…" });

    // Mean pooling plus L2 normalisation, matching how the article vectors were
    // built, so a plain dot product is already the cosine similarity.
    const output = await extractor(QUERY_PREFIX + query, { pooling: "mean", normalize: true });

    post("done", { id, vector: Array.from(output.data) });
  } catch (error) {
    post("done", { id, error: String(error?.message ?? error) });
  }
};
