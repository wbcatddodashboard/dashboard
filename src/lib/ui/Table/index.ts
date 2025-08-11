export { default as Table } from './Table';
export { useTable } from './useTable';
export { useTableContext, TableProvider } from './TableContext';

// Headless hooks (TanStack style)
export * from './hooks';

// Headless components - explicit re-exports to avoid naming conflicts
export {
  PaginationInfo as PaginationInfoComponent,
  PaginationControls,
  PageSizeSelector,
} from './components';

export type {
  CommonPaginationInfo,
  CommonPaginationReturn,
  PaginationInfoProps,
  PaginationControlsProps,
  PageSizeSelectorProps,
} from './components';

export type {
  TableProps,
  TableColumn,
  TableColumnGroup,
  SortConfig,
  PaginationConfig,
  SelectionConfig,
  ScrollConfig,
  VirtualizationConfig,
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
  TablePaginationProps,
  TableScrollContainerProps,
  TableSelectionProps,
  UseTableProps,
  UseTableReturn,
  TableContextValue,
  TableVirtualizerProps,
} from './Table.d';

export {
  DEFAULT_PAGE_SIZE,
  SORT_DIRECTION,
  TABLE_SIZE,
  SELECTION_TYPE,
  COLUMN_FIXED,
  COLUMN_ALIGN,
  ACCESSIBILITY_LABELS,
} from './Table.constants';
