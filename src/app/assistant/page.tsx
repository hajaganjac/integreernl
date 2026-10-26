import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ChatWindow } from "@/components/assistant/ChatWindow";
import { Info } from "lucide-react";

export const metadata = { title: "Study assistant" };

export default function AssistantPage() {
  const hasLiveKey = !!process.env.OPENAI_API_KEY;

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl">
        <Badge color="accent">Study assistant</Badge>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900">
          Ask anything about Dutch
        </h1>
        <p className="mt-2 text-body-muted">
          Stuck on a word, a phrase, or something someone said to you? Ask here.
        </p>

        <div className="mt-4 flex items-start gap-2.5 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            This assistant is a study aid, not an official source.{" "}
            {hasLiveKey
              ? "It can be wrong — check anything important against another source."
              : "It currently answers from a small set of written answers rather than a live AI, and the conversation is not kept when you leave the page."}
          </p>
        </div>

        <div className="mt-6">
          <ChatWindow />
        </div>
      </div>
    </Container>
  );
}
