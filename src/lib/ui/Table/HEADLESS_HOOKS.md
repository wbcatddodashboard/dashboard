# Headless Table Hooks (TanStack Style)

Our Table component now supports both **client-side** and **server-side** data handling through a comprehensive set of headless hooks, inspired by [TanStack Table](https://tanstack.com/table/latest).

## 🎯 Philosophy

- **Headless by Design**: Complete control over UI while hooks handle all the logic
- **Framework Agnostic**: Pure logic hooks that work with any UI framework
- **Client/Server Flexibility**: Support both local and remote data processing
- **Composable**: Mix and match hooks as needed
- **Type Safe**: Full TypeScript support with excellent IntelliSense

## 📦 Available Hooks

### Client-Side Hooks (Local Data Processing)

#### `usePagination`

Handles client-side pagination with customizable info display.

```tsx
const pagination = usePagination({
  totalItems: data.length,
  initialPageSize: 10,
  pageSizeOptions: [10, 20, 50],
});

// Customizable pagination info
const info = pagination.getInfoText('Showing {from} to {to} of {of} entries');
// "Showing 1 to 10 of 247 entries"
```

#### `useSorting`

Client-side sorting with multi-column support.

```tsx
const sorting = useSorting({
  data,
  enableMultiSort: true,
  initialSort: [{ key: 'name', direction: 'asc' }],
});

// Toggle sorting (supports Shift+click for multi-sort)
sorting.toggleSort('name', true);
```

#### `useSelection`

Row selection with business logic support.

```tsx
const selection = useSelection({
  data,
  getRowId: (row) => row.id,
  enableMultiSelect: true,
  isRowSelectable: (row) => row.status === 'active',
});
```

#### `useTableState`

Combines all client-side hooks for complete table state management.

```tsx
const table = useTableState({
  data,
  pagination: { initialPageSize: 10 },
  sorting: { enableMultiSort: true },
  selection: { enableMultiSelect: true },
});

// Access processed data
const rows = table.rows; // Sorted + paginated data
```

### Server-Side Hooks (Remote Data Processing)

#### `useServerPagination`

Server-side pagination that triggers API calls.

```tsx
const pagination = useServerPagination({
  totalItems: 1000, // From server response
  onPaginationChange: (state) => {
    // Make API call with new pagination state
    fetchData({ page: state.page, pageSize: state.pageSize });
  },
});
```

#### `useServerSorting`

Server-side sorting that communicates with backend.

```tsx
const sorting = useServerSorting({
  onSortingChange: (sortConfig) => {
    // Make API call with new sort parameters
    fetchData({
      sortBy: sortConfig[0]?.key,
      sortOrder: sortConfig[0]?.direction,
    });
  },
});
```

#### `useServerTable`

Complete server-side table state management.

```tsx
const table = useServerTable({
  data: serverData, // Already processed by server
  totalItems: 1000,
  loading,
  onStateChange: async (state) => {
    // Single callback for all server communication
    const result = await api.fetchUsers({
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
      sortBy: state.sorting[0]?.key,
      sortOrder: state.sorting[0]?.direction,
    });

    setData(result.data);
    setTotalItems(result.totalItems);
  },
});
```

## 🎨 Headless UI Components

### Pagination Components

#### `<PaginationInfo>`

Customizable pagination information display.

```tsx
{
  /* Template-based */
}
<PaginationInfo
  paginationInfo={table.pagination.paginationInfo}
  template="Showing {from} to {to} of {of} entries"
/>;

{
  /* Custom render function */
}
<PaginationInfo
  paginationInfo={table.pagination.paginationInfo}
  render={(info) => (
    <div>
      Page {info.page} of {info.totalPages}
    </div>
  )}
/>;
```

#### `<PaginationControls>`

Fully customizable pagination controls.

```tsx
<PaginationControls
  pagination={table.pagination}
  maxVisiblePages={5}
  renderButton={({ page, isActive, isDisabled, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={isActive ? 'active' : ''}
    >
      {children}
    </button>
  )}
/>
```

#### `<PageSizeSelector>`

Customizable page size selector.

```tsx
<PageSizeSelector
  pagination={table.pagination}
  options={[10, 20, 50, 100]}
  render={({ currentPageSize, options, onChange }) => (
    <select value={currentPageSize} onChange={(e) => onChange(+e.target.value)}>
      {options.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  )}
/>
```

## 🚀 Usage Examples

### Client-Side Example

```tsx
function ClientTable() {
  const table = useTableState({
    data: users,
    pagination: { initialPageSize: 10 },
    sorting: { enableMultiSort: true },
    selection: { enableMultiSelect: true },
  });

  return (
    <div>
      {/* Custom pagination info */}
      <PaginationInfo
        paginationInfo={table.pagination.paginationInfo}
        template="Showing {from} to {to} of {of} users"
      />

      {/* Your custom table UI */}
      <table>
        <thead>
          <tr>
            <th>
              Name
              <button onClick={() => table.sorting.toggleSort('name')}>
                {table.sorting.getSortDirection('name') === 'asc' ? '↑' : '↓'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom pagination controls */}
      <PaginationControls pagination={table.pagination} />
    </div>
  );
}
```

### Server-Side Example

```tsx
function ServerTable() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const table = useServerTable({
    data,
    totalItems,
    loading,
    onStateChange: async (state) => {
      setLoading(true);
      const result = await api.fetchUsers(state);
      setData(result.data);
      setTotalItems(result.totalItems);
      setLoading(false);
    },
  });

  return (
    <div>
      {/* Server-side pagination info */}
      <PaginationInfo
        paginationInfo={table.pagination.paginationInfo}
        template="Showing {from} to {to} of {of} total records (server-side)"
      />

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* Your table UI */}
      <table>
        {/* Server-processed data */}
        {table.rows.map((row) => (
          <tr key={row.id}>{/* ... */}</tr>
        ))}
      </table>
    </div>
  );
}
```

## 🎛️ Customization Options

### Pagination Info Templates

You can use various placeholders in pagination templates:

- `{from}` - First item number on current page
- `{to}` - Last item number on current page
- `{of}` - Total number of items
- `{page}` - Current page number
- `{totalPages}` - Total number of pages

Examples:

- `"Showing {from} to {to} of {of} entries"` → "Showing 1 to 10 of 247 entries"
- `"Page {page} of {totalPages}"` → "Page 1 of 25"
- `"{from}-{to} / {of} records"` → "1-10 / 247 records"

### Advanced Sorting

```tsx
// Multi-column sorting with Shift+click
const sorting = useSorting({
  data,
  enableMultiSort: true,
});

// In your table header
<button onClick={(e) => sorting.toggleSort('name', e.shiftKey)}>
  Name {sorting.getSortDirection('name') === 'asc' ? '↑' : '↓'}
  {sorting.isSorted('name') && (
    <span className="sort-index">{sorting.getSortIndex('name') + 1}</span>
  )}
</button>;
```

### Selection with Business Logic

```tsx
const selection = useSelection({
  data,
  getRowId: (row) => row.id,
  enableMultiSelect: true,
  isRowSelectable: (row) => {
    // Custom business logic
    return row.status === 'active' && row.role !== 'admin';
  },
});

// Selection info
console.log({
  selectedCount: selection.selectedCount,
  selectableCount: selection.selectableCount,
  isAllSelected: selection.isAllSelected,
  isPartiallySelected: selection.isPartiallySelected,
});
```

## 🔄 Migration from Old Table Component

The old `Table` component still works, but you can migrate to hooks for more flexibility:

```tsx
// Old way
<Table
  data={data}
  columns={columns}
  pagination={{ pageSize: 10 }}
  sorting={{ multiple: true }}
/>;

// New headless way
const table = useTableState({
  data,
  pagination: { initialPageSize: 10 },
  sorting: { enableMultiSort: true },
});

// Then build your own UI with complete control
```

## 🌟 Benefits

1. **Complete UI Control**: Style everything exactly how you want
2. **Performance**: Only re-render what changes
3. **Flexibility**: Mix client and server-side processing
4. **Type Safety**: Full TypeScript support
5. **Reusability**: Use hooks in different UI frameworks
6. **Testing**: Easy to test pure logic hooks
7. **Bundle Size**: Tree-shake unused features

This headless approach gives you the power of TanStack Table while maintaining the simplicity and design consistency of our component library!
