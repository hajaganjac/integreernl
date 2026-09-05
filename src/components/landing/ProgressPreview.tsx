"use client";

import { ScrollProgressReveal } from "@/components/motion";
import { Flame } from "lucide-react";

const MODULES = [
  { label: "Reading", pct: 100, color: "var(--color-brand-600)" },
  { label: "Writing", pct: 60, color: "var(--color-accent-500)" },
  { label: "Listening", pct: 80, color: "var(--color-brand-500)" },
];

/**
 * A live miniature of the real dashboard, drawn in on scroll. The product's
 * core promise is "see your progress toward B1" — so the marketing page
 * demonstrates that feeling rather than only describing it.
 */
export function ProgressPreview() {
  const size = 132;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = 67;

  return (
    <ScrollProgressReveal duration={1.5}>
      {(p) => {
        const pct = Math.round(target * p);
        return (
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
            {/* Ring */}
            <div className="relative shrink-0" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="var(--color-ink-100)"
                  strokeWidth={stroke}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="var(--color-brand-600)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (pct / 100) * circumference}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-bold text-ink-900">{pct}%</span>
                <span className="text-2xs text-body-subtle">complete</span>
              </div>
            </div>

            {/* Bars + streak */}
            <div className="w-full max-w-xs">
              <div className="space-y-3">
                {MODULES.map((m) => (
                  <div key={m.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-ink-800">{m.label}</span>
                      <span className="text-body-subtle">{Math.round(m.pct * p)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${m.pct * p}%`,
                          background: m.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-50 px-3.5 py-1.5 ring-1 ring-inset ring-accent-200">
                <Flame
                  className="h-4 w-4 text-accent-600"
                  style={{ transform: `scale(${0.7 + 0.3 * p})` }}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-accent-800">
                  {Math.round(7 * p)}-day streak
                </span>
              </div>
            </div>
          </div>
        );
      }}
    </ScrollProgressReveal>
  );
}
