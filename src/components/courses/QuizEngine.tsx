"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CheckCircle2, XCircle, PartyPopper, RotateCcw, ArrowRight, Trophy } from "lucide-react";
import { fireConfetti, fireBigConfetti } from "@/lib/confetti";

interface Option {
  id: string;
  label: string;
}

interface Question {
  id: string;
  prompt: string;
  options: Option[];
}

interface Feedback {
  isCorrect: boolean;
  correctOptionId?: string;
  explanation: string;
}

interface QuizTheme {
  progressBar: string;
  bgTint: string;
  text: string;
  border: string;
}

const DEFAULT_THEME: QuizTheme = {
  progressBar: "bg-brand-500",
  bgTint: "bg-brand-50",
  text: "text-brand-800",
  border: "border-brand-400",
};

export function QuizEngine({
  quizId,
  moduleSlug,
  questions,
  theme = DEFAULT_THEME,
  themeHex,
}: {
  quizId: string;
  moduleSlug: string;
  questions: Question[];
  theme?: QuizTheme;
  themeHex?: string;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; moduleComplete?: boolean } | null>(null);

  useEffect(() => {
    if (!result) return;
    const passed = result.total > 0 && result.score / result.total >= 0.7;
    if (!passed) return;

    const colors = themeHex ? [themeHex, "#f97316"] : undefined;
    if (result.moduleComplete) {
      fireBigConfetti(colors);
    } else {
      fireConfetti(colors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const currentFeedback = question ? feedback[question.id] : undefined;
  const allAnswered = questions.every((q) => feedback[q.id]);

  async function handleSelect(optionId: string) {
    if (currentFeedback || checking) return;
    setChecking(true);
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));

    try {
      const res = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, optionId }),
      });
      const data = await res.json();
      setFeedback((prev) => ({ ...prev, [question.id]: data }));
    } catch {
      toast.error("Could not check your answer. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  async function handleFinish() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers }),
      });
      if (!res.ok) {
        toast.error("Could not submit your quiz. Please try again.");
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      setResult(data);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetake() {
    setIndex(0);
    setAnswers({});
    setFeedback({});
    setResult(null);
  }

  if (result) {
    const percent = Math.round((result.score / result.total) * 100);
    const passed = percent >= 70;
    const moduleComplete = passed && result.moduleComplete;

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center card-shadow">
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            passed ? `${theme.bgTint} ${theme.text}` : "bg-orange-50 text-accent-500"
          }`}
        >
          {moduleComplete ? <Trophy className="h-7 w-7" /> : <PartyPopper className="h-7 w-7" />}
        </span>
        <h2 className="mt-5 text-2xl font-semibold text-ink-900">
          {moduleComplete ? "Module mastered!" : `${result.score} / ${result.total} correct`}
        </h2>
        <p className="mt-2 text-slate-500">
          {moduleComplete
            ? `You scored ${result.score}/${result.total} and completed every lesson in this module. Well done!`
            : passed
            ? "Great work — you've passed this module check."
            : "Keep practicing — aim for 70% or higher to pass this check."}
        </p>
        <div className="mx-auto mt-5 max-w-xs">
          <ProgressBar value={percent} barClassName={theme.progressBar} />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={handleRetake}>
            <RotateCcw className="h-4 w-4" /> Retake quiz
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
      <div className="mb-6 flex items-center justify-between text-sm text-slate-500">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span>{Object.keys(feedback).length}/{questions.length} answered</span>
      </div>
      <ProgressBar
        value={(index / questions.length) * 100 + (currentFeedback ? 100 / questions.length : 0)}
        className="mb-8"
        barClassName={theme.progressBar}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-7 card-shadow">
        <h2 className="text-lg font-semibold text-ink-900">{question.prompt}</h2>

        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.id;
            const isCorrectOption = currentFeedback?.correctOptionId === option.id;

            let stateClasses = "border-slate-200 hover:border-brand-300 hover:bg-brand-50/40";
            if (currentFeedback) {
              if (isCorrectOption) {
                stateClasses = `${theme.border} ${theme.bgTint} ${theme.text}`;
              } else if (isSelected && !currentFeedback.isCorrect) {
                stateClasses = "border-red-300 bg-red-50 text-red-700";
              } else {
                stateClasses = "border-slate-200 opacity-60";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={!!currentFeedback || checking}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-default ${stateClasses}`}
              >
                <span>{option.label}</span>
                {currentFeedback && isCorrectOption && <CheckCircle2 className={`h-[18px] w-[18px] shrink-0 ${theme.text}`} />}
                {currentFeedback && isSelected && !currentFeedback.isCorrect && (
                  <XCircle className="h-[18px] w-[18px] shrink-0 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {currentFeedback && (
          <div
            className={`mt-5 rounded-xl px-4 py-3 text-sm ${
              currentFeedback.isCorrect ? `${theme.bgTint} ${theme.text}` : "bg-orange-50 text-orange-800"
            }`}
          >
            <p className="font-medium">{currentFeedback.isCorrect ? "Correct!" : "Not quite."}</p>
            <p className="mt-1 leading-6 opacity-90">{currentFeedback.explanation}</p>
          </div>
        )}

        <div className="mt-7 flex justify-end">
          {!isLast && currentFeedback && (
            <Button onClick={() => setIndex((i) => i + 1)}>
              Next question <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          {isLast && allAnswered && (
            <Button onClick={handleFinish} disabled={submitting}>
              {submitting ? "Submitting..." : "See results"}
            </Button>
          )}
        </div>
      </div>

      {!currentFeedback && (
        <p className="mt-4 text-center text-xs text-slate-400">
          Not sure? A wrong answer here is just practice — pick your best guess.
        </p>
      )}
    </div>
  );
}
