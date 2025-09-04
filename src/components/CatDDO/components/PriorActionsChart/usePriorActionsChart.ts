import { useFetchPriorActions } from '@/hooks/useFetchPriorActions';

export function usePriorActionsChart() {
  const {
    chartData,
    series: apiSeries,
    isLoading,
    error,
  } = useFetchPriorActions();

  return {
    data: chartData,
    series: apiSeries,
    isLoading,
    errorMessage: error,
  };
}
