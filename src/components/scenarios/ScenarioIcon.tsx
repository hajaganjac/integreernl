import {
  Coffee,
  Hand,
  ShoppingBasket,
  Map,
  CalendarCheck,
  Users,
  MessageCircle,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Coffee,
  Hand,
  ShoppingBasket,
  Map,
  CalendarCheck,
  Users,
  MessageCircle,
};

export function ScenarioIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? MessageCircle;
  return <Icon className={className} />;
}
