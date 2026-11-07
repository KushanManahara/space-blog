/**
 * Shared shape for server-action form results. It lives outside the
 * `"use server"` module because those files may only export async functions.
 */
export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  /**
   * What the visitor typed, sent back on failure. React resets a form after
   * its action finishes, even when the action failed, so without this a
   * validation error or a rate limit wiped the whole message. Inputs use these
   * as `defaultValue`, which is what the reset restores to.
   */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle", message: "" };
