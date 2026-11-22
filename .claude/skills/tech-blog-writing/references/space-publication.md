# Writing for Space

How this skill connects to the Space codebase. The detailed, code-checked documentation lives in [`docs/authoring/`](../../../../docs/authoring/ARTICLE_AUTHORING_GUIDE.md). This file tells you what to read there, adds the editorial conventions specific to Space, and lists the steps to publish.

## Read before writing

| Read                                                                                                                                                        | For                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`ARTICLE_AUTHORING_GUIDE.md`](../../../../docs/authoring/ARTICLE_AUTHORING_GUIDE.md)                                                                       | How articles are stored, the rules that prevent most mistakes, a minimal complete article |
| [`components.md`](../../../../docs/authoring/components.md)                                                                                                 | Every block kind, its fields, what renders Markdown, examples                             |
| [`publishing.md`](../../../../docs/authoring/publishing.md)                                                                                                 | Post fields, topics, series, covers, SEO, the pipeline, newsletter timing                 |
| [`best-practices.md`](../../../../docs/authoring/best-practices.md)                                                                                         | Visual placement, accessibility, performance, the pre-publish checklist                   |
| [`ai-agents.md`](../../../../docs/authoring/ai-agents.md)                                                                                                   | Agent recipe, safe editing of `posts.ts`, Mermaid validation, adding a block kind         |
| The series notes, if the article is in a series (for example [`deep-learning-series-memory.md`](../../../../docs/authoring/deep-learning-series-memory.md)) | Terminology, running examples, notation and continuity to keep                            |
| Two or three recent posts at the top of `src/lib/content/posts.ts`                                                                                          | How components are used in practice                                                       |

If these docs and the code disagree, the code wins. `src/lib/content/schemas.ts` is the contract.

## The essentials, in brief

You still need the docs above. These are the rules most often broken.

- An article is an object at the **top** of the array in `src/lib/content/posts.ts`. Keep `likes`, `views` and `commentCount` at `0`, and never set `readingMinutes`.
- **Markdown renders** in paragraph `html`, heading `text`, list items, table headers and cells, callout title and body, footnotes and correction notes.
- **Plain text only** in every `caption`, figure `note`, and reference `label`, `source` and `note`. Markdown there shows literally.
- **Headings** need a unique `id` (the build rejects duplicates) and no Markdown in their text, because the table of contents prints plain text.
- **Figures:** `xKey` must differ from every series `key`. The build rejects a clash.
- **Links:** at most one Markdown link per text block. Two links in one block currently corrupt the output, because the italic rule matches across the two `target="_blank"` attributes. Use `**bold**` and `*italic*`, never `__` or `_`.
- **Mermaid** strips `<b>`, `<i>` and similar tags. Don't rely on them for emphasis.
- **Runnable code** only for Python that runs in the browser with no network.
- **Privacy:** placeholders for personal paths, accounts, hostnames and identifiers, and say they're placeholders. Git history is public.

## Space conventions on top of this skill

- **House punctuation** in all article prose, including deks, captions and callouts: no em dashes or semicolons, and minimal colons and parentheses.
- **Topic** is chosen by each topic's description in `site.ts`, not its name. Ask before creating a topic.
- **Tags** reuse existing ones where accurate. Check `/tags` before adding a new tag that only one post would use.
- **Series** posts follow their series notes. Update the notes after publishing a new part, adding the part's slug, the concepts it established and its closing bridge.
- **Corrections** to published facts use a dated `correction` block, never a silent edit. Don't change slugs or heading ids of published posts.
- **Existing titles** that use the `Topic: Subtitle` pattern stay as they are unless the author asks. New titles follow [article-structure.md](article-structure.md#titles-and-deks).

## Publishing steps

1. Branch from current `main` (for example `feat/<slug>-article`). Don't commit directly to `main`.
2. Add the post, the cover at `public/articles/<slug>.png`, and any article images.
3. Run the pipeline:

   ```bash
   pnpm format && pnpm lint && pnpm typecheck && pnpm embeddings && pnpm build
   ```

4. Verify the rendered article (below).
5. Commit the post, its assets and `public/embeddings.json`. Open a PR into `main`. Merge and deploy only when the user asks.
6. After deploy, check the live URL, `/articles`, `sitemap.xml` and `rss.xml`.

Newsletter timing: a daily job emails any post dated today or in the last 14 days that hasn't been sent. A future `publishedAt` waits for its date. Details in [`publishing.md`](../../../../docs/authoring/publishing.md#newsletter).

## Verify

Start `pnpm dev` and open `/articles/<slug>`.

- Every diagram, chart, formula and table renders. Mermaid and charts render only once scrolled into a visible viewport, so scroll before deciding something is broken.
- Validate new Mermaid source against the pinned version, using the snippet in [`ai-agents.md`](../../../../docs/authoring/ai-agents.md#validating-mermaid).
- No caption shows literal backticks or `**`.
- Runnable code runs and prints what the text says it prints.
- The cover isn't badly cropped in the hero or in the `/articles` list.
- Both light and dark themes read well.

## Scanning a Space post

The [editorial checklist](editorial-checklist.md#mechanical-scan) scan works on plain text. A Space post lives inside `posts.ts`, so extract its reader-visible prose first, leaving out `code` and `tex` fields. Run this from `frontend/`:

```bash
python3 - "<slug>" <<'PY'
import re, sys
slug, text = sys.argv[1], open("src/lib/content/posts.ts").read()
start = text.index(f'slug: "{slug}"')
nxt = re.search(r'^    slug: "', text[start + 10:], re.M)
post = text[start: start + 10 + nxt.start()] if nxt else text[start:]
pat = re.compile(r'(\w+):\s*("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\')|^\s*("(?:[^"\\]|\\.)*"),?\s*$', re.M)
prose = []
for m in pat.finditer(post):
    key, val = m.group(1), m.group(2) or m.group(3)
    if key in ("code", "tex", "href", "src", "slug", "id", "filename", "xKey", "key", "coverImage", "youtubeId"):
        continue
    if val:
        prose.append(val[1:-1])
body = "\n".join(prose)
print("em dashes:", body.count("—"), "| semicolons:", body.count(";"))
words = r"\b(delve|pivotal|testament|tapestry|landscape|realm|underscore[sd]?|showcas\w*|intricate|multifaceted|seamless\w*|robust|leverag\w*|foster\w*|crucial|game-?changing|unlock\w*|it's worth noting|it is important to note|let's dive|in conclusion|in summary)\b"
for line in body.splitlines():
    for hit in re.finditer(words, line, re.I):
        print("watch:", hit.group(0), "|", line[max(0, hit.start() - 40): hit.end() + 40])
PY
```

Every hit is a candidate to review, not an automatic error.
