import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getModuleBySlug } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ModuleIcon } from "@/components/courses/ModuleIcon";
import { CheckCircle2, Clock, ArrowRight, ClipboardCheck, Sparkles } from "lucide-react";
import { EXAM_PART_META } from "@/lib/utils";
import { MODULE_THEME, MODULE_IMAGE } from "@/lib/moduleTheme";

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

  const [bestAttempt, vocabCount] = await Promise.all([
    session?.user?.id
      ? prisma.quizAttempt.findFirst({
          where: { userId: session.user.id, quiz: { moduleId: module.id } },
          orderBy: { score: "desc" },
        })
      : Promise.resolve(null),
    prisma.vocabularyItem.count({ where: { moduleId: module.id } }),
  ]);

  const meta = EXAM_PART_META[module.examPart];
  const theme = MODULE_THEME[module.examPart];
  const image = MODULE_IMAGE[module.examPart];

  return (
    <>
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <Container className="relative flex h-full flex-col justify-end pb-6">
          <Link href="/courses" className="mb-4 inline-flex w-fit items-center text-sm font-medium text-white/80 hover:text-white">
            &larr; All modules
          </Link>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
              <ModuleIcon name={module.icon} className="h-6 w-6" />
            </span>
            <div>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                {meta.nl}
              </span>
              <h1 className="mt-2 text-3xl font-semibold text-white drop-shadow-sm">{module.title}</h1>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <p className="max-w-2xl text-slate-600">{module.description}</p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {module.lessons.map((lesson, idx) => {
            const isDone = completedLessonIds.has(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/courses/${module.slug}/${lesson.slug}`}
                className={`group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 card-shadow transition-colors ${theme.borderHover}`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                    isDone ? theme.bgTint : "bg-slate-50 text-slate-400"
                  }`}
                >
                  {isDone ? <CheckCircle2 className={`h-5 w-5 ${theme.text}`} /> : <span>{idx + 1}</span>}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium text-ink-900">{lesson.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{lesson.summary}</p>
                </div>
                <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
                  <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min
                </div>
                <ArrowRight className={`h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 ${theme.groupHoverText}`} />
              </Link>
            );
          })}

          {vocabCount > 0 && (
            <Link
              href={`/courses/${module.slug}/vocabulary`}
              className={`group flex items-center gap-4 rounded-2xl border-2 border-dashed p-5 transition-colors ${theme.border} ${theme.bgTint} ${theme.borderHover}`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${theme.solid}`}>
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="flex-1">
                <h3 className="font-medium text-ink-900">Vocabulary flashcards</h3>
                <p className="mt-0.5 text-sm text-slate-500">{vocabCount} words &middot; flip, listen, and self-check</p>
              </div>
              <ArrowRight className={`h-4 w-4 ${theme.textLight} transition-transform group-hover:translate-x-0.5`} />
            </Link>
          )}

          {module.quizzes[0] && (
            <Link
              href={`/courses/${module.slug}/quiz`}
              className="group flex items-center gap-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 transition-colors hover:border-slate-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
                <ClipboardCheck className="h-4.5 w-4.5" />
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
              <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </Container>
    </>
  );
}
