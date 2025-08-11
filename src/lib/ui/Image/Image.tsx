import React from 'react';

import type { ImageProps } from './Image.d';
import { useImage } from './hooks/useImage';

function Image({
  src,
  alt,
  fallback,
  className = '',
  loading = 'lazy',
  ...props
}: ImageProps) {
  const { imageProps, hasError, isLoading } = useImage({ src, alt, ...props });

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...imageProps}
      src={src}
      alt={alt}
      loading={loading}
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ${className}`}
    />
  );
}

export default Image;
