'use client';

import React from 'react';
import { BarChart } from 'vizonomy-d3';
import { ChartContainer, ChartWrapper } from './styled/GlobalChart.styled';
import { useGlobalChart } from './useGlobalChart';
import { ClientOnlyChart } from '../ChartWrapper';

export function GlobalChart() {
  const { data, series, isLoading, errorMessage } = useGlobalChart();

  if (isLoading) {
    return (
      <ChartContainer>
        <ChartWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '385px',
              fontSize: '16px',
              color: '#666',
            }}
          >
            Loading chart data...
          </div>
        </ChartWrapper>
      </ChartContainer>
    );
  }

  if (errorMessage) {
    return (
      <ChartContainer>
        <ChartWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '385px',
              fontSize: '16px',
              color: '#d32f2f',
            }}
          >
            Error loading chart: {errorMessage}
          </div>
        </ChartWrapper>
      </ChartContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartContainer>
        <ChartWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '385px',
              fontSize: '16px',
              color: '#666',
            }}
          >
            No data available
          </div>
        </ChartWrapper>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartWrapper>
        <ClientOnlyChart width={1058} height={385}>
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
        </ClientOnlyChart>
      </ChartWrapper>
    </ChartContainer>
  );
}

export default GlobalChart;
