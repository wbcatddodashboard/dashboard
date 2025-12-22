import { useEffect, useState } from 'react';

interface ClimateSummaryResponse {
  avgAll: number;
  avgStandalone: number;
  avgMixed: number;
  countAll: number;
  countStandalone: number;
  countMixed: number;
}

export function useFetchClimateSummary() {
  const [data, setData] = useState<ClimateSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');

        // Fetch without filters - always shows full portfolio stats
        const response = await fetch('/api/portfolio/climate-summary');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ClimateSummaryResponse = await response.json();
        setData(result);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch climate summary data';
        setError(message);
        console.error('Error fetching climate summary data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); // No dependencies - only fetch once on mount

  return { data, isLoading, error };
}
