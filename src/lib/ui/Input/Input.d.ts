import type { HTMLAttributes, ReactNode } from 'react';

// Props specifically for the useInput hook
export interface UseInputProps {
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  disabled?: boolean;
  type?: string;
}

export interface InputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'>,
    Omit<UseInputProps, 'value' | 'onChange'> {
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  placeholder?: string;
  type?: string;
  children: (state: InputContextType) => ReactNode;
}

export interface InputContextType {
  value: string | boolean;
  isChecked: boolean;
  isFocused: boolean;
  disabled: boolean;
  type: string;
  placeholder?: string;
  handleFocus: () => void;
  handleBlur: () => void;
  handleClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  handleChange: (value: string) => void;
}

export interface InputFieldProps {
  children?: ReactNode;
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
