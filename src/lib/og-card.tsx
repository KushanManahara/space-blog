import { loadOgFonts, loadOgLogo, OG_SIZE } from "@/lib/og";

/**
 * The Space share card: a light blue field, an orbit line with three glass
 * spheres, and a frosted pill holding the logo and wordmark. Drawn in code
 * (satori, behind `ImageResponse`) so the text and logo stay sharp at any
 * size. `label` names the page being shared; the homepage passes none.
 *
 * satori supports flexbox, gradients, borders and box shadows but not
 * backdrop blur, so the glass is layered translucent gradients and a soft
 * blue shadow rather than a real blur.
 */

const INK = "#0F172A";
const BRAND_STRONG = "#0056B3";

function Sphere({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size,
        background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #E3EEFC 45%, #B9D4F7 100%)",
        boxShadow: "0 14px 22px rgba(0, 122, 255, 0.22)",
      }}
    />
  );
}

export async function renderSpaceCard(label?: string) {
  const [fonts, logo] = await Promise.all([loadOgFonts(), loadOgLogo()]);
  const { width, height } = OG_SIZE;

  const card = (
    <div
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        overflow: "hidden",
        fontFamily: "Louis George Cafe",
        background: "linear-gradient(115deg, #EEF4FD 0%, #E2EDFC 38%, #B5D6FB 72%, #7DBBF8 100%)",
      }}
    >
      {/*
        Brand glow under the pill. A shadow, not a radial gradient: satori
        fades gradients to transparent through black, which leaves a smudge.
      */}
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 400,
          width: 640,
          height: 40,
          borderRadius: 40,
          boxShadow: "0 60px 110px 40px rgba(0, 122, 255, 0.42)",
        }}
      />
      {/* Orbit line. */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <path
          d="M 352 125 C 290 128 220 140 168 170 C 90 215 45 300 62 355 C 82 420 200 380 188 445 C 178 500 140 545 262 548"
          fill="none"
          stroke="#7FAFEC"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </svg>
      <Sphere x={168} y={170} size={52} />
      <Sphere x={352} y={125} size={38} />
      <Sphere x={266} y={548} size={42} />

      {/* Frosted pill, running off the right edge. */}
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 205,
          width: 920,
          height: 284,
          borderRadius: 142,
          display: "flex",
          alignItems: "center",
          paddingLeft: 140,
          border: "3px solid rgba(255,255,255,0.95)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(235,244,255,0.78) 55%, rgba(214,232,253,0.82) 100%)",
          boxShadow: "0 30px 60px rgba(0, 92, 220, 0.30), inset 0 2px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* satori renders plain <img>; next/image does not apply inside ImageResponse. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={150} height={150} alt="" />
        <div
          style={{
            marginLeft: 46,
            fontSize: 128,
            fontWeight: 400,
            color: INK,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          Space
        </div>
      </div>

      {/* Page name, or the address alone on the homepage card. */}
      <div
        style={{
          position: "absolute",
          left: 384,
          bottom: 52,
          display: "flex",
          alignItems: "baseline",
          gap: 18,
          maxWidth: 780,
        }}
      >
        {label ? (
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: INK,
              letterSpacing: -0.5,
              lineHeight: 1.1,
            }}
          >
            {label}
          </div>
        ) : null}
        <div style={{ fontSize: 22, fontWeight: 700, color: BRAND_STRONG, letterSpacing: 0.5 }}>
          space.gimhara.com
        </div>
      </div>
    </div>
  );

  return { card, fonts };
}
