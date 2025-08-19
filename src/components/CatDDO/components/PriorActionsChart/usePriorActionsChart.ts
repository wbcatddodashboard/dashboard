import { useMemo } from 'react';
import type { BarChartSeries } from 'vizonomy';
import { useFetchPriorActions } from '@/hooks/useFetchPriorActions';

export function usePriorActionsChart() {
  const { chartData, isLoading, error } = useFetchPriorActions();

  const memoizedSeries = useMemo<BarChartSeries[]>(
    () => [
      {
        key: 'Prior Actions',
        label: 'Prior Actions',
        color: '#295e84',
      },
    ],
    []
  );

  return {
    data: chartData,
    series: memoizedSeries,
    isLoading,
    errorMessage: error,
  };
}
