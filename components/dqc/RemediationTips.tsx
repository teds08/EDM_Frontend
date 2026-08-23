"use client";

import { IssueCategories } from "@/lib/types";
import { SectionLabel } from "@/components/dqc/SectionLabel";

interface CategoryGuidance {
  label: string;
  fix: string;
  policy: string;
}

const GUIDANCE: Record<keyof IssueCategories, CategoryGuidance> = {
  missingValues: {
    label: "Missing values",
    fix: "Backfill or flag missing fields, and enforce required-field validation at the point of entry.",
    policy:
      "Mandate non-null constraints on critical fields before records are accepted into the pipeline.",
  },
  invalidDates: {
    label: "Invalid dates",
    fix: "Normalize date fields to a single ISO 8601 format and reject unparseable values at ingestion.",
    policy:
      "Adopt a canonical date standard (ISO 8601) enforced by schema validation across all sources.",
  },
  invalidEmails: {
    label: "Invalid emails",
    fix: "Apply email format validation (regex + domain check) before records are stored.",
    policy:
      "Require format validation on all email fields at the point of entry, not after the fact.",
  },
  inconsistentDates: {
    label: "Inconsistent dates",
    fix: "Reconcile differing date formats across source systems into one canonical representation.",
    policy:
      "Standardize on a single date/time format across all upstream systems feeding this dataset.",
  },
  inconsistentTestResults: {
    label: "Inconsistent test results",
    fix: "Cross-check result values against an approved, controlled vocabulary and correct outliers.",
    policy:
      "Maintain a controlled vocabulary for test result fields and validate new entries against it.",
  },
  duplicates: {
    label: "Duplicate records",
    fix: "Deduplicate using a stable unique key (e.g., ID + timestamp) and merge or discard redundant rows.",
    policy:
      "Enforce uniqueness constraints on primary identifiers at the database level.",
  },
};

interface RemediationTipsProps {
  categories: IssueCategories;
}

export function RemediationTips({ categories }: RemediationTipsProps) {
  const active = (Object.keys(GUIDANCE) as (keyof IssueCategories)[])
    .filter((key) => (categories[key] ?? 0) > 0)
    .sort((a, b) => (categories[b] ?? 0) - (categories[a] ?? 0));

  if (active.length === 0) return null;

  const policies = Array.from(
    new Set(active.map((key) => GUIDANCE[key].policy)),
  ).slice(0, 3);

  return (
    <div className="mb-[34px]">
      <SectionLabel>Tips</SectionLabel>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-black/10 p-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
            Propose fixes
          </p>
          <ul className="space-y-3">
            {active.map((key) => (
              <li key={key} className="text-[13px] leading-snug">
                <span className="font-medium">{GUIDANCE[key].label}</span>
                <span className="ml-1.5 text-ink-faint">
                  ({categories[key].toLocaleString()})
                </span>
                <p className="mt-0.5 text-ink-faint">{GUIDANCE[key].fix}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-black/10 p-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
            Prevent future errors
          </p>
          <ul className="space-y-3">
            {policies.map((policy, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-snug">
                <span className="text-ink-faint">{i + 1}.</span>
                <span>{policy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
