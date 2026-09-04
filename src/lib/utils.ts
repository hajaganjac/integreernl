import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const EXAM_PART_META = {
  READING: { label: "Reading", nl: "Lezen", color: "brand" },
  WRITING: { label: "Writing", nl: "Schrijven", color: "accent" },
  LISTENING: { label: "Listening", nl: "Luisteren", color: "brand" },
  SPEAKING: { label: "Speaking", nl: "Spreken", color: "accent" },
  KNM: { label: "Dutch Society", nl: "KNM", color: "brand" },
} as const;
