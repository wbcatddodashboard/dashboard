import { useEffect, useState } from 'react';
import { PORTFOLIO_ENDPOINTS, fetchJson } from '@/api.settings';
import { useFilters } from '@/contexts/FilterContext';

export interface RegionByStatusResponse {
  regions: string[];
  statuses: string[];
  matrix: Array<Record<string, number | string>>;
}

export const useFetchRegionByStatus = () => {
  const { filters } = useFilters();
  const [data, setData] = useState<RegionByStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();
        if (!!filters.statuses.length) {
          params.append('statuses', filters.statuses.join(','));
        }
        if (!!filters.regions.length) {
          params.append('regions', filters.regions.join(','));
        }
        if (!!filters.countries.length) {
          params.append('countries', filters.countries.join(','));
        }

        const url = params.toString()
          ? `${PORTFOLIO_ENDPOINTS.regionByStatus}?${params.toString()}`
          : PORTFOLIO_ENDPOINTS.regionByStatus;

        const json = await fetchJson<RegionByStatusResponse>(url, {
          signal: abortController.signal,
        });
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
  }, [filters]);

  return { data, isLoading, errorMessage };
};
