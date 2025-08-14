'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  loadingText?: string;
}

interface LoadingPlaceholderProps {
  width?: number | string;
  height?: number | string;
  loadingText?: string;
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  width = '100%',
  height = '385px',
  loadingText = 'Loading chart...',
}) => (
  <div
    style={{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      color: '#6b7280',
      fontSize: '14px',
    }}
  >
    {loadingText}
  </div>
);

export const withChartWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultWidth?: number | string,
  defaultHeight?: number | string
) => {
  const ChartWithWrapper = dynamic(
    () => Promise.resolve({ default: WrappedComponent }),
    {
      ssr: false,
      loading: () => (
        <LoadingPlaceholder width={defaultWidth} height={defaultHeight} />
      ),
    }
  );

  ChartWithWrapper.displayName = `withChartWrapper(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ChartWithWrapper;
};

export const ClientOnlyChart: React.FC<ChartWrapperProps> = ({
  children,
  width,
  height,
  loadingText,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <LoadingPlaceholder
        width={width}
        height={height}
        loadingText={loadingText}
      />
    );
  }

  return <>{children}</>;
};

export default ClientOnlyChart;
