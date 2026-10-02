// src/emails/confirm-subscription.tsx

import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface ConfirmSubscriptionEmailProps {
  subscriberEmail: string;
  confirmUrl: string;
}

/**
 * Plain-text part of the double opt-in email.
 *
 * Deliberately no unsubscribe link: the address is not on the list yet, and
 * ignoring this email is how you stay off it.
 */
export function getConfirmSubscriptionText({
  subscriberEmail,
  confirmUrl,
}: ConfirmSubscriptionEmailProps): string {
  return `SPACE PUBLICATION

Confirm your subscription

Someone — hopefully you — asked to subscribe ${subscriberEmail} to Space.

Confirm here (the link works for 7 days):
${confirmUrl}

If this was not you, ignore this email. The address will not be added and you
will not hear from Space again.
`;
}

export function ConfirmSubscriptionEmail({
  subscriberEmail,
  confirmUrl,
}: ConfirmSubscriptionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your Space subscription</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Text style={brandBadge}>SPACE</Text>
          </Section>

          <Section style={contentCard}>
            <Heading style={heading}>Confirm your subscription</Heading>
            <Text style={paragraph}>
              Someone — hopefully you — asked to subscribe{" "}
              <span style={emailHighlight}>{subscriberEmail}</span> to Space. Confirm below and you
              will get one email whenever a new post goes out.
            </Text>

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={confirmUrl}>
                Confirm subscription
              </Button>
            </Section>

            <Text style={footnote}>
              The link works for 7 days. If this was not you, ignore this email — the address will
              not be added.
            </Text>
          </Section>

          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>Space Publication &middot; Written by Kushan Manahara</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ConfirmSubscriptionEmail;

// Same palette and rhythm as the welcome email.
const main = {
  backgroundColor: "#f8fafc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: "0 auto",
  padding: "40px 20px",
};

const container = { maxWidth: "580px", margin: "0 auto" };

const headerSection = { textAlign: "center" as const, marginBottom: "24px" };

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

const paragraph = { fontSize: "15.5px", color: "#475569", lineHeight: "1.65", margin: "0 0 16px" };

const buttonContainer = { textAlign: "center" as const, margin: "28px 0 20px" };

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
  lineHeight: "1.6",
};

const emailHighlight = { color: "#0f172a", fontWeight: "600" };

const footer = { textAlign: "center" as const, marginTop: "32px" };

const divider = { borderTop: "1px solid #e2e8f0", borderBottom: "none", margin: "0 0 20px" };

const footerText = { fontSize: "13px", color: "#94a3b8", margin: "0 0 8px" };
