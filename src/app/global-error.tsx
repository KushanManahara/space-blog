"use client";

/**
 * Last resort: catches failures in the root layout itself, where the site
 * chrome and its stylesheet may never have rendered. It therefore has to ship
 * its own <html>/<body> and cannot rely on design tokens, so the few colours
 * here are literals by necessity — with a dark-scheme fallback so it is not
 * blinding on a dark OS.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          textAlign: "center",
        }}
      >
        <style>{`
          @media (prefers-color-scheme: dark) {
            body { background: #0f172a !important; color: #e2e8f0 !important; }
            .ge-sub { color: #94a3b8 !important; }
          }
        `}</style>
        <main style={{ maxWidth: "440px" }}>
          <h1 style={{ fontSize: "26px", lineHeight: 1.2, margin: "0 0 12px", fontWeight: 700 }}>
            Space is temporarily unavailable
          </h1>
          <p
            className="ge-sub"
            style={{ fontSize: "15.5px", lineHeight: 1.6, color: "#475569", margin: "0 0 24px" }}
          >
            The site failed to start. Reloading is usually enough.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              border: 0,
              borderRadius: "999px",
              padding: "13px 26px",
              fontSize: "15px",
              fontWeight: 600,
              background: "#0062d2",
              color: "#ffffff",
            }}
          >
            Reload
          </button>
          {error.digest ? (
            <p
              className="ge-sub"
              style={{
                marginTop: "28px",
                fontSize: "12px",
                color: "#64748b",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Reference {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
