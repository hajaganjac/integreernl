import Link from "next/link";
import { notFound } from "next/navigation";
import { SCENARIOS, getScenario } from "@/content/scenarios";
import { Container } from "@/components/ui/Container";
import { ScenarioIcon } from "@/components/scenarios/ScenarioIcon";
import { ScenarioPlayer } from "@/components/scenarios/ScenarioPlayer";
import { LEVEL_THEME } from "@/lib/levelTheme";
import { Clock } from "lucide-react";

/** Every situation is known at build time, so each page is prerendered. */
export function generateStaticParams() {
  return SCENARIOS.filter((s) => s.published).map((s) => ({ slug: s.slug }));
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = getScenario(slug);
  if (!scenario || !scenario.published || !scenario.steps?.length) notFound();

  const theme = LEVEL_THEME[scenario.level];

  // Strip isCorrect and feedback before this reaches the browser — the API
  // route grades each reply instead.
  const safeSteps = scenario.steps.map((s) => ({
    id: s.id,
    speaker: s.speaker,
    dutch: s.dutch,
    english: s.english,
    hint: s.hint ?? "",
    choices: (s.choices ?? []).map((c) => ({ id: c.id, dutch: c.dutch, english: c.english })),
  }));

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/practice" className={`text-sm font-medium ${theme.text} hover:opacity-80`}>
          &larr; All situations
        </Link>

        <div className="mt-4 flex items-start gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
          >
            <ScenarioIcon name={scenario.icon} className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold text-ink-900">{scenario.title}</h1>
            <p className={`font-medium ${theme.text}`}>{scenario.dutchTitle}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-body-subtle">
          <span
            className={`rounded-full px-2.5 py-1 font-semibold ring-1 ring-inset ${theme.bgTint} ${theme.text} ${theme.ring}`}
          >
            {theme.label} · {theme.blurb}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> about {scenario.minutes} minutes
          </span>
        </div>

        {scenario.setting && (
          <p className="mt-6 rounded-md border-l-2 border-ink-200 bg-canvas-raised py-3 pl-4 pr-3 text-sm italic text-body-muted">
            {scenario.setting}
          </p>
        )}

        <div className="mt-8">
          <ScenarioPlayer
            scenarioSlug={scenario.slug}
            steps={safeSteps}
            theme={{ text: theme.text, bgTint: theme.bgTint, bar: theme.bar }}
          />
        </div>
      </div>
    </Container>
  );
}
