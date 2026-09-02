import { NextResponse, type NextRequest } from "next/server";

/**
 * Studio is temporarily out of service while articles are edited in code and
 * redeployed. The pages themselves live in `src/app/_studio/` — an underscored
 * folder, which the App Router excludes from routing — so the code is intact and
 * the route is gone. Rename that folder back to `studio` to restore it, and
 * re-enable the matcher below if it should stay private after that.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // matcher: ["/studio/:path*"],
  matcher: [],
};
