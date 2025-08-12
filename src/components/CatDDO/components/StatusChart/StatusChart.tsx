'use client';

import React from 'react';
import { BarChart } from 'vizonomy-d3';
import { Image } from 'vizonomy';
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartIcon,
  ChartWrapper,
  DownloadIconWrapper,
} from './styled/StatusChart.styled';
import { useStatusChart } from './useStatusChart';

export function StatusChart() {
  const { data, series } = useStatusChart();
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Number of Cat DDOs by Status</ChartTitle>
        <ChartIcon>
          <DownloadIconWrapper>
            <Image
              src="/download-icon.svg"
              alt="Download icon"
              width={24}
              height={24}
              className="block max-w-none size-full"
            />
          </DownloadIconWrapper>
        </ChartIcon>
      </ChartHeader>
      <ChartWrapper>
        <BarChart
          data={data}
          series={series}
          width={285}
          height={389}
          xAxisLabel="Region"
          yAxisLabel=""
          orientation="vertical"
          showLegend
          showGrid
          showTooltip
          showTotals
          margin={{ top: 20, right: 20, bottom: 80, left: 40 }}
          barPadding={0.3}
          styleProps={{
            titleColor: '#295e84',
            titleFontSize: 18,
            titleFontWeight: 600,
            titleFontFamily: 'Inter, sans-serif',
            axisTextColor: '#295e84',
            axisTextFontSize: 12,
            axisTextFontFamily: 'Inter, sans-serif',
            gridLineColor: '#e5e7eb',
            gridLineStrokeWidth: 1,
            backgroundColor: '#ffffff',
          }}
        />
      </ChartWrapper>
    </ChartContainer>
  );
}

export default StatusChart;
