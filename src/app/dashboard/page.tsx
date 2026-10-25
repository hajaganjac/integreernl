import Link from "next/link";
import { auth } from "@/lib/auth";
import { getOverallProgress } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { ScenarioIcon } from "@/components/scenarios/ScenarioIcon";
import { LEVEL_THEME } from "@/lib/levelTheme";
import { ArrowRight, Check, MessageSquare } from "lucide-react";

export const metadata = { title: "Your progress" };

export default async function DashboardPage() {
  const session = await auth();
  const data = await getOverallProgress(session!.user.id);

  const pct = data.publishedTotal
    ? Math.round((data.completed / data.publishedTotal) * 100)
    : 0;
  const next = data.published.find((s) => !s.progress?.completed);

  return (
    <Container className="py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900">
            Hello, {session!.user.name?.split(" ")[0]}
          </h1>
          <p className="mt-1.5 text-body-muted">
            {data.completed === 0
              ? "You have not tried a situation yet."
              : `You have been through ${data.completed} of ${data.publishedTotal} situations.`}
          </p>
        </div>
        {next && (
          <Button href={`/practice/${next.slug}`}>
            {data.completed === 0 ? "Start" : "Continue"}: {next.title}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      {/* Overall */}
      <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-semibold text-ink-900">Situations practised</h2>
          <span className="font-display text-2xl font-bold text-ink-900">
            {data.completed} / {data.publishedTotal}
          </span>
        </div>
        <ProgressBar value={pct} className="mt-4" />
        <p className="mt-3 text-sm text-body-muted">
          {data.plannedTotal} more {data.plannedTotal === 1 ? "situation is" : "situations are"}{" "}
          on the list but not built yet — which ones get made depends on what the research says
          people need.
        </p>
      </div>

      {/* Per situation */}
      <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
        <h2 className="font-display font-semibold text-ink-900">Your situations</h2>
        <ul className="mt-5 space-y-2">
          {data.published.map((s) => {
            const theme = LEVEL_THEME[s.level];
            const done = s.progress?.completed;
            return (
              <li key={s.id}>
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
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {s.progress!.bestCorrect}/{s.progress!.totalChoices}
                    </span>
                  ) : (
                    <span className="text-xs text-body-subtle">Not tried</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Assistant pointer */}
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
    </Container>
  );
}
