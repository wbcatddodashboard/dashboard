import { useState, useCallback } from 'react';
import type { ImageProps } from '../Image.d';

export const useImage = ({ onError, ...props }: ImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const imageProps = {
    ...props,
    onLoad: handleLoad,
    onError: handleError,
    style: {
      ...props.style,
      objectFit: props.objectFit,
      objectPosition: props.objectPosition,
    },
  };

  return {
    imageProps,
    hasError,
    isLoading,
  };
};
