import React from 'react';
import { useCollapseContext } from './context/CollapseContext';
import type { TriggerProps } from './Collapse.d';

function CollapseTrigger({ children }: TriggerProps) {
  const { toggleOpen, disabled, isOpen } = useCollapseContext();

  return (
    <div
      data-collapse-trigger
      onClick={toggleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen();
        }
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-expanded={isOpen}
      aria-disabled={disabled}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1,
      }}
    >
      {children}
    </div>
  );
}

export default CollapseTrigger;
