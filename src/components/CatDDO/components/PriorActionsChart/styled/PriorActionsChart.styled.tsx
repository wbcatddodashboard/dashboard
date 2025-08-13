import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

export function ChartContainer({ children }: ChildrenProps) {
  return <div className="w-full h-full">{children}</div>;
}

export function ChartWrapper({ children }: ChildrenProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
}
