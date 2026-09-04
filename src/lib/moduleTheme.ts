import type { ExamPart } from "@prisma/client";

interface ModuleTheme {
  /** two-stop gradient for hero banners */
  gradient: string;
  /** solid brand color for icons/buttons on light backgrounds */
  solid: string;
  solidHover: string;
  /** text color for headings/links in this module's context */
  text: string;
  textLight: string;
  /** light tint background for icon chips / cards */
  bgTint: string;
  bgTintHover: string;
  ring: string;
  border: string;
  borderHover: string;
  /** progress bar fill */
  progressBar: string;
  /** decorative glow color used behind hero art */
  glow: string;
  /** literal `group-hover:text-*` class (must be a static string for Tailwind's JIT scanner) */
  groupHoverText: string;
  /** hex value matching `solid`, for use outside Tailwind (canvas-confetti, inline SVG) */
  hex: string;
}

export const MODULE_THEME: Record<ExamPart, ModuleTheme> = {
  READING: {
    gradient: "from-indigo-500 via-indigo-600 to-blue-600",
    solid: "bg-indigo-600",
    solidHover: "hover:bg-indigo-700",
    text: "text-indigo-700",
    textLight: "text-indigo-500",
    bgTint: "bg-indigo-50",
    bgTintHover: "hover:bg-indigo-100",
    ring: "ring-indigo-200",
    border: "border-indigo-200",
    borderHover: "hover:border-indigo-300",
    progressBar: "bg-indigo-500",
    glow: "bg-indigo-400/30",
    groupHoverText: "group-hover:text-indigo-500",
    hex: "#4f46e5",
  },
  WRITING: {
    gradient: "from-fuchsia-500 via-purple-600 to-violet-600",
    solid: "bg-purple-600",
    solidHover: "hover:bg-purple-700",
    text: "text-purple-700",
    textLight: "text-purple-500",
    bgTint: "bg-purple-50",
    bgTintHover: "hover:bg-purple-100",
    ring: "ring-purple-200",
    border: "border-purple-200",
    borderHover: "hover:border-purple-300",
    progressBar: "bg-purple-500",
    glow: "bg-purple-400/30",
    groupHoverText: "group-hover:text-purple-500",
    hex: "#9333ea",
  },
  LISTENING: {
    gradient: "from-rose-500 via-pink-600 to-fuchsia-600",
    solid: "bg-rose-600",
    solidHover: "hover:bg-rose-700",
    text: "text-rose-700",
    textLight: "text-rose-500",
    bgTint: "bg-rose-50",
    bgTintHover: "hover:bg-rose-100",
    ring: "ring-rose-200",
    border: "border-rose-200",
    borderHover: "hover:border-rose-300",
    progressBar: "bg-rose-500",
    glow: "bg-rose-400/30",
    groupHoverText: "group-hover:text-rose-500",
    hex: "#e11d48",
  },
  SPEAKING: {
    gradient: "from-amber-500 via-orange-500 to-orange-600",
    solid: "bg-orange-600",
    solidHover: "hover:bg-orange-700",
    text: "text-orange-700",
    textLight: "text-orange-500",
    bgTint: "bg-orange-50",
    bgTintHover: "hover:bg-orange-100",
    ring: "ring-orange-200",
    border: "border-orange-200",
    borderHover: "hover:border-orange-300",
    progressBar: "bg-orange-500",
    glow: "bg-orange-400/30",
    groupHoverText: "group-hover:text-orange-500",
    hex: "#ea580c",
  },
  KNM: {
    gradient: "from-emerald-500 via-emerald-600 to-teal-600",
    solid: "bg-emerald-600",
    solidHover: "hover:bg-emerald-700",
    text: "text-emerald-700",
    textLight: "text-emerald-500",
    bgTint: "bg-emerald-50",
    bgTintHover: "hover:bg-emerald-100",
    ring: "ring-emerald-200",
    border: "border-emerald-200",
    borderHover: "hover:border-emerald-300",
    progressBar: "bg-emerald-500",
    glow: "bg-emerald-400/30",
    groupHoverText: "group-hover:text-emerald-500",
    hex: "#059669",
  },
};

export const MODULE_IMAGE: Record<ExamPart, string> = {
  READING: "/images/module-reading.jpg",
  WRITING: "/images/module-writing.jpg",
  LISTENING: "/images/module-listening.jpg",
  SPEAKING: "/images/module-speaking.jpg",
  KNM: "/images/module-knm.jpg",
};
