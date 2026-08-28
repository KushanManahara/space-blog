import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { ViewTransitionGuard } from "@/components/motion/view-transition-guard";
import { CommandMenuProvider } from "@/components/nav/command-menu";
import { SavedPostsProvider } from "@/components/providers/saved-posts-provider";
import { author, posts, site, siteUrl, toSummaries } from "@/lib/content";

import "./globals.css";

const louisGeorgeCafe = localFont({
  variable: "--font-louis-george-cafe",
  display: "swap",
  src: [
    { path: "./fonts/Louis_George_Cafe_Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Louis_George_Cafe.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Louis_George_Cafe_Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Louis_George_Cafe_Bold.ttf", weight: "700", style: "normal" },
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
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
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
                  email: `mailto:${author.email}`,
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
          <CommandMenuProvider posts={toSummaries(posts)}>{children}</CommandMenuProvider>
        </SavedPostsProvider>
      </body>
    </html>
  );
}
