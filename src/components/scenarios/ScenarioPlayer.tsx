"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  Check,
  X,
  Lightbulb,
  RotateCcw,
  ArrowRight,
  MessageCircle,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/useProgress";

interface Choice {
  id: string;
  dutch: string;
  english: string;
}

interface Step {
  id: string;
  speaker: "PARTNER" | "LEARNER";
  dutch: string;
  english: string;
  hint: string;
  choices: Choice[];
}

interface Theme {
  text: string;
  bgTint: string;
  bar: string;
}

/** A line already played out, kept so the conversation reads as a transcript. */
type HistoryItem =
  | { kind: "partner"; dutch: string; english: string }
  | { kind: "learner"; dutch: string; english: string; correct: boolean; feedback: string };

/**
 * Collect the partner's lines from `from` until the next learner turn.
 * Pure, so it can seed the initial state without a render-time side effect.
 */
function playPartnerLines(steps: Step[], from: number) {
  const lines: HistoryItem[] = [];
  let i = from;
  while (i < steps.length && steps[i].speaker === "PARTNER") {
    lines.push({ kind: "partner", dutch: steps[i].dutch, english: steps[i].english });
    i++;
  }
  return { lines, next: i };
}

export function ScenarioPlayer({
  scenarioSlug,
  steps,
  theme,
}: {
  scenarioSlug: string;
  steps: Step[];
  theme: Theme;
}) {
  // The conversation always opens with the partner speaking, so play those
  // lines straight into the initial state rather than in an effect.
  const opening = playPartnerLines(steps, 0);
  const [index, setIndex] = useState(opening.next);
  const [history, setHistory] = useState<HistoryItem[]>(opening.lines);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; feedback: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const { save } = useProgress();

  const totalChoices = steps.filter((s) => s.speaker === "LEARNER").length;
  const step = steps[index];

  /** Play forward through any partner lines until the next learner turn. */
  function advanceFrom(from: number, acc: HistoryItem[]) {
    const { lines, next } = playPartnerLines(steps, from);
    setHistory([...acc, ...lines]);
    setIndex(next);
    return next;
  }

  async function choose(choiceId: string) {
    if (result || checking) return;
    setChecking(true);
    setPicked(choiceId);
    setError(null);

    try {
      const res = await fetch("/api/scenario/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choiceId }),
      });

      if (!res.ok) {
        setPicked(null);
        setError("Could not check that answer. Please try again.");
        return;
      }

      const data = await res.json();
      setResult({ correct: data.isCorrect, feedback: data.feedback });
      if (data.isCorrect) setCorrectCount((c) => c + 1);
    } catch {
      setPicked(null);
      setError("Could not reach the server. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  function next() {
    if (!result) return;

    const chosen = step.choices.find((c) => c.id === picked);
    const withAnswer: HistoryItem[] = [
      ...history,
      {
        kind: "learner",
        dutch: chosen?.dutch ?? "",
        english: chosen?.english ?? "",
        correct: result.correct,
        feedback: result.feedback,
      },
    ];

    setPicked(null);
    setResult(null);
    setShowHint(false);

    const landed = advanceFrom(index + 1, withAnswer);

    if (landed >= steps.length) {
      setFinished(true);
      // correctCount already includes this answer: choose() updated it when
      // the choice was checked, which was a separate interaction.
      save(scenarioSlug, { correct: correctCount, total: totalChoices });
    }
  }

  function restart() {
    setHistory([]);
    setIndex(0);
    setPicked(null);
    setResult(null);
    setShowHint(false);
    setCorrectCount(0);
    setFinished(false);
    setError(null);
    advanceFrom(0, []);
  }

  const answered = history.filter((h) => h.kind === "learner").length;
  const progressPct = totalChoices ? (answered / totalChoices) * 100 : 0;

  if (finished) {
    return (
      <div className="rounded-lg border border-ink-100 bg-canvas-raised p-8 text-center card-shadow">
        <span
          className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
            theme.bgTint,
            theme.text
          )}
        >
          <PartyPopper className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink-900">
          You got through the conversation
        </h2>
        <p className="mt-2 text-body-muted">
          {correctCount} of {totalChoices} replies were the natural choice.
          {correctCount < totalChoices && " The notes above explain the others."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={restart}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Try it again
          </Button>
          <Button href="/practice">
            Back to situations <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <p className="mt-8 border-t border-ink-100 pt-6 text-sm text-body-muted">
          Was this useful? Anything confusing?{" "}
          <Link href="/assistant" className={cn("font-semibold underline underline-offset-2", theme.text)}>
            Ask the assistant
          </Link>{" "}
          — or tell me directly, this prototype is being tested.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-body-muted">
        <span>
          Reply {Math.min(answered + 1, totalChoices)} of {totalChoices}
        </span>
        <span>{correctCount} natural so far</span>
      </div>
      <ProgressBar value={progressPct} className="mb-8" barClassName={theme.bar} />

      {/* Transcript */}
      <div className="space-y-4">
        {history.map((h, i) =>
          h.kind === "partner" ? (
            <div key={i} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-canvas-raised px-4 py-3 ring-1 ring-ink-100">
                <p className="font-medium text-ink-900">{h.dutch}</p>
                <p className="mt-1 text-sm text-body-muted">{h.english}</p>
              </div>
            </div>
          ) : (
            <div key={i} className="flex flex-col items-end gap-2">
              <div
                className={cn(
                  "max-w-[85%] rounded-lg rounded-br-none px-4 py-3 text-right ring-1",
                  h.correct
                    ? "bg-brand-50 ring-brand-200"
                    : "bg-amber-50 ring-amber-200"
                )}
              >
                <p className="font-medium text-ink-900">{h.dutch}</p>
                <p className="mt-1 text-sm text-body-muted">{h.english}</p>
              </div>
              <p
                className={cn(
                  "max-w-[85%] text-right text-sm",
                  h.correct ? "text-brand-700" : "text-amber-800"
                )}
              >
                {h.feedback}
              </p>
            </div>
          )
        )}
      </div>

      {/* Current learner turn */}
      {step && step.speaker === "LEARNER" && (
        <div className="mt-8 rounded-lg border border-ink-100 bg-canvas-raised p-6 card-shadow">
          <p className="font-display font-semibold text-ink-900">{step.dutch}</p>
          <p className="mt-1 text-sm text-body-muted">{step.english}</p>

          {error && (
            <p role="alert" className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3">
            {step.choices.map((c) => {
              const isPicked = picked === c.id;
              const show = !!result && isPicked;

              return (
                <button
                  key={c.id}
                  onClick={() => choose(c.id)}
                  disabled={!!result || checking}
                  className={cn(
                    "rounded-md border px-4 py-3 text-left transition-colors disabled:cursor-default",
                    !result && "border-ink-100 hover:border-ink-300 hover:bg-ink-50",
                    show && result!.correct && "border-brand-400 bg-brand-50",
                    show && !result!.correct && "border-amber-400 bg-amber-50",
                    !!result && !isPicked && "border-ink-100 opacity-50"
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block font-medium text-ink-900">{c.dutch}</span>
                      <span className="mt-0.5 block text-sm text-body-muted">{c.english}</span>
                    </span>
                    {show &&
                      (result!.correct ? (
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                      ))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hint / feedback */}
          {!result && step.hint && (
            <div className="mt-5">
              {showHint ? (
                <p className="rounded-md bg-ink-50 px-4 py-3 text-sm text-body">{step.hint}</p>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-body-muted hover:text-ink-900"
                >
                  <Lightbulb className="h-4 w-4" aria-hidden="true" /> Show a hint
                </button>
              )}
            </div>
          )}

          {result && (
            <div
              className={cn(
                "mt-5 rounded-md px-4 py-3 text-sm",
                result.correct ? "bg-brand-50 text-brand-800" : "bg-amber-50 text-amber-900"
              )}
            >
              <p className="font-semibold">
                {result.correct ? "That works well." : "Understandable, but not the natural choice."}
              </p>
              <p className="mt-1">{result.feedback}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 flex justify-end">
              <Button onClick={next}>
                Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
