/**
 * Send the new-article notification to every newsletter subscriber.
 *
 * Articles ship in `posts.ts` and reach the site through a redeploy, and
 * nothing watches for new slugs — so this is the trigger. Run it after the
 * article is live, not before: the email links straight at the article URL.
 *
 *   pnpm broadcast <slug>          show what would be sent, to how many
 *   pnpm broadcast <slug> --send   actually send it
 *
 * Sending is deliberately opt-in. Mail cannot be recalled, there is no record
 * of what has already gone out, and running this twice on one slug mails the
 * whole list twice.
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

/**
 * The app modules are imported dynamically, after the two `config` calls above
 * have run.
 *
 * A static import would not be: ESM hoists every import above this file's
 * body, so the modules would initialise against an environment that has not
 * been loaded yet. `emailEnabled` is computed once at import time and would
 * always be false, and `lib/db` builds its libSQL client at module scope and
 * would quietly fall back to `file:local.db` — mailing nobody, from an empty
 * local database, while reporting success.
 */
async function main() {
  const args = process.argv.slice(2);
  const send = args.includes("--send");
  const toArg = args.find((arg) => arg.startsWith("--to=") || arg.startsWith("--test="));
  const targetEmail = toArg ? toArg.replace(/^--(to|test)=/, "").trim() : null;
  const slug = args.find((arg) => !arg.startsWith("--"));

  const { getPostBySlug, posts } = await import("@/lib/content");

  if (!slug) {
    console.error("Usage:\n  pnpm broadcast <slug>               # Dry run preview\n  pnpm broadcast <slug> --to=<email>  # Send to one specific subscriber\n  pnpm broadcast <slug> --send        # Broadcast to all subscribers in DB\n");
    console.error("Available article slugs (newest first):");
    for (const post of posts.slice(0, 15)) console.error(`  ${post.slug}`);
    process.exit(1);
  }

  const post = getPostBySlug(slug);
  if (!post) {
    console.error(`No article with slug "${slug}".`);
    process.exit(1);
  }

  const { emailEnabled } = await import("@/lib/resend");
  if (!emailEnabled) {
    console.error(
      "Outbound email is not configured — RESEND_API_KEY and NEWSLETTER_SECRET must both be set in .env.local.",
    );
    process.exit(1);
  }

  console.log(`Article:     ${post.title}`);
  console.log(`Topic:       ${post.topic}`);
  console.log(`Slug:        ${post.slug}`);

  const { broadcastArticleNotification } = await import("@/lib/newsletter");

  if (targetEmail) {
    console.log(`Target:      ${targetEmail}`);
    console.log(`\nSending article update to ${targetEmail}...`);
    const result = await broadcastArticleNotification(post, [targetEmail]);
    if (!result.success) {
      console.error("\nSend failed:", result.error);
      process.exit(1);
    }
    console.log(`\nArticle update successfully sent to ${targetEmail}! Check your inbox.`);
    return;
  }

  let subscribers: { email: string }[] = [];
  try {
    const { db, newsletterSubscribers } = await import("@/lib/db");
    subscribers = await db
      .select({ email: newsletterSubscribers.email })
      .from(newsletterSubscribers);
    console.log(`Subscribers: ${subscribers.length}`);
  } catch (error) {
    console.error("\nDatabase Connection Error (Turso):");
    if (error && typeof error === "object" && "cause" in error) {
      console.error((error as any).cause?.message || error);
    } else {
      console.error(error);
    }
    console.error("\nTip: Check that TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env.local are valid.");
    process.exit(1);
  }

  if (subscribers.length === 0) {
    console.log("\nNobody to mail. Nothing sent.");
    return;
  }

  if (!send) {
    console.log("\nDry run — nothing sent.");
    console.log("  • To test first:  pnpm broadcast " + slug + " --test=your@email.com");
    console.log("  • To broadcast:   pnpm broadcast " + slug + " --send");
    return;
  }

  const result = await broadcastArticleNotification(post);

  if (!result.success) {
    console.error("\nBroadcast failed:", result.error);
    process.exit(1);
  }

  console.log(`\nSent to ${result.count} subscriber(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
