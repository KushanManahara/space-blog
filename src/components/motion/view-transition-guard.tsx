"use client";

/**
 * Keeps a skipped view transition from surfacing as an uncaught
 * `InvalidStateError` on the console.
 *
 * A browser *skips* a view transition rather than running it whenever it
 * cannot capture a before/after snapshot: a second transition starts while one
 * is in flight, the document is hidden or rendered offscreen, a navigation is
 * cancelled. Skipping is normal and the correct fallback, and the spec reports
 * it by rejecting `transition.ready`.
 *
 * react-dom 19.2.8 has two `startViewTransition` paths and only one handles
 * that rejection. In
 * `next/dist/compiled/react-dom-experimental/cjs/react-dom-client.development.js`
 * the gesture path passes a rejection handler:
 *
 *     transition.ready.then(readyForAnimations, function (error) { ... })
 *
 * while the commit path this app goes through does not:
 *
 *     transition.ready.then(function () { ... })
 *
 * `.then(fn)` returns a derived promise that inherits the rejection with
 * nothing attached to it, so it escapes as an unhandled rejection even though
 * the transition was skipped correctly and the navigation finished. That is
 * React's gap, not this app's: there is nothing to fix in
 * `(site)/template.tsx`, and the transitions themselves work.
 *
 * In this app it fires when a route transition and a nested `content-swap`
 * transition overlap, which makes it timing-dependent: navigating to the
 * archive and then clicking a filter chip can produce it, and the same
 * sequence often will not. It reproduces on demand by starting two
 * transitions in a row and attaching only a fulfilment handler to the first,
 * which is exactly what react-dom does.
 *
 * Deliberately NOT gated on `document.__reactViewTransition`. React nulls that
 * as it settles the skipped transition, which happens before the rejection is
 * dispatched, so gating on it makes this a no-op. Measured, not assumed.
 *
 * The trade-off: this suppresses any unhandled `InvalidStateError`, not only
 * React's. Application code does not raise that as an unhandled rejection in
 * practice, and losing a console line is cheaper than shipping a spurious
 * error on a working navigation. `AbortError` is deliberately left alone,
 * because aborted `fetch`es use it and those are worth seeing.
 *
 * Delete this once react-dom attaches a rejection handler to that call.
 */
function onUnhandledRejection(event: PromiseRejectionEvent) {
  const reason: unknown = event.reason;
  if (!(reason instanceof DOMException)) return;
  if (reason.name !== "InvalidStateError") return;
  if (!("startViewTransition" in document)) return;
  event.preventDefault();
}

/**
 * Attached at module scope rather than in an effect, so the listener exists
 * before React's first commits rather than one paint later. Client chunks
 * evaluate before hydration commits; the `window` check keeps this inert while
 * the module is evaluated on the server for SSR.
 */
if (typeof window !== "undefined") {
  window.removeEventListener("unhandledrejection", onUnhandledRejection);
  window.addEventListener("unhandledrejection", onUnhandledRejection);
}

export function ViewTransitionGuard() {
  return null;
}
