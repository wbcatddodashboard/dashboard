import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { CollapseContextType } from '../Collapse.d';

const CollapseContext = createContext<CollapseContextType | undefined>(
  undefined
);

export function CollapseProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: CollapseContextType;
}) {
  return (
    <CollapseContext.Provider value={value}>
      {children}
    </CollapseContext.Provider>
  );
}

export function useCollapseContext() {
  const context = useContext(CollapseContext);

  if (context === undefined) {
    throw new Error(
      'useCollapseContext must be used within a CollapseProvider'
    );
  }

  return context;
}
