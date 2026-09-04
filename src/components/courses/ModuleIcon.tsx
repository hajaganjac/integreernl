import { BookOpen, PenLine, Headphones, Mic, Landmark, GraduationCap } from "lucide-react";
import type { LucideProps } from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  BookOpen,
  PenLine,
  Headphones,
  Mic,
  Landmark,
};

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? GraduationCap;
  return <Icon className={className} />;
}
