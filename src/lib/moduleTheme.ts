import type { ExamPart } from "@prisma/client";

/**
 * Each exam part gets its own colour so the five modules are easy to tell
 * apart. Classes are written out in full because Tailwind only picks up
 * class names it can find literally in the source.
 */
interface ModuleTheme {
  gradient: string;
  text: string;
  bgTint: string;
  ring: string;
  border: string;
  borderHover: string;
  progressBar: string;
  groupHoverText: string;
}

export const MODULE_THEME: Record<ExamPart, ModuleTheme> = {
  READING: {
    gradient: "from-indigo-500 to-blue-600",
    text: "text-indigo-700",
    bgTint: "bg-indigo-50",
    ring: "ring-indigo-200",
    border: "border-indigo-200",
    borderHover: "hover:border-indigo-300",
    progressBar: "bg-indigo-500",
    groupHoverText: "group-hover:text-indigo-500",
  },
  WRITING: {
    gradient: "from-fuchsia-500 to-violet-600",
    text: "text-purple-700",
    bgTint: "bg-purple-50",
    ring: "ring-purple-200",
    border: "border-purple-200",
    borderHover: "hover:border-purple-300",
    progressBar: "bg-purple-500",
    groupHoverText: "group-hover:text-purple-500",
  },
  LISTENING: {
    gradient: "from-rose-500 to-fuchsia-600",
    text: "text-rose-700",
    bgTint: "bg-rose-50",
    ring: "ring-rose-200",
    border: "border-rose-200",
    borderHover: "hover:border-rose-300",
    progressBar: "bg-rose-500",
    groupHoverText: "group-hover:text-rose-500",
  },
  SPEAKING: {
    gradient: "from-amber-500 to-orange-600",
    text: "text-orange-700",
    bgTint: "bg-orange-50",
    ring: "ring-orange-200",
    border: "border-orange-200",
    borderHover: "hover:border-orange-300",
    progressBar: "bg-orange-500",
    groupHoverText: "group-hover:text-orange-500",
  },
  KNM: {
    gradient: "from-emerald-500 to-teal-600",
    text: "text-emerald-700",
    bgTint: "bg-emerald-50",
    ring: "ring-emerald-200",
    border: "border-emerald-200",
    borderHover: "hover:border-emerald-300",
    progressBar: "bg-emerald-500",
    groupHoverText: "group-hover:text-emerald-500",
  },
};
