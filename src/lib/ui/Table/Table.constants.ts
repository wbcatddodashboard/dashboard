export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const TABLE_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const SELECTION_TYPE = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
} as const;

export const COLUMN_FIXED = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const COLUMN_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export const DEFAULT_ITEM_HEIGHT = 48;

export const DEFAULT_OVERSCAN = 5;

export const MIN_COLUMN_WIDTH = 80;

export const DEFAULT_COLUMN_WIDTH = 120;

export const RESIZE_HANDLE_WIDTH = 8;

export const SCROLL_BAR_SIZE = 16;

export const EMPTY_DATA_HEIGHT = 200;

export const LOADING_DELAY = 300;

export const DEBOUNCE_DELAY = 150;

export const VIRTUAL_THRESHOLD = 100;

export const FIXED_COLUMN_Z_INDEX = 10;

export const HEADER_Z_INDEX = 20;

export const SELECTION_COLUMN_WIDTH = 48;

export const EXPAND_COLUMN_WIDTH = 48;

export const DEFAULT_EMPTY_TEXT = 'No data available';

export const ACCESSIBILITY_LABELS = {
  SORT_ASC: 'Sort ascending',
  SORT_DESC: 'Sort descending',
  SORT_NONE: 'Sort column',
  SELECT_ROW: 'Select row',
  SELECT_ALL: 'Select all rows',
  EXPAND_ROW: 'Expand row',
  COLLAPSE_ROW: 'Collapse row',
  PREVIOUS_PAGE: 'Previous page',
  NEXT_PAGE: 'Next page',
  FIRST_PAGE: 'First page',
  LAST_PAGE: 'Last page',
  PAGE_SIZE: 'Items per page',
  JUMP_TO_PAGE: 'Jump to page',
} as const;

export const CSS_VARIABLES = {
  ROW_HEIGHT_SMALL: '32px',
  ROW_HEIGHT_MEDIUM: '40px',
  ROW_HEIGHT_LARGE: '48px',
  HEADER_HEIGHT: '40px',
  BORDER_COLOR: '#e5e7eb',
  HOVER_COLOR: '#f9fafb',
  SELECTED_COLOR: '#eff6ff',
  STRIPE_COLOR: '#f8fafc',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;
