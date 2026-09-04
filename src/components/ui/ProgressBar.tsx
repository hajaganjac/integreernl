import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  trackClassName,
  barClassName,
}: {
  value: number; // 0-100
  className?: string;
  trackClassName?: string;
  barClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full rounded-full bg-slate-100 h-2 overflow-hidden", trackClassName, className)}>
      <div
        className={cn("h-full rounded-full bg-brand-500 transition-all duration-500 ease-out", barClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
