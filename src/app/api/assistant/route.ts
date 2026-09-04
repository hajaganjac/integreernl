import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { callOpenAI, getFallbackReply } from "@/lib/assistant";

const schema = z.object({
  message: z.string().trim().min(1).max(2000),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { message } = parsed.data;
  const userId = session.user.id;

  await prisma.chatMessage.create({
    data: { userId, role: "user", content: message },
  });

  const recentHistory = await prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  const history = recentHistory
    .reverse()
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  let reply = await callOpenAI(history);
  let source: "llm" | "fallback" = "llm";

  if (!reply) {
    reply = getFallbackReply(message);
    source = "fallback";
  }

  await prisma.chatMessage.create({
    data: { userId, role: "assistant", content: reply },
  });

  return NextResponse.json({ reply, source });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const messages = await prisma.chatMessage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
}
