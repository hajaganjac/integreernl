"use client";

import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { Button } from "@/components/ui/Button";
import {
  Shuffle,
  RotateCcw,
  ThumbsUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabItem {
  id: string;
  dutch: string;
  english: string;
  exampleNl: string;
  exampleEn: string;
}

interface ModuleThemeLite {
  gradient: string;
  text: string;
  bgTint: string;
  solid: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Flashcards({
  items,
  theme,
  moduleSlug,
}: {
  items: VocabItem[];
  theme: ModuleThemeLite;
  moduleSlug: string;
}) {
  const [deck, setDeck] = useState(items);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const card = deck[index];
  const progress = useMemo(() => Math.round((index / deck.length) * 100), [index, deck.length]);

  function markAndAdvance(bucket: "known" | "learning") {
    if (bucket === "known") setKnown((prev) => [...prev, card.id]);
    else setLearning((prev) => [...prev, card.id]);

    if (index + 1 >= deck.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }

  function restart(onlyStruggled: boolean) {
    const source = onlyStruggled ? items.filter((i) => learning.includes(i.id)) : items;
    setDeck(shuffleArray(source.length > 0 ? source : items));
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setLearning([]);
    setFinished(false);
  }

  function shuffle() {
    setDeck(shuffleArray(deck));
    setIndex(0);
    setFlipped(false);
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-ink-100 bg-canvas-raised p-8 text-center card-shadow">
        <span className={cn("mx-auto flex h-16 w-16 items-center justify-center rounded-full", theme.bgTint, theme.text)}>
          <Sparkles className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold text-ink-900">Deck complete!</h2>
        <p className="mt-2 text-body-muted">
          You knew <span className="font-semibold text-ink-900">{known.length}</span> of {items.length} words.{" "}
          {learning.length > 0 && `${learning.length} could use another pass.`}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {learning.length > 0 && (
            <Button variant="outline" onClick={() => restart(true)}>
              <RefreshCw className="h-4 w-4" /> Practice the {learning.length} tricky ones
            </Button>
          )}
          <Button variant="outline" onClick={() => restart(false)}>
            <RotateCcw className="h-4 w-4" /> Start over
          </Button>
          <Button href={`/courses/${moduleSlug}`}>
            Back to module <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between text-sm text-body-muted">
        <span>
          Card {index + 1} of {deck.length}
        </span>
        <button onClick={shuffle} className="inline-flex items-center gap-1.5 font-medium text-body-subtle hover:text-ink-900">
          <Shuffle className="h-3.5 w-3.5" /> Shuffle
        </button>
      </div>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
        <div className={cn("h-full rounded-full transition-all duration-300", theme.solid)} style={{ width: `${progress}%` }} />
      </div>

      {/* The card itself is presentational, not a control: it contains the
          pronunciation button, and nesting focusable elements inside a
          role="button" is a WCAG failure (axe: nested-interactive).
          Pointer users can still click anywhere on the card; keyboard and
          screen-reader users get the explicit "Flip card" button below. */}
      <div className="[perspective:1200px]">
        <div
          onClick={() => setFlipped((f) => !f)}
          className="relative h-72 w-full cursor-pointer text-left [transform-style:preserve-3d] transition-transform duration-500"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front: Dutch word */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br p-8 text-center text-white shadow-lg [backface-visibility:hidden]",
              theme.gradient
            )}
          >
            <span className="text-xs font-medium uppercase tracking-wide text-white/70">Dutch</span>
            <p className="mt-3 text-3xl font-semibold">{card.dutch}</p>
            <div className="mt-5" onClick={(e) => e.stopPropagation()}>
              <SpeakButton text={card.dutch} className="text-ink-900" />
            </div>
          </div>

          {/* Back: English + example */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-ink-100 bg-canvas-raised p-8 text-center shadow-lg [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <span className={cn("text-xs font-medium uppercase tracking-wide", theme.text)}>English</span>
            <p className="mt-2 text-2xl font-semibold text-ink-900">{card.english}</p>
            <div className="mt-5 space-y-1 text-sm text-body-muted">
              <p className="italic text-ink-700">&ldquo;{card.exampleNl}&rdquo;</p>
              <p>{card.exampleEn}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium text-body-muted hover:text-ink-900"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {flipped ? "Show the Dutch word" : "Flip card to see the meaning"}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <Button variant="outline" onClick={() => markAndAdvance("learning")}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" /> Still learning
        </Button>
        <Button onClick={() => markAndAdvance("known")}>
          <ThumbsUp className="h-4 w-4" aria-hidden="true" /> I know this
        </Button>
      </div>
    </div>
  );
}
