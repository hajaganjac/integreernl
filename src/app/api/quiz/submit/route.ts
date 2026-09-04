import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    include: { questions: { include: { options: true } } },
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

  return NextResponse.json({ id: attempt.id, score, total });
}
