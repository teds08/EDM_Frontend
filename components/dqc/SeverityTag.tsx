import { severityColor } from "@/lib/utils";

export function SeverityTag({ severity }: { severity: string }) {
  const color = severityColor(severity);
  return (
    <span
      className="inline-block border-l-[3px] bg-paper py-[3px] pl-[9px] pr-2 font-mono text-[11px] font-bold uppercase tracking-wide"
      style={{ borderColor: color, color }}
    >
      {severity}
    </span>
  );
}
