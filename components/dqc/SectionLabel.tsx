export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2.5 text-[11px] uppercase tracking-wide text-ink-soft">
      {children}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
