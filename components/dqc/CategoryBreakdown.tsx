import { IssueCategories } from "@/lib/types";

const CATEGORY_META: Record<keyof IssueCategories, { label: string; color: string }> = {
  missingValues: { label: "Missing values", color: "#1F3A5F" },
  invalidDates: { label: "Invalid dates", color: "#B23A2E" },
  invalidEmails: { label: "Invalid emails", color: "#B4791C" },
  inconsistentDates: { label: "Inconsistent dates", color: "#5F6B54" },
  inconsistentTestResults: { label: "Inconsistent test results", color: "#7A1F1B" },
  duplicates: { label: "Duplicates", color: "#2F6F5C" },
};

export function CategoryBreakdown({ categories }: { categories: IssueCategories }) {
  const total = Object.values(categories).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="rounded-md border border-line bg-paper-raised px-6 py-5">
      <div className="mb-4 flex h-2.5 overflow-hidden rounded-full bg-line">
        {(Object.keys(categories) as (keyof IssueCategories)[]).map((key) => {
          const count = categories[key];
          if (count === 0) return null;
          return (
            <span
              key={key}
              style={{ width: `${(count / total) * 100}%`, background: CATEGORY_META[key].color }}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(categories) as (keyof IssueCategories)[]).map((key) => (
          <div key={key} className="flex items-center gap-2 text-[12.5px]">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-sm"
              style={{ background: CATEGORY_META[key].color }}
            />
            <span className="flex-1 text-ink-soft">{CATEGORY_META[key].label}</span>
            <span className="font-mono font-bold">{categories[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
