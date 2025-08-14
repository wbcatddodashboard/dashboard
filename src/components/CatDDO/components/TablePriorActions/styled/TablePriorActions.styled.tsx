import type { ReactNode } from 'react';
import { Table, type TableProps, type TableColumn } from 'vizonomy';

interface ChildrenProps {
  children: ReactNode;
}

interface TableCellTextProps extends ChildrenProps {
  isTotal?: boolean;
}

export function TablePriorActionsContainer({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      {children}
    </div>
  );
}

export function TablePriorActionsTitle({ children }: ChildrenProps) {
  return (
    <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#295e84] text-[18px] text-left tracking-[-0.14px]">
      <p className="block leading-[22px]">{children}</p>
    </div>
  );
}

export function TablePriorActionsWrapper_Container({
  children,
}: ChildrenProps) {
  return <div className="relative shrink-0 w-full">{children}</div>;
}

export function TableCellText({
  children,
  isTotal = false,
}: TableCellTextProps) {
  return (
    <div
      className={`font-['Inter:Regular',_sans-serif] ${isTotal ? 'font-semibold' : 'font-normal'} leading-[0] not-italic relative shrink-0 text-[#295e84] text-[12px] text-left tracking-[-0.154px]`}
    >
      <p className="adjustLetterSpacing block leading-[18px]">{children}</p>
    </div>
  );
}

export interface TablePriorActionsWrapperProps<T = unknown> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
  maxBodyHeight?: number;
  scroll?: { x?: number | boolean; y?: number };
  sorting?: unknown;
  rowKey?: string;
}

export const TablePriorActionsWrapper = <T,>(
  props: TablePriorActionsWrapperProps<T>
) => {
  const {
    maxBodyHeight = 800,
    scroll,
    ...rest
  } = props as TablePriorActionsWrapperProps<T>;
  const incoming = rest as unknown as TableProps & {
    scroll?: { x?: number | boolean; y?: number };
  };
  const mergedScroll = {
    ...(incoming.scroll ?? {}),
    ...(scroll ?? {}),
    y: maxBodyHeight,
  };
  return (
    <Table
      {...incoming}
      bordered
      size="small"
      className="!w-full !min-w-full [&_thead]:bg-[#f2f3f5] [&_th]:text-[#295e84] [&_th]:font-['Inter:Medium',_sans-serif] [&_th]:font-medium [&_th]:text-[12px] [&_th]:leading-[18px] [&_th]:tracking-[-0.154px] [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-2 [&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-[rgba(0,0,0,0.1)] [&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10"
      scroll={mergedScroll}
      onRow={(row: Record<string, unknown>) => ({
        className: (row as { isTotal?: boolean }).isTotal
          ? 'border-t-2 border-gray-300'
          : '',
      })}
    />
  );
};
