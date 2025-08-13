import { useMemo } from 'react';
import type { PriorAction } from '../../interfaces';

export function useTablePriorActions() {
  const rows = useMemo((): PriorAction[] => {
    // Data extracted from the Figma design
    const sampleData: PriorAction[] = [
      {
        id: '1',
        projectNumber: 'P112544',
        country: 'Guatemala',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
      {
        id: '2',
        projectNumber: 'P112544',
        country: 'Colombia',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
      {
        id: '3',
        projectNumber: 'P112544',
        country: 'Cabo Verde',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
      {
        id: '4',
        projectNumber: 'P112544',
        country: 'Kenya',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
      {
        id: '5',
        projectNumber: 'P112544',
        country: 'Kenya',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
      {
        id: '6',
        projectNumber: 'P112544',
        country: 'Malawi',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
      {
        id: '7',
        projectNumber: 'P112544',
        country: 'Samoa',
        pillar:
          'Strengthening institutions and planning capacity for risk management.',
        priorAction:
          'SEGEPLAN has published and started dissemination/training programs on a methodology for the inclusion of disaster risk management in investments.',
        resultIndicator:
          'SEGEPLAN will have developed the instruments, applying the methodology, for the inclusion of disaster risk management in investments.',
        drmPolicyArea: 'Territorial and urban planning',
        typeOfLegalEvidence: '-',
      },
    ];

    return sampleData;
  }, []);

  return {
    rows,
  };
}
