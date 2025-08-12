'use client';

import React from 'react';
import { BarChart } from 'vizonomy-d3';
import { ChartContainer, ChartWrapper } from './styled/GlobalChart.styled';
import { useGlobalChart } from './useGlobalChart';

export function GlobalChart() {
  const { data, series } = useGlobalChart();
  return (
    <ChartContainer>
      <ChartWrapper>
        <BarChart
          data={data}
          series={series}
          width={1058}
          height={385}
          xAxisLabel="Fiscal Year"
          yAxisLabel="Number of Cat DDOs"
          orientation="vertical"
          showLegend
          showGrid
          showTooltip
          legendItemGap={10}
          yAxisLabelOffset={10}
          barPadding={0.3}
          margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
        />
      </ChartWrapper>
    </ChartContainer>
  );
}

export default GlobalChart;
