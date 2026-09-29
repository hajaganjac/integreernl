import Link from "next/link";
import { auth } from "@/lib/auth";
import { getOverallProgress } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { MODULE_THEME } from "@/lib/moduleTheme";
import { ArrowRight } from "lucide-react";
import type { ExamPart } from "@prisma/client";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;
  const data = await getOverallProgress(userId);

  const nextModule = data.modules.find((m) => m.percent < 100);
  // No lessons exist yet, so progress numbers would all read 0 / 0.
  const hasContent = data.totalLessons > 0;

  return (
    <Container className="py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900">
            Hello, {session!.user.name?.split(" ")[0]}
          </h1>
          <p className="mt-1.5 text-body-muted">
            {hasContent
              ? "Here is how far you have come."
              : "This is where your progress will appear."}
          </p>
        </div>
        {hasContent && nextModule && (
          <Button href={`/courses/${nextModule.slug}`}>
            Continue {nextModule.title}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      {hasContent ? (
        <>
          {/* Three plain numbers */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StatCard
              value={`${data.completedLessons} / ${data.totalLessons}`}
              label="Lessons completed"
            />
            <StatCard
              value={`${data.passedQuizzes} / ${data.totalQuizzes}`}
              label="Quizzes passed"
            />
            <StatCard value={`${data.overallPercent}%`} label="Overall progress" />
          </div>

          {/* Per-module progress */}
          <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
            <h2 className="font-display font-semibold text-ink-900">Progress by module</h2>
            <div className="mt-6 space-y-5">
              {data.modules.map((m) => {
                const theme = MODULE_THEME[m.examPart];
                return (
                  <Link
                    key={m.id}
                    href={`/courses/${m.slug}`}
                    className="flex items-center gap-4 rounded-md p-2 -m-2 hover:bg-canvas-sunken"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                    >
                      <ModuleIcon name={m.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-ink-900">{m.title}</span>
                        <span className="text-body-subtle">{m.percent}%</span>
                      </div>
                      <ProgressBar
                        value={m.percent}
                        className="mt-2"
                        barClassName={theme.progressBar}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent quiz attempts */}
          <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
            <h2 className="font-display font-semibold text-ink-900">Recent quiz attempts</h2>
            {data.recentAttempts.length === 0 ? (
              <p className="mt-4 text-sm text-body-muted">
                You have not taken a quiz yet. Finish a few lessons, then try the module quiz.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-ink-100">
                {data.recentAttempts.map((a) => (
                  <li key={a.id} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-ink-900">{a.quiz.module.title}</span>
                    <span className="text-body-muted">
                      {a.score}/{a.total} ·{" "}
                      {new Date(a.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <EmptyDashboard modules={data.modules} />
      )}
    </Container>
  );
}

/** Shown while the course has no lessons yet: explains what will appear here. */
function EmptyDashboard({
  modules,
}: {
  modules: { id: string; slug: string; title: string; examPart: ExamPart; icon: string }[];
}) {
  return (
    <>
      <div className="mt-8 rounded-lg border-2 border-dashed border-ink-200 bg-canvas-raised p-8 text-center">
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Your progress will show up here
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-body-muted">
          Once the lessons are written, this page will show how many you have
          finished, which quizzes you have passed, and a bar for each of the five
          exam parts. Nothing to track yet.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/courses" variant="outline">
            See the course plan
          </Button>
          <Button href="/assistant">
            Ask the study assistant
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6">
        <h2 className="font-display font-semibold text-ink-900">The five modules</h2>
        <p className="mt-1 text-sm text-body-muted">
          The structure of the course is set. The content comes next.
        </p>
        <div className="mt-5 space-y-2">
          {modules.map((m) => {
            const theme = MODULE_THEME[m.examPart];
            return (
              <Link
                key={m.id}
                href={`/courses/${m.slug}`}
                className="flex items-center gap-4 rounded-md p-2 -m-2 hover:bg-canvas-sunken"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                >
                  <ModuleIcon name={m.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1 text-sm font-medium text-ink-900">{m.title}</span>
                <span className="text-xs text-body-subtle">Planned</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-ink-100 bg-canvas-raised p-6">
      <p className="font-display text-3xl font-bold text-ink-900">{value}</p>
      <p className="mt-1 text-sm text-body-muted">{label}</p>
    </div>
  );
}
