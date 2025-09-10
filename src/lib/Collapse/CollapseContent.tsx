import React, { useRef, useEffect } from 'react';
import { useCollapseContext } from './context/CollapseContext';
import type { ContentProps } from './Collapse.d';

function CollapseContent({ children }: ContentProps) {
  const { isOpen, animated, duration } = useCollapseContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !animated) return;

    const element = contentRef.current;

    if (isOpen) {
      element.style.height = '0px';
      element.style.opacity = '0';
      element.style.overflow = 'hidden';

      void element.offsetHeight;

      element.style.transition = `height ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      element.style.height = `${element.scrollHeight}px`;
      element.style.opacity = '1';

      const timeout = setTimeout(() => {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      element.style.height = `${element.scrollHeight}px`;
      element.style.opacity = '1';
      element.style.overflow = 'hidden';

      void element.offsetHeight;

      element.style.transition = `height ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      element.style.height = '0px';
      element.style.opacity = '0';
    }
  }, [isOpen, animated, duration]);

  if (!animated) {
    return isOpen ? <div>{children}</div> : null;
  }

  return (
    <div
      ref={contentRef}
      style={{
        overflow: 'hidden',
        height: isOpen ? 'auto' : '0px',
        opacity: isOpen ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

export default CollapseContent;
