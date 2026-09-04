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
    accent: "bg-orange-50 text-accent-600 ring-orange-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
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
