"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { PostCard } from "@/components/post/post-card";
import { rankBySimilarity, type EmbeddingIndex } from "@/lib/semantic";
import type { PostSummary } from "@/lib/content";

type Phase = "off" | "loading" | "ready" | "error";

/**
 * Semantic search over the archive, dogfooding the subject.
 *
 * Three articles here explain embeddings, cosine similarity and retrieval; this
 * is that pipeline pointed at the posts. Article vectors are built ahead of time
 * and the query is embedded in the reader's browser, so nothing is sent
 * anywhere and there is no per-query cost. The index is a static file in
 * `public/`, so it costs nothing until someone switches this on.
 *
 * It is opt-in rather than the default because it costs a model download, and
 * because keyword search is genuinely better at finding an exact identifier.
 * The two answer different questions.
 *
 * Mounted under `key={query}` by the search page, so a new query resets this
 * back to its opt-in state without an effect having to clear it.
 */
export function SemanticResults({
  query,
  posts,
  ragHref,
}: {
  query: string;
  posts: PostSummary[];
  ragHref: string;
}) {
  const [phase, setPhase] = React.useState<Phase>("off");
  const [status, setStatus] = React.useState<string | null>(null);
  const [ranked, setRanked] = React.useState<Array<{ post: PostSummary; score: number }>>([]);
  const [worker, setWorker] = React.useState<Worker | null>(null);

  React.useEffect(() => () => worker?.terminate(), [worker]);

  const search = () => {
    if (!query.trim() || phase === "loading") return;

    setPhase("loading");
    setStatus("Starting…");

    let active = worker;
    if (!active) {
      active = new Worker("/embed-query.js", { type: "module" });
      setWorker(active);
    }

    active.onmessage = async (event: MessageEvent) => {
      const data = event.data as {
        type: string;
        message?: string;
        vector?: number[];
        error?: string;
      };

      if (data.type === "status") setStatus(data.message ?? null);
      if (data.type !== "done") return;

      if (data.error || !data.vector) {
        setPhase("error");
        setStatus(null);
        return;
      }

      setStatus("Ranking the archive…");

      // Fetched as a static file rather than imported: importing would put the
      // whole index into the client chunk graph and the server bundle, when it
      // is only ever needed by a reader who asked for semantic search.
      let index: EmbeddingIndex;
      try {
        const response = await fetch("/embeddings.json");
        if (!response.ok) throw new Error(String(response.status));
        index = (await response.json()) as EmbeddingIndex;
      } catch {
        setPhase("error");
        setStatus(null);
        return;
      }

      const bySlug = new Map(posts.map((post) => [post.slug, post]));

      setRanked(
        rankBySimilarity(index, data.vector)
          .map(({ slug, score }) => ({ post: bySlug.get(slug), score }))
          .filter((entry): entry is { post: PostSummary; score: number } => Boolean(entry.post)),
      );
      setPhase("ready");
      setStatus(null);
    };

    active.onerror = () => {
      setPhase("error");
      setStatus(null);
    };

    active.postMessage({ query, id: Date.now() });
  };

  if (!query.trim()) return null;

  return (
    <div className="mt-9 border-t border-line-1 pt-7">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <button
          type="button"
          onClick={search}
          disabled={phase === "loading"}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-1 px-4 py-2 text-[13.5px] font-semibold text-fg-1 transition-colors duration-300 ease-expo hover:border-line-brand hover:text-brand disabled:cursor-default disabled:opacity-60"
        >
          <Sparkles className="size-3.5" strokeWidth={2} />
          {phase === "ready" ? "Search again by meaning" : "Search by meaning instead"}
        </button>

        <p className="text-[12.5px] leading-[1.5] text-fg-3">
          {status ?? (
            <>
              Embeds your question in your browser and ranks the archive by cosine similarity —{" "}
              <Link href={ragHref} className="font-semibold text-brand hover:text-brand-strong">
                the pipeline this post describes
              </Link>
              . Downloads a ~30 MB model the first time.
            </>
          )}
        </p>
      </div>

      {phase === "error" ? (
        <p className="mt-5 rounded-lg border border-line-1 bg-bg-2 p-5 text-[14.5px] text-fg-2">
          The embedding model could not be loaded. Keyword results above are unaffected.
        </p>
      ) : null}

      {phase === "ready" ? (
        ranked.length === 0 ? (
          <p className="mt-5 rounded-lg border border-line-1 bg-bg-2 p-5 text-[14.5px] text-fg-2">
            Nothing in the archive is close enough to “{query}” to be worth showing.
          </p>
        ) : (
          <>
            <p className="mt-5 text-[12px] font-bold tracking-[0.12em] text-fg-3 uppercase">
              {ranked.length} by meaning
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {ranked.map(({ post, score }) => (
                <div key={post.slug} className="flex flex-col gap-2">
                  <PostCard post={post} variant="search" />
                  <span className="font-mono text-[11.5px] text-fg-3">
                    similarity {score.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )
      ) : null}
    </div>
  );
}
