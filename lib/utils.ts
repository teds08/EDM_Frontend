import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Data-driven color per score/severity. Kept as hex (not Tailwind classes)
 * because these values depend on runtime data, not fixed design tokens. */
export const COLORS = {
  good: "#2F6F5C",
  medium: "#B4791C",
  high: "#B23A2E",
  critical: "#7A1F1B",
  low: "#5F6B54",
  brand: "#1F3A5F",
};

export function scoreColor(score: number): string {
  if (score >= 90) return COLORS.good;
  if (score >= 75) return COLORS.medium;
  return COLORS.high;
}

export function verdictLabel(score: number): "PASS" | "REVIEW" | "FAIL" {
  if (score >= 90) return "PASS";
  if (score >= 75) return "REVIEW";
  return "FAIL";
}

export function severityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case "critical":
      return COLORS.critical;
    case "high":
      return COLORS.high;
    case "medium":
      return COLORS.medium;
    default:
      return COLORS.low;
  }
}

/** camelCase -> "Camel Case" */
export function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}
