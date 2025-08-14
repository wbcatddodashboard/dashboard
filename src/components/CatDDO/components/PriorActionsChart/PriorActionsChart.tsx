'use client';

import React from 'react';
import { BarChart } from 'vizonomy-d3';
import {
  ChartContainer,
  ChartWrapper,
} from './styled/PriorActionsChart.styled';
import { usePriorActionsChart } from './usePriorActionsChart';

export function PriorActionsChart() {
  const { data, series } = usePriorActionsChart();

  return (
    <ChartContainer>
      <ChartWrapper>
        <BarChart
          data={data}
          series={series}
          width={1019}
          height={280}
          xAxisLabel=""
          yAxisLabel=""
          orientation="horizontal"
          showLegend
          showGrid={false}
          showTooltip={false}
          legendItemGap={10}
          yAxisLabelOffset={10}
          barPadding={0.4}
          margin={{ top: 20, right: 20, bottom: 60, left: 200 }}
        />
      </ChartWrapper>
    </ChartContainer>
  );
}

export default PriorActionsChart;
