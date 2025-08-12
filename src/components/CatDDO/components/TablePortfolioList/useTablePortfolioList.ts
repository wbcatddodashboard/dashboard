import { useMemo } from 'react';
import { useFetchPortfolioList } from '@/hooks/useFetchPortfolioList';
import { useFetchPortfolioTriggers } from '@/hooks/useFetchPortfolioTriggers';
import type { PortfolioListRow } from './TablePortfolioList.d';

export const useTablePortfolioList = () => {
  const { data, isLoading, errorMessage } = useFetchPortfolioList();
  const { data: triggers } = useFetchPortfolioTriggers();

  const rows = useMemo<PortfolioListRow[]>(() => {
    const triggerMap = new Map(triggers.map((t) => [t.projectId, t] as const));

    return data.map((d) => ({
      id: d.id,
      projectId: d.projectId,
      country: d.country,
      projectName: d.projectName,
      fiscalYear: d.fiscalYear,
      status: d.status,
      activationForCovid: d.activationForCovid,
      financier: d.financier,
      region: d.region,
      globalPractice: d.globalPractice,
      operationType: d.operationType,
      // Optional trigger fields will be used if columns are added later
      triggerText: triggerMap.get(d.projectId)?.triggerText ?? '',
      additionalInfo: triggerMap.get(d.projectId)?.additionalInfo ?? '',
      healthRelatedEmergencies:
        triggerMap.get(d.projectId)?.healthRelatedEmergencies ?? '',
      disastersTriggered: triggerMap.get(d.projectId)?.disastersTriggered ?? '',
    }));
  }, [data, triggers]);

  return { rows, isLoading, errorMessage };
};
