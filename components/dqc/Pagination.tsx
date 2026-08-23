import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, limit, onPageChange }: PaginationProps) {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const pages: (number | "…")[] = [];
  for (let p = Math.max(1, page - 1); p <= Math.min(totalPages, page + 1); p++) pages.push(p);
  if (!pages.includes(1)) {
    pages.unshift(1);
    if (pages[1] !== 2) pages.splice(1, 0, "…");
  }
  if (!pages.includes(totalPages)) {
    if (pages[pages.length - 1] !== totalPages - 1) pages.push("…");
    pages.push(totalPages);
  }

  const btn = (label: string, target: number, opts: { active?: boolean; disabled?: boolean } = {}) => (
    <button
      key={`${label}-${target}`}
      disabled={opts.disabled}
      onClick={() => onPageChange(target)}
      className={cn(
        "flex h-[30px] w-[30px] items-center justify-center rounded border border-line bg-paper font-mono text-xs hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-40",
        opts.active && "border-brand bg-brand text-white hover:border-brand"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line px-[22px] py-4">
      <div className="text-xs text-ink-soft">
        {total > 0 ? `${start}–${end} of ${total}` : "—"}
      </div>
      <div className="flex items-center gap-1.5">
        {btn("‹", page - 1, { disabled: page <= 1 })}
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-ink-faint">
              …
            </span>
          ) : (
            btn(String(p), p, { active: p === page })
          )
        )}
        {btn("›", page + 1, { disabled: page >= totalPages })}
      </div>
    </div>
  );
}
