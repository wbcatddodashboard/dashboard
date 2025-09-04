import React from 'react';
import { Image } from 'vizonomy';
import {
  DisbursementTriggersContainer,
  DisbursementTriggersTitle,
  DownloadButtonTrigger,
} from './styled';
import { TablePortfolioList } from './components';
import { useTablePortfolioList } from './components/TablePortfolioList/useTablePortfolioList';
import { useCSVDownloader } from '@/hooks/useCSVDownloader';

export const DisbursementTriggersContent = () => {
  const { rows, isLoading } = useTablePortfolioList();
  const { downloadCSV } = useCSVDownloader();

  const handleDownloadCSV = () => {
    if (!rows?.length) return;

    const csvData = rows.map((row) => ({
      'Project ID': row.projectId,
      Country: row.country,
      'Project Name': row.projectName,
      'Fiscal Year': row.fiscalYear,
      Status: row.status,
      'Activation for COVID': row.activationForCovid,
      'Project Financier': row.financier,
      Region: row.region,
      'Global Practice': row.globalPractice,
      'Mixed/Standalone': row.operationType,
      'Trigger from Loan/Financing Agreements': row.triggerText?.replace(
        /\r?\n/g,
        ' | '
      ),
      'Additional Information from Minutes & Program Document':
        row.additionalInfo?.replace(/\r?\n/g, ' | '),
      'Health Related emergencies mentioned in the Trigger':
        row.healthRelatedEmergencies?.replace(/\r?\n/g, ' | '),
      'Disasters that have triggered the Cat DDO':
        row.disastersTriggered?.replace(/\r?\n/g, ' | '),
      'Link to Financing or Loan Agreement': row.link,
    }));

    downloadCSV(csvData, 'portfolio-list');
  };

  return (
    <DisbursementTriggersContainer>
      <DisbursementTriggersTitle>
        Cat DDO Disbursement Triggers Content
        <DownloadButtonTrigger
          onClick={handleDownloadCSV}
          disabled={isLoading || !rows || rows.length === 0}
        >
          <Image
            src="/download-icon.svg"
            alt="Download CSV"
            className="w-6 h-6"
          />
        </DownloadButtonTrigger>
      </DisbursementTriggersTitle>
      <TablePortfolioList rows={rows} isLoading={isLoading} />
    </DisbursementTriggersContainer>
  );
};

export default DisbursementTriggersContent;
