import { ReactNode } from 'react';
import { CommonPaginationReturn } from './types';

export interface PaginationControlsProps {
  pagination: CommonPaginationReturn;
  maxVisiblePages?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  className?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  disabledButtonClassName?: string;
  renderButton?: (props: {
    page: number;
    isActive: boolean;
    isDisabled: boolean;
    onClick: () => void;
    children: ReactNode;
  }) => ReactNode;
}

export function PaginationControls({
  pagination,
  maxVisiblePages = 5,
  showFirstLast = true,
  showPrevNext = true,
  className = '',
  buttonClassName = 'px-3 py-1 border rounded',
  activeButtonClassName = 'bg-blue-600 text-white',
  disabledButtonClassName = 'opacity-50 cursor-not-allowed',
  renderButton,
}: PaginationControlsProps) {
  const pageNumbers = pagination.getPageNumbers(maxVisiblePages);

  const Button = ({
    onClick,
    disabled = false,
    active = false,
    children,
  }: {
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    children: ReactNode;
  }) => {
    const classes = [
      buttonClassName,
      active ? activeButtonClassName : '',
      disabled ? disabledButtonClassName : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (renderButton) {
      return renderButton({
        page: typeof children === 'number' ? children : 0,
        isActive: active,
        isDisabled: disabled,
        onClick,
        children,
      });
    }

    return (
      <button onClick={onClick} disabled={disabled} className={classes}>
        {children}
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showFirstLast && (
        <Button
          onClick={pagination.goToFirstPage}
          disabled={!pagination.canPreviousPage}
        >
          ««
        </Button>
      )}

      {showPrevNext && (
        <Button
          onClick={pagination.previousPage}
          disabled={!pagination.canPreviousPage}
        >
          ‹
        </Button>
      )}

      {pageNumbers.map((pageNum) => (
        <Button
          key={pageNum}
          onClick={() => pagination.setPage(pageNum)}
          active={pageNum === pagination.page}
        >
          {pageNum}
        </Button>
      ))}

      {showPrevNext && (
        <Button
          onClick={pagination.nextPage}
          disabled={!pagination.canNextPage}
        >
          ›
        </Button>
      )}

      {showFirstLast && (
        <Button
          onClick={pagination.goToLastPage}
          disabled={!pagination.canNextPage}
        >
          »»
        </Button>
      )}
    </div>
  );
}

export default PaginationControls;
