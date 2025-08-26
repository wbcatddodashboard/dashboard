export { default as BarChart } from './BarChart';
export { useBarChart } from './useBarChart';

export type {
  BarChartProps,
  BarChartDataPoint,
  StackedBarChartDataPoint,
  BarChartSeries,
  BarChartMargin,
  BarChartOrientation,
  // Note: expose new offset props via BarChartProps
  TooltipData,
  BarChartDimensions,
  UseBarChartProps,
  UseBarChartReturn,
  D3Scale,
  D3BandScale,
  D3LinearScale,
  D3ColorScale,
  StackedDataPoint,
  GridLine,
  AxisData,
} from './BarChart.d';
