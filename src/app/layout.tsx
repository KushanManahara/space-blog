import type { Metadata } from "next";
import localFont from "next/font/local";

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
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    creator: author.handle,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
      <body className="flex min-h-full flex-col bg-bg-1 text-fg-1">
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
