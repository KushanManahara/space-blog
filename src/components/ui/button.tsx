import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,opacity] duration-[350ms] ease-bounce select-none active:scale-[0.96] active:duration-150 active:ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-on-brand shadow-glow-sm hover:-translate-y-0.5 hover:shadow-glow-md",
        dark: "bg-ink text-on-ink hover:-translate-y-0.5 hover:shadow-lg",
        secondary: "border border-line-2 bg-bg-2 text-fg-1 hover:-translate-y-0.5 hover:shadow-md",
        subtle: "border border-line-1 bg-bg-2 text-fg-1 hover:-translate-y-0.5 hover:shadow-sm",
      },
      size: {
        sm: "px-[18px] py-[9px] text-[13.5px]",
        md: "px-[22px] py-[11px] text-[14px]",
        lg: "px-[26px] py-[14px] text-[15px]",
        icon: "size-[38px] p-0",
        "icon-lg": "size-[42px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
