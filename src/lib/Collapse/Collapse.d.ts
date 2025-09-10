import type { HTMLAttributes, ReactNode } from 'react';

// Props specifically for the useCollapse hook
export interface UseCollapseProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  disabled?: boolean;
  defaultOpen?: boolean;
  animated?: boolean;
  duration?: number;
  iconPosition?: 'left' | 'right';
  icon?: ReactNode;
}

export interface CollapseProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<
      UseCollapseProps,
      'isOpen' | 'onToggle' // Inherit hook props, but override core ones
    > {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  iconPosition?: 'left' | 'right';
  icon?: ReactNode;
  children: (state: CollapseContextType) => ReactNode; // children is mandatory
}

export interface CollapseContextType {
  isOpen: boolean;
  disabled: boolean;
  toggleOpen: () => void;
  animated: boolean;
  duration: number;
  iconPosition: 'left' | 'right';
  icon?: ReactNode;
}

export interface TriggerProps {
  children?: ReactNode;
}

export interface ContentProps {
  children?: ReactNode;
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
