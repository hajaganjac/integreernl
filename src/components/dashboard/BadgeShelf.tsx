import { Footprints, Star, Crown, Layers, Flame, GraduationCap, Lock } from "lucide-react";
import type { BadgeDef } from "@/lib/badges";
import { cn } from "@/lib/utils";

const ICONS = { Footprints, Star, Crown, Layers, Flame, GraduationCap };

export function BadgeShelf({ badges, earned }: { badges: BadgeDef[]; earned: Set<string> }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {badges.map((badge) => {
        const Icon = ICONS[badge.icon];
        const isEarned = earned.has(badge.id);
        return (
          <div
            key={badge.id}
            title={`${badge.label} — ${badge.description}`}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors",
              isEarned ? "border-accent-400/40 bg-orange-50" : "border-ink-100 bg-canvas-sunken/50"
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full",
                isEarned ? "bg-accent-500 text-white" : "bg-ink-200 text-body-subtle"
              )}
            >
              {isEarned ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
            </span>
            <span className={cn("text-[11px] font-medium leading-tight", isEarned ? "text-ink-900" : "text-body-subtle")}>
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
