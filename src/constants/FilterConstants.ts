import type { FilterConfig } from '@/hooks/useFilterTableDDO.d';

export const FILTER_CONFIG: FilterConfig[] = [
  {
    key: 'fiscalYear',
    property: 'fiscalYear',
    placeholder: 'Fiscal Year',
    pluralPlaceholder: 'Fiscal Years',
  },
  {
    key: 'status',
    property: 'status',
    placeholder: 'Status',
    pluralPlaceholder: 'statuses',
  },
  {
    key: 'covidActivation',
    property: 'activationForCovid',
    placeholder: 'COVID Activation',
    pluralPlaceholder: 'COVID Activations',
  },
  {
    key: 'projectFinancier',
    property: 'financier',
    placeholder: 'Project Financier',
    pluralPlaceholder: 'Project Financiers',
  },
  {
    key: 'region',
    property: 'region',
    placeholder: 'Region',
    pluralPlaceholder: 'regions',
  },
  {
    key: 'globalPractice',
    property: 'globalPractice',
    placeholder: 'Global Practice',
    pluralPlaceholder: 'Global Practices',
  },
  {
    key: 'mixedStandalone',
    property: 'operationType',
    placeholder: 'Mixed/Standalone',
    pluralPlaceholder: 'Mixed/Standalone',
  },
  {
    key: 'disaster',
    property: 'disastersTriggered',
    placeholder: 'Disaster',
    pluralPlaceholder: 'Disasters',
  },
];

export const COUNTRY_FILTER_CONFIG = {
  key: 'country',
  property: 'country',
  placeholder: 'Country',
};
