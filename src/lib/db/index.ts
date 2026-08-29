import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

/**
 * The database URL, or a hard failure.
 *
 * This used to fall back to `file:local.db` unconditionally. In production that
 * is the worst kind of default: the build succeeds, every page renders, and
 * each like, view, comment and newsletter signup writes to a serverless
 * filesystem that is discarded when the instance recycles. Nothing surfaces —
 * you get a working site whose counters silently reset.
 *
 * The file fallback is genuinely useful in development, so it stays there and
 * only there.
 */
function databaseUrl(): string {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) return url;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "TURSO_DATABASE_URL is not set. Refusing to fall back to a local file in production — " +
        "every write would be lost when the instance recycles. Set it in the Vercel project's " +
        "environment variables (along with TURSO_AUTH_TOKEN) and redeploy.",
    );
  }

  return "file:local.db";
}

const client = createClient({
  url: databaseUrl(),
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export * from "./schema";
