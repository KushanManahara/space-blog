import { HONEYPOT_FIELD } from "@/lib/honeypot";

/**
 * A field only a bot fills in.
 *
 * `isHoneypotTripped` has always checked for this on the newsletter and contact
 * submissions, but neither form rendered it — so the check could never fire and
 * both paths were left relying on the rate limiter alone. Uncontrolled on
 * purpose: these forms post through server actions, so the value reaches
 * `FormData` without any client state.
 *
 * Positioned off-screen rather than `display: none`, which some bots skip, and
 * hidden from assistive technology and the tab order so it costs a real reader
 * nothing.
 */
export function HoneypotField({ id }: { id: string }) {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Company website</label>
      <input
        id={id}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
