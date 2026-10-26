import { SCENARIOS } from "@/content/scenarios";
import { Container } from "@/components/ui/Container";
import { DashboardView } from "@/components/scenarios/DashboardView";

export const metadata = { title: "Your progress" };

export default function DashboardPage() {
  return (
    <Container className="py-12">
      <DashboardView
        published={SCENARIOS.filter((s) => s.published)}
        plannedCount={SCENARIOS.filter((s) => !s.published).length}
      />
    </Container>
  );
}
