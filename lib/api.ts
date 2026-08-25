import {
  AllScansResponse,
  IssuesQuery,
  IssuesResult,
  ScanResponse,
  ScanDetailResponse,
} from "./types";

// Point this at your Express server.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function scanCsv(file: File): Promise<ScanResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/scan`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Scan request failed (${res.status})`);

  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Scan failed");
  return json as ScanResponse;
}

export async function fetchIssues(
  scanId: number,
  query: IssuesQuery,
): Promise<IssuesResult> {
  const params = new URLSearchParams();
  params.set("page", String(query.page));
  params.set("limit", String(query.limit));
  if (query.search) params.set("search", query.search);
  if (query.dimension) params.set("dimension", query.dimension);
  if (query.severity) params.set("severity", query.severity);

  const res = await fetch(
    `${API_BASE}/scans/${scanId}/issues?${params.toString()}`,
  );
  if (!res.ok) throw new Error(`Failed to load issues (${res.status})`);

  const json = await res.json();
  return normalizeIssuesResponse(json, query);
}

export async function getAllScans(): Promise<AllScansResponse> {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error(`Failed to fetch scan history (${res.status})`);

  const json = await res.json();
  if (!json.success)
    throw new Error(json.message ?? "Failed to load scan history");
  return json as AllScansResponse;
}

export async function getScanById(scanId: number): Promise<ScanDetailResponse> {
  const res = await fetch(`${API_BASE}/${scanId}`);
  if (!res.ok)
    throw new Error(`Failed to fetch scan ${scanId} (${res.status})`);

  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to load scan");
  return json as ScanDetailResponse;
}

/**
 * The exact shape of GET /scans/:scanId/issues wasn't specified, so this
 * normalizes a couple of plausible shapes into IssuesResult. If your real
 * response looks different, this is the only place to adjust.
 */
function normalizeIssuesResponse(json: any, query: IssuesQuery): IssuesResult {
  const body = json.data ?? json.result ?? json;
  const issues = body.issues ?? body.data ?? [];
  const pagination = body.pagination ?? json.pagination ?? {};
  const total = pagination.total ?? body.total ?? issues.length;
  const totalPages =
    pagination.totalPages ?? Math.max(1, Math.ceil(total / query.limit));
  const page = pagination.page ?? query.page;

  return { issues, total, page, totalPages };
}
