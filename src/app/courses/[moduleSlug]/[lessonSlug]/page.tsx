import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LessonContent } from "@/components/courses/LessonContent";
import { LessonComplete } from "@/components/courses/LessonComplete";
import { Clock, ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const session = await auth();

  const module = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quizzes: true,
    },
  });
  if (!module) notFound();

  const lesson = module.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const progress = session?.user?.id
    ? await prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId: session.user.id, lessonId: lesson.id } },
      })
    : null;

  const index = module.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = index > 0 ? module.lessons[index - 1] : null;
  const nextLesson = index < module.lessons.length - 1 ? module.lessons[index + 1] : null;
  const isLastLesson = index === module.lessons.length - 1;

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/courses/${module.slug}`}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          &larr; {module.title}
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <Badge>
            Lesson {index + 1} of {module.lessons.length}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min read
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-semibold text-ink-900">{lesson.title}</h1>
        <p className="mt-2 text-slate-500">{lesson.summary}</p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 card-shadow">
          <LessonContent content={lesson.content} />
        </div>

        <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {prevLesson ? (
              <Link
                href={`/courses/${module.slug}/${prevLesson.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600"
              >
                <ArrowLeft className="h-4 w-4" /> {prevLesson.title}
              </Link>
            ) : (
              <span />
            )}
          </div>

          {session?.user?.id ? (
            <LessonComplete lessonId={lesson.id} initialCompleted={progress?.completed ?? false} />
          ) : (
            <Link href="/login" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              Log in to track progress &rarr;
            </Link>
          )}

          <div className="text-right">
            {nextLesson ? (
              <Link
                href={`/courses/${module.slug}/${nextLesson.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600"
              >
                {nextLesson.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : isLastLesson && module.quizzes[0] ? (
              <Link
                href={`/courses/${module.slug}/quiz`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
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
