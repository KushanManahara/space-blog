import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full resize-y rounded-md border border-line-1 bg-bg-1 px-5 py-4 text-[16px] leading-relaxed text-fg-1 transition-[border-color,box-shadow] duration-[350ms] ease-expo outline-none placeholder:text-fg-3 focus-visible:border-cornflower-400 focus-visible:ring-4 focus-visible:ring-tint-cornflower focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:text-[15px]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
