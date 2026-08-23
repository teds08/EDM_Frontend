import { scoreColor, verdictLabel } from "@/lib/utils";

export function ScoreStamp({ score }: { score: number }) {
  const color = scoreColor(score);

  return (
    <div className="flex w-[158px] flex-shrink-0 items-center justify-center">
      <div
        className="stamp-ring flex h-[150px] w-[150px] -rotate-[7deg] flex-col items-center justify-center rounded-full border-[3px]"
        style={{ borderColor: color, color }}
      >
        <div className="font-display text-[38px] font-bold leading-none">{score}</div>
        <div className="mt-px text-[10px] opacity-70">/ 100</div>
        <div className="mt-1.5 font-display text-xs font-bold tracking-[1.6px]">
          {verdictLabel(score)}
        </div>
      </div>
    </div>
  );
}
