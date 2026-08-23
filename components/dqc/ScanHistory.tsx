"use client";

import { useEffect, useState } from "react";
import { getAllScans } from "@/lib/api";
import { ScanListItem } from "@/lib/types";
import { SectionLabel } from "@/components/dqc/SectionLabel";
import { Button } from "@/components/ui/button";

function scoreTone(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 70) return "text-amber-600";
  return "text-red-600";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ScanHistoryProps {
  onSelectScan?: (scanId: number) => void;
}

export function ScanHistory({ onSelectScan }: ScanHistoryProps) {
  const [scans, setScans] = useState<ScanListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllScans();
      setScans(data.scans);
    } catch (err) {
      console.warn("Failed to load scan history:", err);
      setError("Couldn't reach the API to load scan history.");
      setScans(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mb-[34px] mt-6">
      <div className="mb-3 flex items-center justify-between">
        <SectionLabel>Scan history</SectionLabel>
        <Button variant="ghost" onClick={load} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </Button>
      </div>

      {loading && !scans && (
        <p className="text-[13px] text-ink-faint">Loading scan history…</p>
      )}

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      {scans && scans.length === 0 && (
        <p className="text-[13px] text-ink-faint">No scans yet.</p>
      )}

      {scans && scans.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-black/10">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-black/10 bg-black/[0.02] text-left text-[11.5px] uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-2 font-medium">File</th>
                <th className="px-4 py-2 font-medium">Records</th>
                <th className="px-4 py-2 font-medium">Issues</th>
                <th className="px-4 py-2 font-medium">Overall</th>
                <th className="px-4 py-2 font-medium">Scanned</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr
                  key={scan.id}
                  className="cursor-pointer border-b border-black/5 last:border-0 hover:bg-black/[0.02]"
                  onClick={() => onSelectScan?.(scan.id)}
                >
                  <td className="px-4 py-2.5">
                    <span className="font-mono">{scan.file_name}</span>
                    <span className="ml-2 text-ink-faint">#{scan.id}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    {scan.total_records.toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5">
                    {scan.total_issues.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2.5 font-semibold ${scoreTone(scan.overall_score)}`}
                  >
                    {scan.overall_score}
                  </td>
                  <td className="px-4 py-2.5 text-ink-faint">
                    {formatDate(scan.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
