import Link from "next/link";
import { auth } from "@/lib/auth";
import { getModulesWithProgress } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default async function CoursesPage() {
  const session = await auth();
  const modules = await getModulesWithProgress(session?.user?.id);

  return (
    <Container className="py-12">
      <div className="max-w-2xl">
        <Badge>Course</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-ink-900">Your B1 study plan</h1>
        <p className="mt-3 text-slate-600">
          Five modules, mapped to the official inburgeringsexamen parts. Work through
          lessons at your own pace, then check your understanding with a short quiz.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {modules.map((m) => (
          <Link
            key={m.id}
            href={`/courses/${m.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 card-shadow transition-colors hover:border-brand-300"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <ModuleIcon name={m.icon} className="h-5 w-5" />
              </span>
              {m.percent === 100 ? (
                <Badge color="brand">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Complete
                </Badge>
              ) : (
                <span className="text-sm font-medium text-slate-400">{m.percent}%</span>
              )}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-ink-900">{m.title}</h2>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-500">{m.description}</p>

            <div className="mt-5">
              <ProgressBar value={m.percent} />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {m.lessonsCompleted}/{m.lessonsTotal} lessons
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-brand-600 group-hover:gap-1.5 transition-all">
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
