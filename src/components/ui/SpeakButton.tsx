"use client";

import { useState } from "react";
import { Volume2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SpeakButton({ text, className }: { text: string; className?: string }) {
  const [speaking, setSpeaking] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setUnsupported(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "nl-NL";
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    const dutchVoice = voices.find((v) => v.lang.startsWith("nl"));
    if (dutchVoice) utterance.voice = dutchVoice;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  if (unsupported) return null;

  return (
    <button
      type="button"
      onClick={speak}
      title="Listen to Dutch pronunciation"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas-raised/80 text-current shadow-sm ring-1 ring-inset ring-black/5 transition-transform hover:scale-105 active:scale-95",
        className
      )}
    >
      {speaking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
