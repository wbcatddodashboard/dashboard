import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  as?: ElementType;
  renderLoading?: (props: { isLoading: boolean }) => ReactNode;
}

export interface ButtonStyleProps {
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
}
