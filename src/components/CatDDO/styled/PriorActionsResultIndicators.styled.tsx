import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

export function PriorActionsWrapper({ children }: ChildrenProps) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

export function PriorActionsContainer({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative size-full">
      {children}
    </div>
  );
}

export function PriorActionsTitle({ children }: ChildrenProps) {
  return (
    <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] min-w-full not-italic relative shrink-0 text-[#295e84] text-[24px] text-left tracking-[-0.18px]">
      <p className="block leading-[24px]">{children}</p>
    </div>
  );
}

export function PriorActionsContentWrapper({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start gap-4 p-0 relative shrink-0 w-full">
      {children}
    </div>
  );
}

export function PriorActionsChartContainer({ children }: ChildrenProps) {
  return (
    <div className="bg-[#ffffff] h-[320px] overflow-visible relative shrink-0 w-full">
      {children}
    </div>
  );
}

export function PriorActionsTableSection({ children }: ChildrenProps) {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      {children}
    </div>
  );
}
