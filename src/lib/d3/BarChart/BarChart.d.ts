import type { SVGAttributes } from 'react';

export interface BarChartDataPoint {
  id: string;
  label: string;
  value: number;
  category?: string;
}

export interface StackedBarChartDataPoint {
  id: string;
  label: string;
  values: Record<string, number>;
  total?: number;
}

export interface BarChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface BarChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type BarChartOrientation = 'vertical' | 'horizontal';

export interface BarChartProps extends Omit<SVGAttributes<SVGSVGElement>, 'width' | 'height'> {
  data: StackedBarChartDataPoint[];
  series: BarChartSeries[];
  width?: number;
  height?: number;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  orientation?: BarChartOrientation;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  margin?: BarChartMargin;
  onBarClick?: (dataPoint: StackedBarChartDataPoint, series: string) => void;
  onBarHover?: (dataPoint: StackedBarChartDataPoint | null, series?: string) => void;
}

export interface TooltipData {
  dataPoint: StackedBarChartDataPoint;
  series: string;
  value: number;
  x: number;
  y: number;
}

export interface BarChartDimensions {
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: BarChartMargin;
}

export interface UseBarChartProps extends BarChartProps {}

export interface UseBarChartReturn {
  svgRef: React.RefObject<SVGSVGElement>;
  dimensions: BarChartDimensions;
  scales: {
    xScale: any;
    yScale: any;
    colorScale: any;
  };
  stackedData: any[];
  tooltip: TooltipData | null;
  processedData: (StackedBarChartDataPoint & { total: number })[];
  handleBarClick: (dataPoint: StackedBarChartDataPoint, seriesKey: string) => void;
  handleBarMouseEnter: (event: React.MouseEvent, dataPoint: StackedBarChartDataPoint, seriesKey: string) => void;
  handleBarMouseLeave: () => void;
  formatValue: (value: number) => string;
}