import { useEffect, useState } from 'react';
import { PORTFOLIO_ENDPOINTS, fetchJson } from '@/api.settings';

export interface SummaryTableResponse {
  table: {
    IBRD: { Disbursed: number; Undisbursed: number; Pipeline: number };
    IDA: { Disbursed: number; Undisbursed: number; Pipeline: number };
  };
  Total: { Disbursed: number; Undisbursed: number; Pipeline: number };
}

export const useFetchSummaryTable = () => {
  const [data, setData] = useState<SummaryTableResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        const json = await fetchJson<SummaryTableResponse>(
          PORTFOLIO_ENDPOINTS.summaryTable,
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
