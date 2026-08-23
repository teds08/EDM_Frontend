import { Issue, IssuesQuery, IssuesResult, ScanResponse } from "./types";

/**
 * Demo/fallback data used only when the real API at API_BASE can't be
 * reached — keeps the UI showable without a running backend, and mirrors
 * the sample response shape you provided.
 */
export function buildDemoScanResponse(file: { name: string; size: number }): ScanResponse {
  return {
    success: true,
    scanId: 8,
    file,
    result: {
      totalRecords: 500,
      totalIssues: 1254,
      summary: { critical: 0, high: 278, medium: 120, low: 856 },
      issueCategories: {
        missingValues: 120,
        invalidDates: 219,
        invalidEmails: 27,
        inconsistentDates: 640,
        inconsistentTestResults: 216,
        duplicates: 0,
      },
      dimensions: {
        completeness: { issues: 120, score: 95 },
        accuracy: { issues: 246, score: 84 },
        consistency: { issues: 856, score: 43 },
        timeliness: { issues: 5, score: 99 },
        reliability: { issues: 27, score: 97 },
        relevance: { issues: 0, score: 100 },
      },
      scores: {
        completeness: 95,
        accuracy: 84,
        consistency: 43,
        timeliness: 99,
        reliability: 97,
        relevance: 100,
        overall: 86,
      },
    },
  };
}

const TEMPLATES: Omit<Issue, "row">[] = [
  { column: "Test Result", issue: "Missing value", dimension: "Completeness", severity: "Medium", value: "" },
  { column: "Date Collected", issue: "Invalid date format", dimension: "Accuracy", severity: "High", value: "13/45/2023" },
  { column: "Email", issue: "Invalid email format", dimension: "Reliability", severity: "Low", value: "jdoe[at]mail" },
  { column: "Date Reported", issue: "Inconsistent with Date Collected", dimension: "Consistency", severity: "Medium", value: "2023-01-02" },
  { column: "Result Flag", issue: "Inconsistent test result label", dimension: "Consistency", severity: "High", value: "Pos/Positive" },
  { column: "Patient ID", issue: "Duplicate record", dimension: "Reliability", severity: "Low", value: "PT-10432" },
  { column: "Age", issue: "Missing value", dimension: "Completeness", severity: "Low", value: "" },
];

let cache: Issue[] | null = null;

function allDemoIssues(): Issue[] {
  if (cache) return cache;
  cache = Array.from({ length: 137 }, (_, i) => ({
    row: i + 3,
    ...TEMPLATES[i % TEMPLATES.length],
  }));
  return cache;
}

export function queryDemoIssues(query: IssuesQuery): IssuesResult {
  let rows = allDemoIssues();

  if (query.search) {
    const q = query.search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.column.toLowerCase().includes(q) ||
        r.issue.toLowerCase().includes(q) ||
        String(r.value).toLowerCase().includes(q)
    );
  }
  if (query.dimension) rows = rows.filter((r) => r.dimension === query.dimension);
  if (query.severity) rows = rows.filter((r) => r.severity === query.severity);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / query.limit));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * query.limit;

  return {
    issues: rows.slice(start, start + query.limit),
    total,
    page,
    totalPages,
  };
}
