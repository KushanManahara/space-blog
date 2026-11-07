import type { Instrumentation } from "next";

/** Uncaught server errors: render failures, route handlers, server actions. */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { reportError } = await import("@/lib/monitoring");
  // Path only: query strings here can carry an email address and a token.
  await reportError(`${context.routeType} ${request.path.split("?")[0]}`, error);
};
