import * as React from 'react';
import { Image } from 'vizonomy';
import { PriorActionsChart } from './components/PriorActionsChart';
import { TablePriorActions } from './components/TablePriorActions';
import { useTablePriorActions } from './components/TablePriorActions/useTablePriorActions';
import { useCSVDownloader } from '@/hooks/useCSVDownloader';
import {
  PriorActionsWrapper,
  PriorActionsContainer,
  PriorActionsTitle,
  PriorActionsContentWrapper,
  PriorActionsChartContainer,
  PriorActionsTableSection,
  DownloadButton,
} from './styled/PriorActionsResultIndicators.styled';

export const PriorActionsResultIndicators = () => {
  const { rows, isLoading } = useTablePriorActions();
  const { downloadCSV } = useCSVDownloader();

  const handleDownloadCSV = () => {
    if (!rows?.length) return;

    const csvData = rows
      .filter((row) => !row.isTotal)
      .map((row) => ({
        'P#': row.projectNumber,
        Country: row.country,
        'DRM Pillar': row.drmPillar,
        'Prior Action': row.priorAction,
        'Result Indicator': row.resultIndicator?.replace(/\r?\n/g, ' | '),
      }));

    downloadCSV(csvData, 'prior-actions');
  };

  return (
    <PriorActionsWrapper>
      <PriorActionsContainer>
        <PriorActionsTitle>
          Prior Actions and Result indicators
          <DownloadButton
            onClick={handleDownloadCSV}
            disabled={isLoading || !rows?.length}
          >
            <Image
              src="/download-icon.svg"
              alt="Download CSV"
              className="w-6 h-6"
            />
          </DownloadButton>
        </PriorActionsTitle>

        <PriorActionsContentWrapper>
          <PriorActionsChartContainer>
            <PriorActionsChart />
          </PriorActionsChartContainer>

          <PriorActionsTableSection>
            <TablePriorActions rows={rows} isLoading={isLoading} />
          </PriorActionsTableSection>
        </PriorActionsContentWrapper>
      </PriorActionsContainer>
    </PriorActionsWrapper>
  );
};

export default PriorActionsResultIndicators;
