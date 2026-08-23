export interface ScanFileInfo {
  name: string;
  size: number;
}

export interface DimensionScore {
  issues: number;
  score: number;
}

export interface Dimensions {
  completeness: DimensionScore;
  accuracy: DimensionScore;
  consistency: DimensionScore;
  timeliness: DimensionScore;
  reliability: DimensionScore;
  relevance: DimensionScore;
}

export interface IssueCategories {
  missingValues: number;
  invalidDates: number;
  invalidEmails: number;
  inconsistentDates: number;
  inconsistentTestResults: number;
  duplicates: number;
}

export interface ScanScores {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  reliability: number;
  relevance: number;
  overall: number;
}

export interface ScanListItem {
  id: number;
  file_name: string;
  total_records: number;
  total_issues: number;
  completeness_score: number;
  accuracy_score: number;
  consistency_score: number;
  timeliness_score: number;
  reliability_score: number;
  relevance_score: number;
  overall_score: number;
  created_at: string;
}

export interface AllScansResponse {
  success: boolean;
  scans: ScanListItem[];
}

export interface ScanDetail {
  id: number;
  file_name: string;
  total_records: number;
  total_issues: number;
  completeness_score: number;
  accuracy_score: number;
  consistency_score: number;
  timeliness_score: number;
  reliability_score: number;
  relevance_score: number;
  overall_score: number;
  created_at: string;
}

export interface ScanDetailResponse {
  success: boolean;
  scan: ScanDetail;
}

export interface ScanSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface ScanResult {
  totalRecords: number;
  totalIssues: number;
  summary: ScanSummary;
  issueCategories: IssueCategories;
  dimensions: Dimensions;
  scores: ScanScores;
}

export interface ScanResponse {
  success: boolean;
  scanId: number;
  file: ScanFileInfo;
  result: ScanResult;
}

export type Severity = "Critical" | "High" | "Medium" | "Low";

export type DimensionName =
  | "Completeness"
  | "Accuracy"
  | "Consistency"
  | "Timeliness"
  | "Reliability"
  | "Relevance";

export interface Issue {
  row: number;
  column: string;
  value: string | number | null;
  issue: string;
  dimension: DimensionName | string;
  severity: Severity | string;
}

export interface IssuesQuery {
  page: number;
  limit: number;
  search?: string;
  dimension?: string;
  severity?: string;
}

export interface IssuesResult {
  issues: Issue[];
  total: number;
  page: number;
  totalPages: number;
}

export type ConnectionStatus = "idle" | "live" | "demo";
