import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { QuizEngine } from "@/components/courses/QuizEngine";
import { MODULE_THEME } from "@/lib/moduleTheme";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/courses/${moduleSlug}/quiz`);
  }

  const courseModule = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: {
      quizzes: {
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: { options: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });
  if (!courseModule || !courseModule.quizzes[0]) notFound();

  const quiz = courseModule.quizzes[0];
  const theme = MODULE_THEME[courseModule.examPart];

  // Strip isCorrect before sending to the client — grading happens server-side.
  const safeQuestions = quiz.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    options: q.options.map((o) => ({ id: o.id, label: o.label })),
  }));

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-2xl">
        <Link href={`/courses/${courseModule.slug}`} className={`text-sm font-medium ${theme.text} hover:opacity-80`}>
          &larr; {courseModule.title}
        </Link>

        <div className="mt-4">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${theme.bgTint} ${theme.text} ${theme.ring}`}>
            Quiz
          </span>
          <h1 className="mt-3 text-3xl font-semibold text-ink-900">{quiz.title}</h1>
          <p className="mt-2 text-body-muted">
            {safeQuestions.length} questions &middot; answer each one to see instant feedback.
          </p>
        </div>

        <div className="mt-8">
          <QuizEngine
            quizId={quiz.id}
            moduleSlug={courseModule.slug}
            questions={safeQuestions}
            theme={{ progressBar: theme.progressBar, bgTint: theme.bgTint, text: theme.text, border: theme.border }}
            themeHex={theme.hex}
          />
        </div>
      </div>
    </Container>
  );
}
