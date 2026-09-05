import { cn } from "@/lib/utils";

export function Badge({
  children,
  color = "brand",
  className,
}: {
  children: React.ReactNode;
  color?: "brand" | "accent" | "slate";
  className?: string;
}) {
  const colorClasses = {
    brand: "bg-brand-50 text-brand-700 ring-brand-200",
    // accent-800 not accent-600: on the pale orange tint the lighter
    // shade only reaches 3.8:1, short of AA for this text size.
    accent: "bg-accent-50 text-accent-800 ring-accent-200",
    slate: "bg-ink-100 text-body-muted ring-ink-200",
  }[color];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        colorClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
