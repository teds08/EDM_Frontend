# Data Quality Checker — Next.js + shadcn/ui

## Setup

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_BASE at your Express API
npm run dev
```

# Document Quality Control Application: User & Developer Guide

## Overview

This guide provides a comprehensive introduction to the Document Quality Control (DQC) application for both end users and developers who wish to understand, customize, or extend the system.

The DQC application enables users to upload documents, scan them for quality issues, view detailed quality metrics, and analyze results through an interactive dashboard interface.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Project Structure](#project-structure)
3. [Component Reference](#component-reference)
4. [API Integration](#api-integration)
5. [Data Handling](#data-handling)
6. [Customization Guide](#customization-guide)
7. [Getting Started](#getting-started)

---

## System Architecture

### High-Level Workflow

The application follows a three-stage workflow:

1. **Upload** — Users select and upload documents via the dropzone interface
2. **Scan** — Documents are processed and analyzed for quality issues
3. **Report** — Results are displayed with detailed metrics, breakdowns, and issue logs

This workflow is orchestrated by the main application page (`app/page.tsx`), which manages the state transitions between each stage.

---

## Project Structure

### Core Application Files

**`app/page.tsx`**
- Main entry point that orchestrates the entire upload → scan → report workflow
- Manages application state and stage transitions
- Handles user interactions and API communication

**`app/layout.tsx` & `app/globals.css`**
- Application-wide layout configuration and styling
- Typography setup using Next.js font optimization (Space Grotesk, Inter, JetBrains Mono)
- Custom CSS for visual elements (ticket perforation effect, stamp ring, dropzone corners)
- Remaining styling uses Tailwind CSS utility classes

### Component Organization

**`components/dqc/`** — Domain-specific UI sections

Each section has its own dedicated component:

| Component | Purpose |
|-----------|---------|
| `TopBar` | Navigation and header area |
| `UploadZone` | File upload interface with drag-and-drop support |
| `ScanManifest` | Displays scan configuration and progress |
| `ScoreStamp` | Shows overall quality score prominently |
| `VitalsGrid` | Key metrics summary (counts, percentages, classifications) |
| `CategoryBreakdown` | Issues organized by category with visual representation |
| `IssuesLedger` | Detailed table of all issues with filtering and pagination |
| `LedgerToolbar` | Search and filter controls for the issues table |
| `IssuesTable` | Paginated, sortable table of detected issues |
| `Pagination` | Navigation controls for multi-page results |
| `SeverityTag` | Visual badge indicating issue severity levels |

**`components/ui/`** — Reusable UI Primitives

Foundational components following shadcn design patterns:
- `button` — Standard button component
- `input` — Text input field
- `card` — Content container
- `select-native.tsx` — Native HTML `<select>` with styling (can be upgraded to Radix UI for fully custom rendering)

### Utility & Logic Files

**`lib/api.ts`**
- Handles all API communication
- Provides methods for document scanning: `POST /scan`
- Provides methods for retrieving issues: `GET /scans/:scanId/issues`
- Supports filtering, pagination, and search parameters

**`lib/demo-data.ts`**
- Contains fallback sample data for demonstration and testing
- Automatically displayed if the API is unavailable
- Ensures the UI is always viewable during development or troubleshooting

**`lib/types.ts`**
- Defines TypeScript interfaces for all data structures
- Ensures type safety across the application

**`lib/utils.ts`**
- Shared utility functions (color mapping for scores/severity, formatting helpers)
- Centralized logic for consistent data presentation

---

## Component Reference

### DQC Components Deep Dive

#### Upload Zone
Provides a drag-and-drop interface for document selection. Communicates uploaded files to the parent component for processing.

#### Scan Manifest
Displays the currently processing or completed scan details, including:
- Document name and metadata
- Scan start/completion timestamps
- Overall scan status

#### Score Stamp
A prominent visual element showing the overall document quality score. Uses color coding to indicate quality level at a glance.

#### Vitals Grid
Summary statistics presented in a grid layout:
- Total issues identified
- Issues by severity (critical, high, medium, low)
- Quality classification
- Document compliance status

#### Category Breakdown
Visualizes issues grouped by category (e.g., formatting, content, structure). Helps users quickly identify problem areas.

#### Issues Ledger
A comprehensive, paginated table of all detected issues with:
- Issue ID and title
- Description
- Severity level (color-coded)
- Category
- Affected location or section
- Status (open, reviewed, resolved)

**Features:**
- Search across issue descriptions
- Filter by category and severity
- Configurable page size
- Sortable columns

---

## API Integration

### Core API Methods

The application communicates with two primary endpoints:

**Scan Document**
```
POST /scan
```
Uploads and processes a document for quality analysis.

**Retrieve Issues**
```
GET /scans/:scanId/issues?page={page}&limit={limit}&search={query}&dimension={category}&severity={level}
```
Fetches issues for a completed scan with optional filtering.

### Response Handling

The application includes smart response normalization in `normalizeIssuesResponse()` that handles multiple possible API response shapes:

- `{ data: { issues: [...], pagination: {...} } }`
- `{ issues: [...], total: number }`
- Other common variations

**If your API returns a different response structure**, update the `normalizeIssuesResponse()` function in `lib/api.ts` to match your schema.

### Demo Mode Fallback

If the API is unavailable, the application automatically displays sample data from `lib/demo-data.ts`. This allows:
- Continuous development and testing
- UI preview without a working backend
- Testing the full user flow with realistic data

---

## Data Handling

### Type Safety

All data structures are defined in `lib/types.ts`. Key types include:

- `Scan` — Document scan metadata
- `Issue` — Individual quality issue
- `ScanResult` — Complete scan with metrics
- `Pagination` — Pagination metadata

Adhering to these types ensures consistency and enables early error detection.

### Utility Functions

`lib/utils.ts` provides:
- **Score/Severity Color Mapping** — Consistent visual representation across components
- **Formatting Helpers** — Date formatting, number formatting, truncation

---

## Customization Guide

### Styling

**Option 1: Tailwind CSS** (Recommended)
Most styling uses Tailwind utilities. Modify utility classes in component files or extend the Tailwind config.

**Option 2: Custom CSS**
Hand-written CSS in `app/globals.css` handles special effects (perforation, stamp ring). Modify here for visual tweaks.

**Option 3: Font Changes**
Edit the font imports in `app/layout.tsx` using Next.js `next/font`:
```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
```

### Component Customization

**Upgrade the Select Dropdown**
Replace the native `<select>` in `select-native.tsx` with Radix UI for full customization:
```bash
npm install @radix-ui/react-select
```

**Add New Issue Dimensions**
- Extend filter options in `LedgerToolbar`
- Add new fields to the `Issue` type in `lib/types.ts`
- Update the API call parameters

### API Response Shape

If your backend returns issues in a different format:
1. Open `lib/api.ts`
2. Locate `normalizeIssuesResponse()`
3. Add a new condition to handle your response shape
4. Return normalized data matching the expected `Issue[]` interface

---

## Getting Started

### For End Users

1. **Upload a Document**
   - Click the upload zone or drag and drop a document
   - Wait for the scan to complete

2. **Review Results**
   - View overall quality score and metrics in the Vitals Grid
   - Examine issues by category in the Category Breakdown
   - Use the Issues Ledger for detailed issue information

3. **Filter & Search**
   - Use the search bar to find specific issues
   - Filter by severity or category using the toolbar
   - Navigate through pages using pagination controls

### For Developers

1. **Project Setup**
   - Clone the repository
   - Install dependencies: `npm install`
   - Configure your API endpoints in `lib/api.ts`

2. **Development Mode**
   - Start the dev server: `npm run dev`
   - The application uses demo data if your API is offline
   - Make changes to components and see hot-reload updates

3. **Understanding the Flow**
   - Study `app/page.tsx` to understand state management
   - Review component files in `components/dqc/` for UI implementation
   - Check `lib/api.ts` for backend communication

4. **Customization**
   - Modify component styling using Tailwind or custom CSS
   - Extend types in `lib/types.ts` for new data fields
   - Update `normalizeIssuesResponse()` if your API response differs

---

## Troubleshooting

### UI is Blank or Shows Demo Data

**Cause:** API endpoints are unreachable or misconfigured.

**Solution:** 
- Verify API URL in `lib/api.ts`
- Check network connectivity
- Review browser console for error messages
- Ensure demo data in `lib/demo-data.ts` is valid

### Issues Aren't Displaying Correctly

**Cause:** API response shape doesn't match expected format.

**Solution:**
- Log the API response in `normalizeIssuesResponse()`
- Add a new condition to handle your response shape
- Verify all fields match the `Issue` type definition

### Styling Issues or Misaligned Elements

**Cause:** Custom CSS or Tailwind configuration conflicts.

**Solution:**
- Check browser DevTools for computed styles
- Review `app/globals.css` for custom CSS rules
- Verify Tailwind utility classes are spelled correctly

---

## Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **TypeScript:** https://www.typescriptlang.org/docs

---

## Support

For issues or questions:
1. Review this guide's Troubleshooting section
2. Check component comments and inline documentation
3. Examine related components for usage examples

