import { useState, useMemo, useCallback } from 'react';
import {
  UseTableProps,
  UseTableReturn,
  SortConfig,
  PaginationConfig,
} from './Table.d';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
  SORT_DIRECTION,
} from './Table.constants';

export const useTable = <T = unknown>({
  data,
  columns,
  pagination: paginationConfig,
  sorting: sortingConfig,
  selection: selectionConfig,
  rowKey = 'id',
}: UseTableProps<T>): UseTableReturn<T> => {
  const [currentPage, setCurrentPage] = useState(paginationConfig?.page ?? 1);
  const [pageSize, setPageSize] = useState(
    paginationConfig?.pageSize ?? DEFAULT_PAGE_SIZE
  );
  const [sortConfig, setSortConfig] = useState<SortConfig[]>(
    sortingConfig?.defaultSort ?? []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(
    selectionConfig?.selectedRowKeys ?? []
  );
  const loading = false;

  const getRowKey = useCallback(
    (row: T): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      return String((row as Record<string, unknown>)[rowKey as string]);
    },
    [rowKey]
  );

  const sortedData = useMemo(() => {
    if (!sortConfig.length) return data;

    return [...data].sort((a, b) => {
      for (const sort of sortConfig) {
        const column = columns.find((col) => col.key === sort.key);
        if (!column) continue;

        const aValue = (a as Record<string, unknown>)[column.key as string];
        const bValue = (b as Record<string, unknown>)[column.key as string];

        let comparison = 0;

        if (aValue === null || aValue === undefined) {
          comparison = bValue === null || bValue === undefined ? 0 : -1;
        } else if (bValue === null || bValue === undefined) {
          comparison = 1;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        if (comparison !== 0) {
          return sort.direction === SORT_DIRECTION.ASC
            ? comparison
            : -comparison;
        }
      }
      return 0;
    });
  }, [data, sortConfig, columns]);

  const paginatedData = useMemo(() => {
    if (!paginationConfig) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, paginationConfig]);

  const tableData = paginationConfig ? paginatedData : sortedData;

  const pagination: PaginationConfig = useMemo(
    () => ({
      page: currentPage,
      pageSize,
      total: data.length,

      pageSizeOptions: paginationConfig?.pageSizeOptions ?? [
        ...DEFAULT_PAGE_SIZE_OPTIONS,
      ],
      showSizeChanger: paginationConfig?.showSizeChanger ?? true,
      showQuickJumper: paginationConfig?.showQuickJumper ?? false,
      showTotal: paginationConfig?.showTotal ?? true,
    }),
    [currentPage, pageSize, data.length, paginationConfig]
  );

  const selectedRows = useMemo(() => {
    return tableData.filter((row) => selectedRowKeys.includes(getRowKey(row)));
  }, [tableData, selectedRowKeys, getRowKey]);

  const isAllSelected = useMemo(() => {
    if (!tableData.length) return false;
    const selectableRows = tableData.filter(
      (row) => !selectionConfig?.disabled?.(row)
    );
    return (
      selectableRows.length > 0 &&
      selectableRows.every((row) => selectedRowKeys.includes(getRowKey(row)))
    );
  }, [tableData, selectedRowKeys, getRowKey, selectionConfig]);

  const isIndeterminate = useMemo(() => {
    if (!tableData.length) return false;
    const selectableRows = tableData.filter(
      (row) => !selectionConfig?.disabled?.(row)
    );
    const selectedSelectableRows = selectableRows.filter((row) =>
      selectedRowKeys.includes(getRowKey(row))
    );
    return (
      selectedSelectableRows.length > 0 &&
      selectedSelectableRows.length < selectableRows.length
    );
  }, [tableData, selectedRowKeys, getRowKey, selectionConfig]);

  const handleSort = useCallback(
    (columnKey: string) => {
      const column = columns.find((col) => col.key === columnKey);
      if (!column?.sortable) return;

      setSortConfig((prevSort) => {
        const existingSort = prevSort.find((sort) => sort.key === columnKey);

        if (!existingSort) {
          const newSort: SortConfig = {
            key: columnKey,
            direction: SORT_DIRECTION.ASC,
          };
          return sortingConfig?.multiple ? [...prevSort, newSort] : [newSort];
        }

        if (existingSort.direction === SORT_DIRECTION.ASC) {
          return prevSort.map((sort) =>
            sort.key === columnKey
              ? { ...sort, direction: SORT_DIRECTION.DESC }
              : sort
          );
        }

        return prevSort.filter((sort) => sort.key !== columnKey);
      });
    },
    [columns, sortingConfig?.multiple]
  );

  const handlePageChange = useCallback(
    (page: number, newPageSize: number) => {
      setCurrentPage(page);
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setCurrentPage(1);
      }
    },
    [pageSize]
  );

  const handleSelection = useCallback(
    (rowKey: string, selected: boolean) => {
      if (selectionConfig?.type === 'single') {
        setSelectedRowKeys(selected ? [rowKey] : []);
      } else {
        setSelectedRowKeys((prev) =>
          selected ? [...prev, rowKey] : prev.filter((key) => key !== rowKey)
        );
      }
    },
    [selectionConfig?.type]
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selectionConfig?.type !== 'multiple') return;

      const selectableRows = tableData.filter(
        (row) => !selectionConfig?.disabled?.(row)
      );
      const selectableRowKeys = selectableRows.map(getRowKey);

      if (selected) {
        setSelectedRowKeys((prev) => [
          ...prev.filter((key) => !selectableRowKeys.includes(key)),
          ...selectableRowKeys,
        ]);
      } else {
        setSelectedRowKeys((prev) =>
          prev.filter((key) => !selectableRowKeys.includes(key))
        );
      }
    },
    [tableData, getRowKey, selectionConfig]
  );

  const isRowSelected = useCallback(
    (row: T): boolean => {
      return selectedRowKeys.includes(getRowKey(row));
    },
    [selectedRowKeys, getRowKey]
  );

  const isRowDisabled = useCallback(
    (row: T): boolean => {
      return selectionConfig?.disabled?.(row) ?? false;
    },
    [selectionConfig]
  );

  const resetSelection = useCallback(() => {
    setSelectedRowKeys([]);
  }, []);

  const resetSorting = useCallback(() => {
    setSortConfig([]);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setPageSize(paginationConfig?.pageSize ?? DEFAULT_PAGE_SIZE);
  }, [paginationConfig?.pageSize]);

  return {
    tableData,
    columns,
    pagination,
    sorting: sortConfig,
    selection: {
      selectedRowKeys,
      selectedRows,
      isAllSelected,
      isIndeterminate,
    },
    loading,
    handleSort,
    handlePageChange,
    handleSelection,
    handleSelectAll,
    getRowKey,
    isRowSelected,
    isRowDisabled,
    resetSelection,
    resetSorting,
    resetPagination,
  };
};
