import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { getModulesWithProgress } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MODULE_THEME, MODULE_IMAGE } from "@/lib/moduleTheme";

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
        {modules.map((m) => {
          const theme = MODULE_THEME[m.examPart];
          const image = MODULE_IMAGE[m.examPart];

          return (
            <Link
              key={m.id}
              href={`/courses/${m.slug}`}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white card-shadow transition-all hover:-translate-y-0.5 ${theme.borderHover}`}
            >
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-70`} />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                  <ModuleIcon name={m.icon} className="h-5 w-5" />
                </span>
                {m.percent === 100 ? (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Complete
                  </span>
                ) : (
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-900">
                    {m.percent}%
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-semibold text-ink-900">{m.title}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-500">{m.description}</p>

                <div className="mt-5">
                  <ProgressBar value={m.percent} barClassName={theme.progressBar} />
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {m.lessonsCompleted}/{m.lessonsTotal} lessons
                    </span>
                    <span className={`inline-flex items-center gap-1 font-medium ${theme.text} group-hover:gap-1.5 transition-all`}>
                      Continue <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
