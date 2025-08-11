# Table Component

A comprehensive, headless table component built with React and TypeScript. Features pagination, sorting, selection, fixed columns, horizontal/vertical scrolling, and more.

## Features

- ✅ **Headless Design** - Complete control over styling and behavior
- ✅ **Pagination** - Built-in pagination with configurable page sizes
- ✅ **Sorting** - Single and multi-column sorting
- ✅ **Selection** - Single and multiple row selection with disabled rows support
- ✅ **Fixed Columns** - Pin columns to left or right sides
- ✅ **Scrolling** - Horizontal and vertical scrolling with sticky headers
- ✅ **Custom Rendering** - Custom cell and header renderers
- ✅ **Responsive** - Adapts to different screen sizes
- ✅ **Accessible** - Full keyboard navigation and screen reader support
- ✅ **TypeScript** - Full type safety and IntelliSense support

## Installation

The Table component is part of the UI library. Import it directly:

```tsx
import { Table } from '@/lib/ui';
// or
import Table from '@/lib/ui/Table/Table';
```

## Basic Usage

```tsx
import Table from '@/lib/ui/Table/Table';
import { TableColumn } from '@/lib/ui/Table/Table.d';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const columns: TableColumn<User>[] = [
  { id: 'name', key: 'name', label: 'Name', sortable: true },
  { id: 'email', key: 'email', label: 'Email', sortable: true },
  { id: 'role', key: 'role', label: 'Role' },
];

function MyTable() {
  return (
    <Table
      data={data}
      columns={columns}
      pagination={{ page: 1, pageSize: 10, total: data.length }}
    />
  );
}
```

## Advanced Usage

### Row Selection

```tsx
const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

<Table
  data={data}
  columns={columns}
  selection={{
    type: 'multiple', // or 'single'
    selectedRowKeys,
    onSelectionChange: (keys, rows) => {
      setSelectedRowKeys(keys);
      console.log('Selected rows:', rows);
    },
    getRowKey: (row) => row.id,
    disabled: (row) => row.status === 'inactive', // disable selection for inactive rows
  }}
/>;
```

### Fixed Columns

```tsx
const columns: TableColumn[] = [
  {
    id: 'name',
    key: 'name',
    label: 'Name',
    fixed: 'left', // Pin to left
    width: 200,
  },
  { id: 'description', key: 'description', label: 'Description', width: 300 },
  {
    id: 'amount',
    key: 'amount',
    label: 'Amount',
    fixed: 'right', // Pin to right
    width: 120,
  },
];

<Table
  data={data}
  columns={columns}
  scroll={{ x: 800 }} // Enable horizontal scrolling
/>;
```

### Custom Cell Rendering

```tsx
const columns: TableColumn[] = [
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    render: (value, row, index) => (
      <span
        className={`px-2 py-1 rounded ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    id: 'actions',
    key: 'id',
    label: 'Actions',
    render: (value, row) => (
      <div className="flex gap-2">
        <button onClick={() => editRow(row)}>Edit</button>
        <button onClick={() => deleteRow(row)}>Delete</button>
      </div>
    ),
  },
];
```

### Sorting

```tsx
<Table
  data={data}
  columns={columns}
  sorting={{
    multiple: true, // Enable multi-column sorting
    defaultSort: [
      { key: 'createdAt', direction: 'desc' },
      { key: 'name', direction: 'asc' },
    ],
  }}
/>
```

### Scrolling

```tsx
<Table
  data={data}
  columns={columns}
  scroll={{
    x: 1200, // Horizontal scroll when content exceeds 1200px
    y: 400, // Vertical scroll when content exceeds 400px
  }}
/>
```

## Component Composition

The Table component also supports a composable API for advanced use cases:

```tsx
<Table.Root>
  <Table.ScrollContainer scroll={{ x: 800, y: 400 }}>
    <table>
      <Table.Header>
        <tr>
          <Table.HeaderCell sortable onSort={() => {}}>
            Name
          </Table.HeaderCell>
          <Table.HeaderCellFixed fixed="right">Actions</Table.HeaderCellFixed>
        </tr>
      </Table.Header>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id} selected={isSelected(row)}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.CellFixed fixed="right">
              <button>Edit</button>
            </Table.CellFixed>
          </Table.Row>
        ))}
      </Table.Body>
    </table>
  </Table.ScrollContainer>
  <Table.Pagination />
</Table.Root>
```

## Props

### TableProps

| Prop         | Type                             | Default               | Description                 |
| ------------ | -------------------------------- | --------------------- | --------------------------- |
| `data`       | `T[]`                            | -                     | Array of data objects       |
| `columns`    | `TableColumn<T>[]`               | -                     | Column definitions          |
| `loading`    | `boolean`                        | `false`               | Show loading state          |
| `pagination` | `PaginationConfig`               | -                     | Pagination configuration    |
| `sorting`    | `SortConfig[]`                   | -                     | Sorting configuration       |
| `selection`  | `SelectionConfig<T>`             | -                     | Row selection configuration |
| `scroll`     | `ScrollConfig`                   | -                     | Scrolling configuration     |
| `bordered`   | `boolean`                        | `false`               | Show table borders          |
| `striped`    | `boolean`                        | `false`               | Alternate row colors        |
| `hoverable`  | `boolean`                        | `true`                | Highlight rows on hover     |
| `size`       | `'small' \| 'medium' \| 'large'` | `'medium'`            | Table size                  |
| `emptyText`  | `ReactNode`                      | `'No data available'` | Text shown when no data     |

### TableColumn

| Prop           | Type                               | Description               |
| -------------- | ---------------------------------- | ------------------------- |
| `id`           | `string`                           | Unique column identifier  |
| `key`          | `keyof T`                          | Data object key           |
| `label`        | `string`                           | Column header label       |
| `width`        | `number \| string`                 | Column width              |
| `sortable`     | `boolean`                          | Enable sorting for column |
| `fixed`        | `'left' \| 'right'`                | Pin column to side        |
| `align`        | `'left' \| 'center' \| 'right'`    | Text alignment            |
| `render`       | `(value, row, index) => ReactNode` | Custom cell renderer      |
| `headerRender` | `(column) => ReactNode`            | Custom header renderer    |

## Examples

Check out the examples in the `examples/` directory:

- `BasicTableExample.tsx` - Simple table with pagination
- `SelectableTableExample.tsx` - Row selection with business logic
- `FixedColumnsExample.tsx` - Fixed columns with horizontal scrolling
- `AdvancedTableExample.tsx` - All features combined

## Accessibility

The Table component includes comprehensive accessibility features:

- Full keyboard navigation support
- Screen reader compatibility with proper ARIA labels
- Focus management for interactive elements
- High contrast support
- Semantic HTML structure

## Performance

- Efficient re-rendering with React.memo and useMemo
- Virtualization support for large datasets (coming soon)
- Optimized sorting and filtering algorithms
- Minimal bundle size with tree-shaking support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (with polyfills)
