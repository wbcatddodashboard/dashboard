import {
  ReactNode,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

export interface TableColumn<T = unknown> {
  id: string;
  key: keyof T;
  label: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  resizable?: boolean;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  headerRender?: (column: TableColumn<T>) => ReactNode;
  group?: string;
}

export interface TableColumnGroup {
  id: string;
  label: string;
  columns: string[];
  span?: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
}

export interface SelectionConfig<T = unknown> {
  type: 'single' | 'multiple';
  selectedRowKeys: string[];
  onSelectionChange: (selectedRowKeys: string[], selectedRows: T[]) => void;
  getRowKey: (row: T) => string;
  selectAll?: boolean;
  disabled?: (row: T) => boolean;
}

export interface ScrollConfig {
  x?: number | string;
  y?: number | string;
  scrollToFirstRowOnChange?: boolean;
}

export interface VirtualizationConfig {
  enabled: boolean;
  itemHeight: number;
  overscan?: number;
}

export interface TableProps<T = unknown>
  extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  data: T[];
  columns: TableColumn<T>[];
  columnGroups?: TableColumnGroup[];
  loading?: boolean;
  pagination?: PaginationConfig;
  sorting?: {
    multiple?: boolean;
    defaultSort?: SortConfig[];
  };
  selection?: SelectionConfig<T>;
  scroll?: ScrollConfig;
  virtualization?: VirtualizationConfig;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  size?: 'small' | 'medium' | 'large';
  emptyText?: ReactNode;
  onRow?: (row: T, index: number) => HTMLAttributes<HTMLTableRowElement>;
  onHeaderRow?: (
    columns: TableColumn<T>[],
    index: number
  ) => HTMLAttributes<HTMLTableRowElement>;
  rowKey?: string | ((row: T) => string);
  expandable?: {
    expandedRowKeys?: string[];
    onExpand?: (expanded: boolean, row: T) => void;
    expandRowByClick?: boolean;
    expandIcon?: (props: {
      expanded: boolean;
      onExpand: () => void;
      row: T;
    }) => ReactNode;
    expandedRowRender?: (row: T, index: number) => ReactNode;
  };
}

export interface TableRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
  sticky?: boolean;
}

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
  loading?: boolean;
  emptyText?: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  selected?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  expanded?: boolean;
}

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
}

export interface TableHeaderCellProps
  extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: ReactNode;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: () => void;
  resizable?: boolean;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
}

export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  onChange: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

export interface TableScrollContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  scroll?: ScrollConfig;
  height?: number | string;
}

export interface TableSelectionProps extends HTMLAttributes<HTMLDivElement> {
  type: 'single' | 'multiple';
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export interface UseTableProps<T = unknown> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: Partial<PaginationConfig>;
  sorting?: {
    multiple?: boolean;
    defaultSort?: SortConfig[];
  };
  selection?: Partial<SelectionConfig<T>>;
  rowKey?: string | ((row: T) => string);
}

export interface UseTableReturn<T = unknown> {
  tableData: T[];
  columns: TableColumn<T>[];
  pagination: PaginationConfig;
  sorting: SortConfig[];
  selection: {
    selectedRowKeys: string[];
    selectedRows: T[];
    isAllSelected: boolean;
    isIndeterminate: boolean;
  };
  loading: boolean;
  handleSort: (columnKey: string) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  handleSelection: (rowKey: string, selected: boolean) => void;
  handleSelectAll: (selected: boolean) => void;
  getRowKey: (row: T) => string;
  isRowSelected: (row: T) => boolean;
  isRowDisabled: (row: T) => boolean;
  resetSelection: () => void;
  resetSorting: () => void;
  resetPagination: () => void;
}

export interface TableContextValue<T = unknown> extends UseTableReturn<T> {
  tableProps: TableProps<T>;
}

export interface TableVirtualizerProps extends HTMLAttributes<HTMLDivElement> {
  height: number;
  itemHeight: number;
  itemCount: number;
  overscan?: number;
  children: (index: number, style: React.CSSProperties) => ReactNode;
}

// Context provider props
export interface TableProviderProps<T = unknown> {
  children: ReactNode;
  value: TableContextValue<T>;
}

// Hooks: Pagination
export interface UsePaginationProps {
  totalItems: number;
  initialPageSize?: number;
  initialPage?: number;
  serverSide?: boolean;
  onStateChange?: (state: { page: number; pageSize: number }) => void;
}

export interface PaginationInfo {
  from: number;
  to: number;
  of: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalPages: number;
  paginationInfo: PaginationInfo;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  getInfoText: (template?: string) => string;
  getPageNumbers: (maxVisible?: number) => number[];
  getPageData: <T>(data: T[]) => T[];
}

// Hooks: Selection
export interface UseSelectionProps<T = unknown> {
  data: T[];
  getRowId: (row: T) => string;
  enableMultiSelect?: boolean;
  isRowSelectable?: (row: T) => boolean;
  initialSelectedIds?: string[];
}

export interface UseSelectionReturn<T = unknown> {
  selectedIds: string[];
  selectedRows: T[];
  selectRow: (id: string) => void;
  deselectRow: (id: string) => void;
  toggleRow: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleAll: () => void;
  setSelectedIds: (ids: string[]) => void;
  isRowSelected: (row: T) => boolean;
  isRowSelectable: (row: T) => boolean;
  selectableRows: T[];
  selectableIds: string[];
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  selectedCount: number;
  selectableCount: number;
}

// Hooks: Sorting
export interface UseSortingProps<T = unknown> {
  data?: T[];
  serverSide?: boolean;
  enableMultiSort?: boolean;
  initialSort?: SortConfig[];
  onStateChange?: (sortConfig: SortConfig[]) => void;
}

export interface UseSortingReturn<T = unknown> {
  sortConfig: SortConfig[];
  toggleSort: (key: string, multiSort?: boolean) => void;
  clearSort: () => void;
  setSortConfig: (config: SortConfig[]) => void;
  getSortDirection: (key: string) => 'asc' | 'desc' | undefined;
  isSorted: (key: string) => boolean;
  getSortIndex: (key: string) => number;
  sortedData: T[];
}
