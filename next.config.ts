import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * Deliberately no Content-Security-Policy: Pyodide and the sentence-embedding
 * model are fetched from cdn.jsdelivr.net and run in workers, so a CSP written
 * without testing against a real deployment is far likelier to break the code
 * runner and semantic search than to prevent anything. That is worth doing
 * properly against a preview, separately.
 */
const securityHeaders = [
  // Stop the site being framed for clickjacking. `frame-ancestors` is the
  // modern spelling; X-Frame-Options covers older browsers that ignore it.
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
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
