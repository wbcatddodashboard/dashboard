import { useCallback, useEffect, useState } from 'react';

import type { UseCollapseProps } from '../Collapse.d';

const useCollapse = (props: UseCollapseProps) => {
  const {
    isOpen: controlledIsOpen,
    onToggle,
    disabled = false,
    defaultOpen = false,
    animated = true,
    duration = 300,
    iconPosition = 'right',
    icon,
  } = props;

  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const toggleOpen = useCallback(() => {
    if (disabled) return;

    const newIsOpen = !isOpen;

    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }

    onToggle?.(newIsOpen);
  }, [isOpen, disabled, controlledIsOpen, onToggle]);

  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
        e.preventDefault();
        toggleOpen();
      }
    };

    const triggerElements = document.querySelectorAll(
      '[data-collapse-trigger]'
    );

    triggerElements.forEach((element) => {
      element.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      triggerElements.forEach((element) => {
        element.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [toggleOpen]);

  return {
    isOpen,
    disabled,
    toggleOpen,
    animated,
    duration,
    iconPosition,
    icon,
  };
};

export default useCollapse;
