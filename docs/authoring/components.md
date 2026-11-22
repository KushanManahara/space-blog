# Article components reference

Every block kind `articleBlockSchema` accepts (`src/lib/content/schemas.ts`), with its renderer, when to use it, and a working example. Fields marked `?` are optional.

**Markdown column:** "inline" means the field supports `**bold**`, `*italic*`, `` `code` ``, `[link](url)` and `~~strike~~` (via `components/article/markdown.ts`). "plain" means the text is printed as-is.

| Kind                      | Purpose                      | Markdown                    | Client JS      |
| ------------------------- | ---------------------------- | --------------------------- | -------------- |
| [paragraph](#paragraph)   | Prose                        | inline                      | no             |
| [heading](#heading)       | Section title, TOC entry     | inline                      | no             |
| [list](#list)             | Bulleted list                | inline                      | no             |
| [callout](#callout)       | Highlighted aside            | inline                      | no             |
| [code](#code)             | Highlighted or runnable code | n/a                         | runnable only  |
| [formula](#formula)       | Display equation (KaTeX)     | caption plain               | no             |
| [table](#table)           | Structured comparison        | cells inline, caption plain | no             |
| [figure](#figure)         | Interactive chart (Recharts) | plain                       | yes, lazy      |
| [mermaid](#mermaid)       | Diagram                      | caption plain               | yes, on scroll |
| [image](#image)           | Figure image                 | caption plain               | no             |
| [video](#video)           | YouTube video                | plain                       | on play        |
| [references](#references) | Sources list                 | plain                       | no             |
| [footnotes](#footnotes)   | Numbered notes               | inline                      | no             |
| [correction](#correction) | Dated public correction      | note inline                 | no             |
| [chart](#chart)           | Legacy static bars           | plain                       | no             |

---

## paragraph

```ts
{ kind: "paragraph", html: "Git names every object by a **fingerprint** of its content. See [the docs](https://git-scm.com/book)." }
```

- `html` accepts inline Markdown and raw HTML. Markdown is the norm.
- Links to external sites open in a new tab automatically. Link schemes are restricted to `http`, `https`, `mailto`, `tel` and relative paths.
- Use `**bold**` and `*italic*`, not `__bold__` and `_italic_`.
- Link URLs may contain underscores and one level of balanced parentheses (`wiki/Pascal_(unit)`).

## heading

```ts
{ kind: "heading", id: "why-hashes", text: "Why the IDs look random" }
{ kind: "heading", id: "sha1-vs-sha256", text: "SHA-1 vs SHA-256", level: 3 }
```

- `id` must be unique in the article. It is the anchor (`#why-hashes`) and the table-of-contents key.
- `level?`: `2` (default) or `3`. Use `3` for subsections only.
- Sentence case. Descriptive, not cute.

## list

```ts
{
  kind: "list",
  items: [
    "**Blob**: the contents of one file.",
    "**Tree**: a directory listing that points at blobs and trees.",
  ],
}
```

Bulleted only. For steps where order matters, number them in the text or use a table.

## callout

```ts
{
  kind: "callout",
  title: "Whose numbers these are",
  body: "Figures attributed to Tesla are Tesla's. Everything in the physics section is **my own calculation**.",
}
```

Use for a caveat, a gotcha, or a scope statement the reader must not miss. One to three per article.

## code

```ts
{
  kind: "code",
  filename: "hash_object.py",
  code: "import hashlib\nprint(hashlib.sha1(b'blob 6\\0hello\\n').hexdigest())",
  runnable: true,
}
```

- The language is inferred from `filename`'s extension (`py`, `ts`, `tsx`, `js`, `sh`, `go`, `rs`, `sql`, `yaml`, `json`, `toml`, `css`, `html`, `md`, `java`, `kt`, `rb`, `c`, `cpp`, `Dockerfile`, …; unknown falls back to plain). Use a realistic filename, it is also the label.
- Highlighting happens on the server, so static blocks ship no highlighter to the browser.
- `runnable?: true` adds an editor and a Run button. Python runs in Pyodide inside a Web Worker, downloaded on first Run. Use it only when the code really runs in the browser (no network, no API keys, no unavailable packages) and when changing a value and re-running teaches something.
- Never claim output you have not produced. Put expected output in comments only when you have run it.

## formula

```ts
{
  kind: "formula",
  tex: "\\Delta p = \\frac{F}{A}",
  caption: "Downforce is the pressure removed times the area it is removed from.",
}
```

- `tex` is LaTeX rendered with KaTeX (with a MathML layer for screen readers). Escape backslashes in the JS string (`\\frac`).
- `caption` is required and plain text.
- Explain every symbol in the surrounding prose.

## table

```ts
{
  kind: "table",
  headers: ["Command", "Writes to destination", "Deletes anything"],
  rows: [
    ["`rclone copy`", "New and changed files", "Never"],
    ["`rclone sync`", "New and changed files", "**Yes**"],
  ],
  caption: "A dry run is a nicety on copy and a seatbelt on sync.",
  numericColumns: [2],
}
```

- Every row must match `headers` in length, or the build fails.
- Cells and headers render inline Markdown. `caption?` is plain text.
- `numericColumns?` right-aligns those column indices with tabular numbers.
- Wide tables scroll inside their own container on small screens.

## figure

Interactive chart built on Recharts. Readers hover for values and click legend items to toggle series.

```ts
{
  kind: "figure",
  variant: "line",                       // "line" | "area" | "bar"
  title: "Loss over optimisation steps",
  xKey: "step",
  xLabel: "step",
  yLabel: "loss",
  note: "Minimising θ² from θ₀ = 10",     // plain, top right
  caption: "η = 1.1 overshoots and explodes.", // plain, below
  series: [
    { key: "good", label: "η = 0.1" },
    { key: "toobig", label: "η = 1.1" },
  ],
  data: [
    { step: 0, good: 100, toobig: 100 },
    { step: 1, good: 64, toobig: 144 },
  ],
}
```

- `xKey` names the x field in each data row. It must not equal any `series[].key`.
- Data values are strings or numbers. Use strings for categorical x values to get even spacing (`"2 Mbps"`, `"5 Mbps"`).
- Colours come from theme tokens and follow light/dark automatically. Do not pass colours.
- Up to four series are visually distinct.
- Say in `note` or `caption` whether the data is measured, computed or illustrative.
- The chart measures its container width, so it draws only when visible on a real page.

## mermaid

```ts
{
  kind: "mermaid",
  caption: "The suction loop.",
  code: `flowchart TD
    SEAL["1 · Seal the floor<br/>skirts close the gap"]
    PUMP["2 · Pump it out"]
    SEAL --> PUMP
    PUMP -. "feedback" .-> SEAL`,
}
```

- Mermaid (version pinned in `package.json`, currently 12.3.0) is converted through `@excalidraw/mermaid-to-excalidraw`, so diagrams render in a hand-drawn style with copy and expand controls.
- `flowchart` (TD/LR) is the reliable choice. Quote labels that contain spaces, punctuation or `:`.
- `<br/>` becomes a line break. `<b>`, `<strong>`, `<i>`, `<em>` and `<span>` are stripped on the Excalidraw path (they survive only if the diagram falls back to plain Mermaid rendering), so do not rely on them for emphasis. Structure the label instead, for example a numbered first line.
- Conversion runs when the diagram scrolls into view.
- Validate new source before publishing: in a dev page console, import the pinned version from `https://cdn.jsdelivr.net/npm/mermaid@<version>/dist/mermaid.esm.min.mjs` and call `parse()` and `render()`.
- Use a template literal and avoid backticks and `${` inside it.

## image

```ts
{
  kind: "image",
  src: "/articles/how-git-actually-works/object-graph.png",
  alt: "Three commits pointing at trees, which point at blobs",
  caption: "Each commit points at a full snapshot.",
  width: 1600,
  height: 900,
  wide: true,
}
```

- `src` is a path under `public/` or an absolute URL. Remote hosts must be in `next.config.ts` `images.remotePatterns` (currently `upload.wikimedia.org`, `images.unsplash.com`, `i.ytimg.com`).
- `alt` is required. Describe what the image shows, not "image of".
- `width`/`height?` are the intrinsic size and reserve space to avoid layout shift. Set them.
- `wide?` lets the image break out of the prose column on wide screens.
- SVGs bypass image optimisation, so a remote SVG must also be allowed by the CSP `img-src` in `next.config.ts` (`'self'`, `data:`, `blob:`, `upload.wikimedia.org`, `images.unsplash.com`). Local SVGs under `public/` always work.
- The first image in an article is preloaded.

## video

```ts
{ kind: "video", youtubeId: "dQw4w9WgXcQ", title: "Watch the walkthrough", variant: "compact" }
```

- `youtubeId` is the 11-character ID. Only YouTube is supported.
- Shows a thumbnail. The player (`youtube-nocookie.com`) loads only after the reader presses play.
- `variant`: `"compact"` for a short "prefer to watch?" prompt near the top, `"feature"` (default) for a full card.

## references

```ts
{
  kind: "references",
  title: "References",           // optional, defaults to "References"
  items: [
    {
      label: "Autograd mechanics",
      href: "https://pytorch.org/docs/stable/notes/autograd.html",
      source: "PyTorch documentation",
      note: "How the graph is recorded and freed.",
    },
  ],
}
```

- Put it last. `href` must be a valid URL. All fields are plain text.
- Use primary sources. Never invent a reference.

## footnotes

```ts
{ kind: "footnotes", items: ["Measured on an M3 Pro, macOS 15.", "Figures rounded to two significant digits."] }
```

Numbered small-print notes at the end. Prefer `references` for sources.

## correction

```ts
{
  kind: "correction",
  date: "2026-11-20",
  note: "The ratio is 2.8×, not 4–5×, at the weight the readout implies.",
  was: "Thrust is 4 to 5 times the tyre force.",
}
```

Space's policy: corrections are appended and dated at the point they apply, never edited in silently. Corrected posts get a badge in lists and appear on `/corrections`.

## chart

Legacy static bar chart with hand-set gradients. Kept so older posts render. Use `figure` with `variant: "bar"` for anything new.

---

## Automatic features (no block needed)

- **Table of contents** from `heading` blocks. It prints heading text as plain text, so Markdown in a heading shows literally there.
- **Audio narration** ("Listen"): reads headings, paragraphs, lists, callouts, a label for each code block, image and mermaid captions, and figure title plus caption. It skips tables, formulas, videos, footnotes, references, corrections and legacy charts, so do not put the only explanation of a point in one of those. Write captions that make sense spoken aloud.
- **Copy page**: exports the article as Markdown or rich HTML. Legacy `chart` blocks are omitted from the Markdown copy, and the rich-HTML copy leaves inline Markdown in paragraphs, callouts, corrections and tables unconverted and shows formulas, diagrams, images, videos, figures, footnotes and references as plain text.
- **Reader mode, copy page (Markdown export), print, share, save, like, comments.**
- **Series navigation** when the post has `series`.
- **Related posts** ranked by shared tags, then topic, then recency.
- **Per-article share card** generated at `/articles/<slug>/card.png`.
- **Search**: keyword search over all block text, plus semantic search from `public/embeddings.json` (rebuild with `pnpm embeddings`).
