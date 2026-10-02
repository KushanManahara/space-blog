import type { CSSProperties } from "react";

/**
 * Syntax palette for the code panels.
 *
 * Colours are fixed rather than token-driven: the code surface is dark in both
 * themes, so the palette only has to work against one background. Kept free of
 * Prism so the read-only code block can render server-highlighted tokens
 * without shipping a tokenizer to the browser.
 */
export const plainCodeStyle: CSSProperties = { color: "#e2e8f0" };

const palette: Array<{ types: string[]; style: CSSProperties }> = [
  // #64748b measured 3.75:1 on the n-900 block; this clears 4.5:1.
  { types: ["comment", "prolog", "cdata"], style: { color: "#7c8aa0", fontStyle: "italic" } },
  { types: ["punctuation"], style: { color: "#94a3b8" } },
  { types: ["keyword", "selector", "changed"], style: { color: "#c4b5fd" } },
  { types: ["operator"], style: { color: "#93c5fd" } },
  { types: ["string", "char", "attr-value", "inserted"], style: { color: "#86efac" } },
  { types: ["number", "boolean", "constant", "symbol"], style: { color: "#fdba74" } },
  { types: ["function", "class-name", "builtin"], style: { color: "#7dd3fc" } },
  { types: ["variable", "parameter"], style: { color: "#f9a8d4" } },
  { types: ["tag", "deleted"], style: { color: "#fca5a5" } },
  { types: ["attr-name", "property"], style: { color: "#a5b4fc" } },
  { types: ["namespace"], style: { opacity: 0.7 } },
];

const byType: Record<string, CSSProperties> = Object.fromEntries(
  palette.flatMap(({ types, style }) => types.map((type) => [type, style])),
);

/** Whether a Prism token type has a colour of its own (the rest render plain). */
export function isStyledType(type: string): boolean {
  return type in byType;
}

/** A token's style: each of its types applied in order, as prism-react-renderer does. */
export function tokenStyle(types: readonly string[]): CSSProperties | undefined {
  if (types.length === 0) return undefined;
  return Object.assign({}, ...types.map((type) => byType[type]));
}
