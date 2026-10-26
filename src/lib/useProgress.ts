"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Progress is kept in the browser.
 *
 * It used to be rows in a database behind a login, which meant the prototype
 * could not be deployed without hosting Postgres — and it meant a test
 * participant had to create an account before they could try anything. For a
 * prototype being handed to five people, neither is worth it.
 *
 * Trade-off, stated plainly: progress is per-browser and is lost if someone
 * clears their site data. Fine for testing; not fine for a real product, and
 * one of the things to revisit after the research.
 *
 * localStorage is an external store, so this uses useSyncExternalStore rather
 * than syncing it into state inside an effect. That keeps server rendering and
 * hydration consistent: React renders the empty server snapshot first, then
 * swaps in the real value once hydrated.
 */

const KEY = "integreernl.progress.v1";

export interface Result {
  correct: number;
  total: number;
}

export type ProgressMap = Record<string, Result>;

/** Stable empty value, so the server snapshot never changes identity. */
const EMPTY: ProgressMap = Object.freeze({});

// getSnapshot must return a referentially stable value or React re-renders
// forever, so the parsed object is cached against the raw string it came from.
let cachedRaw: string | null = null;
let cachedValue: ProgressMap = EMPTY;

function getSnapshot(): ProgressMap {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // Private mode or blocked storage.
    return EMPTY;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as ProgressMap) : EMPTY;
    } catch {
      cachedValue = EMPTY;
    }
  }
  return cachedValue;
}

const getServerSnapshot = (): ProgressMap => EMPTY;

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keeps two tabs in step.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function write(value: ProgressMap) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Losing progress is not worth throwing over.
  }
  listeners.forEach((l) => l());
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /** Records a finished run, keeping the learner's best score. */
  const save = useCallback((slug: string, result: Result) => {
    const current = getSnapshot();
    const best = Math.max(current[slug]?.correct ?? 0, result.correct);
    write({ ...current, [slug]: { correct: best, total: result.total } });
  }, []);

  const reset = useCallback(() => write({}), []);

  return { progress, save, reset };
}
