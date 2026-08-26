import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-full border border-line-1 bg-bg-1 px-5 py-3.5 text-[16px] text-fg-1 transition-[border-color,box-shadow] duration-[350ms] ease-expo outline-none placeholder:text-fg-3 focus-visible:border-cornflower-400 focus-visible:ring-4 focus-visible:ring-tint-cornflower focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:text-[15px]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
