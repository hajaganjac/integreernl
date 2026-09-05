import { cn } from "@/lib/utils";

export function Logo({
  withTagline = false,
  size = 34,
  className,
}: {
  withTagline?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <path
          d="M50 74C50 74 47 92 51 104C53 110 49 113 46 116"
          stroke="#1c5254"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M50 98C64 94 80 102 85 116C70 120 55 113 49 101Z" fill="#1c5254" />
        <path
          d="M50 70C40 70 15 64 12 40C10 24 20 10 36 8C44 7 49 14 50 24Z"
          fill="#ea580c"
        />
        <path
          d="M50 70C60 70 85 64 88 40C90 24 80 10 64 8C56 7 51 14 50 24Z"
          fill="#ea580c"
        />
        <path
          d="M50 74C38 74 30 58 30 40C30 20 39 6 50 6C61 6 70 20 70 40C70 58 62 74 50 74Z"
          fill="#f97316"
        />
      </svg>
      <div className="flex flex-col leading-none">
        {/* accent-700, not the brighter accent-500: at this size the lighter
            orange only reaches 3.0:1 on the warm canvas, failing WCAG AA. */}
        <span className="font-display text-lg font-extrabold tracking-tight text-ink-900">
          Integreer<span className="text-accent-700">NL</span>
        </span>
        {withTagline && (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-body-subtle">
            Learn Dutch. For free.
          </span>
        )}
      </div>
    </div>
  );
}
