# Metadata, assets, SEO and publishing

## Post fields

Defined by `postSchema` in `src/lib/content/schemas.ts`.

| Field                            | Required   | Notes                                                                                                                                          |
| -------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`                           | yes        | URL segment: `/articles/<slug>`. Lowercase, hyphenated, stable. Never change it after publishing (it breaks links, stats and comments).        |
| `title`                          | yes        | Specific and honest. Titles over 52 characters drop the " · Space" suffix in the browser title so search results do not truncate the headline. |
| `dek`                            | yes        | One or two sentences stating the real payoff. Used as the meta description, OG/Twitter description, RSS summary and card text.                 |
| `topic`                          | yes        | One of the topics in `site.ts`. See [Topics](#topics).                                                                                         |
| `publishedAt`                    | yes        | ISO date `YYYY-MM-DD`. Controls ordering and the newsletter send.                                                                              |
| `tags`                           | yes        | Array like `["#rclone", "#cli"]`. Lowercase, hyphenated, reuse existing tags where they fit. Each tag gets a page at `/tags/<tag>`.            |
| `likes`, `views`, `commentCount` | yes        | Always `0`. Real numbers come from the database at request time.                                                                               |
| `coverImage`                     | no         | Path like `/articles/<slug>.png`. Without it the topic gradient is used.                                                                       |
| `series`                         | no         | `{ slug, title, part }`. See [Series](#series).                                                                                                |
| `featured`                       | no         | Pins the post as the homepage feature. Otherwise the newest post is featured.                                                                  |
| `body`                           | yes        | Array of blocks, at least one. See [components.md](components.md).                                                                             |
| `readingMinutes`                 | do not set | Derived from the body.                                                                                                                         |

## Topics

Pick by reading each `description` in `topicBlurbs` (`src/lib/content/site.ts`), not by the name alone. The current topics are Systems, Engineering, Career, Research, Inference, Evaluation and Experiments.

- Every topic must keep at least one post, or the build fails.
- Adding a topic means adding it to `topicNameSchema`, `topicBlurbs`, `components/post/topic-visuals.ts` (cover gradient, pattern, badge, icon) and `lib/og.ts` (card gradient). Treat that as a separate change and agree it with the owner first.

## Series

A series is a run of posts meant to be read in order.

```ts
// on each post
series: { slug: "pytorch", title: "PyTorch", part: 3 },
```

```ts
// site.ts seriesBlurbs, once per series
pytorch: {
  title: "PyTorch",
  dek: "Building the framework up from the tensor through autograd and the training loop.",
},
```

Part count, ordering, dates and the series cover (part 1's `coverImage`) are all derived from the posts. The series page lives at `/series/<slug>`, and each post shows "Part N of M". Existing series: `linux-switch`, `regression-explained`, `mcp`, `pytorch`.

Reading paths (`readingPaths` in `site.ts`) are different: curated cross-topic routes for newcomers, shown at `/paths`.

## Cover images

- Save to `public/articles/<slug>.png` (SVG is allowed; existing covers are about 1.6 MB PNGs).
- Served through Next/Image, which delivers resized WebP/AVIF. The source size only affects the repo.
- Cropped with `object-cover`, anchored at the centre: a wide band in the hero, a small 4:3 crop on cards. Keep the subject centred and leave margin at the edges.
- No text in the image. The title is rendered beside it.
- The social share card is separate and automatic (`/articles/<slug>/card.png`, 1200×630). You do not make it.

## SEO, generated for you

From the article fields, the page produces:

- `<title>` and meta description from `title` and `dek`.
- Canonical URL.
- Open Graph (`type: article`, published time, author, tags, share card) and a large Twitter card.
- JSON-LD structured data.
- Entries in `sitemap.xml`, `rss.xml`, the archive (with topic and year filters), topic and tag pages, and the search index.

What you control: a specific title, a dek that states the value, accurate tags, descriptive heading text, image `alt` text, and real links to primary sources.

## Publish pipeline

```bash
pnpm format          # prettier
pnpm lint            # eslint
pnpm typecheck       # tsc --noEmit
pnpm embeddings      # rebuild public/embeddings.json for semantic search
pnpm build           # production build, validates every post through zod
```

`pnpm check` runs format check, lint, typecheck and build together. Run `pnpm embeddings` separately whenever article text changes.

### Check the article in the browser

```bash
pnpm dev
# open http://localhost:3000/articles/<slug>
```

Confirm on the real page:

- Every diagram, chart, formula and table renders. Mermaid and charts render only when scrolled into a visible viewport.
- Captions do not show literal backticks or `**`.
- The cover is not badly cropped on the article page and in the `/articles` list.
- Runnable code runs and its output matches what the text says.
- Light and dark themes both read well.

### Ship

1. Create a branch, for example `feat/<slug>-article`.
2. Commit the post, the cover and `public/embeddings.json`.
3. Open a PR into `main`. CI and a Vercel preview run on it.
4. Merge. Vercel deploys `main` to production.
5. Verify production: the article URL returns 200, and the post appears in `/articles`, `sitemap.xml` and `rss.xml`.

### Newsletter

Subscribers are emailed automatically. A daily cron (`/api/cron/email-queue`, 00:15 Asia/Colombo) sends any post dated today or within the last 14 days that has not been sent. A future `publishedAt` waits until that date.

```bash
pnpm broadcast <slug> --test=<your-email>   # preview the email
pnpm broadcast <slug> --send                # send now, the cron then skips it
```

## Editing a published article

- Typos and clarity edits: edit in place.
- Factual errors: keep the original and add a `correction` block where it applies. It badges the post and lists it on `/corrections`.
- Never change the `slug`.
- Run `pnpm embeddings` after text changes.
