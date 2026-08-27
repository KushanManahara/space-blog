import { NextResponse, type NextRequest } from "next/server";

/**
 * Studio routes are temporarily disabled from public access.
 * Any request to /studio, /studio/editor, /studio/login, etc. rewrites to 404.
 */
export async function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL("/_not-found", request.url));
}

export const config = {
  matcher: ["/studio/:path*"],
};
