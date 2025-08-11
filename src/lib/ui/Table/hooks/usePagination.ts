import { useState, useMemo, useCallback } from 'react';
import {
  UsePaginationProps,
  UsePaginationReturn,
  PaginationInfo,
} from '../Table.d';

export const usePagination = ({
  totalItems,
  initialPageSize = 10,
  initialPage = 1,
  serverSide = false,
  onStateChange,
}: UsePaginationProps): UsePaginationReturn => {
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  const paginationInfo = useMemo((): PaginationInfo => {
    const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, totalItems);

    return {
      from,
      to,
      of: totalItems,
      page,
      pageSize,
      totalPages,
    };
  }, [page, pageSize, totalItems, totalPages]);

  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;

  // Notify server when state changes (server-side only)
  const notifyStateChange = useCallback(
    (newPage: number, newPageSize: number) => {
      if (serverSide && onStateChange) {
        onStateChange({ page: newPage, pageSize: newPageSize });
      }
    },
    [serverSide, onStateChange]
  );

  const setPage = useCallback(
    (newPage: number) => {
      const clampedPage = Math.max(1, Math.min(newPage, totalPages));
      setPageState(clampedPage);
      notifyStateChange(clampedPage, pageSize);
    },
    [totalPages, pageSize, notifyStateChange]
  );

  const setPageSize = useCallback(
    (newPageSize: number) => {
      setPageSizeState(newPageSize);
      // Recalculate page to keep roughly the same position
      const currentFirstItem = (page - 1) * pageSize + 1;
      const newPage = Math.max(1, Math.ceil(currentFirstItem / newPageSize));
      setPageState(newPage);
      notifyStateChange(newPage, newPageSize);
    },
    [page, pageSize, notifyStateChange]
  );

  const nextPage = useCallback(() => {
    if (canNextPage) {
      setPage(page + 1);
    }
  }, [page, canNextPage, setPage]);

  const previousPage = useCallback(() => {
    if (canPreviousPage) {
      setPage(page - 1);
    }
  }, [page, canPreviousPage, setPage]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  // Client-side data pagination
  const getPageData = useCallback(
    <T>(data: T[]): T[] => {
      if (serverSide) return data; // Server-side data is already paginated
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return data.slice(startIndex, endIndex);
    },
    [page, pageSize, serverSide]
  );

  const getInfoText = useCallback(
    (template = 'Showing {from} to {to} of {of} entries'): string => {
      return template
        .replace('{from}', paginationInfo.from.toString())
        .replace('{to}', paginationInfo.to.toString())
        .replace('{of}', paginationInfo.of.toString())
        .replace('{page}', paginationInfo.page.toString())
        .replace('{totalPages}', paginationInfo.totalPages.toString());
    },
    [paginationInfo]
  );

  const getPageNumbers = useCallback(
    (maxVisible = 5): number[] => {
      const pages: number[] = [];
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, page - half);
      const end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    [page, totalPages]
  );

  return {
    // State
    page,
    pageSize,
    totalPages,

    // Info
    paginationInfo,

    // Actions
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,

    // Helpers
    canPreviousPage,
    canNextPage,

    // Formatters
    getInfoText,
    getPageNumbers,

    // Data helpers
    getPageData,
  };
};
