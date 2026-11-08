import { ImageResponse } from "next/og";

import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { renderSpaceCard } from "@/lib/og-card";

export const alt = "The Space logo and wordmark on a soft blue glass card";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Site-wide fallback card, for any route Next attaches it to. The same plain
 * card as `/og`, so a page never previews with an older design.
 */
export default async function Image() {
  const { card, fonts } = await renderSpaceCard();
  return new ImageResponse(card, { ...OG_SIZE, fonts });
}
