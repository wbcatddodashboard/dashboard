import { ReactNode } from 'react';
import { CommonPaginationReturn } from './types';

export interface PageSizeSelectorProps {
  pagination: CommonPaginationReturn;
  options?: number[];
  label?: string;
  className?: string;
  selectClassName?: string;
  render?: (props: {
    currentPageSize: number;
    options: number[];
    onChange: (pageSize: number) => void;
  }) => ReactNode;
}

export function PageSizeSelector({
  pagination,
  options = [10, 20, 50, 100],
  label = 'Show',
  className = '',
  selectClassName = 'border rounded px-2 py-1',
  render,
}: PageSizeSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    pagination.setPageSize(Number(event.target.value));
  };

  if (render) {
    return (
      <div className={className}>
        {render({
          currentPageSize: pagination.pageSize,
          options,
          onChange: pagination.setPageSize,
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span>{label}</span>
      <select
        value={pagination.pageSize}
        onChange={handleChange}
        className={selectClassName}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>entries</span>
    </div>
  );
}

export default PageSizeSelector;
