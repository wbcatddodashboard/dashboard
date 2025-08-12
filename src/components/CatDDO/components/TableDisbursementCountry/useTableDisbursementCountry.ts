import { useMemo } from 'react';
import type { DisbursementCountry } from '../../interfaces';

// Mock data for country disbursements - replace with actual API hook when available
export const useTableDisbursementCountry = () => {
  const isLoading = false;
  const errorMessage = null;

  const rows = useMemo<DisbursementCountry[]>(() => {
    const format = (n: number) =>
      n.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    // Sample data for countries
    const countries = [
      { country: 'Ethiopia', netCommitment: 1205.0, disbursements: 436.89 },
      { country: 'Kenya', netCommitment: 850.5, disbursements: 320.45 },
      { country: 'Tanzania', netCommitment: 750.75, disbursements: 285.6 },
      { country: 'Uganda', netCommitment: 650.25, disbursements: 245.8 },
      { country: 'Rwanda', netCommitment: 450.0, disbursements: 180.25 },
      { country: 'Ghana', netCommitment: 925.8, disbursements: 365.9 },
      { country: 'Nigeria', netCommitment: 1850.6, disbursements: 720.35 },
    ];

    const dataRows: DisbursementCountry[] = countries.map((item, index) => ({
      id: `${index + 1}`,
      country: item.country,
      netCommitmentAmount: format(item.netCommitment),
      cumulativeDisbursements: format(item.disbursements),
    }));

    // Calculate totals
    const totalNetCommitment = countries.reduce(
      (sum, item) => sum + item.netCommitment,
      0
    );
    const totalDisbursements = countries.reduce(
      (sum, item) => sum + item.disbursements,
      0
    );

    const totalRow: DisbursementCountry = {
      id: 'total',
      country: 'Grand Total',
      netCommitmentAmount: format(totalNetCommitment),
      cumulativeDisbursements: format(totalDisbursements),
      isTotal: true,
    };

    return [...dataRows, totalRow];
  }, []);

  return { rows, isLoading, errorMessage };
};
