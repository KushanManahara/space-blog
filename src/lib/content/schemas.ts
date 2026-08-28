import { z } from "zod";

export const topicNameSchema = z.enum([
  "Inference",
  "Systems",
  "Evaluation",
  "Engineering",
  "Experiments",
  "Research",
  "Findings",
]);

export const topicSchema = z.object({
  name: topicNameSchema,
  slug: z.string().min(1),
  description: z.string().min(1),
  postCount: z.number().int().positive(),
});

/** Long-form body content. Blocks keep the article renderer declarative. */
export const articleBlockSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("paragraph"), html: z.string().min(1) }),
  z.object({ kind: z.literal("heading"), id: z.string().min(1), text: z.string().min(1) }),
  z.object({ kind: z.literal("list"), items: z.array(z.string().min(1)).min(1) }),
  z.object({
    kind: z.literal("chart"),
    title: z.string().min(1),
    note: z.string().min(1),
    caption: z.string().min(1),
    bars: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          heightPercent: z.number().min(0).max(100),
          from: z.string().min(1),
          to: z.string().min(1),
        }),
      )
      .min(1),
  }),
  /**
   * Display equation. `tex` is LaTeX, rendered with KaTeX.
   * `html` is the pre-KaTeX plain-text form, still accepted so older blocks
   * keep rendering; prefer `tex` for anything new.
   */
  z
    .object({
      kind: z.literal("formula"),
      tex: z.string().min(1).optional(),
      html: z.string().min(1).optional(),
      caption: z.string().min(1),
    })
    .refine((block) => Boolean(block.tex ?? block.html), {
      message: "A formula block needs either `tex` or `html`.",
    }),
  z.object({
    kind: z.literal("callout"),
    title: z.string().min(1),
    body: z.string().min(1),
  }),
  z.object({
    kind: z.literal("code"),
    filename: z.string().min(1),
    code: z.string().min(1),
    /**
     * Render with an editor and a Run button. Only for Python that genuinely
     * executes in the browser — no network, no API keys — and only where
     * changing a value and re-running teaches something.
     */
    runnable: z.boolean().optional(),
  }),
  z.object({ kind: z.literal("footnotes"), items: z.array(z.string().min(1)).min(1) }),

  /**
   * A dated correction, sitting at the point in the article it applies to.
   *
   * The publication's stated policy is that corrections are appended and dated,
   * never edited quietly into the original — so a correction is a block in the
   * body rather than a rewrite of the paragraph above it. `was` is optional and
   * holds the claim being withdrawn, for the cases where the original wording
   * matters.
   */
  z.object({
    kind: z.literal("correction"),
    date: z.iso.date(),
    note: z.string().min(1),
    was: z.string().min(1).optional(),
  }),

  /** Mermaid source, rendered client-side. `caption` labels the figure. */
  z.object({
    kind: z.literal("mermaid"),
    code: z.string().min(1),
    caption: z.string().min(1).optional(),
  }),

  /**
   * A figure. `src` may be a local path under /public or an absolute URL;
   * external hosts must also be allowed in next.config.ts. Width and height are
   * the intrinsic pixel size, used to reserve space and avoid layout shift.
   */
  z.object({
    kind: z.literal("image"),
    src: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().min(1).optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    /** Let the image break out of the prose column on wide screens. */
    wide: z.boolean().optional(),
  }),

  /** Data table. Every row must be the same length as `headers`. */
  z
    .object({
      kind: z.literal("table"),
      headers: z.array(z.string()).min(1),
      rows: z.array(z.array(z.string())).min(1),
      caption: z.string().min(1).optional(),
      /** Column indices to right-align, for numeric columns. */
      numericColumns: z.array(z.number().int().nonnegative()).optional(),
    })
    .refine((block) => block.rows.every((row) => row.length === block.headers.length), {
      message: "Every table row must have the same number of cells as headers.",
    }),

  /** Interactive chart: hover for values, toggle series through the legend. */
  z.object({
    kind: z.literal("figure"),
    variant: z.enum(["line", "area", "bar"]),
    title: z.string().min(1),
    caption: z.string().min(1).optional(),
    note: z.string().min(1).optional(),
    xKey: z.string().min(1),
    xLabel: z.string().min(1).optional(),
    yLabel: z.string().min(1).optional(),
    series: z.array(z.object({ key: z.string().min(1), label: z.string().min(1) })).min(1),
    data: z.array(z.record(z.string(), z.union([z.string(), z.number()]))).min(1),
  }),
]);

export const postSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  dek: z.string().min(1),
  topic: topicNameSchema,
  featured: z.boolean().optional(),
  /** ISO date; formatted for display at the edge of the UI. */
  publishedAt: z.iso.date(),
  /** Derived from the body in `posts.ts`; never authored by hand. */
  readingMinutes: z.number().int().positive().default(1),
  likes: z.number().int().nonnegative(),
  views: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  tags: z.array(z.string().min(1)),
  series: z
    .object({
      slug: z.string().min(1),
      title: z.string().min(1),
      part: z.number().int().positive(),
    })
    .optional(),
  coverImage: z.string().optional(),
  body: z.array(articleBlockSchema).min(1),
});

export const seriesSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  dek: z.string().min(1),
  partCount: z.number().int().positive(),
  status: z.string().min(1),
  parts: z.array(z.string().min(1)).min(1),
  currentPart: z.number().int().positive(),
});

/**
 * A curated route through the archive.
 *
 * Distinct from a series: a series is a run the author wrote in order, a path
 * is a way in for someone who has not read any of it. Paths cross topics and
 * years freely and may reuse a post that also belongs to a series.
 */
export const readingPathSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  dek: z.string().min(1),
  forWho: z.string().min(1),
  steps: z.array(z.object({ slug: z.string().min(1), why: z.string().min(1) })).min(2),
});

export const tagSchema = z.object({
  name: z.string().min(1),
  postCount: z.number().int().nonnegative().default(1),
});

export const authorSchema = z.object({
  name: z.string().min(1),
  initials: z.string().min(1).max(3),
  avatar: z.string().min(1).default("/images/kushan.png"),
  role: z.string().min(1),
  bio: z.string().min(1),
  longBio: z.string().min(1),
  email: z.string().email(),
  handle: z.string().min(1),
  location: z.string().min(1),
  timezoneNote: z.string().min(1),
  github: z.string().min(1).default("https://github.com/KushanManahara"),
  linkedin: z.string().min(1).default("https://www.linkedin.com/in/kushan-manahara"),
  twitter: z.string().min(1).default("https://x.com/Kushan_Manahara"),
});

export const commentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  email: z.string().optional(),
  initials: z.string().min(1).max(3),
  postedAgo: z.string().min(1),
  likes: z.number().int().nonnegative(),
  body: z.string().min(1),
  tone: z.enum(["violet", "cornflower", "orchid"]),
  /** Set on replies; top-level comments leave it undefined. */
  parentId: z.string().optional(),
  /** Author of the post, so replies from them can be badged. */
  isAuthor: z.boolean().optional(),
});

export const timelineEntrySchema = z.object({
  years: z.string().min(1),
  role: z.string().min(1),
  org: z.string().min(1),
  note: z.string().min(1),
});

export const componentInventoryItemSchema = z.object({
  name: z.string().min(1),
  path: z.string().min(1),
  props: z.string().min(1),
  runtime: z.enum(["Server", "Client"]),
});

export const studioPostSchema = z.object({
  slug: z.string().min(1),
  status: z.enum(["Published", "Draft", "Corrected"]),
});

export type TopicName = z.infer<typeof topicNameSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type ArticleBlock = z.infer<typeof articleBlockSchema>;
export type Post = z.infer<typeof postSchema>;
export type Series = z.infer<typeof seriesSchema>;
export type ReadingPath = z.infer<typeof readingPathSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type Author = z.infer<typeof authorSchema>;
export type CorrectionBlock = Extract<ArticleBlock, { kind: "correction" }>;
export type Comment = z.infer<typeof commentSchema>;

/** A top-level comment with its replies attached, which is how threads render. */
export type CommentNode = Comment & { replies: Comment[] };
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;
export type ComponentInventoryItem = z.infer<typeof componentInventoryItemSchema>;
export type StudioPost = z.infer<typeof studioPostSchema>;

/**
 * Everything about a post except its body — what list surfaces need.
 *
 * `correctedAt` is carried across because the body is not: a card has to be
 * able to badge a corrected post without the whole article in the payload.
 */
export type PostSummary = Omit<Post, "body"> & { correctedAt?: string };
