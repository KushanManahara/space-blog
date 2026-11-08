import { loadOgFonts, loadOgLogo, OG_SIZE } from "@/lib/og";

/**
 * The Space share card: a light blue field, a pen finishing two fading
 * handwriting strokes, and a frosted pill holding the logo and wordmark that
 * runs off the right edge. Drawn in code
 * (satori, behind `ImageResponse`) so the text and logo stay sharp at any
 * size. `label` names the page being shared; the homepage passes none.
 *
 * satori supports flexbox, gradients, borders and box shadows but not
 * backdrop blur, so the glass is layered translucent gradients and a soft
 * blue shadow rather than a real blur.
 */

const INK = "#0F172A";
const BRAND_STRONG = "#0056B3";

/**
 * Two handwriting strokes that fade in from the left and end at the pen's nib,
 * leading the eye into the pill.
 */
function Strokes({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <defs>
        <linearGradient id="ink" x1="70" y1="0" x2="255" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1E7BF0" stopOpacity="0" />
          <stop offset="0.55" stopColor="#1E7BF0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0A63DD" stopOpacity="1" />
        </linearGradient>
        <linearGradient
          id="ink-faint"
          x1="70"
          y1="0"
          x2="240"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4C9AF5" stopOpacity="0" />
          <stop offset="1" stopColor="#4C9AF5" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path
        d="M 72 342 C 100 330 128 326 140 322 C 150 319 146 333 158 331 C 180 327 205 318 236 314"
        fill="none"
        stroke="url(#ink-faint)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d="M 76 412 C 104 399 134 393 148 390 C 160 387 156 402 170 400 C 196 397 222 393 251 391"
        fill="none"
        stroke="url(#ink)"
        strokeWidth={5.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A slim pen, nib down-left at the end of the lower stroke. */
function Pen() {
  return (
    <div
      style={{
        position: "absolute",
        // Rotates about its centre; placed so the nib lands on the lower stroke's end (251, 391).
        left: 220,
        top: 318,
        width: 150,
        height: 24,
        display: "flex",
        alignItems: "center",
        transform: "rotate(-54deg)",
      }}
    >
      {/* Nib */}
      <div
        style={{
          width: 20,
          height: 13,
          borderRadius: "10px 2px 2px 10px",
          background: "linear-gradient(90deg, #0B5BD3, #2F8CF5)",
        }}
      />
      {/* Grip */}
      <div
        style={{ width: 30, height: 20, background: "linear-gradient(180deg, #4DA2FA, #0A63DD)" }}
      />
      {/* Barrel */}
      <div
        style={{
          width: 96,
          height: 24,
          borderRadius: "3px 12px 12px 3px",
          background: "linear-gradient(180deg, #FFFFFF 0%, #DCEBFD 55%, #A9CDF8 100%)",
          boxShadow: "0 10px 18px rgba(0, 102, 230, 0.28)",
        }}
      />
    </div>
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
          left: 540,
          top: 400,
          width: 640,
          height: 40,
          borderRadius: 40,
          boxShadow: "0 60px 110px 40px rgba(0, 122, 255, 0.42)",
        }}
      />
      {/* Writing: a pen finishing two strokes. */}
      <Strokes width={width} height={height} />
      <Pen />

      {/* Frosted pill, running off the right edge. */}
      <div
        style={{
          position: "absolute",
          left: 352,
          top: 205,
          width: 1000,
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
