import { useState, useEffect } from 'react';

interface DisbursementRegionData {
  region: string;
  netCommitment: number;
  disbursements: number;
}

interface DisbursementsByRegionResponse {
  regions: DisbursementRegionData[];
}

export const useFetchDisbursementsByRegion = () => {
  const [data, setData] = useState<DisbursementRegionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/portfolio/disbursements-by-region');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: DisbursementsByRegionResponse = await response.json();
        setData(result.regions);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch disbursements by region';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
