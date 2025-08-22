'use client';

import React from 'react';
import { BarChart } from 'vizonomy-d3';
import {
  ChartContainer,
  ChartWrapper,
  NoDataMessage,
} from './styled/PriorActionsChart.styled';
import { usePriorActionsChart } from './usePriorActionsChart';
import { ClientOnlyChart } from '../ChartWrapper';

export function PriorActionsChart() {
  const { data, series } = usePriorActionsChart();

  if (!data.length) {
    return (
      <ChartContainer>
        <ChartWrapper>
          <NoDataMessage>No data available</NoDataMessage>
        </ChartWrapper>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartWrapper>
        <ClientOnlyChart width={1019} height={280}>
          <BarChart
            data={data}
            series={series}
            width={1019}
            height={280}
            xAxisLabel=""
            yAxisLabel=""
            orientation="horizontal"
            showLegend
            showGrid={true}
            showTooltip={false}
            legendItemGap={10}
            yAxisLabelOffset={10}
            barPadding={0.4}
            margin={{ top: 20, right: 20, bottom: 60, left: 200 }}
          />
        </ClientOnlyChart>
      </ChartWrapper>
    </ChartContainer>
  );
}

export default PriorActionsChart;
