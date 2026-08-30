/**
 * The honeypot field name, shared by the forms that render it and the server
 * that checks it.
 *
 * It lives here rather than in `abuse.ts` because that module imports
 * `next/headers` for request fingerprinting, and pulling it into a client
 * component drags a server-only API into the browser bundle.
 */
export const HONEYPOT_FIELD = "company_website";
