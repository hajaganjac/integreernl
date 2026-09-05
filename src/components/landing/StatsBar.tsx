"use client";

import { CountUp, StaggerChildren, StaggerItem } from "@/components/motion";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  emphasis?: boolean;
}

const STATS: Stat[] = [
  { value: 0, prefix: "€", label: "to use — no course fee, no DUO loan", emphasis: true },
  { value: 5, label: "exam parts covered, from Reading to KNM" },
  { value: 3, suffix: " yr", label: "legal deadline — tracked for you" },
  { value: 24, suffix: "/7", label: "AI study buddy, whenever you have time" },
];

export function StatsBar() {
  return (
    <StaggerChildren className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
      {STATS.map((s) => (
        <StaggerItem key={s.label}>
          <div className="text-center lg:text-left">
            <p
              className={`font-display text-3xl font-bold sm:text-4xl ${
                s.emphasis ? "text-accent-600" : "text-ink-900"
              }`}
            >
              <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-body-muted">{s.label}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
