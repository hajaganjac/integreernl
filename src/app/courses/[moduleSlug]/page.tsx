import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getModuleBySlug } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { CheckCircle2, Clock, ArrowRight, ClipboardCheck } from "lucide-react";
import { EXAM_PART_META } from "@/lib/utils";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const session = await auth();
  const result = await getModuleBySlug(moduleSlug, session?.user?.id);
  if (!result) notFound();

  const { module, completedLessonIds } = result;

  const bestAttempt = session?.user?.id
    ? await prisma.quizAttempt.findFirst({
        where: { userId: session.user.id, quiz: { moduleId: module.id } },
        orderBy: { score: "desc" },
      })
    : null;

  const meta = EXAM_PART_META[module.examPart];

  return (
    <Container className="py-12">
      <Link href="/courses" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        &larr; All modules
      </Link>

      <div className="mt-4 flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <ModuleIcon name={module.icon} className="h-6 w-6" />
        </span>
        <div>
          <Badge>{meta.nl}</Badge>
          <h1 className="mt-2 text-3xl font-semibold text-ink-900">{module.title}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">{module.description}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4">
        {module.lessons.map((lesson, idx) => {
          const isDone = completedLessonIds.has(lesson.id);
          return (
            <Link
              key={lesson.id}
              href={`/courses/${module.slug}/${lesson.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 card-shadow transition-colors hover:border-brand-300"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-sm font-medium text-slate-400">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-brand-500" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </span>
              <div className="flex-1">
                <h3 className="font-medium text-ink-900">{lesson.title}</h3>
                <p className="mt-0.5 text-sm text-slate-500">{lesson.summary}</p>
              </div>
              <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
                <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </Link>
          );
        })}

        {module.quizzes[0] && (
          <Link
            href={`/courses/${module.slug}/quiz`}
            className="group flex items-center gap-4 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 p-5 transition-colors hover:border-brand-400"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <ClipboardCheck className="h-[18px] w-[18px]" />
            </span>
            <div className="flex-1">
              <h3 className="font-medium text-ink-900">{module.quizzes[0].title}</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {module.quizzes[0].questions.length} questions &middot; instant feedback
              </p>
            </div>
            {bestAttempt && (
              <Badge color={bestAttempt.score / bestAttempt.total >= 0.7 ? "brand" : "slate"}>
                Best: {bestAttempt.score}/{bestAttempt.total}
              </Badge>
            )}
            <ArrowRight className="h-4 w-4 text-brand-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </Container>
  );
}
