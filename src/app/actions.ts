"use server";

import { z } from "zod";

import type { FormState } from "@/lib/form-state";

const subscribeSchema = z.object({
  email: z.email("Enter an email address we can actually reach."),
});

const contactSchema = z.object({
  name: z.string().min(1, "Tell me who you are."),
  email: z.email("Enter an email address we can actually reach."),
  subject: z.string().min(1),
  message: z.string().min(10, "A little more detail helps: ten characters at least."),
});

/**
 * Newsletter opt-in. Validation happens on the server so the same rules apply
 * however the form is submitted; the mailing-list provider is not wired up yet,
 * so a valid address is accepted and acknowledged.
 */
export async function subscribeAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = subscribeSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  return {
    status: "success",
    message: `You're on the list. Confirmation sent to ${parsed.data.email}.`,
  };
}

/** Contact form. Same story: validated here, delivery is not yet connected. */
export async function contactAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  return {
    status: "success",
    message: "Message received. Corrections and reproductions get answered first.",
  };
}
