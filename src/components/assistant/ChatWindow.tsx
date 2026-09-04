"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "When do I use 'hebben' vs 'zijn'?",
  "Help me practice a doctor's appointment",
  "How do I write a formal email in Dutch?",
  "What is KNM and what should I know?",
];

export function ChatWindow({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { id: `tmp-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { id: `err-${Date.now()}`, role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { id: `reply-${Date.now()}`, role: "assistant", content: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[32rem] flex-col rounded-2xl border border-slate-200 bg-white card-shadow">
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Sparkles className="h-6 w-6" />
            </span>
            <p className="mt-4 max-w-sm text-sm text-slate-500">
              Ask a question, or try one of these to get started:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={cn("flex items-start gap-3", m.role === "user" && "flex-row-reverse")}>
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                m.role === "user" ? "bg-ink-900 text-white" : "bg-brand-50 text-brand-600"
              )}
            >
              {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </span>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6",
                m.role === "user" ? "bg-ink-900 text-white" : "bg-slate-50 text-ink-900"
              )}
            >
              <div className="prose prose-sm max-w-none prose-p:my-1 prose-strong:text-inherit prose-headings:text-inherit prose-a:text-brand-300">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2.5 text-sm text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-slate-100 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about grammar, KNM, or practice a conversation..."
          className="flex-1 rounded-xl bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
