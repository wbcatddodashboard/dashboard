import type { ReactNode } from 'react';

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
