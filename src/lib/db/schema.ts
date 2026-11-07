import { sql } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Live persistent metrics for posts (likes and views).
 */
export const postStats = sqliteTable("post_stats", {
  slug: text("slug").primaryKey(),
  likes: integer("likes").default(0).notNull(),
  views: integer("views").default(0).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Reader comments on articles.
 */
export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  postSlug: text("post_slug").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  authorEmail: text("author_email"),
  authorInitials: text("author_initials").notNull(),
  tone: text("tone").default("cornflower").notNull(),
  body: text("body").notNull(),
  likes: integer("likes").default(0).notNull(),
  /**
   * Comments are held for review by default. Nothing reaches the article until
   * this is flipped, so an open form cannot publish straight to the site.
   */
  published: integer("published").default(0).notNull(),
  /**
   * One level of nesting only: a reply points at a top-level comment, and a
   * reply to a reply is flattened onto the same parent. Full threading is not
   * the goal — being able to answer a correction in place is.
   */
  parentId: text("parent_id"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Newsletter subscribers.
 */
export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  /**
   * 1 once the address has confirmed (double opt-in). New signups are written
   * with 0; the default of 1 is what adding the column gives every row that
   * existed before confirmation was required, so nobody already on the list
   * is dropped from it.
   */
  confirmed: integer("confirmed").notNull().default(1),
  /**
   * Unix seconds when the confirmation email last left. Null with
   * `confirmed = 0` means the email is still owed (quota, outage), and the
   * daily queue job sends it.
   */
  confirmSentAt: integer("confirm_sent_at"),
  /** Failed confirmation sends. The queue gives up after a few. */
  confirmAttempts: integer("confirm_attempts").notNull().default(0),
  /** 1 when the address confirmed but its welcome email has not gone out yet. */
  welcomePending: integer("welcome_pending").notNull().default(0),
});

/**
 * Inquiries submitted via the /contact form.
 */
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Generic counter for abuse control, keyed by "<action>:<subject>".
 *
 * Serverless instances do not share memory, so the window has to live
 * somewhere both the rate limiter and the like/view de-duplication can read.
 * `subject` is always a hashed value — never a raw IP address.
 */
export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").default(0).notNull(),
  /** Unix seconds when the current window opened. */
  windowStart: integer("window_start").notNull(),
});

/**
 * Emails sent per period, against Resend's free-plan quota. `period` is a UTC
 * day ("2026-11-07") or month ("2026-11"), so a new period starts at zero
 * without any cleanup. Advisory: Resend's own quota error is the source of truth.
 */
export const emailUsage = sqliteTable("email_usage", {
  period: text("period").primaryKey(),
  count: integer("count").default(0).notNull(),
});

/**
 * One row per post that has been broadcast. A broadcast larger than the day's
 * quota is finished by the queue job on later days; `completedAt` marks done.
 */
export const broadcasts = sqliteTable("broadcasts", {
  slug: text("slug").primaryKey(),
  startedAt: text("started_at").notNull(),
  completedAt: text("completed_at"),
});

/** Who already received a post, so a resumed broadcast never mails anyone twice. */
export const broadcastDeliveries = sqliteTable(
  "broadcast_deliveries",
  {
    slug: text("slug").notNull(),
    email: text("email").notNull(),
    sentAt: integer("sent_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.slug, table.email] })],
);
