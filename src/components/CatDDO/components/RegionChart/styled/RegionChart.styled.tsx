import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

export function ChartContainer({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-[681px]">
      {children}
    </div>
  );
}

export function ChartHeader({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
      {children}
    </div>
  );
}

export function ChartTitle({ children }: ChildrenProps) {
  return (
    <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#295e84] text-[18px] text-left text-nowrap tracking-[-0.18px]">
      <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
        {children}
      </p>
    </div>
  );
}

export function ChartIcon({ children }: ChildrenProps) {
  return (
    <div className="relative shrink-0 size-6">
      {children}
    </div>
  );
}

export function ChartWrapper({ children }: ChildrenProps) {
  return (
    <div className="bg-[#ffffff] h-[385px] overflow-clip relative shrink-0 w-full">
      {children}
    </div>
  );
}
