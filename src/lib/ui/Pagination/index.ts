// Public pagination module that surfaces headless pagination utilities and UI
// components at the top-level `@lib/ui` namespace, decoupled from `Table`.

// Hook
export { usePagination } from '../Table/hooks';
export type {
  UsePaginationProps,
  UsePaginationReturn,
  // Alias to avoid name collision with component export below
  PaginationInfo as PaginationInfoType,
} from '../Table/hooks';

// UI components
export {
  PaginationInfo,
  PaginationControls,
  PageSizeSelector,
} from '../Table/components';
export type {
  CommonPaginationInfo,
  CommonPaginationReturn,
  PaginationInfoProps,
  PaginationControlsProps,
  PageSizeSelectorProps,
} from '../Table/components';
