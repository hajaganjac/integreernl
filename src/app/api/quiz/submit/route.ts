import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordActivity } from "@/lib/streak";

const schema = z.object({
  quizId: z.string(),
  answers: z.record(z.string(), z.string()), // questionId -> optionId
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { quizId, answers } = parsed.data;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { include: { options: true } },
      module: { include: { lessons: true } },
    },
  });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  let score = 0;
  const total = quiz.questions.length;

  for (const question of quiz.questions) {
    const chosenOptionId = answers[question.id];
    const correctOption = question.options.find((o) => o.isCorrect);
    if (chosenOptionId && correctOption && chosenOptionId === correctOption.id) {
      score += 1;
    }
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: session.user.id,
      quizId,
      score,
      total,
      answers: JSON.stringify(answers),
    },
  });

  await recordActivity(session.user.id);

  const passed = total > 0 && score / total >= 0.7;
  let moduleComplete = false;

  if (passed) {
    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: session.user.id,
        completed: true,
        lessonId: { in: quiz.module.lessons.map((l) => l.id) },
      },
    });
    moduleComplete = completedLessons === quiz.module.lessons.length;
  }

  return NextResponse.json({ id: attempt.id, score, total, moduleComplete });
}
