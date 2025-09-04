import type { ReactNode } from 'react';
import { Button } from 'vizonomy';

interface ChildrenProps {
  children: ReactNode;
}

export function DisbursementTriggersContainer({ children }: ChildrenProps) {
  return <div className="p-4">{children}</div>;
}

export function DisbursementTriggersTitle({ children }: ChildrenProps) {
  return (
    <div className="flex items-center justify-between mb-4 w-full">
      {children}
    </div>
  );
}

export function DownloadButtonTrigger({
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
