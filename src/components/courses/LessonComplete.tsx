"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Circle } from "lucide-react";

export function LessonComplete({
  lessonId,
  initialCompleted,
}: {
  lessonId: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [failed, setFailed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function toggle() {
    const next = !completed;
    setCompleted(next);
    setFailed(false);

    startTransition(async () => {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: next }),
      });

      if (!res.ok) {
        setCompleted(!next);
        setFailed(true);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        onClick={toggle}
        disabled={isPending}
        variant={completed ? "outline" : "primary"}
        size="lg"
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
        ) : (
          <Circle className="h-4 w-4" aria-hidden="true" />
        )}
        {completed ? "Completed" : "Mark as complete"}
      </Button>

      {failed && (
        <p role="alert" className="text-sm text-red-700">
          Could not save your progress. Please try again.
        </p>
      )}
    </div>
  );
}
