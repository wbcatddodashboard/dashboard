import { useEffect, useState } from 'react';
import { PORTFOLIO_ENDPOINTS, fetchJson } from '@/api.settings';

export interface RegionByStatusResponse {
  regions: string[];
  statuses: string[];
  matrix: Array<Record<string, number | string>>;
}

export const useFetchRegionByStatus = () => {
  const [data, setData] = useState<RegionByStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        const json = await fetchJson<RegionByStatusResponse>(
          PORTFOLIO_ENDPOINTS.regionByStatus,
          { signal: abortController.signal }
        );
        setData(json);
        setErrorMessage('');
      } catch (err: unknown) {
        setData(null);
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => abortController.abort();
  }, []);

  return { data, isLoading, errorMessage };
};
