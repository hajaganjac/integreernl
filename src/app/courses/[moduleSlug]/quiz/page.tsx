import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { QuizEngine } from "@/components/courses/QuizEngine";

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

  const module = await prisma.module.findUnique({
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
  if (!module || !module.quizzes[0]) notFound();

  const quiz = module.quizzes[0];

  // Strip isCorrect before sending to the client — grading happens server-side.
  const safeQuestions = quiz.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    options: q.options.map((o) => ({ id: o.id, label: o.label })),
  }));

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-2xl">
        <Link href={`/courses/${module.slug}`} className="text-sm font-medium text-brand-600 hover:text-brand-700">
          &larr; {module.title}
        </Link>

        <div className="mt-4">
          <Badge color="accent">Quiz</Badge>
          <h1 className="mt-3 text-3xl font-semibold text-ink-900">{quiz.title}</h1>
          <p className="mt-2 text-slate-500">
            {safeQuestions.length} questions &middot; answer each one to see instant feedback.
          </p>
        </div>

        <div className="mt-8">
          <QuizEngine quizId={quiz.id} moduleSlug={module.slug} questions={safeQuestions} />
        </div>
      </div>
    </Container>
  );
}
