import { useCallback } from 'react';

import type { ButtonProps } from './Button.d';

export const useButton = (props: ButtonProps) => {
  const { isLoading = false, disabled, onClick, ...rest } = props;

  const isDisabled = isLoading || disabled;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [isLoading, isDisabled, onClick]
  );

  return {
    buttonProps: {
      ...rest,
      disabled: isDisabled,
      onClick: handleClick,
      'aria-busy': isLoading,
      'data-loading': isLoading,
    },
    isLoading,
    isDisabled,
  };
};
