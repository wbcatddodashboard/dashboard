'use client';

import React from 'react';
import { BarChart } from '@/lib/BarChart';
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
import { ClientOnlyChart } from '../ChartWrapper';
import Tooltip from '../Tooltip';

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
        <ClientOnlyChart width={285} height={389}>
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
            barPadding={0.3}
            legendItemGap={10}
            margin={{ top: 20, right: 20, bottom: 80, left: 40 }}
            styleProps={{
              barOutlineStyle: '2px solid white',
            }}
            onOpenTooltip={(dataPoint, seriesKey) => {
              const seriesInfo = series.find((s) => s.key === seriesKey);
              const value = dataPoint.values[seriesKey] ?? 0;
              return (
                <Tooltip
                  title="Number of Cat DDOs by Region"
                  content={`${seriesInfo?.label} (${dataPoint.label}): ${value}`}
                />
              );
            }}
          />
        </ClientOnlyChart>
      </ChartWrapper>
    </ChartContainer>
  );
}

export default StatusChart;
