import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  questionId: z.string(),
  optionId: z.string(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { questionId, optionId } = parsed.data;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { options: true },
  });
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const selected = question.options.find((o) => o.id === optionId);
  const correct = question.options.find((o) => o.isCorrect);

  return NextResponse.json({
    isCorrect: !!selected?.isCorrect,
    correctOptionId: correct?.id,
    explanation: question.explanation,
  });
}
