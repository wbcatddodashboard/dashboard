import { useEffect, useState } from 'react';
import { PORTFOLIO_ENDPOINTS, fetchJson } from '@/api.settings';

export type PortfolioListItem = {
  id: string;
  projectId: string;
  country: string;
  projectName: string;
  fiscalYear: string;
  status: string;
  activationForCovid: string;
  financier: string;
  region: string;
  globalPractice: string;
  operationType: string;
};

type ResponseShape = { data: PortfolioListItem[] };

export const useFetchPortfolioList = () => {
  const [data, setData] = useState<PortfolioListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        const json = await fetchJson<ResponseShape>(PORTFOLIO_ENDPOINTS.list, {
          signal: abortController.signal,
        });
        setData(json.data ?? []);
        setErrorMessage('');
      } catch (err: unknown) {
        setData([]);
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
