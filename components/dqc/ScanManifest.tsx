import { humanSize } from "@/lib/utils";

interface ScanManifestProps {
  scanId: number;
  fileName: string;
  fileSize: number;
  totalRecords: number;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-[3px] text-[10.5px] uppercase tracking-wide text-ink-soft">
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

export function ScanManifest({ scanId, fileName, fileSize, totalRecords }: ScanManifestProps) {
  return (
    <div className="manifest-perforation relative flex-1 min-w-[280px] overflow-hidden rounded-md border border-line bg-paper-raised py-[22px] pl-[34px] pr-[26px]">
      <div className="mb-3 text-[10.5px] uppercase tracking-[1.4px] text-ink-faint">
        Scan manifest
      </div>
      <div className="grid grid-cols-2 gap-x-7 gap-y-3.5">
        <Field label="Scan ID" value={`#${scanId}`} />
        <Field label="File" value={fileName} />
        <Field label="Size" value={humanSize(fileSize)} />
        <Field label="Records" value={totalRecords.toLocaleString()} />
      </div>
    </div>
  );
}
