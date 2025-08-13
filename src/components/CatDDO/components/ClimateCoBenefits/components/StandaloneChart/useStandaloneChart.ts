import { useMemo } from 'react';
import type { StackedBarChartDataPoint, BarChartSeries } from 'vizonomy';
import {
  standaloneSeries,
  standaloneChartData,
} from './constants/standaloneChartData';

export const useStandaloneChart = () => {
  const data = standaloneChartData;
  const isLoading = false;
  const errorMessage = '';

  const seriesKeys = useMemo(
    () => standaloneSeries.map((s: BarChartSeries) => s.key as string),
    []
  );

  const mappedData = useMemo<StackedBarChartDataPoint[]>(() => {
    if (!data?.length) return [];
    return data.map((row) => {
      const label = row.label ?? '';
      const values: Record<string, number> = {};
      seriesKeys.forEach((key) => {
        const rawValue = row.values[key] ?? 0;
        const numericValue = +rawValue;
        values[key] = Number.isFinite(numericValue) ? numericValue : 0;
      });
      return { id: row.id, label, values };
    });
  }, [data, seriesKeys]);

  return {
    data: mappedData,
    isLoading,
    errorMessage,
    series: standaloneSeries,
  };
};
