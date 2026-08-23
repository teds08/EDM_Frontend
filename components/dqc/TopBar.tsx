import { ConnectionStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<ConnectionStatus, string> = {
  idle: "Not connected",
  live: "Connected to API",
  demo: "Demo data",
};

export function TopBar({ status }: { status: ConnectionStatus }) {
  return (
    <div className="flex items-center justify-between border-b border-line bg-paper-raised px-8 py-[18px]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md border-2 border-ink bg-ink font-display text-xs font-bold tracking-tight text-paper-raised">
          DQ
        </div>
        <div>
          <div className="font-display text-[15px] font-semibold tracking-tight">
            Data Quality Checker
          </div>
          <div className="text-[11px] tracking-wide text-ink-soft">
            CSV inspection &amp; scoring
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-ink-soft">
        <span
          className={cn(
            "h-[7px] w-[7px] rounded-full bg-ink-faint",
            status === "live" && "bg-good shadow-[0_0_0_3px_theme(colors.good.soft)]",
            status === "demo" && "bg-sev-medium shadow-[0_0_0_3px_#F2E4C8]"
          )}
        />
        <span>{LABELS[status]}</span>
      </div>
    </div>
  );
}
