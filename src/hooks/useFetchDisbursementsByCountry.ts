import { useState, useEffect } from 'react';

interface DisbursementCountryData {
  country: string;
  netCommitment: number;
  disbursements: number;
}

interface DisbursementsByCountryResponse {
  countries: DisbursementCountryData[];
}

export const useFetchDisbursementsByCountry = () => {
  const [data, setData] = useState<DisbursementCountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/portfolio/disbursements-by-country');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: DisbursementsByCountryResponse = await response.json();
        setData(result.countries);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch disbursements by country';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
