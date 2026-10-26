import { NextResponse } from "next/server";
import { findChoice } from "@/content/scenarios";

/**
 * Grades one reply on the server, so the correct answer and the feedback are
 * not sitting in the page source where a learner would see them first.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { choiceId?: unknown } | null;
  const choiceId = typeof body?.choiceId === "string" ? body.choiceId : null;

  if (!choiceId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const choice = findChoice(choiceId);
  if (!choice) {
    return NextResponse.json({ error: "Choice not found" }, { status: 404 });
  }

  return NextResponse.json({ isCorrect: choice.isCorrect, feedback: choice.feedback });
}
