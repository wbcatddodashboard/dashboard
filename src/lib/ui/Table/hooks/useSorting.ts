import { useState, useMemo, useCallback } from 'react';
import { SortConfig, UseSortingProps, UseSortingReturn } from '../Table.d';

export const useSorting = <T = unknown>({
  data = [],
  serverSide = false,
  enableMultiSort = false,
  initialSort = [],
  onStateChange,
}: UseSortingProps<T>): UseSortingReturn<T> => {
  const [sortConfig, setSortConfigState] = useState<SortConfig[]>(initialSort);

  // Notify server when sort changes (server-side only)
  const notifyStateChange = useCallback(
    (newSortConfig: SortConfig[]) => {
      if (serverSide && onStateChange) {
        onStateChange(newSortConfig);
      }
    },
    [serverSide, onStateChange]
  );

  const setSortConfig = useCallback(
    (config: SortConfig[]) => {
      setSortConfigState(config);
      notifyStateChange(config);
    },
    [notifyStateChange]
  );

  const toggleSort = useCallback(
    (key: string, multiSort?: boolean) => {
      const useMultiSort = multiSort ?? enableMultiSort;

      setSortConfigState((prevConfig) => {
        let newConfig: SortConfig[];

        const existingIndex = prevConfig.findIndex((item) => item.key === key);

        if (existingIndex >= 0) {
          const existing = prevConfig[existingIndex];
          if (existing.direction === 'asc') {
            // Change to desc
            newConfig = [
              ...prevConfig.slice(0, existingIndex),
              { key, direction: 'desc' },
              ...prevConfig.slice(existingIndex + 1),
            ];
          } else {
            // Remove sort
            newConfig = [
              ...prevConfig.slice(0, existingIndex),
              ...prevConfig.slice(existingIndex + 1),
            ];
          }
        } else {
          // Add new sort
          const newSort: SortConfig = { key, direction: 'asc' };
          if (useMultiSort) {
            newConfig = [...prevConfig, newSort];
          } else {
            newConfig = [newSort];
          }
        }

        notifyStateChange(newConfig);
        return newConfig;
      });
    },
    [enableMultiSort, notifyStateChange]
  );

  const clearSort = useCallback(() => {
    setSortConfigState([]);
    notifyStateChange([]);
  }, [notifyStateChange]);

  const getSortDirection = useCallback(
    (key: string): 'asc' | 'desc' | undefined => {
      const sort = sortConfig.find((item) => item.key === key);
      return sort?.direction;
    },
    [sortConfig]
  );

  const isSorted = useCallback(
    (key: string): boolean => {
      return sortConfig.some((item) => item.key === key);
    },
    [sortConfig]
  );

  const getSortIndex = useCallback(
    (key: string): number => {
      return sortConfig.findIndex((item) => item.key === key);
    },
    [sortConfig]
  );

  // Client-side data sorting
  const sortedData = useMemo((): T[] => {
    if (serverSide) return data; // Server-side data is already sorted
    if (sortConfig.length === 0) return data;

    return [...data].sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        const aValue = (a as Record<string, unknown>)[key];
        const bValue = (b as Record<string, unknown>)[key];

        let comparison = 0;

        if (aValue == null && bValue == null) {
          comparison = 0;
        } else if (aValue == null) {
          comparison = 1;
        } else if (bValue == null) {
          comparison = -1;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        if (comparison !== 0) {
          return direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0;
    });
  }, [data, sortConfig, serverSide]);

  return {
    // State
    sortConfig,

    // Actions
    toggleSort,
    clearSort,
    setSortConfig,

    // Helpers
    getSortDirection,
    isSorted,
    getSortIndex,

    // Data
    sortedData,
  };
};
