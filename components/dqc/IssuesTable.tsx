import { Issue } from "@/lib/types";
import { SeverityTag } from "./SeverityTag";

export function IssuesTable({ issues }: { issues: Issue[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {["Row", "Column", "Value", "Issue", "Dimension", "Severity"].map((h) => (
            <th
              key={h}
              className="border-b border-line bg-paper px-[22px] py-2.5 text-left text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {issues.map((issue, i) => {
          const isEmpty = issue.value === "" || issue.value === null || issue.value === undefined;
          return (
            <tr key={`${issue.row}-${i}`} className="hover:bg-paper">
              <td className="border-b border-line px-[22px] py-3 align-top font-mono text-ink-faint last:border-b-0">
                {issue.row}
              </td>
              <td className="border-b border-line px-[22px] py-3 align-top text-[13px] last:border-b-0">
                {issue.column}
              </td>
              <td className="max-w-[160px] truncate border-b border-line px-[22px] py-3 align-top font-mono text-xs text-ink-soft last:border-b-0">
                {isEmpty ? <span className="italic text-ink-faint">empty</span> : String(issue.value)}
              </td>
              <td className="border-b border-line px-[22px] py-3 align-top text-[13px] last:border-b-0">
                {issue.issue}
              </td>
              <td className="border-b border-line px-[22px] py-3 align-top text-[13px] last:border-b-0">
                {issue.dimension}
              </td>
              <td className="border-b border-line px-[22px] py-3 align-top last:border-b-0">
                <SeverityTag severity={String(issue.severity)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
