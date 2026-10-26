import { NextResponse } from "next/server";
import { callOpenAI, getFallbackReply } from "@/lib/assistant";

/**
 * The assistant is stateless: the conversation lives in the browser for as
 * long as the page is open. Storing chat history server-side would mean a
 * database and an account, which this prototype deliberately does without.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { message?: unknown; history?: unknown }
    | null;

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Only used when an API key is configured; harmless otherwise.
  const history = Array.isArray(body?.history)
    ? (body.history as { role: "user" | "assistant"; content: string }[]).slice(-10)
    : [];

  const reply =
    (await callOpenAI([...history, { role: "user", content: message }])) ??
    getFallbackReply(message);

  return NextResponse.json({ reply });
}
