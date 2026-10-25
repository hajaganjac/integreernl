import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ choiceId: z.string() });

/**
 * Grades one reply. Kept on the server so the correct answer and the feedback
 * are not sitting in the page source where a learner would see them first.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const choice = await prisma.scenarioChoice.findUnique({
    where: { id: parsed.data.choiceId },
    select: { isCorrect: true, feedback: true },
  });

  if (!choice) {
    return NextResponse.json({ error: "Choice not found" }, { status: 404 });
  }

  return NextResponse.json({ isCorrect: choice.isCorrect, feedback: choice.feedback });
}
