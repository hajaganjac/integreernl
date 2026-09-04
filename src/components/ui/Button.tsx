import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-soft",
  secondary:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-soft",
  ghost:
    "bg-transparent text-ink-700 hover:bg-brand-50",
  outline:
    "bg-white text-ink-900 border border-slate-200 hover:border-brand-300 hover:bg-brand-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3.5 py-1.5 rounded-lg",
  md: "text-sm px-5 py-2.5 rounded-xl",
  lg: "text-base px-7 py-3.5 rounded-xl",
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
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
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
