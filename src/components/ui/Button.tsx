import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/* Orange is the single call-to-action colour across the product, so it
   keeps its meaning: one primary action per view. accent-700 (not the
   brighter accent-500) is used as the fill because it clears WCAG AA
   at 5.4:1 with white text — accent-500 only reaches 3.3:1. */
const variantClasses: Record<Variant, string> = {
  primary: "bg-accent-700 text-white hover:bg-accent-800 shadow-warm",
  secondary: "bg-ink-900 text-white hover:bg-ink-800 shadow-md",
  ghost: "bg-transparent text-ink-800 hover:bg-ink-50",
  outline:
    "bg-canvas-raised text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2 rounded-sm",
  md: "text-sm px-5 py-2.5 rounded-md",
  lg: "text-base px-7 py-3.5 rounded-md",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-display font-semibold",
    // Transform-only micro-interaction: GPU-accelerated, and the global
    // prefers-reduced-motion rule in globals.css neutralises it.
    "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:scale-[1.03] active:scale-[0.97]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
