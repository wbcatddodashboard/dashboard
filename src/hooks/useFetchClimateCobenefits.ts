import { useState, useEffect } from 'react';

interface ClimateCobenefitsResponse {
  standalone: {
    labels: string[];
    adapt: number[];
    mitig: number[];
    total: number[];
    avgTotal: number;
  };
  mixed: {
    labels: string[];
    adapt: number[];
    mitig: number[];
    total: number[];
    avgTotal: number;
  };
}

export function useFetchClimateCobenefits() {
  const [data, setData] = useState<ClimateCobenefitsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/climate/cobenefits-bars');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ClimateCobenefitsResponse = await response.json();
        setData(result);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch climate cobenefits data';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
