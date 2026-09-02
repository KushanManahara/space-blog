import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { ViewTransitionGuard } from "@/components/motion/view-transition-guard";
import { CommandMenuProvider } from "@/components/nav/command-menu";
import { SavedPostsProvider } from "@/components/providers/saved-posts-provider";
import { author, site, siteUrl } from "@/lib/content";

import "./globals.css";

const louisGeorgeCafe = localFont({
  variable: "--font-louis-george-cafe",
  display: "swap",
  // WOFF2, not TTF: the same four faces render-blocked 130KB as TrueType and
  // 53KB compressed, for identical glyphs.
  src: [
    { path: "./fonts/Louis_George_Cafe_Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Louis_George_Cafe.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Louis_George_Cafe_Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Louis_George_Cafe_Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#080d1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: `${site.name} — ${author.name}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    creator: author.handle,
    images: [`${siteUrl}/logo.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: site.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${louisGeorgeCafe.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            /*
             * An explicit choice wins; otherwise follow the operating system.
             *
             * This used to fall through to light whenever `theme` was unset,
             * so every first-time visitor with a dark OS got a light site —
             * while `viewport.themeColor` below was already promising the
             * browser a dark chrome for exactly that reader.
             */
            __html: `
              try {
                var stored = localStorage.getItem('theme');
                var dark = stored
                  ? stored === 'dark'
                  : window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.add(dark ? 'dark' : 'light');
                document.documentElement.classList.remove(dark ? 'light' : 'dark');
              } catch (_) {
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg-1 text-fg-1">
        <script
          type="application/ld+json"
          // Serialised, not user input: every value comes from the content layer.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: site.name,
                  description: site.description,
                  inLanguage: "en",
                  publisher: { "@id": `${siteUrl}/#person` },
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: author.name,
                  jobTitle: author.role,
                  description: author.bio,
                  // No `email` here on purpose. schema.org does not require it,
                  // and structured data is the easiest thing on the page for an
                  // address harvester to parse. The contact page carries it for
                  // people, which is who it is for.
                  url: `${siteUrl}/about`,
                  image: `${siteUrl}${author.avatar}`,
                  sameAs: [author.github, author.linkedin, author.twitter],
                },
              ],
            }),
          }}
        />
        <ViewTransitionGuard />
        <SavedPostsProvider>
          <CommandMenuProvider>{children}</CommandMenuProvider>
        </SavedPostsProvider>
      </body>
    </html>
  );
}
