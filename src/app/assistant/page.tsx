import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ChatWindow } from "@/components/assistant/ChatWindow";
import { Info } from "lucide-react";

export default async function AssistantPage() {
  const session = await auth();
  const userId = session!.user.id;

  const messages = await prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  const hasLiveKey = !!process.env.OPENAI_API_KEY;

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl">
        <Badge color="accent">AI study buddy</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-ink-900">Ask anything about Dutch or the exam</h1>
        <p className="mt-2 text-slate-500">
          Practice grammar, ask about a KNM topic, or rehearse a conversation — any time, no appointment needed.
        </p>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-inset ring-amber-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            This assistant is a study aid, not an official source.{" "}
            {hasLiveKey
              ? "Always double-check important grammar or legal rules with your course materials or gemeente."
              : "It's currently running in demo mode with pre-written answers to common questions — connect an API key for live AI answers."}
          </p>
        </div>

        <div className="mt-6">
          <ChatWindow
            initialMessages={messages.map((m) => ({
              id: m.id,
              role: m.role as "user" | "assistant",
              content: m.content,
            }))}
          />
        </div>
      </div>
    </Container>
  );
}
