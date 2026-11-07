/**
 * Removes expired abuse-counter rows.
 *
 * `rate_limits` gains a row per caller per action per window and nothing ever
 * deleted them, so view de-duplication alone added roughly one row per reader
 * per article per day, forever. Rows whose window has closed are inert — the
 * next request for that key overwrites them — so this only reclaims space.
 *
 * Production runs this automatically: the daily `email-queue` schedule calls
 * `pruneRateLimits()` after sending. This script is for running it by hand:
 *
 *   pnpm prune:limits
 */
import "dotenv/config";

async function main() {
  const { pruneRateLimits } = await import("@/lib/abuse");

  const removed = await pruneRateLimits();
  if (removed === null) {
    console.error("Prune failed. Check TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.");
    process.exit(1);
  }

  console.log(`Pruned ${removed} expired rate-limit row${removed === 1 ? "" : "s"}.`);
}

main();
