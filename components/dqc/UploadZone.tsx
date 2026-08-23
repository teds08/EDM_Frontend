"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { humanSize, cn } from "@/lib/utils";

interface UploadZoneProps {
  file: File | null;
  scanning: boolean;
  error: string | null;
  onFileSelected: (file: File) => void;
  onClear: () => void;
  onScan: () => void;
}

export function UploadZone({
  file,
  scanning,
  error,
  onFileSelected,
  onClear,
  onScan,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(fileList: FileList | null) {
    const f = fileList?.[0];
    if (!f) return;
    onFileSelected(f);
  }

  return (
    <div>
      {!file && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "upload-corners cursor-pointer rounded-lg border-[1.5px] border-dashed border-ink-faint bg-paper-raised px-6 py-14 text-center transition-colors",
            dragging && "border-brand bg-brand-soft"
          )}
        >
          <div className="mb-3.5 text-2xl opacity-70">▤</div>
          <h2 className="mb-1.5 font-display text-lg font-semibold">
            Drop a CSV to begin inspection
          </h2>
          <p className="text-[13.5px] text-ink-soft">
            or click to browse — only .csv files are accepted
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {file && (
        <>
          <div className="flex items-center justify-between rounded-md border border-line bg-paper-raised px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[13.5px] font-medium">{file.name}</span>
              <span className="font-mono text-xs text-ink-soft">{humanSize(file.size)}</span>
            </div>
            <button
              onClick={onClear}
              className="font-body text-[13px] text-ink-soft hover:text-ink"
            >
              Remove
            </button>
          </div>
          <div className="mt-[18px] flex justify-end gap-2.5">
            <Button variant="ghost" onClick={onClear} disabled={scanning}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onScan} disabled={scanning}>
              {scanning ? "Scanning…" : "Run scan"}
            </Button>
          </div>
        </>
      )}

      {error && (
        <div className="mt-4 rounded-md border border-[#E2B4AE] bg-[#FBEAE8] px-4 py-3 text-[13px] text-sev-critical">
          {error}
        </div>
      )}
    </div>
  );
}
