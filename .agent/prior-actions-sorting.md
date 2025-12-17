# Prior Actions Table Sorting

## Implementation

Enabled sorting functionality for the "Prior Actions and Result indicators" table to match other dashboard tables.

### Files Modified

1. **`src/components/CatDDO/components/TablePriorActions/TablePriorActions.tsx`**
   - Added `sortable: true` to all column definitions.
   - Added `sorting={{ multiple: false }}` to the table wrapper.

2. **`src/components/CatDDO/components/TablePriorActions/styled/TablePriorActions.styled.tsx`**
   - Imported `SortIcon` from `TableFundingDDO`.
   - Added `renderSortIcon` prop to the `Table` component to display sort arrows.

### Outcome

User can now click on column headers in the Prior Actions table to sort rows.
