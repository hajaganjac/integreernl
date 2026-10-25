import { prisma } from "@/lib/prisma";

/** Situation list with the signed-in user's result, if any. */
export async function getScenariosWithProgress(userId: string | undefined) {
  const scenarios = await prisma.scenario.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { steps: true } } },
  });

  const progress = userId
    ? await prisma.scenarioProgress.findMany({ where: { userId } })
    : [];
  const byScenario = new Map(progress.map((p) => [p.scenarioId, p]));

  return scenarios.map((s) => ({
    ...s,
    turns: s._count.steps,
    progress: byScenario.get(s.id) ?? null,
  }));
}

/** One situation with its full conversation. */
export async function getScenarioBySlug(slug: string) {
  return prisma.scenario.findUnique({
    where: { slug },
    include: {
      steps: {
        orderBy: { order: "asc" },
        include: { choices: { orderBy: { order: "asc" } } },
      },
    },
  });
}

/** Totals for the dashboard. */
export async function getOverallProgress(userId: string) {
  const scenarios = await getScenariosWithProgress(userId);
  const published = scenarios.filter((s) => s.published);
  const completed = published.filter((s) => s.progress?.completed).length;

  return {
    scenarios,
    published,
    publishedTotal: published.length,
    completed,
    plannedTotal: scenarios.length - published.length,
  };
}
