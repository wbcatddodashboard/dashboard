import React from 'react';

import type { ButtonProps } from './Button.d';
import { useButton } from './useButton';

function Button({
  children,
  isLoading,
  as: Component = 'button',
  renderLoading,
  ...props
}: ButtonProps) {
  const { buttonProps, isLoading: loading } = useButton({
    children,
    isLoading,
    ...props,
  });

  return (
    <Component {...buttonProps}>
      {loading && renderLoading ? renderLoading({ isLoading: loading }) : null}
      {children}
    </Component>
  );
}

export default Button;
