# Dedicated CSV Loader Architecture

## Objective

The user requested a dedicated way to load all columns from the CSV for the Portfolio Data tab, without altering existing APIs or the rest of the application.

## Solution

### 1. Dedicated API Endpoint

Created `src/app/api/portfolio/full-list/route.ts`.

- This endpoint calls `loadPortfolioFiltered` to respect sidebar filters.
- It returns the **full** CSV row objects (using `...r`) instead of mapping to a restricted set of columns.
- This ensures unrelated components using `/api/portfolio/list` remain unaffected.

### 2. Updated Portfolio Data Tab

Modified `src/components/CatDDO/PortfolioDataContent.tsx` to:

- consume the new `/api/portfolio/full-list` endpoint.
- dynamically generate table columns based on the CSV headers found in the response.
- augment the data with mapped keys (e.g., `country`, `status`) to ensure the existing `useFilterTableDDO` hook continues to function correctly for local filtering and search.
- export all visible columns when downloading CSV.

## Result

The Portfolio Data tab now displays all columns from the source CSV, while other tabs relying on the original list endpoint remain unchanged.
