import { normalizeTokens } from "prism-react-renderer";

import { languageFromFilename } from "@/components/article/code-language";
import { isStyledType } from "@/components/article/code-theme";
import { Prism } from "@/components/article/prism-languages";

/** `[text, ...styledTypes]` — the smallest shape that still renders exactly. */
export type CodeToken = [content: string, ...types: string[]];
export type CodeLine = CodeToken[];

/**
 * Tokenises code into lines of `[text, ...types]`, keeping only the types the
 * palette colours.
 *
 * Runs on the server for article code, so the ~32 KB (gzipped) Prism runtime and
 * grammars never reach the browser for a read-only block; the editable runnable
 * block still imports it, on demand.
 */
export function highlightCode(code: string, filename: string): CodeLine[] {
  const language = languageFromFilename(filename);
  const grammar = Prism.languages[language];
  if (!grammar) return normalizeTokens([code]).map((line) => line.map((t) => [t.content]));

  const env = { code, grammar, language, tokens: [] as ReturnType<typeof Prism.tokenize> };
  Prism.hooks.run("before-tokenize", env);
  env.tokens = Prism.tokenize(code, grammar);
  Prism.hooks.run("after-tokenize", env);

  return normalizeTokens(env.tokens).map((line) =>
    line.map((token): CodeToken => [token.content, ...token.types.filter(isStyledType)]),
  );
}

/** Highlighted lines for every read-only code block, keyed by block index. */
export function highlightBlocks(
  blocks: ReadonlyArray<{ kind: string; filename?: string; code?: string; runnable?: boolean }>,
): Record<number, CodeLine[]> {
  const out: Record<number, CodeLine[]> = {};
  blocks.forEach((block, index) => {
    if (block.kind === "code" && !block.runnable && block.code !== undefined) {
      out[index] = highlightCode(block.code, block.filename ?? "");
    }
  });
  return out;
}
