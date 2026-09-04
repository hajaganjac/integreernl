import { prisma } from "@/lib/prisma";

export async function getModulesWithProgress(userId: string | undefined) {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quizzes: { include: { questions: true } },
    },
  });

  const progressByLesson = userId
    ? await prisma.lessonProgress.findMany({
        where: { userId, completed: true },
      })
    : [];
  const completedLessonIds = new Set(progressByLesson.map((p) => p.lessonId));

  const bestAttempts = userId
    ? await prisma.quizAttempt.findMany({
        where: { userId },
        orderBy: { score: "desc" },
      })
    : [];
  const bestScoreByQuiz = new Map<string, { score: number; total: number }>();
  for (const a of bestAttempts) {
    if (!bestScoreByQuiz.has(a.quizId)) {
      bestScoreByQuiz.set(a.quizId, { score: a.score, total: a.total });
    }
  }

  return modules.map((m) => {
    const lessonsTotal = m.lessons.length;
    const lessonsCompleted = m.lessons.filter((l) => completedLessonIds.has(l.id)).length;
    const quiz = m.quizzes[0];
    const quizBest = quiz ? bestScoreByQuiz.get(quiz.id) : undefined;
    const quizPassed = quizBest ? quizBest.score / quizBest.total >= 0.7 : false;

    const totalUnits = lessonsTotal + (quiz ? 1 : 0);
    const completedUnits = lessonsCompleted + (quizPassed ? 1 : 0);
    const percent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

    return {
      ...m,
      lessonsTotal,
      lessonsCompleted,
      quiz,
      quizBest,
      quizPassed,
      percent,
    };
  });
}

export async function getModuleBySlug(slug: string, userId: string | undefined) {
  const courseModule = await prisma.module.findUnique({
    where: { slug },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quizzes: { include: { questions: { include: { options: true }, orderBy: { order: "asc" } } } },
    },
  });
  if (!courseModule) return null;

  const progress = userId
    ? await prisma.lessonProgress.findMany({
        where: { userId, lessonId: { in: courseModule.lessons.map((l) => l.id) } },
      })
    : [];
  const completedLessonIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));

  return { module: courseModule, completedLessonIds };
}

export async function getOverallProgress(userId: string) {
  const modules = await getModulesWithProgress(userId);
  const totalLessons = modules.reduce((sum, m) => sum + m.lessonsTotal, 0);
  const completedLessons = modules.reduce((sum, m) => sum + m.lessonsCompleted, 0);
  const totalQuizzes = modules.filter((m) => m.quiz).length;
  const passedQuizzes = modules.filter((m) => m.quizPassed).length;

  const overallPercent =
    modules.length > 0
      ? Math.round(modules.reduce((sum, m) => sum + m.percent, 0) / modules.length)
      : 0;

  const attempts = await prisma.quizAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { quiz: { include: { module: true } } },
  });

  return {
    modules,
    totalLessons,
    completedLessons,
    totalQuizzes,
    passedQuizzes,
    overallPercent,
    recentAttempts: attempts,
  };
}
