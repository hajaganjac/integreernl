"use client";

import Link from "next/link";
import type { Scenario } from "@/content/scenarios";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScenarioIcon } from "@/components/scenarios/ScenarioIcon";
import { LEVEL_THEME } from "@/lib/levelTheme";
import { useProgress } from "@/lib/useProgress";
import { ArrowRight, Check, MessageSquare } from "lucide-react";

export function DashboardView({
  published,
  plannedCount,
}: {
  published: Scenario[];
  plannedCount: number;
}) {
  const { progress, reset } = useProgress();

  const done = published.filter((s) => progress[s.slug]).length;
  const pct = published.length ? Math.round((done / published.length) * 100) : 0;
  const next = published.find((s) => !progress[s.slug]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900">Your progress</h1>
          <p className="mt-1.5 text-body-muted">
            {done === 0
              ? "You have not tried a situation yet."
              : `You have been through ${done} of ${published.length} situations.`}
          </p>
        </div>
        {next && (
          <Button href={`/practice/${next.slug}`}>
            {done === 0 ? "Start" : "Continue"}: {next.title}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-semibold text-ink-900">Situations practised</h2>
          <span className="font-display text-2xl font-bold text-ink-900">
            {done} / {published.length}
          </span>
        </div>
        <ProgressBar value={pct} className="mt-4" />
        <p className="mt-3 text-sm text-body-muted">
          {plannedCount} more {plannedCount === 1 ? "situation is" : "situations are"} on the
          list but not built yet — which ones get made depends on what the research says
          people need.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
        <h2 className="font-display font-semibold text-ink-900">Your situations</h2>
        <ul className="mt-5 space-y-2">
          {published.map((s) => {
            const theme = LEVEL_THEME[s.level];
            const result = progress[s.slug];
            return (
              <li key={s.slug}>
                <Link
                  href={`/practice/${s.slug}`}
                  className="flex items-center gap-4 rounded-md p-2 -m-2 hover:bg-canvas-sunken"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                  >
                    <ScenarioIcon name={s.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink-900">{s.title}</span>
                    <span className="block text-xs text-body-subtle">{s.dutchTitle}</span>
                  </span>
                  {result ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {result.correct}/{result.total}
                    </span>
                  ) : (
                    <span className="text-xs text-body-subtle">Not tried</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {done > 0 && (
          <button
            onClick={reset}
            className="mt-5 text-xs font-medium text-body-subtle underline underline-offset-2 hover:text-ink-900"
          >
            Clear my progress
          </button>
        )}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-ink-100 bg-canvas-raised p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-50 text-accent-700">
            <MessageSquare className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-ink-900">Stuck on something?</p>
            <p className="text-sm text-body-muted">
              Ask the assistant about a word or a phrase you ran into.
            </p>
          </div>
        </div>
        <Button href="/assistant" variant="outline">
          Open the assistant
        </Button>
      </div>

      <p className="mt-6 text-xs text-body-subtle">
        Progress is saved in this browser only, so it is not shared between devices and
        clearing your site data clears it.
      </p>
    </>
  );
}
