import { ImageResponse } from "next/og";

import { author, getPostBySlug, posts, site } from "@/lib/content";
import { formatDate } from "@/lib/format";
import {
  formatOgExcerpt,
  loadOgCoverImage,
  loadOgFonts,
  loadOgLogo,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OG_TOPIC_GRADIENT,
  titleSize,
} from "@/lib/og";

/*
 * `alt` has to be a static export here. Deriving it per article needs
 * `generateImageMetadata`, which moves the route behind a `[__metadata_id__]`
 * segment and stops all cards being prerendered — a real cost for a cosmetic
 * gain. The per-article alt text is set in the page's `generateMetadata`
 * instead, where the post is already in scope.
 */
export const alt = `An article on ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Pre-render a card per article at build time rather than on first share. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const [fonts, logo, cover] = await Promise.all([
    loadOgFonts(),
    loadOgLogo(),
    loadOgCoverImage(post?.coverImage),
  ]);

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

  // Fallback for articles without a local cover image: Space topic gradient
  // with the same editorial typography and accent treatment.
  if (!cover) {
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={logo} width={46} height={46} alt="" />
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1.8,
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

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize(post.title, false),
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxHeight: 240,
              overflow: "hidden",
            }}
          >
            {post.title}
          </div>

          <div
            style={{
              width: 156,
              height: 5,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #9BE7FF 0%, #38BDF8 50%, rgba(56, 189, 248, 0) 100%)",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 25,
              lineHeight: 1.44,
              color: "rgba(255,255,255,0.86)",
            }}
          >
            {formatOgExcerpt(post.dek, 132)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.24)",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>{author.name}</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.74)" }}>
            {formatDate(post.publishedAt)} · {post.readingMinutes} min read
          </div>
        </div>
      </div>,
      { ...size, fonts },
    );
  }

  const { width: cardWidth, height: cardHeight } = size;

  // Cover artwork occupies the right 800px canvas (centered horizontally),
  // while Space's royal-blue editorial fade feathers smoothly across the seam.
  const panelWidth = 800;
  const rawScaledWidth =
    cover.width && cover.height
      ? Math.round((cover.width / cover.height) * cardHeight)
      : Math.round(cardHeight * (16 / 9));
  const scaledWidth = Math.max(panelWidth, rawScaledWidth);
  const offsetX = -Math.round((scaledWidth - panelWidth) / 2);

  return new ImageResponse(
    <div
      style={{
        width: cardWidth,
        height: cardHeight,
        position: "relative",
        display: "flex",
        overflow: "hidden",
        background: "linear-gradient(135deg, #00318C 0%, #0047B8 52%, #00276E 100%)",
        fontFamily: "Louis George Cafe",
        color: "#ffffff",
      }}
    >
      {/* Prominent article cover image framed cleanly on the right side */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: panelWidth,
          height: cardHeight,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <img
          src={cover.dataUri}
          width={scaledWidth}
          height={cardHeight}
          alt=""
          style={{
            width: scaledWidth,
            height: cardHeight,
            marginLeft: offsetX,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Seamless Space royal-blue directional feather over the left seam.
          Same-hue alpha stops avoid satori blending through black. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: cardWidth,
          height: cardHeight,
          background:
            "linear-gradient(90deg, #003696 0%, #0046B8 34%, rgba(0, 70, 184, 0.94) 41%, rgba(0, 70, 184, 0.70) 49%, rgba(0, 70, 184, 0.28) 58%, rgba(0, 70, 184, 0) 68%)",
        }}
      />

      {/* Full-canvas upper-left Space blue sheen (full dimensions avoid box seams) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: cardWidth,
          height: cardHeight,
          background:
            "linear-gradient(135deg, rgba(0, 122, 255, 0.34) 0%, rgba(0, 122, 255, 0.10) 28%, rgba(0, 122, 255, 0) 52%)",
        }}
      />

      {/* Left-hand editorial identity column: logo, title, glowing divider, excerpt */}
      <div
        style={{
          position: "relative",
          width: 565,
          height: cardHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 36px 50px 64px",
        }}
      >
        {/* Space brand mark and wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <img src={logo} width={46} height={46} alt="" />
          <div style={{ fontSize: 35, fontWeight: 700, letterSpacing: -0.5, color: "#ffffff" }}>
            {site.name}
          </div>
        </div>

        {/* Title, signature cyan-blue rule, and short excerpt */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize(post.title, true),
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.4,
              maxHeight: 228,
              overflow: "hidden",
              color: "#ffffff",
            }}
          >
            {post.title}
          </div>

          <div
            style={{
              width: 152,
              height: 5,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #9BE7FF 0%, #38BDF8 45%, #1D84FF 80%, rgba(29, 132, 255, 0) 100%)",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 22,
              lineHeight: 1.42,
              maxWidth: 460,
              color: "rgba(255, 255, 255, 0.88)",
            }}
          >
            {formatOgExcerpt(post.dek, 114)}
          </div>
        </div>

        {/* Quiet domain and topic anchor for small mobile link cards */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 0.3,
            color: "rgba(219, 234, 254, 0.80)",
          }}
        >
          <span>space.gimhara.com</span>
          <span style={{ color: "rgba(219, 234, 254, 0.48)" }}>·</span>
          <span>{post.topic}</span>
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
