'use client';

import React from 'react';
import { BarChart } from 'vizonomy-d3';
import { ChartContainer, ChartWrapper, ChartTitle } from './styled';
import { useMixedDPOChart } from './useMixedDPOChart';
import { ClientOnlyChart } from '../../../ChartWrapper';

export function MixedDPOChart() {
  const { data, series } = useMixedDPOChart();

  return (
    <ChartContainer>
      <ChartTitle>Mixed DPOs</ChartTitle>
      <ChartWrapper>
        <ClientOnlyChart width={493} height={400}>
          <BarChart
            data={data}
            series={series}
            width={493}
            height={400}
            xAxisLabel=""
            yAxisLabel=""
            orientation="horizontal"
            showLegend={false}
            showGrid={false}
            showTooltip={true}
            barPadding={0.3}
            margin={{ top: 20, right: 20, bottom: 40, left: 200 }}
          />
        </ClientOnlyChart>
      </ChartWrapper>
    </ChartContainer>
  );
}

export default MixedDPOChart;
