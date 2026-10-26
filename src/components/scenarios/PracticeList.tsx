"use client";

import Link from "next/link";
import type { Scenario } from "@/content/scenarios";
import { ScenarioIcon } from "@/components/scenarios/ScenarioIcon";
import { LEVEL_THEME } from "@/lib/levelTheme";
import { useProgress } from "@/lib/useProgress";
import { ArrowRight, Check, Clock } from "lucide-react";

export function PracticeList({
  ready,
  planned,
}: {
  ready: Scenario[];
  planned: Scenario[];
}) {
  const { progress } = useProgress();

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {ready.map((s) => {
          const theme = LEVEL_THEME[s.level];
          const result = progress[s.slug];

          return (
            <Link
              key={s.slug}
              href={`/practice/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-canvas-raised card-shadow transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                  >
                    <ScenarioIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${theme.bgTint} ${theme.text} ${theme.ring}`}
                  >
                    {theme.label}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-lg font-semibold text-ink-900">
                  {s.title}
                </h2>
                <p className={`text-sm font-medium ${theme.text}`}>{s.dutchTitle}</p>
                <p className="mt-2 flex-1 text-sm text-body-muted">{s.description}</p>

                <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-body-subtle">
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {s.minutes} min
                    </span>
                    {result && (
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        {result.correct}/{result.total}
                      </span>
                    )}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${theme.text} transition-all group-hover:gap-1.5`}
                  >
                    {result ? "Try again" : "Start"}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {planned.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            Situations I am considering next
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-body-muted">
            These are not built yet. Which ones get made depends on what people say they
            actually need — that is what the interviews are for. If one of these would be
            useful to you, say so.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((s) => {
              const theme = LEVEL_THEME[s.level];
              return (
                <li
                  key={s.slug}
                  className="flex items-center gap-3 rounded-md border border-dashed border-ink-200 bg-canvas-raised px-4 py-3"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                  >
                    <ScenarioIcon name={s.icon} className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink-900">{s.title}</span>
                    <span className="block text-xs text-body-subtle">{s.dutchTitle}</span>
                  </span>
                  <span className="text-xs font-semibold text-body-subtle">{theme.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
