import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";

const DIMENSIONS = [
  "Completeness",
  "Accuracy",
  "Consistency",
  "Timeliness",
  "Reliability",
  "Relevance",
];
const SEVERITIES = ["Critical", "High", "Medium", "Low"];

interface LedgerToolbarProps {
  search: string;
  dimension: string;
  severity: string;
  onSearchChange: (value: string) => void;
  onDimensionChange: (value: string) => void;
  onSeverityChange: (value: string) => void;
}

export function LedgerToolbar({
  search,
  dimension,
  severity,
  onSearchChange,
  onDimensionChange,
  onSeverityChange,
}: LedgerToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2.5 px-[22px] mt-[18px] pb-[18px]">
      <Input
        placeholder="Search issues, columns, values…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="min-w-[160px] flex-1"
      />
      <SelectNative
        value={dimension}
        onChange={(e) => onDimensionChange(e.target.value)}
      >
        <option value="">All dimensions</option>
        {DIMENSIONS.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </SelectNative>
      <SelectNative
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value)}
      >
        <option value="">All severities</option>
        {SEVERITIES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </SelectNative>
    </div>
  );
}
