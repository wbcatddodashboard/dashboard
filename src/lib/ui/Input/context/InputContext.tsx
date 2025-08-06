import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import type { InputContextType } from '../Input.d';

const InputContext = createContext<InputContextType | undefined>(undefined);

export function InputProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: InputContextType;
}) {
  return <InputContext.Provider value={value}>{children}</InputContext.Provider>;
}

export function useInputContext() {
  const context = useContext(InputContext);

  if (context === undefined) {
    throw new Error('useInputContext must be used within an InputProvider');
  }

  return context;
}
