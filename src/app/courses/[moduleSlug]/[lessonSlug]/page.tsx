import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { LessonContent } from "@/components/courses/LessonContent";
import { LessonComplete } from "@/components/courses/LessonComplete";
import { Clock, ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";
import { MODULE_THEME } from "@/lib/moduleTheme";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const session = await auth();

  const courseModule = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quizzes: true,
    },
  });
  if (!courseModule) notFound();

  const lesson = courseModule.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const progress = session?.user?.id
    ? await prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId: session.user.id, lessonId: lesson.id } },
      })
    : null;

  const index = courseModule.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = index > 0 ? courseModule.lessons[index - 1] : null;
  const nextLesson = index < courseModule.lessons.length - 1 ? courseModule.lessons[index + 1] : null;
  const isLastLesson = index === courseModule.lessons.length - 1;
  const theme = MODULE_THEME[courseModule.examPart];

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/courses/${courseModule.slug}`}
          className={`text-sm font-medium ${theme.text} hover:opacity-80`}
        >
          &larr; {courseModule.title}
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${theme.bgTint} ${theme.text} ${theme.ring}`}>
            Lesson {index + 1} of {courseModule.lessons.length}
          </span>
          <span className="flex items-center gap-1 text-xs text-body-subtle">
            <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min read
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-semibold text-ink-900">{lesson.title}</h1>
        <p className="mt-2 text-body-muted">{lesson.summary}</p>

        <div className="mt-8 rounded-2xl border border-ink-100 bg-canvas-raised p-8 card-shadow">
          <LessonContent content={lesson.content} />
        </div>

        <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {prevLesson ? (
              <Link
                href={`/courses/${courseModule.slug}/${prevLesson.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-body-muted hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" /> {prevLesson.title}
              </Link>
            ) : (
              <span />
            )}
          </div>

          {session?.user?.id ? (
            <LessonComplete lessonId={lesson.id} initialCompleted={progress?.completed ?? false} accentColor={theme.hex} />
          ) : (
            <Link href="/login" className={`text-sm font-medium ${theme.text} hover:opacity-80`}>
              Log in to track progress &rarr;
            </Link>
          )}

          <div className="text-right">
            {nextLesson ? (
              <Link
                href={`/courses/${courseModule.slug}/${nextLesson.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-body-muted hover:opacity-80"
              >
                {nextLesson.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : isLastLesson && courseModule.quizzes[0] ? (
              <Link
                href={`/courses/${courseModule.slug}/quiz`}
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${theme.text} hover:opacity-80`}
              >
                Take the module quiz <ClipboardCheck className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
