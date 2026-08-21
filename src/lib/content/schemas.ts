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
  z.object({ kind: z.literal("formula"), html: z.string().min(1), caption: z.string().min(1) }),
  z.object({
    kind: z.literal("callout"),
    title: z.string().min(1),
    body: z.string().min(1),
  }),
  z.object({
    kind: z.literal("code"),
    filename: z.string().min(1),
    code: z.string().min(1),
  }),
  z.object({ kind: z.literal("footnotes"), items: z.array(z.string().min(1)).min(1) }),
]);

export const postSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  dek: z.string().min(1),
  topic: topicNameSchema,
  /** ISO date; formatted for display at the edge of the UI. */
  publishedAt: z.iso.date(),
  readingMinutes: z.number().int().positive(),
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

export const tagSchema = z.object({
  name: z.string().min(1),
  postCount: z.number().int().positive(),
});

export const authorSchema = z.object({
  name: z.string().min(1),
  initials: z.string().min(1).max(3),
  role: z.string().min(1),
  bio: z.string().min(1),
  longBio: z.string().min(1),
  email: z.string().email(),
  handle: z.string().min(1),
  location: z.string().min(1),
  timezoneNote: z.string().min(1),
});

export const commentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  initials: z.string().min(1).max(3),
  postedAgo: z.string().min(1),
  likes: z.number().int().nonnegative(),
  body: z.string().min(1),
  tone: z.enum(["violet", "cornflower", "orchid"]),
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
export type Tag = z.infer<typeof tagSchema>;
export type Author = z.infer<typeof authorSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;
export type ComponentInventoryItem = z.infer<typeof componentInventoryItemSchema>;
export type StudioPost = z.infer<typeof studioPostSchema>;

/** Everything about a post except its body — what list surfaces need. */
export type PostSummary = Omit<Post, "body">;
