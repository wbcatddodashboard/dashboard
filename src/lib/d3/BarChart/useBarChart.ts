import { useCallback, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

import type {
  UseBarChartProps,
  UseBarChartReturn,
  StackedBarChartDataPoint,
  TooltipData,
  BarChartDimensions,
} from './BarChart.d';

const DEFAULT_MARGIN = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 40,
};

const DEFAULT_DIMENSIONS = {
  width: 800,
  height: 400,
};

const BAR_PADDING = 0.1;

export const useBarChart = (props: UseBarChartProps): UseBarChartReturn => {
  const {
    data,
    series,
    width = DEFAULT_DIMENSIONS.width,
    height = DEFAULT_DIMENSIONS.height,
    margin = DEFAULT_MARGIN,
    orientation = 'vertical',
    barPadding = BAR_PADDING,
    onBarClick,
    onBarHover,
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const dimensions: BarChartDimensions = useMemo(
    () => ({
      width,
      height,
      innerWidth: width - margin.left - margin.right,
      innerHeight: height - margin.top - margin.bottom,
      margin,
    }),
    [width, height, margin]
  );

  const processedData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      total: Object.values(d.values).reduce((sum, val) => sum + val, 0),
    }));
  }, [data]);

  const scales = useMemo(() => {
    const maxValue = d3.max(processedData, (d) => d.total) ?? 0;

    let xScale, yScale;

    if (orientation === 'vertical') {
      xScale = d3
        .scaleBand()
        .domain(processedData.map((d) => d.label))
        .range([0, dimensions.innerWidth])
        .padding(barPadding);

      yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([dimensions.innerHeight, 0])
        .nice();
    } else {
      // Horizontal orientation
      xScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([0, dimensions.innerWidth])
        .nice();

      yScale = d3
        .scaleBand()
        .domain(processedData.map((d) => d.label))
        .range([0, dimensions.innerHeight])
        .padding(barPadding);
    }

    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(series.map((s) => s.key))
      .range(series.map((s) => s.color));

    return { xScale, yScale, colorScale };
  }, [processedData, dimensions, series, orientation, barPadding]);

  const stackedData = useMemo(() => {
    const stack = d3
      .stack<StackedBarChartDataPoint>()
      .keys(series.map((s) => s.key))
      .value((d, key) => d.values[key] ?? 0);

    return stack(processedData);
  }, [processedData, series]);

  const handleBarClick = useCallback(
    (dataPoint: StackedBarChartDataPoint, seriesKey: string) => {
      onBarClick?.(dataPoint, seriesKey);
    },
    [onBarClick]
  );

  const handleBarMouseEnter = useCallback(
    (
      event: React.MouseEvent,
      dataPoint: StackedBarChartDataPoint,
      seriesKey: string
    ) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const value = dataPoint.values[seriesKey] ?? 0;

      setTooltip({
        dataPoint,
        series: seriesKey,
        value,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });

      onBarHover?.(dataPoint, seriesKey);
    },
    [onBarHover]
  );

  const handleBarMouseLeave = useCallback(() => {
    setTooltip(null);
    onBarHover?.(null);
  }, [onBarHover]);

  const formatValue = useCallback((value: number) => {
    return d3.format(',')(value);
  }, []);

  return {
    svgRef,
    dimensions,
    scales,
    stackedData,
    tooltip,
    processedData,
    handleBarClick,
    handleBarMouseEnter,
    handleBarMouseLeave,
    formatValue,
  };
};
