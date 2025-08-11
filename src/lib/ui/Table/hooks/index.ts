// Clean, unified hooks that handle both client and server modes
export { usePagination } from './usePagination';
export { useSorting } from './useSorting';
export { useSelection } from './useSelection';

// Export types
export type {
  UsePaginationProps,
  UsePaginationReturn,
  PaginationInfo,
} from '../Table.d';
export type { UseSortingProps, UseSortingReturn, SortConfig } from '../Table.d';
export type { UseSelectionProps, UseSelectionReturn } from '../Table.d';
