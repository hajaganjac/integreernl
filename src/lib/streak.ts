import { prisma } from "@/lib/prisma";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Call whenever a user does something that counts as "studying today"
 * (completing a lesson, submitting a quiz). Increments the streak if the
 * last active day was yesterday, resets it if there was a gap, and is a
 * no-op if today was already recorded.
 */
export async function recordActivity(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastActiveDate: true, currentStreak: true, longestStreak: true },
  });
  if (!user) return;

  const today = startOfDay(new Date());
  const last = user.lastActiveDate ? startOfDay(user.lastActiveDate) : null;

  if (last && last.getTime() === today.getTime()) {
    return; // already recorded today
  }

  const oneDayMs = 24 * 60 * 60 * 1000;
  const isConsecutive = last && today.getTime() - last.getTime() === oneDayMs;

  const nextStreak = isConsecutive ? user.currentStreak + 1 : 1;
  const nextLongest = Math.max(user.longestStreak, nextStreak);

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: nextStreak,
      longestStreak: nextLongest,
      lastActiveDate: today,
    },
  });
}
