import Image, { generateStaticParams } from "../opengraph-image";

/**
 * The article's share card at a stable URL, used by Open Graph, Twitter Card,
 * and BlogPosting structured data.
 *
 * Next serves `opengraph-image.tsx` under a build-generated hash suffix
 * (`/opengraph-image-<hash>`), so pointing metadata and JSON-LD at this stable
 * route guarantees every crawler and social preview hits the exact same 1200x630
 * rendered card with long-lived cache headers.
 */
export { generateStaticParams };
export const dynamic = "force-static";

export async function GET(_request: Request, context: RouteContext<"/articles/[slug]/card.png">) {
  const response = await Image({ params: context.params });
  response.headers.set(
    "Cache-Control",
    "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
  );
  return response;
}
