import { Dimensions } from "@/lib/types";
import { humanizeKey, scoreColor } from "@/lib/utils";

export function VitalsGrid({ dimensions }: { dimensions: Dimensions }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      {Object.entries(dimensions).map(([name, d]) => {
        const color = scoreColor(d.score);
        return (
          <div key={name} className="rounded-md border border-line bg-paper-raised px-3.5 pb-4 pt-3.5">
            <div className="mb-2 text-[11px] uppercase tracking-wide text-ink-soft">
              {humanizeKey(name)}
            </div>
            <div className="font-display text-2xl font-bold leading-none" style={{ color }}>
              {d.score}
            </div>
            <div className="my-2.5 h-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full"
                style={{ width: `${d.score}%`, backgroundColor: color }}
              />
            </div>
            <div className="text-[11px] text-ink-faint">
              {d.issues} issue{d.issues === 1 ? "" : "s"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
