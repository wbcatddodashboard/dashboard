// Common interfaces for pagination components that work with both client and server pagination

export interface CommonPaginationInfo {
  from: number;
  to: number;
  of: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CommonPaginationReturn {
  // State
  page: number;
  pageSize: number;
  totalPages: number;

  // Info
  paginationInfo: CommonPaginationInfo;

  // Actions
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;

  // Helpers
  canPreviousPage: boolean;
  canNextPage: boolean;

  // Formatters
  getInfoText: (template?: string) => string;
  getPageNumbers: (maxVisible?: number) => number[];
}
