import { useMemo } from 'react';
import { TableProvider, useTableContext } from './TableContext';
import { useTable } from './useTable';
import When from '../When';
import {
  TableProps,
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
  TablePaginationProps,
  TableScrollContainerProps,
  TableSelectionProps,
  TableColumn,
} from './Table.d';
import {
  TableRoot as StyledTableRoot,
  TableScrollContainer as StyledTableScrollContainer,
  TableElement,
  TableHeader as StyledTableHeader,
  TableHeaderRow,
  TableHeaderCell as StyledTableHeaderCell,
  TableHeaderCellFixed as StyledTableHeaderCellFixed,
  TableSortButton,
  TableSortIcon,
  TableBody as StyledTableBody,
  TableRow as StyledTableRow,
  TableCell as StyledTableCell,
  TableCellFixed as StyledTableCellFixed,
  TableCheckbox,
  TableLoadingOverlay,
  TableEmptyState,
  TablePagination as StyledTablePagination,
  TablePaginationInfo,
  TablePaginationControls,
  TablePaginationButton,
  TableSelect,
} from './Table.styled';
import { ACCESSIBILITY_LABELS } from './Table.constants';

function Table<T = unknown>({
  data,
  columns,
  columnGroups,
  loading = false,
  pagination,
  sorting,
  selection,
  scroll,
  bordered = false,
  striped = false,
  hoverable = true,
  size = 'medium',
  emptyText,
  onRow,
  onHeaderRow,
  rowKey,
  ...props
}: TableProps<T>) {
  const tableHook = useTable({
    data,
    columns,
    pagination,
    sorting,
    selection,
    rowKey,
  });

  const contextValue = useMemo(
    () => ({
      ...tableHook,
      tableProps: {
        data,
        columns,
        columnGroups,
        loading,
        pagination,
        sorting,
        selection,
        scroll,
        bordered,
        striped,
        hoverable,
        size,
        emptyText,
        onRow,
        onHeaderRow,
        rowKey,
        ...props,
      } as TableProps<T>,
    }),
    [
      tableHook,
      data,
      columns,
      columnGroups,
      loading,
      pagination,
      sorting,
      selection,
      scroll,
      bordered,
      striped,
      hoverable,
      size,
      emptyText,
      onRow,
      onHeaderRow,
      rowKey,
      props,
    ]
  );

  return (
    <TableProvider value={contextValue}>
      <TableRoot loading={loading} size={size}>
        <When condition={loading}>
          <TableLoadingOverlay />
        </When>
        <TableScrollContainer scroll={scroll}>
          <TableElement {...props}>
            <TableHeader />
            <TableBody emptyText={emptyText} loading={loading} />
          </TableElement>
        </TableScrollContainer>
        <When condition={!!pagination}>
          <TablePagination />
        </When>
      </TableRoot>
    </TableProvider>
  );
}

function TableRoot({ children, ...props }: TableRootProps) {
  return <StyledTableRoot {...props}>{children}</StyledTableRoot>;
}

function TableScrollContainer({
  children,
  scroll,
  ...props
}: TableScrollContainerProps) {
  const containerStyle = useMemo(() => {
    const scrollStyle: React.CSSProperties = {};

    // Set overflow behavior
    if (scroll?.x || scroll?.y) {
      if (scroll?.x) {
        scrollStyle.overflowX = 'auto';
      }
      if (scroll?.y) {
        scrollStyle.overflowY = 'auto';
        if (typeof scroll.y === 'number') {
          scrollStyle.maxHeight = scroll.y;
        } else if (typeof scroll.y === 'string') {
          scrollStyle.maxHeight = scroll.y;
        }
      }
    } else {
      // Default overflow behavior
      scrollStyle.overflow = 'auto';
    }

    return scrollStyle;
  }, [scroll]);

  const tableStyle = useMemo(() => {
    const style: React.CSSProperties = {};

    // Set minimum width for horizontal scrolling
    if (scroll?.x) {
      if (typeof scroll.x === 'number') {
        style.minWidth = scroll.x;
      } else if (typeof scroll.x === 'string') {
        style.minWidth = scroll.x;
      }
    }

    return style;
  }, [scroll]);

  return (
    <StyledTableScrollContainer style={containerStyle} {...props}>
      <div style={tableStyle}>{children}</div>
    </StyledTableScrollContainer>
  );
}

function TableHeader({ ...props }: TableHeaderProps) {
  const {
    columns,
    selection,
    handleSelectAll,
    handleSort,
    sorting,
    tableProps,
  } = useTableContext();

  const renderHeaderCell = (
    column: TableColumn,
    style?: React.CSSProperties
  ) => {
    const sortConfig = sorting.find((sort) => sort.key === column.key);
    const HeaderCellComponent = column.fixed
      ? TableHeaderCellWithFixed
      : TableHeaderCell;

    return (
      <HeaderCellComponent
        key={column.id}
        fixed={column.fixed}
        style={{
          ...style,
          width: column.width,
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
        }}
      >
        <When condition={!!column.sortable}>
          <TableSortButton
            onClick={() => handleSort(String(column.key))}
            aria-label={`${ACCESSIBILITY_LABELS.SORT_NONE} ${column.label}`}
          >
            {column.headerRender ? column.headerRender(column) : column.label}
            <TableSortIcon direction={sortConfig?.direction} />
          </TableSortButton>
        </When>
        <When condition={!column.sortable}>
          {column.headerRender ? column.headerRender(column) : column.label}
        </When>
      </HeaderCellComponent>
    );
  };

  // If column groups are provided, render a two-tier header with group row on top
  if (tableProps.columnGroups && tableProps.columnGroups.length > 0) {
    // Map groupId -> group meta
    const groupIdToGroup = new Map(
      tableProps.columnGroups.map((g) => [g.id, g])
    );

    // Determine a column's group id from either column.group or membership in a declared group
    const getGroupIdForColumn = (column: TableColumn): string | undefined => {
      if (column.group && groupIdToGroup.has(column.group)) return column.group;
      for (const g of tableProps.columnGroups || []) {
        if (g.columns?.includes(column.id)) return g.id;
      }
      return undefined;
    };

    type HeaderSegment =
      | {
          type: 'group';
          groupId: string;
          label: string;
          columns: TableColumn[];
        }
      | { type: 'column'; column: TableColumn };

    const segments: HeaderSegment[] = [];
    columns.forEach((col) => {
      const groupId = getGroupIdForColumn(col);
      if (!groupId) {
        segments.push({ type: 'column', column: col });
        return;
      }
      const groupMeta = groupIdToGroup.get(groupId)!;
      const last = segments[segments.length - 1];
      if (last && last.type === 'group' && last.groupId === groupId) {
        last.columns.push(col);
      } else {
        segments.push({
          type: 'group',
          groupId,
          label: groupMeta.label,
          columns: [col],
        });
      }
    });

    // Height offset for second header row to avoid sticky overlap
    const SECOND_ROW_TOP_OFFSET_PX = 44;

    return (
      <StyledTableHeader {...props}>
        {/* Top row: group headers and row-spanning ungrouped columns */}
        <TableHeaderRow>
          <When condition={tableProps.selection?.type === 'multiple'}>
            <TableHeaderCell style={{ width: 48 }} rowSpan={2}>
              <TableSelection
                type="multiple"
                checked={selection?.isAllSelected}
                indeterminate={selection?.isIndeterminate}
                onChange={handleSelectAll}
              />
            </TableHeaderCell>
          </When>

          {segments.map((seg, idx) => {
            if (seg.type === 'group') {
              return (
                <TableHeaderCell
                  key={`group-${seg.groupId}-${idx}`}
                  colSpan={seg.columns.length}
                >
                  {seg.label}
                </TableHeaderCell>
              );
            }
            // Ungrouped column: render a header that spans both rows
            const col = seg.column;
            const sortConfig = sorting.find((sort) => sort.key === col.key);
            const HeaderCellComponent = col.fixed
              ? TableHeaderCellWithFixed
              : TableHeaderCell;
            return (
              <HeaderCellComponent
                key={`col-${col.id}`}
                rowSpan={2}
                fixed={col.fixed}
                style={{
                  width: col.width,
                  minWidth: col.minWidth,
                  maxWidth: col.maxWidth,
                }}
              >
                <When condition={!!col.sortable}>
                  <TableSortButton
                    onClick={() => handleSort(String(col.key))}
                    aria-label={`${ACCESSIBILITY_LABELS.SORT_NONE} ${col.label}`}
                  >
                    {col.headerRender ? col.headerRender(col) : col.label}
                    <TableSortIcon direction={sortConfig?.direction} />
                  </TableSortButton>
                </When>
                <When condition={!col.sortable}>
                  {col.headerRender ? col.headerRender(col) : col.label}
                </When>
              </HeaderCellComponent>
            );
          })}
        </TableHeaderRow>

        {/* Bottom row: headers for grouped columns only */}
        <TableHeaderRow>
          {columns.map((col) => {
            const groupId = getGroupIdForColumn(col);
            if (!groupId) return null; // ungrouped columns are already rendered with rowSpan
            return renderHeaderCell(col, { top: SECOND_ROW_TOP_OFFSET_PX });
          })}
        </TableHeaderRow>
      </StyledTableHeader>
    );
  }

  return (
    <StyledTableHeader {...props}>
      <TableHeaderRow>
        <When condition={tableProps.selection?.type === 'multiple'}>
          <TableHeaderCell style={{ width: 48 }}>
            <TableSelection
              type="multiple"
              checked={selection?.isAllSelected}
              indeterminate={selection?.isIndeterminate}
              onChange={handleSelectAll}
            />
          </TableHeaderCell>
        </When>
        {columns.map((c) => renderHeaderCell(c))}
      </TableHeaderRow>
    </StyledTableHeader>
  );
}

function TableHeaderCell({ children, fixed, ...props }: TableHeaderCellProps) {
  const Component = fixed ? StyledTableHeaderCell : StyledTableHeaderCell;

  return <Component {...props}>{children}</Component>;
}

function TableHeaderCellWithFixed({
  children,
  fixed = 'left',
  ...props
}: TableHeaderCellProps & { fixed?: 'left' | 'right' }) {
  return (
    <StyledTableHeaderCellFixed fixed={fixed} {...props}>
      {children}
    </StyledTableHeaderCellFixed>
  );
}

function TableBody({ loading, emptyText, ...props }: TableBodyProps) {
  const { tableData, handleSelection, getRowKey, isRowSelected, tableProps } =
    useTableContext();

  const renderRow = (row: unknown, index: number) => {
    const rowKey = getRowKey(row);
    const selected = isRowSelected(row);
    const rowProps =
      (
        tableProps.onRow as
          | ((
              row: unknown,
              index: number
            ) => React.HTMLAttributes<HTMLTableRowElement>)
          | undefined
      )?.(row, index) ?? {};

    return (
      <TableRow
        key={rowKey}
        selected={selected}
        hoverable={tableProps.hoverable}
        striped={tableProps.striped}
        {...rowProps}
      >
        <When condition={!!tableProps.selection?.type}>
          <TableCell style={{ width: 48 }}>
            <TableSelection
              type={tableProps.selection?.type || 'single'}
              checked={selected}
              onChange={(checked) => handleSelection(rowKey, checked)}
            />
          </TableCell>
        </When>
        {tableProps.columns.map((column) => {
          const value = (row as Record<string, unknown>)[String(column.key)];
          const CellComponent = column.fixed ? TableCellWithFixed : TableCell;

          return (
            <CellComponent
              key={column.id}
              fixed={column.fixed}
              align={column.align}
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
            >
              {column.render
                ? (
                    column.render as (
                      value: unknown,
                      row: unknown,
                      index: number
                    ) => React.ReactNode
                  )(value, row, index)
                : (value as unknown as React.ReactNode)}
            </CellComponent>
          );
        })}
      </TableRow>
    );
  };

  return (
    <StyledTableBody {...props}>
      <When condition={!loading && !tableData.length}>
        <tr>
          <td
            colSpan={
              tableProps.columns.length + (tableProps.selection?.type ? 1 : 0)
            }
          >
            <TableEmptyState>{emptyText}</TableEmptyState>
          </td>
        </tr>
      </When>
      <When condition={!loading && !!tableData.length}>
        {tableData.map(renderRow)}
      </When>
    </StyledTableBody>
  );
}

function TableRow({
  children,
  selected,
  hoverable,
  striped,
  ...props
}: TableRowProps) {
  return (
    <StyledTableRow
      selected={selected}
      hoverable={hoverable}
      striped={striped}
      {...props}
    >
      {children}
    </StyledTableRow>
  );
}

function TableCell({ children, fixed, align, ...props }: TableCellProps) {
  const Component = fixed ? StyledTableCellFixed : StyledTableCell;

  return (
    <Component align={align} {...props}>
      {children}
    </Component>
  );
}

function TableCellWithFixed({
  children,
  fixed = 'left',
  align,
  ...props
}: TableCellProps & { fixed?: 'left' | 'right' }) {
  return (
    <StyledTableCellFixed fixed={fixed} align={align} {...props}>
      {children}
    </StyledTableCellFixed>
  );
}

function TableSelection({
  type,
  checked,
  indeterminate,
  onChange,
  disabled,
  ...props
}: TableSelectionProps) {
  return (
    <TableCheckbox
      checked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
      onChange={onChange}
      aria-label={
        type === 'multiple'
          ? ACCESSIBILITY_LABELS.SELECT_ALL
          : ACCESSIBILITY_LABELS.SELECT_ROW
      }
      {...props}
    />
  );
}

function TablePagination({
  ...props
}: Omit<TablePaginationProps, 'current' | 'pageSize' | 'total' | 'onChange'>) {
  const { pagination, handlePageChange } = useTableContext();

  const handlePrevious = () => {
    if (pagination.page > 1) {
      handlePageChange(pagination.page - 1, pagination.pageSize);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    if (pagination.page < totalPages) {
      handlePageChange(pagination.page + 1, pagination.pageSize);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = +event.target.value;
    handlePageChange(1, newPageSize);
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  const endItem = Math.min(
    pagination.page * pagination.pageSize,
    pagination.total
  );

  return (
    <StyledTablePagination {...props}>
      <TablePaginationInfo>
        <When condition={!!pagination.showTotal}>
          Showing {startItem} to {endItem} of {pagination.total} entries
        </When>
      </TablePaginationInfo>

      <TablePaginationControls>
        <When condition={!!pagination.showSizeChanger}>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show</span>
            <TableSelect
              value={pagination.pageSize}
              onChange={handlePageSizeChange}
            >
              {(pagination.pageSizeOptions ?? []).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </TableSelect>
            <span className="text-sm text-gray-700">entries</span>
          </div>
        </When>

        <div className="flex items-center gap-1">
          <TablePaginationButton
            onClick={handlePrevious}
            disabled={pagination.page <= 1}
            aria-label={ACCESSIBILITY_LABELS.PREVIOUS_PAGE}
          >
            Previous
          </TablePaginationButton>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <TablePaginationButton
                key={pageNum}
                onClick={() => handlePageChange(pageNum, pagination.pageSize)}
                active={pageNum === pagination.page}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </TablePaginationButton>
            );
          })}

          <TablePaginationButton
            onClick={handleNext}
            disabled={pagination.page >= totalPages}
            aria-label={ACCESSIBILITY_LABELS.NEXT_PAGE}
          >
            Next
          </TablePaginationButton>
        </div>
      </TablePaginationControls>
    </StyledTablePagination>
  );
}

Table.Root = TableRoot;
Table.ScrollContainer = TableScrollContainer;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.HeaderCellFixed = TableHeaderCellWithFixed;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.CellFixed = TableCellWithFixed;
Table.Selection = TableSelection;
Table.Pagination = TablePagination;

export default Table;
