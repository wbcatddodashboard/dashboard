import React, { useMemo } from 'react';

import type { BarChartProps } from './BarChart.d';
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
    ...svgProps,
  });

  const { xScale, yScale } = scales;

  const axisData = useMemo(() => {
    if (orientation === 'vertical') {
      return {
        xAxisTicks: xScale.domain(),
        yAxisTicks: yScale.ticks(5),
        gridLines: yScale.ticks(5).map((tick: number) => ({
          x1: 0,
          y1: yScale(tick),
          x2: dimensions.innerWidth,
          y2: yScale(tick),
        })),
      };
    } else {
      return {
        xAxisTicks: xScale.ticks(5),
        yAxisTicks: yScale.domain(),
        gridLines: xScale.ticks(5).map((tick: number) => ({
          x1: xScale(tick),
          y1: 0,
          x2: xScale(tick),
          y2: dimensions.innerHeight,
        })),
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

  return (
    <div className={className}>
      {title && (
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
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
        <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
          {/* Grid lines */}
          <When condition={showGrid}>
            <g>
              {axisData.gridLines.map((line: any, i: number) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
              ))}
            </g>
          </When>

          {/* Y Axis */}
          <g>
            {axisData.yAxisTicks.map((tick: any) => (
              <g key={tick} transform={orientation === 'vertical' 
                ? `translate(0, ${yScale(tick)})` 
                : `translate(0, ${(yScale(tick) ?? 0) + yScale.bandwidth() / 2})`
              }>
                <text
                  x={-8}
                  y={0}
                  fill="#6b7280"
                  fontSize="12"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {orientation === 'vertical' ? formatValue(tick) : tick}
                </text>
              </g>
            ))}
          </g>

          {/* Bars */}
          <g>
            {stackedData.map((seriesData, seriesIndex) => {
              const seriesKey = series[seriesIndex].key;
              const seriesColor = series[seriesIndex].color;
              
              return seriesData.map((d: any, i: number) => {
                const dataPoint = processedData[i];
                
                let x, y, width, height;
                
                if (orientation === 'vertical') {
                  x = xScale(dataPoint.label) ?? 0;
                  y = yScale(d[1]);
                  width = xScale.bandwidth();
                  height = Math.max(0, yScale(d[0]) - yScale(d[1]));
                } else {
                  x = xScale(d[0]);
                  y = yScale(dataPoint.label) ?? 0;
                  width = Math.max(0, xScale(d[1]) - xScale(d[0]));
                  height = yScale.bandwidth();
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
                    onMouseEnter={(event) => handleBarMouseEnter(event, dataPoint, seriesKey)}
                    onMouseLeave={handleBarMouseLeave}
                    aria-label={`${dataPoint.label}: ${seriesKey} ${formatValue(dataPoint.values[seriesKey] ?? 0)}`}
                    role="button"
                    tabIndex={0}
                  />
                );
              });
            })}
          </g>

          {/* X Axis */}
          <g transform={`translate(0, ${dimensions.innerHeight})`}>
            {axisData.xAxisTicks.map((tick: any) => (
              <g key={tick} transform={orientation === 'vertical'
                ? `translate(${(xScale(tick) ?? 0) + xScale.bandwidth() / 2}, 0)`
                : `translate(${xScale(tick)}, 0)`
              }>
                <text
                  x={0}
                  y={15}
                  fill="#6b7280"
                  fontSize="12"
                  textAnchor="middle"
                  dominantBaseline="hanging"
                >
                  {orientation === 'vertical' ? tick : formatValue(tick)}
                </text>
              </g>
            ))}
          </g>

          {/* X Axis Label */}
          <When condition={!!xAxisLabel}>
            <text
              x={dimensions.innerWidth / 2}
              y={dimensions.innerHeight + 45}
              fill="#6b7280"
              fontSize="12"
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
              fill="#6b7280"
              fontSize="12"
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
              {legendItems.map(item => (
                <g key={item.key} transform={`translate(${item.x}, ${item.y})`}>
                  <rect
                    width={12}
                    height={12}
                    fill={item.color}
                  />
                  <text
                    x={16}
                    y={9}
                    fill="#6b7280"
                    fontSize="12"
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
              {series.find(s => s.key === tooltip?.series)?.label ?? tooltip?.series}:
            </span>{' '}
            {formatValue(tooltip?.value ?? 0)}
          </div>
        </div>
      </When>
    </div>
  );
}

export default BarChart;