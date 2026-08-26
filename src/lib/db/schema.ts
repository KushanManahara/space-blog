import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Newsletter subscribers.
 */
export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
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
