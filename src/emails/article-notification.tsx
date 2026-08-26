// src/emails/article-notification.tsx

import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface ArticleNotificationEmailProps {
  title?: string;
  dek?: string;
  slug?: string;
  topic?: string;
  readingMinutes?: number;
  coverImage?: string;
  siteUrl?: string;
  unsubscribeUrl?: string;
}

/**
 * GENERATES HIGH-DELIVERABILITY PLAIN TEXT FALLBACK
 */
export function getArticleNotificationText({
  title = "New Article Released",
  dek = "Read the latest engineering findings and technical breakdown on Space.",
  slug = "programing-environment-os",
  topic = "Engineering",
  readingMinutes = 5,
  siteUrl = "https://gimhara.com",
  unsubscribeUrl,
}: ArticleNotificationEmailProps): string {
  const articleUrl = `${siteUrl}/articles/${slug}`;
  const unsubs = unsubscribeUrl || `${siteUrl}/api/newsletter/unsubscribe`;

  return `SPACE · ${topic.toUpperCase()}

NEW ON SPACE: ${title.toUpperCase()}
Topic: ${topic} · ${readingMinutes} min read

${dek}

Read the full article: ${articleUrl}

----------------------------------------
You received this email because you are subscribed to Space newsletter updates.
View in Browser: ${articleUrl}
All Articles: ${siteUrl}/articles
Unsubscribe: ${unsubs}
`;
}

export function ArticleNotificationEmail({
  title = "New Article Released",
  dek = "Read the latest engineering findings and technical breakdown on Space.",
  slug = "programing-environment-os",
  topic = "Engineering",
  readingMinutes = 5,
  coverImage,
  siteUrl = "https://gimhara.com",
  unsubscribeUrl,
}: ArticleNotificationEmailProps) {
  // CLEAN PREVIEW SNIPPET FOR INBOX PREVIEW
  const previewText = `New post: ${title} (${readingMinutes} min read)`;
  const articleUrl = `${siteUrl}/articles/${slug}`;
  const fullCoverUrl =
    coverImage?.startsWith("http") || coverImage?.startsWith("cid:")
      ? coverImage
      : coverImage
        ? `${siteUrl}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`
        : undefined;
  const unsubs = unsubscribeUrl || `${siteUrl}/api/newsletter/unsubscribe`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* HEADER BRANDING */}
          <Section style={headerSection}>
            <Text style={brandBadge}>SPACE &middot; {topic.toUpperCase()}</Text>
          </Section>

          {/* MAIN ARTICLE CARD */}
          <Section style={contentCard}>
            {fullCoverUrl ? (
              <Section style={imageContainer}>
                <Img src={fullCoverUrl} alt={title} width="508" style={coverImg} />
              </Section>
            ) : null}

            <Text style={metaText}>
              {topic} &middot; {readingMinutes} min read
            </Text>

            <Heading style={heading}>{title}</Heading>

            <Text style={paragraph}>{dek}</Text>

            {/* CTA BUTTON */}
            <Section style={buttonContainer}>
              <Button style={primaryButton} href={articleUrl}>
                Read Article on Space &rarr;
              </Button>
            </Section>
          </Section>

          {/* FOOTER */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              You received this email because you subscribed to Space newsletter updates.
            </Text>
            <Text style={footerLinks}>
              <Link href={articleUrl} style={link}>
                View in Browser
              </Link>
              {" · "}
              <Link href={`${siteUrl}/articles`} style={link}>
                All Articles
              </Link>
              {" · "}
              <Link href={unsubs} style={unsubscribeLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ArticleNotificationEmail;

// INLINE STYLES FOR CONSISTENT CROSS-CLIENT EMAIL RENDERING
const main = {
  backgroundColor: "#f8fafc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: "0 auto",
  padding: "40px 20px",
};

const container = {
  maxWidth: "580px",
  margin: "0 auto",
};

const headerSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const brandBadge = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "0.18em",
  color: "#007AFF",
  textTransform: "uppercase" as const,
  backgroundColor: "#eff6ff",
  border: "1px solid #dbeafe",
  borderRadius: "9999px",
  padding: "6px 18px",
  margin: "0",
};

const contentCard = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  padding: "36px",
  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
};

const imageContainer = {
  marginBottom: "24px",
  borderRadius: "14px",
  overflow: "hidden" as const,
  border: "1px solid #e2e8f0",
};

const coverImg = {
  width: "100%",
  maxHeight: "260px",
  objectFit: "cover" as const,
  display: "block",
};

const metaText = {
  fontSize: "12.5px",
  fontWeight: "600",
  letterSpacing: "0.08em",
  color: "#007AFF",
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0f172a",
  letterSpacing: "-0.02em",
  lineHeight: "1.3",
  margin: "0 0 14px",
};

const paragraph = {
  fontSize: "15px",
  color: "#475569",
  lineHeight: "1.65",
  margin: "0 0 24px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "12px 0 0",
};

const primaryButton = {
  backgroundColor: "#007AFF",
  borderRadius: "9999px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "13px 32px",
  boxShadow: "0 4px 14px rgba(0, 122, 255, 0.28)",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const divider = {
  borderTop: "1px solid #e2e8f0",
  borderBottom: "none",
  margin: "0 0 20px",
};

const footerText = {
  fontSize: "13px",
  color: "#94a3b8",
  margin: "0 0 8px",
};

const footerLinks = {
  fontSize: "13px",
  color: "#94a3b8",
  margin: "0",
};

const link = {
  color: "#007AFF",
  textDecoration: "none",
  fontWeight: "500",
};

const unsubscribeLink = {
  color: "#94a3b8",
  textDecoration: "underline",
  fontWeight: "400",
};
