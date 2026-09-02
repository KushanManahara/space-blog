"use client";

import * as React from "react";
import { Play, RotateCcw, Square } from "lucide-react";

import { CodeBlock } from "@/components/article/code-block";
import { cn } from "@/lib/utils";

type RunState = "idle" | "running";

/**
 * A code block a reader can edit and run.
 *
 * Deliberately not applied to every block: it is here on the examples that
 * teach a concept, where changing a number and watching the output move is the
 * point. Everything else stays a static block. Python runs through Pyodide in a
 * worker, and nothing is downloaded until Run is pressed for the first time.
 */
export function RunnableCode({
  filename,
  code,
  className,
}: {
  filename: string;
  code: string;
  className?: string;
}) {
  const [source, setSource] = React.useState(code);
  const [editing, setEditing] = React.useState(false);
  const [state, setState] = React.useState<RunState>("idle");
  const [status, setStatus] = React.useState<string | null>(null);
  const [lines, setLines] = React.useState<Array<{ text: string; stream: "out" | "err" }>>([]);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [hasRun, setHasRun] = React.useState(false);

  // Held in state rather than a ref so that stopping, replacing and unmounting
  // all go through the same cleanup. The worker is created on first run and
  // kept afterwards, so a second run reuses the interpreter already in memory.
  const [worker, setWorker] = React.useState<Worker | null>(null);

  React.useEffect(() => () => worker?.terminate(), [worker]);

  const run = () => {
    if (state === "running") return;

    setLines([]);
    setResult(null);
    setError(null);
    setHasRun(true);
    setState("running");
    setStatus("Starting…");

    let active = worker;
    if (!active) {
      active = new Worker("/python-runner.js");
      setWorker(active);
    }

    active.onmessage = (event: MessageEvent) => {
      const data = event.data as {
        type: string;
        message?: string;
        line?: string;
        result?: string | null;
        error?: string;
      };

      if (data.type === "status") setStatus(data.message ?? null);
      if (data.type === "stdout" && data.line !== undefined) {
        setLines((current) => [...current, { text: data.line as string, stream: "out" }]);
      }
      if (data.type === "stderr" && data.line !== undefined) {
        setLines((current) => [...current, { text: data.line as string, stream: "err" }]);
      }
      if (data.type === "done") {
        setState("idle");
        setStatus(null);
        if (data.error) setError(data.error);
        else if (data.result) setResult(data.result);
      }
    };

    active.onerror = () => {
      setState("idle");
      setStatus(null);
      setError("Could not start the Python runtime. Check your connection and try again.");
    };

    active.postMessage({ code: source, id: Date.now() });
  };

  const stop = () => {
    // Dropping the worker from state terminates it through the effect cleanup.
    setWorker(null);
    setState("idle");
    setStatus(null);
    setError("Stopped.");
  };

  const reset = () => {
    setSource(code);
    setEditing(false);
    setLines([]);
    setResult(null);
    setError(null);
    setHasRun(false);
  };

  const dirty = source !== code;
  const showOutput = hasRun || state === "running";

  return (
    <div className={cn("w-full max-w-full min-w-0", className)}>
      {editing ? (
        <div className="overflow-hidden rounded-lg bg-n-900">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
            <span className="font-mono text-[12.5px] text-white/55">{filename}</span>
            <span className="text-[12px] text-white/65">Editing</span>
          </div>
          <textarea
            value={source}
            spellCheck={false}
            aria-label={`Editable source for ${filename}`}
            onChange={(event) => setSource(event.target.value)}
            className="block max-h-[420px] min-h-[180px] w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-[1.6] text-[#e2e8f0] outline-none"
          />
        </div>
      ) : (
        <CodeBlock filename={filename} code={source} />
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-2 print:hidden">
        {state === "running" ? (
          <button
            type="button"
            onClick={stop}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-bg-3 px-3 py-1.5 text-[13px] font-semibold text-fg-1 transition-colors hover:bg-line-1"
          >
            <Square className="size-3.5" strokeWidth={2.5} />
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={run}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-[13px] font-semibold text-on-brand transition-colors hover:bg-brand-strong"
          >
            <Play className="size-3.5" strokeWidth={2.5} />
            Run
          </button>
        )}

        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-line-1 px-3 py-1.5 text-[13px] font-semibold text-fg-2 transition-colors hover:border-line-2 hover:text-fg-1"
        >
          {editing ? "Done editing" : "Edit"}
        </button>

        {dirty ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-semibold text-fg-3 transition-colors hover:text-fg-1"
          >
            <RotateCcw className="size-3.5" strokeWidth={2} />
            Reset
          </button>
        ) : null}

        <span className="text-[12.5px] text-fg-3">
          {status ?? (hasRun ? "Runs in your browser" : "Runs in your browser, nothing is sent")}
        </span>
      </div>

      {showOutput ? (
        <div className="mt-2.5 overflow-hidden rounded-lg border border-line-1 bg-bg-2">
          <p className="border-b border-line-1 px-4 py-2 text-[11.5px] font-bold tracking-[0.12em] text-fg-3 uppercase">
            Output
          </p>
          <div className="max-h-[280px] overflow-auto p-4 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap">
            {lines.length === 0 && !result && !error && state === "running" ? (
              <span className="text-fg-3">Working…</span>
            ) : null}
            {lines.map((line, index) => (
              <div key={index} className={line.stream === "err" ? "text-fg-3 italic" : "text-fg-2"}>
                {line.text}
              </div>
            ))}
            {/* The trailing expression's value, the way a notebook cell shows
                it. Ruled off so it stays findable under a wall of warnings. */}
            {result ? (
              <div
                className={cn(
                  "font-semibold text-fg-1",
                  lines.length > 0 && "mt-2.5 border-t border-line-1 pt-2.5",
                )}
              >
                {result}
              </div>
            ) : null}
            {error ? <div className="mt-2 font-semibold text-fg-1">{error}</div> : null}
            {state === "idle" && lines.length === 0 && !result && !error ? (
              <span className="text-fg-3">Finished with no output.</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
