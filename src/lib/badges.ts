export interface BadgeDef {
  id: string;
  label: string;
  description: string;
  icon: "Footprints" | "Star" | "Crown" | "Layers" | "Flame" | "GraduationCap";
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: "first-step", label: "First Step", description: "Complete your first lesson", icon: "Footprints" },
  { id: "quiz-whiz", label: "Quiz Whiz", description: "Score 100% on any quiz", icon: "Star" },
  { id: "module-master", label: "Module Master", description: "Fully complete one module", icon: "Crown" },
  { id: "all-rounder", label: "All-Rounder", description: "Start every one of the 5 modules", icon: "Layers" },
  { id: "on-fire", label: "On Fire", description: "Reach a 3-day study streak", icon: "Flame" },
  { id: "graduate", label: "Graduate", description: "Complete 100% of the course", icon: "GraduationCap" },
];

interface ModuleProgressLite {
  percent: number;
  lessonsCompleted: number;
}

export function computeEarnedBadges(input: {
  completedLessons: number;
  hasPerfectQuiz: boolean;
  modules: ModuleProgressLite[];
  currentStreak: number;
  overallPercent: number;
}): Set<string> {
  const earned = new Set<string>();

  if (input.completedLessons >= 1) earned.add("first-step");
  if (input.hasPerfectQuiz) earned.add("quiz-whiz");
  if (input.modules.some((m) => m.percent === 100)) earned.add("module-master");
  if (input.modules.every((m) => m.lessonsCompleted >= 1)) earned.add("all-rounder");
  if (input.currentStreak >= 3) earned.add("on-fire");
  if (input.overallPercent === 100) earned.add("graduate");

  return earned;
}
