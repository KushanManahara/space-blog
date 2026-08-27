import type { Language } from "prism-react-renderer";

/**
 * Blocks carry a filename rather than a language, so the language is inferred
 * from it. Falls back to plain text, which renders unhighlighted rather than
 * mislabelled.
 */
const BY_EXTENSION: Record<string, Language> = {
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  py: "python",
  go: "go",
  swift: "swift",
  cpp: "cpp",
  cc: "cpp",
  c: "c",
  h: "c",
  hpp: "cpp",
  rs: "rust",
  rb: "ruby",
  java: "java",
  kt: "kotlin",
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  json: "json",
  jsonc: "json",
  html: "markup",
  xml: "markup",
  css: "css",
  scss: "scss",
  sql: "sql",
  yml: "yaml",
  yaml: "yaml",
  toml: "toml",
  md: "markdown",
  txt: "plain",
};

/** Filenames with no useful extension. */
const BY_NAME: Record<string, Language> = {
  ".env": "bash",
  dockerfile: "docker",
  makefile: "makefile",
};

export function languageFromFilename(filename: string): Language {
  const base = filename.split("/").pop()?.toLowerCase() ?? "";

  if (BY_NAME[base]) return BY_NAME[base];

  // apt config. One-line `.list` entries suit ini; deb822 `.sources` files are
  // Key: value, which yaml highlights properly and ini does not match at all.
  if (base.endsWith(".sources")) return "yaml";
  if (base.endsWith(".list")) return "ini";

  const ext = base.includes(".") ? base.split(".").pop()! : "";
  return BY_EXTENSION[ext] ?? "plain";
}
