import React, { createContext, useContext } from 'react';
import type { StepModalContextValue } from './StepModal.d';

const StepModalContext = createContext<StepModalContextValue | null>(null);

export function StepModalProvider({ 
  children, 
  value 
}: { 
  children: React.ReactNode; 
  value: StepModalContextValue;
}) {
  return (
    <StepModalContext.Provider value={value}>
      {children}
    </StepModalContext.Provider>
  );
}

export function useStepModalContext(): StepModalContextValue {
  const context = useContext(StepModalContext);
  if (!context) {
    throw new Error('StepModal components must be used within a StepModal.Root');
  }
  return context;
}