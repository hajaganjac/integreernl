import Link from "next/link";
import { auth } from "@/lib/auth";
import { getModulesWithProgress } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MODULE_THEME } from "@/lib/moduleTheme";

export default async function CoursesPage() {
  const session = await auth();
  const modules = await getModulesWithProgress(session?.user?.id);

  return (
    <Container className="py-12">
      <div className="max-w-2xl">
        <Badge>Course</Badge>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink-900">
          Your B1 study plan
        </h1>
        <p className="mt-3 text-body-muted">
          Five modules, one for each part of the official inburgeringsexamen. This is
          the structure of the course. The lessons and quizzes for each module are
          still being written.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {modules.map((m) => {
          const theme = MODULE_THEME[m.examPart];
          const hasContent = m.lessonsTotal > 0;

          return (
            <Link
              key={m.id}
              href={`/courses/${m.slug}`}
              className={`group flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-canvas-raised card-shadow transition-all hover:-translate-y-0.5 hover:shadow-md ${theme.borderHover}`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} aria-hidden="true" />

              <div className="flex items-start justify-between px-6 pt-6">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-md ${theme.bgTint} ${theme.text}`}
                >
                  <ModuleIcon name={m.icon} className="h-5 w-5" />
                </span>

                {!hasContent ? (
                  <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-semibold text-body-muted">
                    Planned
                  </span>
                ) : m.percent === 100 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Complete
                  </span>
                ) : (
                  <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-semibold text-ink-800">
                    {m.percent}%
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
                <h2 className="font-display text-lg font-semibold text-ink-900">{m.title}</h2>
                <p className="mt-1.5 flex-1 text-sm text-body-muted">{m.description}</p>

                <div className="mt-5">
                  {hasContent ? (
                    <>
                      <ProgressBar value={m.percent} barClassName={theme.progressBar} />
                      <div className="mt-2 flex items-center justify-between text-xs text-body-subtle">
                        <span>
                          {m.lessonsCompleted}/{m.lessonsTotal} lessons
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${theme.text} group-hover:gap-1.5 transition-all`}
                        >
                          Continue <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-body-subtle">
                      <span>Lessons coming soon</span>
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${theme.text} group-hover:gap-1.5 transition-all`}
                      >
                        View module <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
