import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  scenarioSlug: z.string(),
  correct: z.number().int().min(0),
  total: z.number().int().min(0),
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

  const { scenarioSlug, correct, total } = parsed.data;
  const userId = session.user.id;

  // A signed session can outlive the account it points to (for example after
  // the database is reset), which would fail on a foreign key below.
  const [scenario, userExists] = await Promise.all([
    prisma.scenario.findUnique({ where: { slug: scenarioSlug }, select: { id: true } }),
    prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
  ]);

  if (!userExists) {
    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }
  if (!scenario) {
    return NextResponse.json({ error: "Situation not found" }, { status: 404 });
  }

  const existing = await prisma.scenarioProgress.findUnique({
    where: { userId_scenarioId: { userId, scenarioId: scenario.id } },
  });

  const progress = await prisma.scenarioProgress.upsert({
    where: { userId_scenarioId: { userId, scenarioId: scenario.id } },
    update: {
      completed: true,
      completedAt: new Date(),
      // Keep the learner's best run rather than overwriting with the latest.
      bestCorrect: Math.max(existing?.bestCorrect ?? 0, correct),
      totalChoices: total,
    },
    create: {
      userId,
      scenarioId: scenario.id,
      completed: true,
      completedAt: new Date(),
      bestCorrect: correct,
      totalChoices: total,
    },
  });

  return NextResponse.json(progress);
}
