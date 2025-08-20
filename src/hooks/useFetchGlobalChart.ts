import { useState, useEffect } from 'react';
import type { StackedBarChartDataPoint, BarChartSeries } from 'vizonomy';

interface GlobalChartResponse {
  data: StackedBarChartDataPoint[];
  series: BarChartSeries[];
}

export function useFetchGlobalChart() {
  const [data, setData] = useState<StackedBarChartDataPoint[]>([]);
  const [series, setSeries] = useState<BarChartSeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/portfolio/global-chart');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GlobalChartResponse = await response.json();
        setData(result.data);
        setSeries(result.series);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch global chart data';
        setError(message);
        console.error('Error fetching global chart data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, series, isLoading, error };
}
