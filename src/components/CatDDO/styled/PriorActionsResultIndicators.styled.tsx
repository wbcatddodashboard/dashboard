import type { ReactNode } from 'react';
import { Button } from 'vizonomy';

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
    <div className="flex items-center justify-between mb-4 w-full">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#295e84] text-[24px] text-left tracking-[-0.18px]">
        <p className="block leading-[24px]">{children}</p>
      </div>
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

export function DownloadButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer bg-transparent border-none"
      title="Download CSV"
    >
      {children}
    </Button>
  );
}
