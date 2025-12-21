import { useEffect, useState } from 'react';

interface TextSummaryNumbers {
  numActiveClosed: number;
  numUniqueCountries: number;
  numClosed: number;
  numPipeline: number;
  disbTotBillion: number;
  ibrdShare: number;
  idaShare: number;
  undisbBillion: number;
  topRegion: string;
  topVal: number;
  topShare: number;
  secondRegion: string;
  secondVal: number;
  secondShare: number;
  pipelineIDA: number;
  pipelineIDAmt: number;
  pipelineIBRD: number;
  pipelineIBRDAmt: number;
  mixedAllCommit: number;
  mixedCatCommit: number;
}

interface TextSummaryResponse {
  phrase1: string;
  phrase2: string;
  phrase3: string;
  phrase4: string;
  phrase5: string;
  phrase6: string;
  phrase7: string;
  numbers: TextSummaryNumbers;
}

export function useFetchTextSummary() {
  const [data, setData] = useState<TextSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');

        // Fetch without filters - always shows full portfolio stats
        const response = await fetch('/api/portfolio/text-summary');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: TextSummaryResponse = await response.json();
        setData(result);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to fetch text summary data';
        setError(message);
        console.error('Error fetching text summary data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); // No dependencies - only fetch once on mount

  return { data, isLoading, error };
}
