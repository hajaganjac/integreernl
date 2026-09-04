"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Circle } from "lucide-react";
import { fireConfetti } from "@/lib/confetti";

export function LessonComplete({
  lessonId,
  initialCompleted,
  accentColor,
}: {
  lessonId: string;
  initialCompleted: boolean;
  accentColor?: string;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function toggle() {
    const next = !completed;
    setCompleted(next);

    if (next) {
      fireConfetti(accentColor ? [accentColor, "#f97316"] : undefined);
    }

    startTransition(async () => {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: next }),
      });

      if (!res.ok) {
        setCompleted(!next);
        toast.error("Could not save progress. Please try again.");
        return;
      }

      toast.success(next ? "Lesson marked complete" : "Marked as not complete");
      router.refresh();
    });
  }

  return (
    <Button
      onClick={toggle}
      disabled={isPending}
      variant={completed ? "outline" : "primary"}
      size="lg"
    >
      {completed ? <CheckCircle2 className="h-4 w-4 text-brand-500" /> : <Circle className="h-4 w-4" />}
      {completed ? "Completed" : "Mark as complete"}
    </Button>
  );
}
