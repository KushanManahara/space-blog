// src/emails/contact-notification.tsx

import * as React from "react";
import {
  Body,
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

export interface ContactNotificationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Plain-text fallback. Improves deliverability and keeps the mail readable anywhere. */
export function getContactNotificationText({
  name,
  email,
  subject,
  message,
}: ContactNotificationProps): string {
  return `NEW CONTACT MESSAGE - SPACE

From:    ${name} <${email}>
Subject: ${subject}

${message}

--
Reply directly to this email to respond to ${name}.`;
}

/**
 * Sent to the site owner when someone submits the contact form.
 * The sender's address goes in replyTo, so replying reaches them directly.
 */
export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`${name}: ${subject}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>SPACE — CONTACT FORM</Text>
          <Heading style={heading}>{subject}</Heading>

          <Section style={meta}>
            <Text style={metaRow}>
              <strong>From:</strong> {name}
            </Text>
            <Text style={metaRow}>
              <strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link>
            </Text>
          </Section>

          <Hr style={rule} />

          <Text style={messageText}>{message}</Text>

          <Hr style={rule} />

          <Text style={footer}>Reply to this email to respond to {name} directly.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f7f9",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "32px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e6e8ec",
  borderRadius: "12px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "32px",
};

const eyebrow = {
  color: "#6b7280",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  margin: "0 0 8px",
};

const heading = {
  color: "#111827",
  fontSize: "22px",
  fontWeight: 700,
  lineHeight: "1.3",
  margin: "0 0 20px",
};

const meta = { margin: "0 0 8px" };

const metaRow = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 4px",
};

const rule = { borderColor: "#e6e8ec", margin: "20px 0" };

const messageText = {
  color: "#111827",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0",
};
