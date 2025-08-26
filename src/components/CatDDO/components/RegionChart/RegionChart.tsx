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
} from './styled/RegionChart.styled';
import { Tooltip } from '../Tooltip';
import { useRegionChart } from './useRegionChart';
import { ClientOnlyChart } from '../ChartWrapper';

export function RegionChart() {
  const { data, series } = useRegionChart();

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Number of Cat DDOs by Region</ChartTitle>
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
        <ClientOnlyChart width={681} height={385}>
          <BarChart
            data={data}
            series={series}
            width={681}
            height={385}
            xAxisLabel="Fiscal Year"
            yAxisLabel=""
            orientation="vertical"
            showLegend
            showGrid
            showTooltip
            showTotals
            legendItemGap={10}
            barPadding={0.3}
            margin={{ top: 20, right: 20, bottom: 80, left: 40 }}
            styleProps={{
              barOutlineStyle: '2px solid blue',
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

export default RegionChart;
