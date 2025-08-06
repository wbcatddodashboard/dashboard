import React from 'react';

import When from '../../When';
import Button, { type ButtonProps } from '../index';

export interface PrimaryButtonProps extends Omit<ButtonProps, 'as' | 'renderLoading'> {
  className?: string;
}

function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  const baseClasses = [
    'px-4 py-2 rounded-md font-medium',
    'bg-blue-600 text-white hover:bg-blue-700',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  ].join(' ');

  const spinnerPath = [
    'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291',
    'A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
  ].join(' ');

  return (
    <Button
      {...props}
      className={baseClasses}
      renderLoading={({ isLoading }) => (
        <When condition={isLoading}>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path className="opacity-75" fill="currentColor" d={spinnerPath} />
          </svg>
        </When>
      )}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
