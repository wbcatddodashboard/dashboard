import { useMemo } from 'react';
import type { StackedBarChartDataPoint, BarChartSeries } from 'vizonomy';

export function usePriorActionsChart() {
  const data = useMemo<StackedBarChartDataPoint[]>(() => {
    return [
      {
        id: 'territorial',
        label: 'Territorial and urban planning',
        values: {
          'Prior Action': 2.8,
        },
      },
      {
        id: 'risk-identification',
        label: 'Risk Identification',
        values: {
          'Prior Action': 8.2,
        },
      },
      {
        id: 'fiscal-risk',
        label: 'Fiscal Risk',
        values: {
          'Prior Action': 2.9,
        },
      },
      {
        id: 'drm-policies',
        label: 'DRM policies and institutions',
        values: {
          'Prior Action': 5.5,
        },
      },
    ];
  }, []);

  const series = useMemo<BarChartSeries[]>(
    () => [
      {
        key: 'Prior Action',
        label: 'Prior Action',
        color: '#295e84',
      },
    ],
    []
  );

  return {
    data,
    series,
  };
}
