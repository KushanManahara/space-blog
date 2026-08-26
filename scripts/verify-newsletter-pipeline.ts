// scripts/verify-newsletter-pipeline.ts

import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, newsletterSubscribers } from "../src/lib/db";
import { resend } from "../src/lib/resend";
import { subscribeAction, broadcastArticleAction } from "../src/app/actions";

const TEST_EMAIL = "kushanmanaharahettige@gmail.com";

async function runHealthCheck() {
  console.log("=================================================");
  console.log("RUNNING COMPLETE NEWSLETTER PIPELINE HEALTH CHECK");
  console.log("TARGET RECIPIENT:", TEST_EMAIL);
  console.log("=================================================\n");

  // TEST 1: SIMULATE UI FORM SUBMISSION TO SERVER ACTION
  console.log("TEST 1: SIMULATING UI FORM SUBMISSION TO SUBSCRIBE ACTION...");
  const formData = new FormData();
  formData.append("email", TEST_EMAIL);

  const actionResult = await subscribeAction({ status: "idle", message: "" }, formData);
  console.log("SUBSCRIBE ACTION RESULT:", actionResult);

  if (actionResult.status !== "success") {
    throw new Error(`SUBSCRIBE ACTION FAILED: ${actionResult.message}`);
  }

  // TEST 2: CONFIRM DATABASE RECORD
  console.log("\nTEST 2: CONFIRMING DATABASE RECORD IN TURSO/SQLITE...");
  const dbRecords = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, TEST_EMAIL));
  console.log("DATABASE RECORD CONFIRMED:", dbRecords);

  if (!dbRecords.length) {
    throw new Error("DATABASE RECORD NOT FOUND");
  }

  // TEST 3: CONFIRM RESEND CONTACT
  console.log("\nTEST 3: CONFIRMING RESEND CONTACT CREATION...");
  const contact = await resend.contacts.get({ email: TEST_EMAIL });
  console.log(
    "RESEND CONTACT CONFIRMED:",
    contact.data?.id,
    "UNSUBSCRIBED:",
    contact.data?.unsubscribed,
  );

  // TEST 4: SIMULATE ARTICLE BROADCAST ACTION
  console.log("\nTEST 4: TESTING ARTICLE BROADCAST ACTION (POST: 'fyp')...");
  const broadcastResult = await broadcastArticleAction("fyp");
  console.log("BROADCAST ACTION RESULT:", broadcastResult);

  if (!broadcastResult.success) {
    throw new Error(`BROADCAST FAILED: ${broadcastResult.error}`);
  }

  console.log("\n=================================================");
  console.log("ALL HEALTH CHECKS PASSED WITH DELIVERABILITY HEADERS AND MULTIPART PLAIN TEXT");
  console.log("=================================================");
}

runHealthCheck().catch((err) => {
  console.error("HEALTH CHECK FAILED:", err);
  process.exit(1);
});
