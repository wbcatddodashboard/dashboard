# Portfolio Data & Triggers Tab - Scrollbar Fix

## Issue

Users reported "double horizontal scrollbars" on the bottom of tables in both the "Portfolio Data" and "Disbursement Triggers" tabs.
An initial attempt to fix this by hiding overflow caused the table to become unscrollable.

## Root Cause Analysis

The shared container component `TableFundingContainer` used the CSS class `items-start` (Flexbox alignment).

- `items-start` allowed the child element (the Table) to assume its "natural" or "content" width.
- Since the Tables have a `scroll.x` prop set (to 1200px or 2900px), they rendered valid width of that size.
- Because the Table was wider than the screen, the **Container** overflowed and added a scrollbar.
- The **Table** also added its own internal scrollbar (because `scroll.x` is active).
- Result: Two scrollbars stacked on top of each other.

## The Solution

I modified `src/components/CatDDO/components/TableFundingDDO/styled/TableFundingDDO.styled.tsx`.

- **Removed `items-start`**: This causes the Flex container to default to `align-items: stretch`.
- **Effect**: The Table component is now forced to stretch (or shrink) to fill exactly 100% of the container's width, rather than expanding to its content width.
- **Result**: The Container no longer overflows (width matches screen/parent), so the Container scrollbar disappears. The Table component still sees that its columns (1200px) exceed its rendered width (screen width), so it correctly displays its _internal_ scrollbar.

## Files Changed

1. `src/components/CatDDO/components/TableFundingDDO/styled/TableFundingDDO.styled.tsx` - Removed `items-start`.
2. `src/components/CatDDO/PortfolioDataContent.tsx` - Reverted previous local fix (restored usage of `TableFundingContainer`).

This ensures a consistent, single-scrollbar experience across the entire dashboard.
