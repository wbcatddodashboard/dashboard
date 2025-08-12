import { useEffect, useState } from 'react';
import { PORTFOLIO_ENDPOINTS, fetchJson } from '@/api.settings';

export interface DisbursementsByFySourceResponse {
  fiscalYears: string[];
  labels: string[];
  ibrd: number[];
  ida: number[];
  total: number[];
}

export const useFetchDisbursementsByFySource = () => {
  const [data, setData] = useState<DisbursementsByFySourceResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        const json = await fetchJson<DisbursementsByFySourceResponse>(
          PORTFOLIO_ENDPOINTS.disbursementsByFySource,
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
