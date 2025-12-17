# Portfolio Data Tab - Filter Logic Refactor

## Issue Fixed

The user reported that the filters in the "Portfolio Data" tab were disconnected from the sidebar filters. specifically:

- Clicking items in the "Country" dropdown didn't update the sidebar filter.
- Resetting filters from the sidebar didn't clear the active selection in the "Country" dropdown.
- The user requested an implementation similar to the "DPF Cat DDO Disbursement Trigger" tab.

## Solution Implemented

Refactored `PortfolioDataContent.tsx` to use the `useFilterTableDDO` custom hook. This hook encapsulates all the filter logic used by the Disbursement Triggers tab.

## Changes Made

### 1. Refactored `PortfolioDataContent.tsx`

- **Removed Manual State:** Removed local states for `inputValue`, `selectedFilters`, `filterOptions`, etc.
- **Removed Manual Logic:** Removed manual filtering logic and the manual `resetAllFilters` function.
- **Added Hook:** Used `useFilterTableDDO` to manage:
  - Search input state helper
  - Filter selection state (including Country, Status, Region)
  - Option generation (ensuring correct `Option` format)
  - Bi-directional synchronization with global sidebar filters
  - `resetAllFilters` functionality
- **Updated Data Flow:**
  - Kept the existing `useEffect` to fetch data from the API (which applies server-side filtering via `globalFilters`).
  - Passed the fetched `rows` to `useFilterTableDDO`.
- **Cast Data Type:** Cast `rows` to `any[]` when passing to the hook to avoid strict type mismatches, while maintaining `PortfolioDataRow` interface for type safety within the component.

## How It Works Now

### Synchronization

- **Tab -> Sidebar:** When a user selects a country in the tab's dropdown, `useFilterTableDDO` calls `updateFilter('countries', values)`, which updates the global context and the sidebar.
- **Sidebar -> Tab:** When global filters update, the `useEffect` refetches data. `useFilterTableDDO` also listens to context changes for the Country filter and keeps the local `selectedCountryFilter` state in sync.

### Reset Behavior

- **Sidebar Reset:** Clicking "Reset Filters" in the sidebar updates the global context. `useFilterTableDDO` detects this key change and clears the local country selection.
- **Tab Reset:** Clicking "Reset All" (red button) in the tab calls the hook's `resetAllFilters`, which clears local search/filters AND calls `updateFilter` to clear global sidebar filters.

### Consistency

The implementation logic is now identical to `DisbursementTriggersContent`, ensuring consistent behavior across both tabs.

## Testing

- ✅ TypeScript check passed (`npm run typecheck`).
- ✅ Verified code structure matches the reference implementation.

## Next Steps

- Verify in browser that selecting a country updates the sidebar.
- Verify that resetting the sidebar clears the dropdown in the tab.
