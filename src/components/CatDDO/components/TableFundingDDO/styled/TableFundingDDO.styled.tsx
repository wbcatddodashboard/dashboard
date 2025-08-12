import type { ReactNode } from 'react';
import { Table, type TableProps } from 'vizonomy';
import type { FundingSource } from '../../../interfaces';

interface ChildrenProps {
  children: ReactNode;
}

export function TableFundingContainer({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[357px]">
      {children}
    </div>
  );
}

export function TableFundingNote({ children }: ChildrenProps) {
  return (
    <div className="font-['Inter:Italic',_sans-serif] font-normal italic leading-[0] relative shrink-0 text-[#295e84] text-[12px] text-left text-nowrap">
      <p className="block leading-[18px] whitespace-pre">{children}</p>
    </div>
  );
}

interface TableCellTextProps extends ChildrenProps {
  isTotal?: boolean;
}

export function TableCellText({
  children,
  isTotal = false,
}: TableCellTextProps) {
  return (
    <span
      className={`font-['Inter:${isTotal ? 'Semi_Bold' : 'Regular'}',_sans-serif] ${
        isTotal ? 'font-semibold' : 'font-normal'
      } text-[#295e84] text-[14px] ${isTotal ? 'leading-[18px]' : 'leading-normal'} tracking-[-0.154px]`}
    >
      {children}
    </span>
  );
}

export const TableFundingWrapper = (props: TableProps) => {
  return (
    <Table
      {...props}
      bordered
      size="small"
      className="w-[357px] [&_thead]:bg-[#f2f3f5] [&_th]:text-[#295e84] [&_th]:font-['Inter:Medium',_sans-serif] [&_th]:font-medium [&_th]:text-[14px] [&_th]:leading-[21px] [&_th]:tracking-[-0.154px] [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-[rgba(0,0,0,0.1)]"
      onRow={(row: FundingSource) => ({
        className: row.isTotal ? 'border-t-2 border-gray-300' : '',
      })}
    />
  );
};
