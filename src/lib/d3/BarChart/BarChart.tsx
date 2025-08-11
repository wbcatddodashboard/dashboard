import React, { useMemo } from 'react';

import type {
  BarChartProps,
  AxisData,
  GridLine,
  StackedDataPoint,
  D3Scale,
  D3BandScale,
  D3LinearScale,
} from './BarChart.d';
import { useBarChart } from './useBarChart';
import When from '../../ui/When';

function BarChart({
  data,
  series,
  title,
  xAxisLabel,
  yAxisLabel,
  orientation = 'vertical',
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  showTotals = false,
  barPadding = 0.1,
  styleProps = {},
  className,
  ...svgProps
}: BarChartProps) {
  const {
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
  } = useBarChart({
    data,
    series,
    title,
    xAxisLabel,
    yAxisLabel,
    orientation,
    showLegend,
    showGrid,
    showTooltip,
    showTotals,
    barPadding,
    styleProps,
    ...svgProps,
  });

  const { xScale, yScale } = scales;

  const callScale = (scale: D3Scale, value: string | number): number => {
    if ('bandwidth' in scale && typeof value === 'string') {
      return (scale as D3BandScale)(value) ?? 0;
    } else if ('ticks' in scale && typeof value === 'number') {
      return (scale as D3LinearScale)(value);
    }
    return 0;
  };

  const getBandwidth = (scale: D3Scale): number => {
    return 'bandwidth' in scale ? scale.bandwidth() : 0;
  };

  const axisData = useMemo((): AxisData => {
    if (orientation === 'vertical') {
      const yTicks = 'ticks' in yScale ? yScale.ticks(5) : [];
      return {
        xAxisTicks: xScale.domain(),
        yAxisTicks: yTicks,
        gridLines: yTicks.map(
          (tick: number): GridLine => ({
            x1: 0,
            y1: callScale(yScale, tick),
            x2: dimensions.innerWidth,
            y2: callScale(yScale, tick),
          })
        ),
      };
    } else {
      const xTicks = 'ticks' in xScale ? xScale.ticks(5) : [];
      return {
        xAxisTicks: xTicks,
        yAxisTicks: yScale.domain(),
        gridLines: xTicks.map(
          (tick: number): GridLine => ({
            x1: callScale(xScale, tick),
            y1: 0,
            x2: callScale(xScale, tick),
            y2: dimensions.innerHeight,
          })
        ),
      };
    }
  }, [xScale, yScale, orientation, dimensions]);

  const legendItems = useMemo(() => {
    const itemWidth = 80;
    const totalWidth = series.length * itemWidth;
    const startX = Math.max(0, (dimensions.innerWidth - totalWidth) / 2);

    return series.map((s, i) => ({
      ...s,
      x: startX + i * itemWidth,
      y: 0,
    }));
  }, [series, dimensions.innerWidth]);

  const {
    titleColor = '#000000',
    titleFontSize = 18,
    titleFontWeight = 600,
    titleFontFamily = 'Inter, sans-serif',
    axisTextColor = '#6b7280',
    axisTextFontSize = 12,
    axisTextFontFamily = 'Inter, sans-serif',
    gridLineColor = '#e5e7eb',
    gridLineStrokeWidth = 1,
    backgroundColor = 'transparent',
    totalTextColor = '#295e84',
    totalTextFontSize = 12,
    totalTextFontFamily = 'Inter, sans-serif',
  } = styleProps;

  return (
    <div className={className} style={{ backgroundColor }}>
      {title && (
        <div style={{ marginBottom: '16px' }}>
          <h3
            style={{
              margin: 0,
              fontSize: titleFontSize,
              fontWeight: titleFontWeight,
              fontFamily: titleFontFamily,
              color: titleColor,
            }}
          >
            {title}
          </h3>
        </div>
      )}

      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        role="img"
        aria-label="Bar chart visualization"
        style={{ overflow: 'visible' }}
        {...svgProps}
      >
        <g
          transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
        >
          {/* Grid lines */}
          <When condition={showGrid}>
            <g>
              {axisData.gridLines.map((line: GridLine, i: number) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={gridLineColor}
                  strokeWidth={gridLineStrokeWidth}
                />
              ))}
            </g>
          </When>

          {/* Y Axis */}
          <g>
            {axisData.yAxisTicks.map((tick: string | number) => (
              <g
                key={tick}
                transform={
                  orientation === 'vertical'
                    ? `translate(0, ${callScale(yScale, tick)})`
                    : `translate(0, ${callScale(yScale, tick) + getBandwidth(yScale) / 2})`
                }
              >
                <text
                  x={-8}
                  y={0}
                  fill={axisTextColor}
                  fontSize={axisTextFontSize}
                  fontFamily={axisTextFontFamily}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {orientation === 'vertical'
                    ? formatValue(tick as number)
                    : tick}
                </text>
              </g>
            ))}
          </g>

          {/* Bars */}
          <g>
            {stackedData.map((seriesData, seriesIndex) => {
              const seriesKey = series[seriesIndex].key;
              const seriesColor = series[seriesIndex].color;

              return seriesData.map((d: StackedDataPoint, i: number) => {
                const dataPoint = processedData[i];

                let x, y, width, height;

                if (orientation === 'vertical') {
                  x = callScale(xScale, dataPoint.label);
                  y = callScale(yScale, d[1]);
                  width = getBandwidth(xScale);
                  height = Math.max(
                    0,
                    callScale(yScale, d[0]) - callScale(yScale, d[1])
                  );
                } else {
                  x = callScale(xScale, d[0]);
                  y = callScale(yScale, dataPoint.label);
                  width = Math.max(
                    0,
                    callScale(xScale, d[1]) - callScale(xScale, d[0])
                  );
                  height = getBandwidth(yScale);
                }

                return (
                  <rect
                    key={`${seriesKey}-${dataPoint.id}`}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={seriesColor}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleBarClick(dataPoint, seriesKey)}
                    onMouseEnter={(event) =>
                      handleBarMouseEnter(event, dataPoint, seriesKey)
                    }
                    onMouseLeave={handleBarMouseLeave}
                    aria-label={`${dataPoint.label}: ${seriesKey} ${formatValue(dataPoint.values[seriesKey] ?? 0)}`}
                    role="button"
                    tabIndex={0}
                  />
                );
              });
            })}
          </g>

          <When condition={showTotals}>
            <g>
              {processedData.map((dataPoint) => {
                const total = dataPoint.total;
                let x, y;

                if (orientation === 'vertical') {
                  x =
                    callScale(xScale, dataPoint.label) +
                    getBandwidth(xScale) / 2;
                  y = callScale(yScale, total) - 5;
                } else {
                  x = callScale(xScale, total) + 5;
                  y =
                    callScale(yScale, dataPoint.label) +
                    getBandwidth(yScale) / 2;
                }

                return (
                  <text
                    key={`total-${dataPoint.id}`}
                    x={x}
                    y={y}
                    fill={totalTextColor}
                    fontSize={totalTextFontSize}
                    fontFamily={totalTextFontFamily}
                    textAnchor="middle"
                    dominantBaseline="baseline"
                  >
                    {total}
                  </text>
                );
              })}
            </g>
          </When>

          {/* X Axis */}
          <g transform={`translate(0, ${dimensions.innerHeight})`}>
            {axisData.xAxisTicks.map((tick: string | number) => (
              <g
                key={tick}
                transform={
                  orientation === 'vertical'
                    ? `translate(${callScale(xScale, tick) + getBandwidth(xScale) / 2}, 0)`
                    : `translate(${callScale(xScale, tick)}, 0)`
                }
              >
                <text
                  x={0}
                  y={15}
                  fill={axisTextColor}
                  fontSize={axisTextFontSize}
                  fontFamily={axisTextFontFamily}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                >
                  {orientation === 'vertical'
                    ? tick
                    : formatValue(tick as number)}
                </text>
              </g>
            ))}
          </g>

          {/* X Axis Label */}
          <When condition={!!xAxisLabel}>
            <text
              x={dimensions.innerWidth / 2}
              y={dimensions.innerHeight + 45}
              fill={axisTextColor}
              fontSize={axisTextFontSize}
              fontFamily={axisTextFontFamily}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {xAxisLabel}
            </text>
          </When>

          {/* Y Axis Label */}
          <When condition={!!yAxisLabel}>
            <text
              x={-dimensions.innerHeight / 2}
              y={-25}
              fill={axisTextColor}
              fontSize={axisTextFontSize}
              fontFamily={axisTextFontFamily}
              textAnchor="middle"
              dominantBaseline="middle"
              transform="rotate(-90)"
            >
              {yAxisLabel}
            </text>
          </When>

          {/* Legend */}
          <When condition={showLegend}>
            <g transform={`translate(0, ${dimensions.innerHeight + 60})`}>
              {legendItems.map((item) => (
                <g key={item.key} transform={`translate(${item.x}, ${item.y})`}>
                  <rect width={12} height={12} fill={item.color} />
                  <text
                    x={16}
                    y={9}
                    fill={axisTextColor}
                    fontSize={axisTextFontSize}
                    fontFamily={axisTextFontFamily}
                    dominantBaseline="middle"
                  >
                    {item.label}
                  </text>
                </g>
              ))}
            </g>
          </When>
        </g>
      </svg>

      {/* Tooltip */}
      <When condition={showTooltip && !!tooltip}>
        <div
          style={{
            position: 'absolute',
            left: tooltip?.x ?? 0,
            top: (tooltip?.y ?? 0) - 10,
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            padding: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            zIndex: 50,
            fontSize: '14px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>
            {tooltip?.dataPoint.label}
          </div>
          <div style={{ color: '#6b7280' }}>
            <span style={{ fontWeight: 500 }}>
              {series.find((s) => s.key === tooltip?.series)?.label ??
                tooltip?.series}
              :
            </span>{' '}
            {formatValue(tooltip?.value ?? 0)}
          </div>
        </div>
      </When>
    </div>
  );
}

export default BarChart;
