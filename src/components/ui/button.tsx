"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#3A3F8E] text-[#EDE8FF] shadow-lg shadow-[#3A3F8E]/25 hover:bg-[#62649A] hover:shadow-[#62649A]/40",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-500",
        outline:
          "border border-[#B9ACF0]/30 bg-[#0D0C18]/80 backdrop-blur-md hover:bg-[#131224] text-[#EDE8FF] hover:border-[#B9ACF0]/60",
        secondary:
          "bg-[#131224] text-[#EDE8FF] shadow-sm hover:bg-[#1F1B38] border border-[#B9ACF0]/20",
        ghost: "hover:bg-[#131224]/80 hover:text-white text-[#EDE8FF]/80",
        link: "text-[#B9ACF0] underline-offset-4 hover:underline",
        glow: "relative bg-gradient-to-r from-[#3A3F8E] via-[#62649A] to-[#B9ACF0] text-white shadow-[0_0_25px_rgba(58,63,142,0.5)] hover:shadow-[0_0_35px_rgba(185,172,240,0.6)] border border-[#B9ACF0]/40",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-13 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

