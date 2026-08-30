import { ImageResponse } from "next/og";

import { author, getPostBySlug, posts, site } from "@/lib/content";
import { formatDate, truncate } from "@/lib/format";
import {
  loadOgFonts,
  loadOgLogo,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OG_TOPIC_GRADIENT,
  titleSize,
} from "@/lib/og";

export const alt = "Article on Space";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Pre-render a card per article at build time rather than on first share. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const [fonts, logo] = await Promise.all([loadOgFonts(), loadOgLogo()]);

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#f8fafc",
          fontSize: 64,
          fontFamily: "Louis George Cafe",
        }}
      >
        {site.name}
      </div>,
      { ...size, fonts },
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 68,
        background: OG_TOPIC_GRADIENT[post.topic],
        fontFamily: "Louis George Cafe",
        color: "#ffffff",
      }}
    >
      {/* Wordmark and topic. The publication has to be legible at the size a
            timeline actually renders these. */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={logo} width={44} height={44} alt="" />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.32)",
          }}
        >
          {post.topic}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            display: "flex",
            fontSize: titleSize(post.title),
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.6,
            // Three lines is the ceiling before the byline gets crowded.
            maxHeight: 250,
            overflow: "hidden",
          }}
        >
          {post.title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          {truncate(post.dek, 132)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 23,
          paddingTop: 26,
          borderTop: "1px solid rgba(255,255,255,0.26)",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        <div style={{ display: "flex", fontWeight: 700 }}>{author.name}</div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.72)" }}>
          {formatDate(post.publishedAt)} · {post.readingMinutes} min read
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
