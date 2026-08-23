# Data Quality Checker — Next.js + shadcn/ui

## Setup

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_BASE at your Express API
npm run dev
```

## Structure

- `app/page.tsx` — orchestrates upload → scan → report state.
- `app/layout.tsx` / `app/globals.css` — fonts (next/font: Space Grotesk, Inter,
  JetBrains Mono) and the small hand-written CSS for the ticket perforation,
  stamp ring, and dropzone corners (everything else is Tailwind utilities).
- `components/dqc/*` — one component per section: TopBar, UploadZone,
  ScanManifest, ScoreStamp, VitalsGrid, CategoryBreakdown, IssuesLedger
  (+ LedgerToolbar, IssuesTable, Pagination, SeverityTag).
- `components/ui/*` — shadcn-style primitives (button, input, card). `select-native.tsx`
  is a plain styled `<select>`; swap in `@radix-ui/react-select` if you want a
  fully custom-rendered dropdown.
- `lib/api.ts` — calls your real routes: `POST /scan` and
  `GET /scans/:scanId/issues?page&limit&search&dimension&severity`.
- `lib/demo-data.ts` — fallback sample data (from your provided JSON) shown
  automatically if the API can't be reached, so the UI is always previewable.
- `lib/types.ts`, `lib/utils.ts` — shared types and helpers (score/severity
  colors, formatting).

## Note on the issues response shape

`getIssues`'s exact response shape wasn't specified, so `lib/api.ts` ->
`normalizeIssuesResponse()` handles a few likely shapes (`{data:{issues,
pagination}}`, `{issues, total}`, etc.). If your real response differs,
that's the only function to adjust.
