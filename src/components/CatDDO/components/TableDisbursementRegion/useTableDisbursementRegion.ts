import { useMemo } from 'react';
import type { DisbursementRegion } from '../../interfaces';

// Mock data based on Figma design - replace with actual API hook when available
export const useTableDisbursementRegion = () => {
  const isLoading = false;
  const errorMessage = null;

  const rows = useMemo<DisbursementRegion[]>(() => {
    const format = (n: number) =>
      n.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    // Sample data from Figma design
    const regions = [
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
      { region: 'AFE', netCommitment: 1205.0, disbursements: 436.89 },
    ];

    const dataRows: DisbursementRegion[] = regions.map((item, index) => ({
      id: `${index + 1}`,
      region: item.region,
      netCommitmentAmount: format(item.netCommitment),
      cumulativeDisbursements: format(item.disbursements),
    }));

    // Calculate totals
    const totalNetCommitment = regions.reduce(
      (sum, item) => sum + item.netCommitment,
      0
    );
    const totalDisbursements = regions.reduce(
      (sum, item) => sum + item.disbursements,
      0
    );

    const totalRow: DisbursementRegion = {
      id: 'total',
      region: 'Grand Total',
      netCommitmentAmount: format(totalNetCommitment),
      cumulativeDisbursements: format(totalDisbursements),
      isTotal: true,
    };

    return [...dataRows, totalRow];
  }, []);

  return { rows, isLoading, errorMessage };
};
