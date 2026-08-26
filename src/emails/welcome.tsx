// src/emails/welcome.tsx

import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface WelcomeEmailProps {
  subscriberEmail?: string;
  siteUrl?: string;
  unsubscribeUrl?: string;
}

/**
 * GENERATES HIGH-DELIVERABILITY PLAIN TEXT FALLBACK
 */
export function getWelcomeEmailText({
  subscriberEmail = "reader@example.com",
  siteUrl = "https://gimhara.com",
  unsubscribeUrl,
}: WelcomeEmailProps): string {
  const unsubs =
    unsubscribeUrl ||
    `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;

  return `SPACE PUBLICATION

Welcome to Space. You are now subscribed to new article releases.

You will receive an email whenever a new deep-dive article or research post is published.

What you can expect:
- Deep Engineering: Systems design, AI architectures, and compiler internals.
- Zero Noise: One email per post. No automated drip sequences, no sponsor spam.
- Open Knowledge: Verified benchmarks, reproducible architectures, and complete code samples.

Browse latest articles: ${siteUrl}/articles

Subscribed as: ${subscriberEmail}

----------------------------------------
Space Publication · Written by Kushan Manahara
About Author: ${siteUrl}/about
Archive: ${siteUrl}/articles
Contact: ${siteUrl}/contact

Unsubscribe: ${unsubs}
`;
}

export function WelcomeEmail({
  subscriberEmail = "reader@example.com",
  siteUrl = "https://gimhara.com",
  unsubscribeUrl,
}: WelcomeEmailProps) {
  // CLEAN PREVIEW TEXT FOR EMAIL CLIENTS
  const previewText = "Welcome to Space. You are now subscribed to new article releases.";
  const unsubs =
    unsubscribeUrl ||
    `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* HEADER BRANDING */}
          <Section style={headerSection}>
            <Text style={brandBadge}>SPACE</Text>
          </Section>

          {/* MAIN CARD CONTENT */}
          <Section style={contentCard}>
            <Heading style={heading}>Welcome to Space</Heading>
            <Text style={paragraph}>
              You are now subscribed to the Space engineering publication. You will receive an email
              whenever a new deep-dive article or research post is published.
            </Text>

            <Text style={paragraph}>Here is what you can expect:</Text>

            {/* BENEFIT HIGHLIGHTS */}
            <Section style={benefitsList}>
              <Text style={bulletPoint}>
                <strong style={strongText}>Deep Engineering:</strong> Systems design, AI
                architectures, and compiler internals.
              </Text>
              <Text style={bulletPoint}>
                <strong style={strongText}>Zero Noise:</strong> One email per post. No automated
                drip sequences, no sponsor spam.
              </Text>
              <Text style={bulletPoint}>
                <strong style={strongText}>Open Knowledge:</strong> Verified benchmarks,
                reproducible architectures, and complete code samples.
              </Text>
            </Section>

            {/* CTA BUTTON */}
            <Section style={buttonContainer}>
              <Button style={primaryButton} href={`${siteUrl}/articles`}>
                Read Latest Articles &rarr;
              </Button>
            </Section>

            <Text style={footnote}>
              Subscribed as <span style={emailHighlight}>{subscriberEmail}</span>
            </Text>
          </Section>

          {/* FOOTER */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>Space Publication &middot; Written by Kushan Manahara</Text>
            <Text style={footerLinks}>
              <Link href={`${siteUrl}/about`} style={link}>
                About Author
              </Link>
              {" · "}
              <Link href={`${siteUrl}/articles`} style={link}>
                Archive
              </Link>
              {" · "}
              <Link href={`${siteUrl}/contact`} style={link}>
                Contact
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

export default WelcomeEmail;

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
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "0.2em",
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
  padding: "40px 36px",
  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
};

const heading = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#0f172a",
  letterSpacing: "-0.02em",
  lineHeight: "1.25",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "15.5px",
  color: "#475569",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const benefitsList = {
  margin: "20px 0",
  padding: "16px 20px",
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
};

const bulletPoint = {
  fontSize: "14.5px",
  color: "#334155",
  lineHeight: "1.6",
  margin: "6px 0",
};

const strongText = {
  color: "#0f172a",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "28px 0 20px",
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

const footnote = {
  fontSize: "13px",
  color: "#94a3b8",
  textAlign: "center" as const,
  margin: "24px 0 0",
};

const emailHighlight = {
  color: "#64748b",
  fontWeight: "500",
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
