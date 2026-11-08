import { loadOgFonts, loadOgLogo, OG_SIZE } from "@/lib/og";

/**
 * The Space share card: a light blue field, two layered glass pages with a
 * pen (writing), and a frosted pill holding the logo and wordmark that runs
 * off the right edge. Drawn in code
 * (satori, behind `ImageResponse`) so the text and logo stay sharp at any
 * size. `label` names the page being shared; the homepage passes none.
 *
 * satori supports flexbox, gradients, borders and box shadows but not
 * backdrop blur, so the glass is layered translucent gradients and a soft
 * blue shadow rather than a real blur.
 */

const INK = "#0F172A";
const BRAND_STRONG = "#0056B3";

const GLASS =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(240,246,255,0.82) 60%, rgba(222,236,253,0.86) 100%)";

/** One frosted page. `lines` are widths in px; the first is the blue heading. */
function Page({
  left,
  top,
  rotate,
  lines,
  faint,
}: {
  left: number;
  top: number;
  rotate: number;
  lines: number[];
  faint?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 168,
        height: 194,
        borderRadius: 22,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        padding: "30px 26px",
        transform: `rotate(${rotate}deg)`,
        // The front page is near-opaque so the back page's lines don't show through.
        background: faint
          ? GLASS
          : "linear-gradient(160deg, #FFFFFF 0%, #F3F8FF 60%, #E6F0FE 100%)",
        border: "2px solid rgba(255,255,255,0.95)",
        opacity: faint ? 0.75 : 1,
        boxShadow: "0 22px 36px rgba(0, 102, 230, 0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {lines.map((w, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: i === 0 ? 9 : 8,
            borderRadius: 8,
            background: i === 0 && !faint ? "#1E7BF0" : "rgba(126, 172, 235, 0.55)",
          }}
        />
      ))}
    </div>
  );
}

/** A slim pen lying across the front page's corner. */
function Pen() {
  return (
    <div
      style={{
        position: "absolute",
        left: 228,
        top: 362,
        width: 124,
        height: 22,
        display: "flex",
        alignItems: "center",
        transform: "rotate(-52deg)",
      }}
    >
      {/* Nib */}
      <div
        style={{
          width: 18,
          height: 12,
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
          width: 76,
          height: 22,
          borderRadius: "3px 11px 11px 3px",
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
      {/* Writing: two layered pages and a pen. */}
      <Page left={76} top={176} rotate={-12} lines={[120, 104, 96, 84]} faint />
      <Page left={136} top={238} rotate={0} lines={[92, 116, 104, 100, 56]} />
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
