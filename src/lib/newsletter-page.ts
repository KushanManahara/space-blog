import { NextResponse } from "next/server";

/**
 * The small standalone pages the newsletter routes answer with (unsubscribe,
 * confirm). They are served outside the app shell, from route handlers, so
 * they carry their own minimal markup and styles.
 */

/** Everything interpolated into the responses below goes through this. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function page(title: string, heading: string, body: string, action?: string): NextResponse {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(title)} · Space</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0B0F19;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: #151C2C;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 40px;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
    }
    h1 { font-size: 24px; font-weight: 700; margin: 0 0 12px; color: #FFFFFF; }
    p { font-size: 15px; color: #94A3B8; line-height: 1.6; margin: 0 0 24px; }
    .btn {
      display: inline-block;
      background: #007AFF;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 28px;
      border-radius: 9999px;
      border: 0;
      cursor: pointer;
      font-family: inherit;
    }
    .btn:hover { background: #0062CC; }
    .quiet {
      display: inline-block;
      margin-top: 16px;
      color: #94A3B8;
      font-size: 13.5px;
      text-decoration: none;
    }
    .quiet:hover { color: #F8FAFC; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(heading)}</h1>
    <p>${body}</p>
    ${action ?? '<a class="btn" href="/">Return to Space</a>'}
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
