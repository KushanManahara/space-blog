// scripts/test-newsletter.ts

import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, newsletterSubscribers } from "../src/lib/db";
import { resend, SENDER_EMAIL } from "../src/lib/resend";
import { sendWelcomeEmail, syncResendContact } from "../src/lib/newsletter";
import { ArticleNotificationEmail } from "../src/emails/article-notification";
import { posts } from "../src/lib/content/posts";

const TEST_EMAIL = "kushanmanaharahettige@gmail.com";

async function runEndToEndTest() {
  console.log("=================================================");
  console.log("STARTING END-TO-END NEWSLETTER VERIFICATION TEST");
  console.log("TARGET TEST EMAIL:", TEST_EMAIL);
  console.log("SENDER ADDRESS:", SENDER_EMAIL);
  console.log("=================================================\n");

  // 1. SAVE TO DATABASE
  console.log("STEP 1: SAVING TO DATABASE (TURSO/SQLITE)...");
  await db
    .insert(newsletterSubscribers)
    .values({ email: TEST_EMAIL })
    .onConflictDoNothing({ target: newsletterSubscribers.email });

  const dbRecord = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, TEST_EMAIL));
  console.log("DATABASE RECORD CONFIRMED:", dbRecord);

  // 2. SYNC TO RESEND CONTACTS
  console.log("\nSTEP 2: SYNCING CONTACT TO RESEND CONTACTS...");
  const contactResult = await syncResendContact(TEST_EMAIL);
  console.log("RESEND CONTACT RESULT:", contactResult);

  // 3. DISPATCH WELCOME EMAIL
  console.log("\nSTEP 3: DISPATCHING WELCOME EMAIL VIA RESEND...");
  const welcomeResult = await sendWelcomeEmail(TEST_EMAIL);
  console.log("RESEND WELCOME EMAIL RESULT:", welcomeResult);

  // 4. DISPATCH TEST ARTICLE NOTIFICATION
  console.log("\nSTEP 4: DISPATCHING TEST ARTICLE NOTIFICATION (SIMULATING BROADCAST)...");
  const samplePost = posts[0]; // e.g. programing-environment-os
  console.log(`TEST ARTICLE: "${samplePost.title}" (${samplePost.slug})`);

  const broadcastResult = await resend.emails.send({
    from: SENDER_EMAIL,
    to: TEST_EMAIL,
    subject: `New on Space: ${samplePost.title}`,
    react: ArticleNotificationEmail({
      title: samplePost.title,
      dek: samplePost.dek,
      slug: samplePost.slug,
      topic: samplePost.topic,
      readingMinutes: samplePost.readingMinutes,
      coverImage: samplePost.coverImage,
      siteUrl: "https://gimhara.com",
    }),
  });

  console.log("RESEND ARTICLE NOTIFICATION RESULT:", broadcastResult);

  console.log("\n=================================================");
  console.log("END-TO-END VERIFICATION TEST COMPLETED SUCCESSFULLY");
  console.log("=================================================");
}

runEndToEndTest().catch((err) => {
  console.error("FATAL ERROR DURING TEST EXECUTION:", err);
  process.exit(1);
});
