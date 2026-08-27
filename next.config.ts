import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
