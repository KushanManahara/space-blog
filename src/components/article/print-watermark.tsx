import * as React from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { author, site, siteUrl, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function PrintHeaderWatermark({ post }: { post: Post }) {
  const articleUrl = `${siteUrl}/articles/${post.slug}`;
  const formattedDate = formatDate(post.publishedAt, "long");

  return (
    <div
      aria-hidden
      className="hidden print:mb-8 print:block print:w-full print:border-b-2 print:border-neutral-900 print:pb-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BrandMark size={28} glow={false} />
          <div>
            <span className="font-display text-[20px] font-bold tracking-tight text-neutral-950">
              {site.name}
            </span>
            <p className="text-[12px] font-medium text-neutral-600">{site.tagline}</p>
          </div>
        </div>
        <div className="text-right text-[12px] text-neutral-600">
          <p className="font-bold text-neutral-900">{author.name}</p>
          <p>{author.role}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-neutral-500">
        <span>{articleUrl}</span>
        <span>
          {formattedDate} · {post.topic} · {post.readingMinutes} min read
        </span>
      </div>
    </div>
  );
}

export function PrintFooterWatermark({ post }: { post: Post }) {
  const currentYear = new Date().getFullYear();
  const articleUrl = `${siteUrl}/articles/${post.slug}`;

  return (
    <div
      aria-hidden
      className="hidden print:mt-10 print:block print:w-full print:break-inside-avoid print:border-t-2 print:border-neutral-900 print:pt-6"
    >
      <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4 text-[12px] leading-relaxed text-neutral-700">
        <div className="flex items-center justify-between gap-2 border-b border-neutral-200 pb-2">
          <p className="font-bold text-neutral-950">
            © {currentYear} {author.name}. All rights reserved.
          </p>
          <span className="font-mono text-[11px] text-neutral-500">
            {site.name} · {siteUrl}
          </span>
        </div>

        <p className="mt-2.5">
          Originally authored and published by <strong>{author.name}</strong> on{" "}
          <strong>{site.name}</strong>. Read online at{" "}
          <span className="font-mono text-blue-700 underline">{articleUrl}</span>.
        </p>
        <p className="mt-1.5 text-[11px] text-neutral-500">
          This publication is protected by international copyright laws. Unauthorized commercial
          reproduction, scraping, or alteration without prior written authorization is strictly
          prohibited.
        </p>
      </div>
    </div>
  );
}
