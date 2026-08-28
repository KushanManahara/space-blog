import type { ArticleBlock } from "./schemas";

/** Every piece of reader-visible text in one block, whatever its kind. */
export function blockText(block: ArticleBlock): string {
  switch (block.kind) {
    case "paragraph":
      return block.html;
    case "heading":
      return block.text;
    case "list":
    case "footnotes":
      return block.items.join(" ");
    case "code":
      return `${block.filename} ${block.code}`;
    case "correction":
      return `Correction ${block.note} ${block.was ?? ""}`;
    case "callout":
      return `${block.title} ${block.body}`;
    case "formula":
      return `${block.tex ?? block.html ?? ""} ${block.caption}`;
    case "mermaid":
      return `${block.code} ${block.caption ?? ""}`;
    case "image":
      return `${block.alt} ${block.caption ?? ""}`;
    case "table":
      return [
        block.headers.join(" "),
        ...block.rows.map((r) => r.join(" ")),
        block.caption ?? "",
      ].join(" ");
    case "figure":
      return [
        block.title,
        block.caption ?? "",
        block.note ?? "",
        ...block.series.map((s) => s.label),
      ].join(" ");
    case "chart":
      return `${block.title} ${block.note} ${block.caption} ${block.bars.map((b) => b.label).join(" ")}`;
  }
}
