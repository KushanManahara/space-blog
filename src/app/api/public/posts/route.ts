import { getFeaturedPost, getPopularPosts, siteUrl, type Post } from "@/lib/content";
import { getLivePosts } from "@/lib/db/queries";

/**
 * Read-only feed for the portfolio site: the featured post and the five most
 * viewed, with live view counts. Only public fields leave this route.
 *
 * `PORTFOLIO_ORIGIN` (comma-separated) limits browser callers via CORS. Server
 * side fetches from the portfolio are not subject to CORS either way.
 */
const TOP_COUNT = 5;

function toPublic(post: Post) {
  return {
    slug: post.slug,
    title: post.title,
    dek: post.dek,
    topic: post.topic,
    publishedAt: post.publishedAt,
    readingMinutes: post.readingMinutes,
    views: post.views,
    likes: post.likes,
    coverImage: post.coverImage ? new URL(post.coverImage, siteUrl).toString() : null,
    url: `${siteUrl}/articles/${post.slug}`,
  };
}

function corsHeaders(request: Request): Record<string, string> {
  const allowed = (process.env.PORTFOLIO_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const origin = request.headers.get("origin");
  if (origin && allowed.includes(origin)) {
    return { "access-control-allow-origin": origin, vary: "Origin" };
  }
  return { vary: "Origin" };
}

export async function GET(request: Request): Promise<Response> {
  const live = await getLivePosts();
  return Response.json(
    {
      featured: toPublic(getFeaturedPost(live)),
      top: getPopularPosts(TOP_COUNT, live).map(toPublic),
    },
    {
      headers: {
        ...corsHeaders(request),
        "cache-control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  );
}

export function OPTIONS(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: { ...corsHeaders(request), "access-control-allow-methods": "GET" },
  });
}
