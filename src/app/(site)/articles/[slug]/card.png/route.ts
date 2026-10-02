import Image, { generateStaticParams } from "../opengraph-image";

/**
 * The article's share card at a stable URL, for the BlogPosting structured
 * data.
 *
 * Next serves `opengraph-image.tsx` under a build-generated suffix
 * (`/opengraph-image-<hash>`) and only exposes that URL through the page's
 * meta tags, so the JSON-LD — which pointed at the bare `/opengraph-image` —
 * was naming an image that 404s. This renders the same card from the same
 * component.
 */
export { generateStaticParams };
export const dynamic = "force-static";

export function GET(_request: Request, context: RouteContext<"/articles/[slug]/card.png">) {
  return Image({ params: context.params });
}
