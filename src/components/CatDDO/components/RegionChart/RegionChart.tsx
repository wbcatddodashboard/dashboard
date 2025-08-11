import React from 'react';
import { BarChart } from 'vizonomy-d3';
import { Image } from 'vizonomy';
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartIcon,
  ChartWrapper,
} from './styled/RegionChart.styled';
import { regionChartData, regionSeries } from './constants/regionChartData';

export const RegionChart = () => {
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Number of Cat DDOs by Region</ChartTitle>
        <ChartIcon>
          <Image
            src="/download-icon.svg"
            alt="Download icon"
            className="block max-w-none size-full"
          />
        </ChartIcon>
      </ChartHeader>
      <ChartWrapper>
        <BarChart
          data={regionChartData}
          series={regionSeries}
          width={681}
          height={385}
          xAxisLabel="Fiscal Year"
          yAxisLabel=""
          orientation="vertical"
          showLegend={true}
          showGrid={true}
          showTooltip={true}
          showTotals={true}
          barPadding={0.4}
          margin={{ top: 20, right: 20, bottom: 80, left: 40 }}
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
};

export default RegionChart;
