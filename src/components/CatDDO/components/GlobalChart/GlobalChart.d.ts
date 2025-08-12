import type { StackedBarChartDataPoint, BarChartSeries } from 'vizonomy';

export type GlobalChartProps = object;

export interface GlobalChartHookResult {
  data: StackedBarChartDataPoint[];
  isLoading: boolean;
  errorMessage: string;
  series: BarChartSeries[];
}
