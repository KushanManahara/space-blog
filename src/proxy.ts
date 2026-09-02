import { NextResponse, type NextRequest } from "next/server";

/**
 * Studio is temporarily out of service while articles are edited in code and
 * redeployed. The pages themselves live in `src/app/_studio/` — an underscored
 * folder, which the App Router excludes from routing — so the code is intact and
 * the route is gone. Rename that folder back to `studio` to restore it, and
 * re-enable the matcher below so it stays private after that.
 *
 * Note that `broadcastArticleAction` refuses without STUDIO_SECRET regardless,
 * so restoring the folder does not by itself expose the mailing list.
 *
 * Renamed from `middleware.ts`: that convention is deprecated in Next 16 and
 * warned on every build.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // matcher: ["/studio/:path*"],
  matcher: [],
};
