import {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

export function TableRoot({
  children,
  className = '',
  // Omit non-DOM props to avoid React warnings
  loading: _loading,
  size: _size,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}) {
  // Explicitly reference omitted props to satisfy no-unused-vars without affecting output
  void _loading;
  void _size;
  return (
    <div
      className={`table-root relative overflow-hidden border border-gray-200 rounded-lg bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function TableScrollContainer({
  children,
  className = '',
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`table-scroll-container ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export function TableElement({
  children,
  className = '',
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table className={`table w-full border-collapse ${className}`} {...props}>
      {children}
    </table>
  );
}

export function TableHeader({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={`table-header sticky top-0 z-20 bg-gray-50 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableHeaderRow({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`table-header-row border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHeaderCell({
  children,
  className = '',
  style,
  ...props
}: ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={`table-header-cell px-4 py-3 text-left text-sm font-medium text-gray-900 bg-gray-50 ${className}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        ...style,
      }}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableHeaderCellFixed({
  children,
  className = '',
  style,
  fixed = 'left',
  ...props
}: ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  fixed?: 'left' | 'right';
}) {
  return (
    <th
      className={`table-header-cell-fixed px-4 py-3 text-left text-sm font-medium text-gray-900 bg-gray-50 sticky ${className}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        [fixed]: 0,
        boxShadow:
          fixed === 'left'
            ? '2px 0 4px rgba(0,0,0,0.1)'
            : '-2px 0 4px rgba(0,0,0,0.1)',
        ...style,
      }}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableSortButton({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`table-sort-button flex items-center gap-1 hover:text-blue-600 focus:outline-none focus:text-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TableSortIcon({
  direction,
  className = '',
}: {
  direction?: 'asc' | 'desc';
  className?: string;
}) {
  if (!direction) {
    return (
      <svg
        className={`table-sort-icon w-4 h-4 text-gray-400 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`table-sort-icon w-4 h-4 ${direction === 'asc' ? 'text-blue-600' : 'text-blue-600'} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {direction === 'asc' ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4l6 6h4l6-6"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 20l-6-6H9l-6 6"
        />
      )}
    </svg>
  );
}

export function TableBody({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={`table-body divide-y divide-gray-200 ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className = '',
  selected = false,
  hoverable = true,
  striped = false,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  hoverable?: boolean;
  striped?: boolean;
}) {
  const baseClasses = 'table-row';
  const hoverClasses = hoverable ? 'hover:bg-gray-50' : '';
  const selectedClasses = selected ? 'bg-blue-50' : '';
  const stripedClasses = striped ? 'even:bg-gray-50' : '';

  return (
    <tr
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${stripedClasses} ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  className = '',
  style,
  align = 'left',
  ...props
}: TdHTMLAttributes<HTMLTableDataCellElement> & {
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <td
      className={`table-cell px-4 py-3 text-sm text-gray-900 ${alignClasses[align]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableCellFixed({
  children,
  className = '',
  style,
  fixed = 'left',
  align = 'left',
  ...props
}: TdHTMLAttributes<HTMLTableDataCellElement> & {
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <td
      className={`table-cell-fixed px-4 py-3 text-sm text-gray-900 sticky bg-white ${alignClasses[align]} ${className}`}
      style={{
        position: 'sticky',
        [fixed]: 0,
        zIndex: 20,
        boxShadow:
          fixed === 'left'
            ? '2px 0 4px rgba(0,0,0,0.1)'
            : '-2px 0 4px rgba(0,0,0,0.1)',
        ...style,
      }}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableCheckbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  className = '',
  ...props
}: Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      className={`table-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 ${className}`}
      onChange={(e) => onChange?.(e.target.checked)}
      ref={(el) => {
        if (el) el.indeterminate = indeterminate;
      }}
      {...props}
    />
  );
}

export function TableLoadingOverlay({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`table-loading-overlay absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        {children && <span className="text-sm text-gray-600">{children}</span>}
      </div>
    </div>
  );
}

export function TableEmptyState({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`table-empty-state py-12 text-center ${className}`}>
      <div className="text-gray-500 text-sm">
        {children || 'No data available'}
      </div>
    </div>
  );
}

export function TablePagination({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`table-pagination flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function TablePaginationInfo({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`table-pagination-info text-sm text-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function TablePaginationControls({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`table-pagination-controls flex items-center gap-2 ${className}`}
    >
      {children}
    </div>
  );
}

export function TablePaginationButton({
  children,
  disabled = false,
  active = false,
  className = '',
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  active?: boolean;
}) {
  const baseClasses =
    'table-pagination-button px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500';
  const disabledClasses = disabled
    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
    : 'bg-white text-gray-700 hover:bg-gray-50';
  const activeClasses = active
    ? 'bg-blue-600 text-white border-blue-600'
    : 'border-gray-300';

  return (
    <button
      className={`${baseClasses} ${disabledClasses} ${activeClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function TableSelect({
  children,
  className = '',
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`table-select text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function TableResizeHandle({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`table-resize-handle absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-blue-200 ${className}`}
      {...props}
    />
  );
}
