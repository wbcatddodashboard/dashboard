import { useState, useMemo, useCallback } from 'react';
import { UseSelectionProps, UseSelectionReturn } from '../Table.d';

export const useSelection = <T = unknown>({
  data,
  getRowId,
  enableMultiSelect = false,
  isRowSelectable = () => true,
  initialSelectedIds = [],
}: UseSelectionProps<T>): UseSelectionReturn<T> => {
  const [selectedIds, setSelectedIdsState] =
    useState<string[]>(initialSelectedIds);

  const selectableRows = useMemo(() => {
    return data.filter(isRowSelectable);
  }, [data, isRowSelectable]);

  const selectableIds = useMemo(() => {
    return selectableRows.map(getRowId);
  }, [selectableRows, getRowId]);

  const selectedRows = useMemo(() => {
    return data.filter((row) => selectedIds.includes(getRowId(row)));
  }, [data, selectedIds, getRowId]);

  const isAllSelected = useMemo(() => {
    if (selectableIds.length === 0) return false;
    return selectableIds.every((id) => selectedIds.includes(id));
  }, [selectableIds, selectedIds]);

  const isPartiallySelected = useMemo(() => {
    const selectedSelectableIds = selectedIds.filter((id) =>
      selectableIds.includes(id)
    );
    return (
      selectedSelectableIds.length > 0 &&
      selectedSelectableIds.length < selectableIds.length
    );
  }, [selectedIds, selectableIds]);

  const selectedCount = selectedIds.length;
  const selectableCount = selectableIds.length;

  const setSelectedIds = useCallback((ids: string[]) => {
    setSelectedIdsState(ids);
  }, []);

  const selectRow = useCallback(
    (id: string) => {
      const row = data.find((row) => getRowId(row) === id);
      if (!row || !isRowSelectable(row)) return;

      setSelectedIdsState((prev) => {
        if (enableMultiSelect) {
          return prev.includes(id) ? prev : [...prev, id];
        } else {
          return [id];
        }
      });
    },
    [data, getRowId, isRowSelectable, enableMultiSelect]
  );

  const deselectRow = useCallback((id: string) => {
    setSelectedIdsState((prev) =>
      prev.filter((selectedId) => selectedId !== id)
    );
  }, []);

  const toggleRow = useCallback(
    (id: string) => {
      const row = data.find((row) => getRowId(row) === id);
      if (!row || !isRowSelectable(row)) return;

      setSelectedIdsState((prev) => {
        if (prev.includes(id)) {
          return prev.filter((selectedId) => selectedId !== id);
        } else {
          if (enableMultiSelect) {
            return [...prev, id];
          } else {
            return [id];
          }
        }
      });
    },
    [data, getRowId, isRowSelectable, enableMultiSelect]
  );

  const selectAll = useCallback(() => {
    if (!enableMultiSelect) return;
    setSelectedIdsState(selectableIds);
  }, [enableMultiSelect, selectableIds]);

  const deselectAll = useCallback(() => {
    setSelectedIdsState([]);
  }, []);

  const toggleAll = useCallback(() => {
    if (!enableMultiSelect) return;

    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  }, [enableMultiSelect, isAllSelected, selectAll, deselectAll]);

  const isRowSelectedFn = useCallback(
    (row: T): boolean => {
      return selectedIds.includes(getRowId(row));
    },
    [selectedIds, getRowId]
  );

  const isRowSelectableFn = useCallback(
    (row: T): boolean => {
      return isRowSelectable(row);
    },
    [isRowSelectable]
  );

  return {
    // State
    selectedIds,
    selectedRows,

    // Actions
    selectRow,
    deselectRow,
    toggleRow,
    selectAll,
    deselectAll,
    toggleAll,
    setSelectedIds,

    // Helpers
    isRowSelected: isRowSelectedFn,
    isRowSelectable: isRowSelectableFn,
    selectableRows,
    selectableIds,

    // Bulk selection state
    isAllSelected,
    isPartiallySelected,
    selectedCount,
    selectableCount,
  };
};
