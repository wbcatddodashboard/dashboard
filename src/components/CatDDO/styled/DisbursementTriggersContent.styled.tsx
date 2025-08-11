import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

export function DisbursementTriggersContainer({ children }: ChildrenProps) {
  return <div className="p-4">{children}</div>;
}

export function DisbursementTriggersTitle({ children }: ChildrenProps) {
  return <h3 className="text-lg font-semibold mb-4">{children}</h3>;
}
