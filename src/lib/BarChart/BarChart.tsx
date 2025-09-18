import React, {
  useMemo,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { flushSync } from 'react-dom';

import type {
  BarChartProps,
  AxisData,
  GridLine,
  StackedDataPoint,
  D3Scale,
  D3BandScale,
  D3LinearScale,
  StackedBarChartDataPoint,
} from './BarChart.d';
import { useBarChart } from './useBarChart';

function BarChart({
  data,
  series,
  title,
  xAxisLabel,
  xAxisLabelOffset,
  yAxisLabel,
  yAxisLabelOffset,
  orientation = 'vertical',
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  showTotals = false,
  showIntegersOnly = false,
  barPadding = 0.1,
  legendItemGap = 0,
  legendItemWidth = 0,
  yAxisLabelMaxWidth = 150,
  yAxisLabelShowPopup = false,
  styleProps = {},
  formatCategoryLabel,
  formatValueLabel,
  formatTotalLabel,
  className,
  onOpenTooltip,
  ...svgProps
}: BarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<{
    dataPointId: string;
    seriesKey: string;
  } | null>(null);
  const [customTooltip, setCustomTooltip] = useState<{
    dataPoint: StackedBarChartDataPoint;
    seriesKey: string;
    content: string | React.ReactNode;
    x: number;
    y: number;
  } | null>(null);
  const [yAxisLabelPopup, setYAxisLabelPopup] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const {
    svgRef,
    dimensions,
    scales,
    stackedData,
    tooltip,
    processedData,
    formatValue,
  } = useBarChart({
    data,
    series,
    title,
    xAxisLabel,
    xAxisLabelOffset,
    yAxisLabel,
    yAxisLabelOffset,
    orientation,
    showLegend,
    showGrid,
    showTooltip,
    showTotals,
    showIntegersOnly,
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

  const formatCategory = useMemo(
    () => (label: string) =>
      formatCategoryLabel ? formatCategoryLabel(label) : label,
    [formatCategoryLabel]
  );

  const formatNumeric = useMemo(
    () => (value: number) =>
      formatValueLabel ? formatValueLabel(value) : formatValue(value),
    [formatValueLabel, formatValue]
  );

  const formatTotal = useMemo(
    () => (value: number) =>
      formatTotalLabel ? formatTotalLabel(value) : formatNumeric(value),
    [formatTotalLabel, formatNumeric]
  );

  // Custom mouse enter handler for tooltip
  const handleCustomMouseEnter = useCallback(
    (
      dataPoint: StackedBarChartDataPoint,
      seriesKey: string,
      event: React.MouseEvent
    ) => {
      const rect = event.currentTarget.getBoundingClientRect();

      if (onOpenTooltip) {
        const content = onOpenTooltip(dataPoint, seriesKey);

        flushSync(() => {
          setHoveredBar({ dataPointId: dataPoint.id, seriesKey });
          setCustomTooltip({
            dataPoint,
            seriesKey,
            content,
            x: rect.left + rect.width / 2,
            y: rect.top,
          });
        });
      }
    },
    [onOpenTooltip]
  );

  const handleCustomMouseLeave = useCallback(() => {
    flushSync(() => {
      setHoveredBar(null);
      setCustomTooltip(null);
    });
  }, []);

  const truncateText = useCallback(
    (
      text: string,
      maxWidth: number,
      fontSize: number,
      fontFamily: string
    ): string => {
      if (!text || maxWidth <= 0) return text;

      const canvas =
        typeof document !== 'undefined'
          ? document.createElement('canvas')
          : null;
      const ctx = canvas ? canvas.getContext('2d') : null;
      if (!ctx) return text;

      ctx.font = `${fontSize}px ${fontFamily}`;

      if (ctx.measureText(text).width <= maxWidth) return text;

      let left = 0;
      let right = text.length;
      let bestFit = text;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const testText = text.substring(0, mid) + '...';
        const width = ctx.measureText(testText).width;

        if (width <= maxWidth) {
          bestFit = testText;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      return bestFit;
    },
    []
  );

  const handleYAxisLabelMouseEnter = useCallback(
    (event: React.MouseEvent, fullText: string) => {
      if (!yAxisLabelShowPopup) return;

      const canvas =
        typeof document !== 'undefined'
          ? document.createElement('canvas')
          : null;
      const ctx = canvas ? canvas.getContext('2d') : null;
      if (!ctx) return;

      const fontSize = styleProps.axisTextFontSize || 12;
      const fontFamily = styleProps.axisTextFontFamily || 'Inter, sans-serif';
      ctx.font = `${fontSize}px ${fontFamily}`;
      const fullTextWidth = ctx.measureText(fullText).width;

      if (fullTextWidth <= yAxisLabelMaxWidth) return;

      const rect = event.currentTarget.getBoundingClientRect();
      setYAxisLabelPopup({
        text: fullText,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    },
    [
      yAxisLabelShowPopup,
      yAxisLabelMaxWidth,
      styleProps.axisTextFontSize,
      styleProps.axisTextFontFamily,
    ]
  );

  const handleYAxisLabelMouseLeave = useCallback(() => {
    setYAxisLabelPopup(null);
  }, []);

  const legendItems = useMemo(() => {
    const canvas =
      typeof document !== 'undefined' ? document.createElement('canvas') : null;
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (ctx) {
      ctx.font = `12px Inter, sans-serif`;
    }

    const iconWidth = 12;
    const iconToTextGap = 4;

    const itemWidths = series.map((s) => {
      const label = formatCategory(s.label);
      const textWidth = ctx ? ctx.measureText(label).width : 0;
      const autoWidth = iconWidth + iconToTextGap + textWidth;
      return Math.max(legendItemWidth ?? 0, autoWidth);
    });

    const totalWidth =
      itemWidths.reduce((sum, w) => sum + w, 0) +
      Math.max(0, series.length - 1) * legendItemGap;
    const startX = Math.max(0, (dimensions.innerWidth - totalWidth) / 2);

    let runningX = startX;
    return series.map((s, i) => {
      const item = { ...s, x: runningX, y: 0 } as typeof s & {
        x: number;
        y: number;
      };
      runningX += itemWidths[i] + (i < series.length - 1 ? legendItemGap : 0);
      return item;
    });
  }, [
    series,
    dimensions.innerWidth,
    legendItemGap,
    legendItemWidth,
    formatCategory,
  ]);

  const [legendPositions, setLegendPositions] = useState<number[] | null>(null);
  const legendItemRefs = useRef<Array<SVGGElement | null>>([]);

  useLayoutEffect(() => {
    if (!showLegend) {
      setLegendPositions(null);
      return;
    }

    const refs = legendItemRefs.current;
    if (!refs || refs.length === 0) return;

    const measuredWidths = refs.map((el) => (el ? el.getBBox().width : 0));
    if (measuredWidths.some((w) => !isFinite(w) || w <= 0)) return;

    const totalWidth =
      measuredWidths.reduce((sum, w) => sum + w, 0) +
      Math.max(0, measuredWidths.length - 1) * legendItemGap;
    const startX = Math.max(0, (dimensions.innerWidth - totalWidth) / 2);

    let runningX = startX;
    const positions = measuredWidths.map((w, i) => {
      const x = runningX;
      runningX += w + (i < measuredWidths.length - 1 ? legendItemGap : 0);
      return x;
    });

    setLegendPositions((prev) => {
      if (
        !prev ||
        prev.length !== positions.length ||
        prev.some((p, i) => p !== positions[i])
      ) {
        return positions;
      }
      return prev;
    });
  }, [series, showLegend, legendItemGap, dimensions.innerWidth]);

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
    barOutlineStyle = 'none',
    yAxisLabelPopupBackgroundColor = 'white',
    yAxisLabelPopupBorderColor = '#e5e7eb',
    yAxisLabelPopupTextColor = '#374151',
    yAxisLabelPopupFontSize = 14,
    yAxisLabelPopupFontFamily = 'Inter, sans-serif',
    yAxisLabelPopupBorderRadius = 4,
    yAxisLabelPopupPadding = '8px 12px',
    yAxisLabelPopupMaxWidth = 300,
    yAxisLabelPopupBoxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  } = styleProps;

  return (
    <div
      className={className}
      style={{ backgroundColor, position: 'relative' }}
    >
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
          {showGrid && (
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
          )}

          {/* Y Axis */}
          <g>
            {axisData.yAxisTicks.map((tick: string | number) => {
              const fullLabel =
                orientation === 'vertical'
                  ? formatNumeric(tick as number)
                  : formatCategory(String(tick));

              const displayLabel =
                orientation === 'horizontal' && yAxisLabelMaxWidth > 0
                  ? truncateText(
                      fullLabel,
                      yAxisLabelMaxWidth,
                      axisTextFontSize,
                      axisTextFontFamily
                    )
                  : fullLabel;

              const isTruncated = fullLabel !== displayLabel;

              return (
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
                    style={{ cursor: isTruncated ? 'pointer' : 'default' }}
                    onMouseEnter={(event) =>
                      handleYAxisLabelMouseEnter(event, fullLabel)
                    }
                    onMouseLeave={handleYAxisLabelMouseLeave}
                  >
                    {displayLabel}
                  </text>
                </g>
              );
            })}
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

                const isHovered =
                  hoveredBar &&
                  hoveredBar.dataPointId === dataPoint.id &&
                  hoveredBar.seriesKey === seriesKey;

                return (
                  <rect
                    key={`${seriesKey}-${dataPoint.id}`}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={seriesColor}
                    style={{
                      cursor: 'pointer',
                      outline: isHovered ? barOutlineStyle : 'none',
                    }}
                    onMouseEnter={(event) =>
                      handleCustomMouseEnter(dataPoint, seriesKey, event)
                    }
                    onMouseLeave={handleCustomMouseLeave}
                    aria-label={`${formatCategory(dataPoint.label)}: ${formatCategory(series[seriesIndex].label)} ${formatNumeric(dataPoint.values[seriesKey] ?? 0)}`}
                    role="button"
                    tabIndex={0}
                  />
                );
              });
            })}
          </g>

          {showTotals && (
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
                    dominantBaseline="alphabetic"
                  >
                    {formatTotal(total)}
                  </text>
                );
              })}
            </g>
          )}
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
                    ? formatCategory(String(tick))
                    : formatNumeric(tick as number)}
                </text>
              </g>
            ))}
          </g>

          {/* X Axis Label */}
          {Boolean(xAxisLabel) && (
            <text
              x={dimensions.innerWidth / 2}
              y={dimensions.innerHeight + 45 + (xAxisLabelOffset ?? 0)}
              fill={axisTextColor}
              fontSize={axisTextFontSize}
              fontFamily={axisTextFontFamily}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {xAxisLabel}
            </text>
          )}

          {/* Y Axis Label */}
          {Boolean(yAxisLabel) && (
            <text
              x={-dimensions.innerHeight / 2}
              y={-25 - (yAxisLabelOffset ?? 0)}
              fill={axisTextColor}
              fontSize={axisTextFontSize}
              fontFamily={axisTextFontFamily}
              textAnchor="middle"
              dominantBaseline="middle"
              transform="rotate(-90)"
            >
              {yAxisLabel}
            </text>
          )}

          {/* Legend */}
          {showLegend && (
            <g transform={`translate(0, ${dimensions.innerHeight + 60})`}>
              {legendItems.map((item, idx) => (
                <g
                  key={item.key}
                  ref={(el) => {
                    if (el) {
                      legendItemRefs.current[idx] = el;
                    }
                  }}
                  transform={`translate(${legendPositions ? legendPositions[idx] : item.x}, ${item.y})`}
                >
                  <rect width={12} height={12} fill={item.color} />
                  <text
                    x={16}
                    y={9}
                    fill={axisTextColor}
                    fontSize={axisTextFontSize}
                    fontFamily={axisTextFontFamily}
                    dominantBaseline="middle"
                  >
                    {formatCategory(item.label)}
                  </text>
                </g>
              ))}
            </g>
          )}
        </g>
      </svg>

      {/* Tooltip */}
      {showTooltip && Boolean(tooltip) && (
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
            {formatCategory(tooltip?.dataPoint.label ?? '')}
          </div>
          <div style={{ color: '#6b7280' }}>
            <span style={{ fontWeight: 500 }}>
              {formatCategory(
                series.find((s) => s.key === tooltip?.series)?.label ??
                  String(tooltip?.series)
              )}
              :
            </span>{' '}
            {formatNumeric(tooltip?.value ?? 0)}
          </div>
        </div>
      )}

      {/* Custom Tooltip Portal */}
      {customTooltip &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              left: customTooltip.x,
              top: customTooltip.y,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            {customTooltip.content}
          </div>,
          document.body
        )}

      {yAxisLabelPopup &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              left: yAxisLabelPopup.x,
              top: yAxisLabelPopup.y,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 9999,
              backgroundColor: yAxisLabelPopupBackgroundColor,
              border: `1px solid ${yAxisLabelPopupBorderColor}`,
              borderRadius: `${yAxisLabelPopupBorderRadius}px`,
              padding: yAxisLabelPopupPadding,
              boxShadow: yAxisLabelPopupBoxShadow,
              fontSize: `${yAxisLabelPopupFontSize}px`,
              fontFamily: yAxisLabelPopupFontFamily,
              color: yAxisLabelPopupTextColor,
              maxWidth: `${yAxisLabelPopupMaxWidth}px`,
              wordWrap: 'break-word',
            }}
          >
            {yAxisLabelPopup.text}
          </div>,
          document.body
        )}
    </div>
  );
}

export default BarChart;
