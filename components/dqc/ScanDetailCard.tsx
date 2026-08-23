"use client";

import { ScanDetail } from "@/lib/types";
import { ScoreStamp } from "@/components/dqc/ScoreStamp";
import { SectionLabel } from "@/components/dqc/SectionLabel";
import { Button } from "@/components/ui/button";

interface ScanDetailCardProps {
  scan: ScanDetail;
  onBack: () => void;
}

const DIMENSION_LABELS: { key: keyof ScanDetail; label: string }[] = [
  { key: "completeness_score", label: "Completeness" },
  { key: "accuracy_score", label: "Accuracy" },
  { key: "consistency_score", label: "Consistency" },
  { key: "timeliness_score", label: "Timeliness" },
  { key: "reliability_score", label: "Reliability" },
  { key: "relevance_score", label: "Relevance" },
];

export function ScanDetailCard({ scan, onBack }: ScanDetailCardProps) {
  return (
    <div>
      <div className="mb-[34px] flex flex-wrap items-start justify-between gap-7">
        <div>
          <SectionLabel>Past scan</SectionLabel>
          <p className="mt-1 font-mono text-[13px]">
            {scan.file_name} <span className="text-ink-faint">#{scan.id}</span>
          </p>
          <p className="text-[12px] text-ink-faint">
            {scan.total_records.toLocaleString()} records ·{" "}
            {scan.total_issues.toLocaleString()} issues ·{" "}
            {new Date(scan.created_at).toLocaleString()}
          </p>
        </div>
        <ScoreStamp score={scan.overall_score} />
      </div>

      <div className="mb-[34px]">
        <SectionLabel>Quality dimensions</SectionLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DIMENSION_LABELS.map(({ key, label }) => (
            <div key={key} className="rounded-xl border border-black/10 p-4">
              <p className="text-[11.5px] uppercase tracking-wide text-ink-faint">
                {label}
              </p>
              <p className="mt-1 text-[22px] font-semibold">{scan[key]}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-6 text-[12px] text-ink-faint">
        Per-issue breakdown and category counts aren&apos;t available for past
        scans yet — only summary scores.
      </p>

      <div className="flex justify-end">
        <Button variant="ghost" onClick={onBack}>
          Back to history
        </Button>
      </div>
    </div>
  );
}
