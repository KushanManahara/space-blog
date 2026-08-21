/**
 * Shared shape for server-action form results. It lives outside the
 * `"use server"` module because those files may only export async functions.
 */
export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialFormState: FormState = { status: "idle", message: "" };
