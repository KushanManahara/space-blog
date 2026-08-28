import { ImageResponse } from "next/og";

import { site } from "@/lib/content";
import { loadOgFonts, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Site-wide fallback card, used by any route without its own image. */
export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 26,
        padding: 84,
        background: "linear-gradient(150deg, #BAE6FD 0%, #0EA5E9 48%, #0062D2 100%)",
        fontFamily: "Louis George Cafe",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{ width: 46, height: 46, borderRadius: 999, background: "#fff", display: "flex" }}
        />
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.6 }}>{site.name}</div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 66,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1.8,
        }}
      >
        {site.tagline}
      </div>

      <div style={{ display: "flex", fontSize: 27, color: "rgba(255,255,255,0.85)" }}>
        {site.issue} posts on AI systems, agents and the software underneath.
      </div>
    </div>,
    { ...size, fonts },
  );
}
