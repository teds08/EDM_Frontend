"use client";

import { useState } from "react";
import { TopBar } from "@/components/dqc/TopBar";
import { UploadZone } from "@/components/dqc/UploadZone";
import { ScanManifest } from "@/components/dqc/ScanManifest";
import { ScoreStamp } from "@/components/dqc/ScoreStamp";
import { SectionLabel } from "@/components/dqc/SectionLabel";
import { VitalsGrid } from "@/components/dqc/VitalsGrid";
import { CategoryBreakdown } from "@/components/dqc/CategoryBreakdown";
import { IssuesLedger } from "@/components/dqc/IssuesLedger";
import { ScanHistory } from "@/components/dqc/ScanHistory";
import { ScanDetailCard } from "@/components/dqc/ScanDetailCard";
import { RemediationTips } from "@/components/dqc/RemediationTips";
import { Button } from "@/components/ui/button";
import { scanCsv, getScanById, API_BASE } from "@/lib/api";
import { buildDemoScanResponse } from "@/lib/demo-data";
import { ConnectionStatus, ScanResponse, ScanDetail } from "@/lib/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scan, setScan] = useState<ScanResponse | null>(null);
  const [usingDemo, setUsingDemo] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("idle");

  const [historicalScan, setHistoricalScan] = useState<ScanDetail | null>(null);
  const [loadingHistorical, setLoadingHistorical] = useState(false);

  function handleFileSelected(f: File) {
    setError(null);
    if (!f.name.toLowerCase().endsWith(".csv")) {
      setError("Only .csv files are accepted.");
      return;
    }
    setFile(f);
  }

  function resetUpload() {
    setFile(null);
    setError(null);
  }

  async function handleScan() {
    if (!file) return;
    setScanning(true);
    setError(null);
    try {
      const result = await scanCsv(file);
      setScan(result);
      setUsingDemo(false);
      setStatus("live");
    } catch (err) {
      console.warn("Falling back to demo data:", err);
      setScan(buildDemoScanResponse({ name: file.name, size: file.size }));
      setUsingDemo(true);
      setStatus("demo");
    } finally {
      setScanning(false);
    }
  }

  function handleNewScan() {
    setScan(null);
    setFile(null);
    setStatus("idle");
  }

  async function handleSelectScan(scanId: number) {
    setLoadingHistorical(true);
    try {
      const { scan } = await getScanById(scanId);
      setHistoricalScan(scan);
    } catch (err) {
      console.warn("Failed to load scan detail:", err);
      setError("Couldn't load that scan.");
    } finally {
      setLoadingHistorical(false);
    }
  }

  return (
    <main>
      <TopBar status={status} />

      <div className="mx-auto max-w-[1080px] px-8 pb-20 pt-10">
        {!scan && !historicalScan && (
          <>
            <UploadZone
              file={file}
              scanning={scanning}
              error={error}
              onFileSelected={handleFileSelected}
              onClear={resetUpload}
              onScan={handleScan}
            />
            <ScanHistory onSelectScan={handleSelectScan} />
            {loadingHistorical && (
              <p className="text-center text-[13px] text-ink-faint">
                Loading scan…
              </p>
            )}
          </>
        )}

        {historicalScan && (
          <ScanDetailCard
            scan={historicalScan}
            onBack={() => setHistoricalScan(null)}
          />
        )}

        {scan && (
          <>
            <div className="mb-[34px] flex flex-wrap gap-7">
              <ScanManifest
                scanId={scan.scanId}
                fileName={scan.file.name}
                fileSize={scan.file.size}
                totalRecords={scan.result.totalRecords}
              />
              <ScoreStamp score={scan.result.scores.overall} />
            </div>

            <div className="mb-[34px]">
              <SectionLabel>Quality dimensions</SectionLabel>
              <VitalsGrid dimensions={scan.result.dimensions} />
            </div>

            <div className="mb-[34px]">
              <SectionLabel>Issue breakdown</SectionLabel>
              <CategoryBreakdown categories={scan.result.issueCategories} />
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" onClick={handleNewScan}>
                New scan
              </Button>
            </div>
            <div className="mb-6">
              <SectionLabel>Issues</SectionLabel>
              <IssuesLedger
                scanId={scan.scanId}
                usingDemo={usingDemo}
                onFallbackToDemo={() => {
                  setUsingDemo(true);
                  setStatus("demo");
                }}
              />
            </div>
            <RemediationTips categories={scan.result.issueCategories} />

            {usingDemo && (
              <p className="mt-2 text-center text-[11.5px] text-ink-faint">
                Showing demo data — couldn&apos;t reach the API at{" "}
                <span className="font-mono">{API_BASE}</span>, so this is sample
                output for preview.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
