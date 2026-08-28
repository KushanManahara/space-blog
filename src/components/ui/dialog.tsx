"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-n-900/35 backdrop-blur-[6px] data-[state=closed]:[animation:fade-out_.15s_ease-in] data-[state=open]:[animation:fade-in_.22s_var(--ease-expo)]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Glass dialog surface. `align="top"` matches the command palette, which sits
 * high on the viewport instead of dead centre.
 *
 * `Content` is the panel itself — sized and positioned directly, not wrapped
 * in a full-viewport flex box. Two things depend on that:
 *
 * 1. Click-outside-to-close. Radix's modal `DismissableLayer` disables
 *    pointer events on the rest of the page and then opts the overlay and
 *    the content back in individually (via an inline style even our own
 *    `pointer-events-none` class can't beat — inline styles win over
 *    classes). A full-viewport wrapper around Content would sit on top of
 *    the overlay everywhere, including the "empty" padding around the
 *    panel, so clicks there would hit Content — not the overlay — and
 *    never count as "outside". Sizing Content to just the panel means the
 *    overlay alone covers that padding and click-outside works correctly.
 * 2. Centering without fighting the enter/exit animation. Centering here
 *    uses the standalone `translate` CSS property (via --dialog-tx/-ty, not
 *    the `transform` shorthand), because the pop-in/pop-out keyframes in
 *    globals.css animate `translate` and `scale` as independent properties
 *    too — one full-page redeclaration of `transform` per animation frame
 *    would otherwise overwrite this static centering offset.
 */
function DialogContent({
  className,
  children,
  align = "center",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  align?: "center" | "top";
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "glass-panel fixed left-1/2 z-50 max-h-[90dvh] w-[calc(100%-24px)] [translate:var(--dialog-tx)_var(--dialog-ty)] overflow-auto rounded-lg outline-none data-[state=closed]:[animation:pop-out_.15s_ease-in] data-[state=open]:[animation:pop-in_.26s_var(--ease-bounce)] sm:w-[calc(100%-40px)]",
          align === "top"
            ? "top-[clamp(56px,12vh,140px)] [--dialog-tx:-50%] [--dialog-ty:0%]"
            : "top-1/2 [--dialog-tx:-50%] [--dialog-ty:-50%]",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-[17px] font-bold text-fg-1", className)}
      {...props}
    />
  );
}

export { Dialog, DialogClose, DialogContent, DialogTitle };
