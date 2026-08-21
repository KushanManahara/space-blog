import type { ArticleBlock } from "./schemas";

/**
 * The published body of the flagship post. The mock dataset shares it across
 * every article so each route renders a complete page; per-post bodies drop in
 * by replacing `body` on the individual records in `posts.ts`.
 */
export const demoArticleBody: ArticleBlock[] = [
  {
    kind: "paragraph",
    html: "Every serving benchmark I read last year reported a single number: tokens per second, before and after. That number is real, but it hides the thing you need in order to decide whether speculative decoding is worth the operational cost: <em>which requests get faster, and by how much</em>.",
  },
  {
    kind: "paragraph",
    html: 'Over six weeks I logged every decode step on a production endpoint serving roughly 40 requests per second at peak, with a 1.1B draft model in front of a 34B target.<sup class="align-super text-[12px] text-fg-link">1</sup> What follows is what the traces showed.',
  },
  { kind: "heading", id: "acceptance-rate", text: "Acceptance rate is not the story" },
  {
    kind: "paragraph",
    html: "Mean acceptance held at 0.71 across the whole window and barely moved between prompt classes. Throughput, meanwhile, ranged from 1.3× to 3.1×. If acceptance were the dominant term, that spread would not exist.",
  },
  {
    kind: "chart",
    title: "Speedup by batch size (p50, 6-week window)",
    note: "n = 4.2M decode steps",
    caption:
      "Fig 1. The gain collapses as the batch fills, because the target model stops being memory-bound. Acceptance rate is flat across all seven buckets.",
    bars: [
      { label: "1", value: "3.1×", heightPercent: 100, from: "#38BDF8", to: "#007AFF" },
      { label: "2", value: "2.9×", heightPercent: 92, from: "#0EA5E9", to: "#0062D2" },
      { label: "4", value: "2.3×", heightPercent: 74, from: "#0284C7", to: "#004DA8" },
      { label: "8", value: "1.8×", heightPercent: 58, from: "#2563EB", to: "#1D4ED8" },
      { label: "16", value: "1.5×", heightPercent: 45, from: "#3B82F6", to: "#1E40AF" },
      { label: "32", value: "1.3×", heightPercent: 38, from: "#60A5FA", to: "#2563EB" },
      { label: "64", value: "1.0×", heightPercent: 30, from: "#CBD5E1", to: "#94A3B8" },
    ],
  },
  { kind: "heading", id: "batch-shape", text: "Why batch shape dominates" },
  {
    kind: "paragraph",
    html: "Speculative decoding trades arithmetic for memory traffic. At batch size 1 the target model's weights dominate the read; verifying <em>k</em> tokens costs almost the same as generating one. Once the batch is large enough to saturate the tensor cores, that free ride ends.",
  },
  {
    kind: "formula",
    html: 'S(k, α, B) = <span class="inline-block align-middle text-center"><span class="block border-b border-n-400 px-2.5 pb-1">1 − α<sup>k+1</sup></span><span class="block px-2.5 pt-1">(1 − α)(1 + kc(B))</span></span>',
    caption:
      "where α is acceptance, k the draft length, and c(B) the draft-to-target cost ratio at batch B",
  },
  {
    kind: "callout",
    title: "The practical read",
    body: "If your traffic arrives in large batches, spend the engineering effort on paged attention and prefix caching first. Speculation pays for itself on interactive, low-concurrency paths: chat, agents, autocomplete.",
  },
  { kind: "heading", id: "reproducing", text: "Reproducing this yourself" },
  {
    kind: "paragraph",
    html: "The instrumentation is about forty lines. Log the per-step draft length, the number accepted, and the batch occupancy at verification time; everything else is derivable.",
  },
  {
    kind: "code",
    filename: "trace_specdec.py",
    code: `# one row per decode step, not per request
for step in engine.decode_steps(req):
    trace.append(
        draft_len   = step.k,
        accepted    = step.n_accepted,
        occupancy   = step.batch_tokens / MAX_TOKENS,
        target_ms   = step.target_forward_ms,
        draft_ms    = step.draft_forward_ms,
    )

speedup = baseline_ms / trace.total_ms()
print(f"speedup {speedup:.2f}x @ p50 occupancy {trace.p50():.2f}")`,
  },
  {
    kind: "paragraph",
    html: 'Bucket by occupancy rather than nominal batch size. Nominal batch counts requests; occupancy counts the tokens actually in flight, which is what the kernel sees.<sup class="align-super text-[12px] text-fg-link">2</sup>',
  },
  {
    kind: "footnotes",
    items: [
      "Draft and target were served on the same node; cross-node drafting adds 4-7 ms per step and changes the conclusion at small batch.",
      "Occupancy is measured after continuous batching admits new requests, so it can exceed the nominal batch by a wide margin.",
    ],
  },
];
