import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * Two code paths deliberately execute third-party JavaScript: the Python runner
 * loads Pyodide and the semantic search loads a sentence-embedding model, both
 * from cdn.jsdelivr.net, inside workers. That is exactly why a policy is worth
 * having rather than a reason to skip one — without `script-src` there is
 * nothing at all between a compromised CDN and every reader's browser.
 *
 * Each entry below exists for a specific thing in this codebase:
 *
 * - `'unsafe-inline'` in script-src: the `beforeInteractive` theme script in
 *   `app/layout.tsx` and the two `ld+json` blocks are inline. Removing it needs
 *   a nonce, which needs those moved out of the static shell.
 * - `'wasm-unsafe-eval'`: Pyodide is WebAssembly.
 * - `blob:` in worker-src: Pyodide spawns its own workers.
 * - huggingface.co hosts in connect-src: transformers.js runs with
 *   `allowLocalModels = false`, so model weights come from the hub.
 * - esm.sh in font-src: Excalidraw pulls its own hand-drawn faces from there
 *   while rendering a diagram.
 *
 * Set CSP_REPORT_ONLY=1 to ship it as a report-only header instead, which is
 * the safe way to re-test after adding anything that loads from a new origin.
 */
const csp = [
  "default-src 'self'",
  // `blob:` is required, not decorative: ONNX Runtime (under transformers.js)
  // builds its WASM backend by dynamically importing a blob: module, and
  // Pyodide does the same for its workers. Without it semantic search fails
  // with "no available backend found".
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "connect-src 'self' https://cdn.jsdelivr.net https://esm.sh https://huggingface.co https://*.huggingface.co https://*.hf.co",
  "style-src 'self' 'unsafe-inline'",
  // esm.sh: Excalidraw fetches its own hand-drawn fonts (Excalifont, Nunito,
  // Xiaolai) from there at render time — found by watching a diagram page
  // report thirty blocked font loads, not by reading its source.
  "font-src 'self' data: https://esm.sh",
  "img-src 'self' data: blob: https://upload.wikimedia.org https://images.unsplash.com",
  "media-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Stop the site being framed for clickjacking. `frame-ancestors` is the
  // modern spelling; X-Frame-Options covers older browsers that ignore it.
  {
    key: process.env.CSP_REPORT_ONLY
      ? "Content-Security-Policy-Report-Only"
      : "Content-Security-Policy",
    value: csp,
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Never let a response be re-interpreted as a type it did not declare.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin to other sites, the full path only to ourselves, so
  // article URLs do not leak into third-party referrer logs.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here uses these, so decline them up front.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Vercel serves HTTPS already; this stops the first plaintext request.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  images: {
    /**
     * Hosts allowed for `image` blocks in article bodies. Next refuses to
     * optimise anything not listed here, so a new external source needs an
     * entry adding before it will render.
     */
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    /**
     * Article figures may be SVG. The optimizer is bypassed for those
     * (see ArticleImage), and this CSP keeps a hostile SVG from running
     * scripts or loading anything of its own if one ever slips in.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
