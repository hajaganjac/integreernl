import type { Level } from "@prisma/client";

/**
 * Situations are colour-coded by CEFR level instead of by exam part.
 * For a beginner "how hard is this?" is the useful signal; the old exam-part
 * colours no longer mean anything now that B1 is out of scope (Analysis ch. 3.2).
 *
 * Classes are written out in full because Tailwind only picks up class names
 * it can find literally in the source.
 */
interface LevelTheme {
  label: string;
  /** what this level roughly means, in plain words */
  blurb: string;
  text: string;
  bgTint: string;
  ring: string;
  bar: string;
  gradient: string;
}

export const LEVEL_THEME: Record<Level, LevelTheme> = {
  A0: {
    label: "A0",
    blurb: "Complete beginner",
    text: "text-emerald-700",
    bgTint: "bg-emerald-50",
    ring: "ring-emerald-200",
    bar: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
  },
  A1: {
    label: "A1",
    blurb: "First real conversations",
    text: "text-brand-700",
    bgTint: "bg-brand-50",
    ring: "ring-brand-200",
    bar: "bg-brand-500",
    gradient: "from-brand-500 to-brand-700",
  },
  A2: {
    label: "A2",
    blurb: "Getting comfortable",
    text: "text-indigo-700",
    bgTint: "bg-indigo-50",
    ring: "ring-indigo-200",
    bar: "bg-indigo-500",
    gradient: "from-indigo-500 to-blue-600",
  },
};
