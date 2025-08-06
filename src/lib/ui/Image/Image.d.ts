import type { ImgHTMLAttributes } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fallback?: React.ReactNode;
  onError?: () => void;
}
