"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchIssues } from "@/lib/api";
import { queryDemoIssues } from "@/lib/demo-data";
import { IssuesResult } from "@/lib/types";
import { LedgerToolbar } from "./LedgerToolbar";
import { IssuesTable } from "./IssuesTable";
import { Pagination } from "./Pagination";

const LIMIT = 10;

interface IssuesLedgerProps {
  scanId: number;
  usingDemo: boolean;
  onFallbackToDemo: () => void;
}

export function IssuesLedger({ scanId, usingDemo, onFallbackToDemo }: IssuesLedgerProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dimension, setDimension] = useState("");
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState<IssuesResult | null>(null);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      const query = { page: targetPage, limit: LIMIT, search, dimension, severity };
      try {
        if (usingDemo) {
          setData(queryDemoIssues(query));
        } else {
          setData(await fetchIssues(scanId, query));
        }
      } catch (err) {
        console.warn("Issues fetch failed, using demo data:", err);
        onFallbackToDemo();
        setData(queryDemoIssues(query));
      } finally {
        setLoading(false);
      }
    },
    [scanId, usingDemo, search, dimension, severity, onFallbackToDemo]
  );

  // Reload whenever filters or the scan change (resets to page 1).
  useEffect(() => {
    setPage(1);
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanId, usingDemo, dimension, severity]);

  // Debounced search.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      load(1);
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    load(nextPage);
  }

  return (
    <div className="rounded-md border border-line bg-paper-raised">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]">
        <div className="font-display text-[15px] font-semibold">Issue ledger</div>
        <div className="text-xs text-ink-soft">
          {data ? `${data.total.toLocaleString()} issue${data.total === 1 ? "" : "s"}` : "—"}
        </div>
      </div>

      <LedgerToolbar
        search={search}
        dimension={dimension}
        severity={severity}
        onSearchChange={setSearch}
        onDimensionChange={setDimension}
        onSeverityChange={setSeverity}
      />

      {loading && <div className="px-5 py-10 text-center text-[13px] text-ink-soft">Loading issues…</div>}

      {!loading && data && data.issues.length === 0 && (
        <div className="px-5 py-[60px] text-center text-[13.5px] text-ink-soft">
          No issues match these filters.
        </div>
      )}

      {!loading && data && data.issues.length > 0 && <IssuesTable issues={data.issues} />}

      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          total={data.total}
          limit={LIMIT}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
