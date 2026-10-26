import { SCENARIOS } from "@/content/scenarios";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PracticeList } from "@/components/scenarios/PracticeList";

export const metadata = { title: "Everyday situations" };

export default function PracticePage() {
  const ready = SCENARIOS.filter((s) => s.published);
  const planned = SCENARIOS.filter((s) => !s.published);

  return (
    <Container className="py-12">
      <div className="max-w-2xl">
        <Badge>Practice</Badge>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink-900">
          Everyday situations
        </h1>
        <p className="mt-3 text-body-muted">
          Each situation is a short conversation you might actually have. You read what
          the other person says, choose how to reply, and find out whether that is what
          a Dutch person would expect.
        </p>
      </div>

      <PracticeList ready={ready} planned={planned} />
    </Container>
  );
}
