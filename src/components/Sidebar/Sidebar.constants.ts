import type { FilterSection } from './Sidebar.d';

export const SIDEBAR_LOGO_IMAGE = '/sidebar-logo.png';
export const FILTER_ICON_GROUP = '/filter-icon-group.svg';
export const FILTER_ICON_IMAGE = '/filter-icon-figma.svg';

export const FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'project-status',
    title: 'Project Status',
    hasFilterIcon: true,
    options: [
      { id: 'active', label: 'Active' },
      { id: 'closed', label: 'Closed' },
      { id: 'pipeline', label: 'Pipeline' },
    ],
  },
  {
    id: 'region',
    title: 'Region',
    hasFilterIcon: true,
    options: [
      { id: 'afe', label: 'Eastern & Southern Africa (AFE)' },
      { id: 'afw', label: 'Western & Central Africa (AFW)' },
      { id: 'eap', label: 'East Asia & Pacific (EAP)' },
      { id: 'eca', label: 'Europe & Central Asia (ECA)' },
      { id: 'lcr', label: 'Latin America & Caribbean (LCR)' },
      { id: 'mna', label: 'Middle East & North Africa (MNA)' },
      { id: 'na', label: 'North America' },
      { id: 'sar', label: 'South Asia (SAR)' },
    ],
  },
  {
    id: 'country',
    title: 'Country',
    hasFilterIcon: true,
    options: [
      { id: 'barbados', label: 'Barbados' },
      { id: 'belize', label: 'Belize' },
      { id: 'benin', label: 'Benin' },
      { id: 'bhutan', label: 'Bhutan' },
      { id: 'cabo-verde', label: 'Cabo Verde' },
      { id: 'chile', label: 'Chile' },
      { id: 'colombia', label: 'Colombia' },
    ],
  },
];
