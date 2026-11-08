import { ImageResponse } from "next/og";

import { OG_SIZE } from "@/lib/og";
import { renderSpaceCard } from "@/lib/og-card";
import { verifiedLabel } from "@/lib/og-sign";

/**
 * Share card for any page: `/og` is the plain Space card (homepage),
 * `/og?label=…&s=…` adds a page name signed by `ogCardPath`. An unsigned or
 * tampered label renders the plain card instead of an error, so a scraper
 * always gets an image.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const label = verifiedLabel(params.get("label"), params.get("s"));
  const { card, fonts } = await renderSpaceCard(label);

  return new ImageResponse(card, {
    ...OG_SIZE,
    fonts,
    headers: {
      // The URL fully determines the image, so it can be cached for a long time.
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
