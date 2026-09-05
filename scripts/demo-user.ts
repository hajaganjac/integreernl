/**
 * Creates a demo account with realistic progress, used only to capture
 * marketing screenshots of the real product. Safe to re-run.
 *
 *   npx tsx scripts/demo-user.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const EMAIL = "demo@integreernl.nl";
const PASSWORD = "DemoAccount2026!";

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: { currentStreak: 7, longestStreak: 12, lastActiveDate: new Date() },
    create: {
      name: "Amina Yilmaz",
      email: EMAIL,
      passwordHash,
      currentStreak: 7,
      longestStreak: 12,
      lastActiveDate: new Date(),
    },
  });

  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: { lessons: { orderBy: { order: "asc" } }, quizzes: true },
  });

  // Give each module a different completion level so the dashboard
  // shows a realistic in-progress spread rather than all-or-nothing.
  const lessonsDonePerModule = [5, 3, 4, 1, 5];

  await prisma.lessonProgress.deleteMany({ where: { userId: user.id } });
  await prisma.quizAttempt.deleteMany({ where: { userId: user.id } });

  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    const done = lessonsDonePerModule[i] ?? 0;

    for (const lesson of m.lessons.slice(0, done)) {
      await prisma.lessonProgress.create({
        data: {
          userId: user.id,
          lessonId: lesson.id,
          completed: true,
          completedAt: new Date(),
        },
      });
    }

    const quiz = m.quizzes[0];
    if (quiz && done >= m.lessons.length) {
      const total = await prisma.question.count({ where: { quizId: quiz.id } });
      await prisma.quizAttempt.create({
        data: {
          userId: user.id,
          quizId: quiz.id,
          score: total,
          total,
          answers: "{}",
        },
      });
    }
  }

  console.log(`Demo user ready: ${EMAIL} / ${PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
