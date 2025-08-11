import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

export function PolicyProgramContainer({ children }: ChildrenProps) {
  return <div className="p-4">{children}</div>;
}

export function PolicyProgramTitle({ children }: ChildrenProps) {
  return <h3 className="text-lg font-semibold mb-4">{children}</h3>;
}
