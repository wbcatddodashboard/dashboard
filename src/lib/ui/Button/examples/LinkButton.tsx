import React from 'react';

import When from '../../When';
import Button, { type ButtonProps } from '../index';

export interface LinkButtonProps extends Omit<ButtonProps, 'renderLoading'> {
  className?: string;
  href?: string;
}

function LinkButton({
  children,
  className = '',
  href,
  ...props
}: LinkButtonProps) {
  const baseClasses = [
    'inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline',
    className,
  ].join(' ');

  const isAnchor = !!href;
  const anchorProps = isAnchor ? { href } : {};

  return (
    <Button
      {...props}
      {...anchorProps}
      as={isAnchor ? 'a' : 'button'}
      className={baseClasses}
      renderLoading={({ isLoading }) => (
        <When condition={isLoading}>
          <span className="mr-2">...</span>
        </When>
      )}
    >
      {children}
    </Button>
  );
}

export default LinkButton;
