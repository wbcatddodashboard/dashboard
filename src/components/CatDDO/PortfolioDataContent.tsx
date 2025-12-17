import React, { useState, useEffect } from 'react';
import { When } from 'vizonomy-ui';
import { Image } from 'vizonomy';
import type { TableColumn } from 'vizonomy';
import { useFilters } from '@/contexts/FilterContext';
import { buildApiUrl } from '@/lib/api-utils';
import {
  DisbursementTriggersContainer,
  DownloadButtonTrigger,
  FilterSection,
  SearchInput,
  SearchInputWrapper,
  SearchIcon,
  CountryFilter,
  MoreFiltersButton,
  ResetAllButton,
  AdditionalFiltersRow,
  ResetButtonContainer,
  TitleAndFiltersRow,
  TitleSection,
  FiltersSection,
  StyledSearchInput,
} from './styled';
import {
  TableFundingContainer,
  TableFundingWrapper,
  TableCellText,
} from './components/TableFundingDDO/styled/TableFundingDDO.styled';
import { FigmaSelect } from './components';
import { useCSVDownloader } from '@/hooks/useCSVDownloader';
import { useFilterTableDDO } from '@/hooks/useFilterTableDDO';

interface PortfolioDataRow {
  id: string;
  projectId: string;
  country: string;
  projectName: string;
  fiscalYear: string;
  status: string;
  region: string;
  financier: string;
  operationType: string;
  globalPractice: string;
  activationForCovid?: string;
  disastersTriggered?: string;
  commitmentCatDDO: string;
  disbursements: string;
  undisbursed: string;
}

export const PortfolioDataContent = () => {
  // Get global filters from sidebar
  const { filters: globalFilters } = useFilters();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<PortfolioDataRow[]>([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Use the hook for filter logic
  const {
    inputValue,
    selectedFilters,
    selectedCountryFilter,
    filterOptions,
    filteredRows,
    handleInputChange,
    setFilter,
    setCountryFilter,
    resetAllFilters,
    hasActiveFilters,
  } = useFilterTableDDO({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: rows as any[],
  });

  const { downloadCSV } = useCSVDownloader();

  // Fetch portfolio data - refetch when sidebar filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Build API URL with global sidebar filters
        const apiUrl = buildApiUrl('/api/portfolio/list', globalFilters);
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data) {
          // Transform data and add financial columns
          const transformedRows: PortfolioDataRow[] = data.data.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any, index: number) => ({
              id: item.id || `row-${index}`,
              projectId: item.projectId || '',
              country: item.country || '',
              projectName: item.projectName || '',
              fiscalYear: item.fiscalYear || '',
              status: item.status || '',
              region: item.region || '',
              financier: item.financier || '',
              operationType: item.operationType || '',
              globalPractice: item.globalPractice || '',
              activationForCovid: item.activationForCovid || '',
              commitmentCatDDO: '', // Will be populated from full dataset if needed
              disbursements: '', // Will be populated from full dataset if needed
              undisbursed: '', // Will be populated from full dataset if needed
            })
          );

          setRows(transformedRows);
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [globalFilters]); // Refetch when sidebar filters change

  const handleDownloadCSV = () => {
    if (!filteredRows?.length) return;

    const csvData = filteredRows.map((row) => ({
      'Project ID': row.projectId,
      Country: row.country,
      'Project Name': row.projectName,
      'Fiscal Year': row.fiscalYear,
      Status: row.status,
      Region: row.region,
      'Project Financier': row.financier,
      'Operation Type': row.operationType,
    }));

    downloadCSV(csvData, 'portfolio-data');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: TableColumn<any>[] = [
    {
      id: 'projectId',
      key: 'projectId',
      label: 'Project ID',
      width: 100,
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'country',
      key: 'country',
      label: 'Country',
      width: 140,
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'projectName',
      key: 'projectName',
      label: 'Project Name',
      width: 300,
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'fiscalYear',
      key: 'fiscalYear',
      label: 'Fiscal Year',
      width: 100,
      align: 'center',
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'status',
      key: 'status',
      label: 'Status',
      width: 100,
      align: 'center',
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'region',
      key: 'region',
      label: 'Region',
      width: 100,
      align: 'center',
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'financier',
      key: 'financier',
      label: 'Financier',
      width: 120,
      align: 'center',
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'operationType',
      key: 'operationType',
      label: 'Operation Type',
      width: 140,
      align: 'center',
      sortable: true,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
  ];

  return (
    <DisbursementTriggersContainer>
      <TitleAndFiltersRow>
        <TitleSection title="DPF Cat DDO Portfolio Data">
          <DownloadButtonTrigger
            onClick={handleDownloadCSV}
            disabled={isLoading || !filteredRows?.length}
          >
            <Image
              src="/download-icon.svg"
              alt="Download CSV"
              className="w-5 h-5"
            />
          </DownloadButtonTrigger>
        </TitleSection>

        <FiltersSection>
          <SearchInput>
            <SearchInputWrapper>
              <StyledSearchInput
                placeholder="Search projects..."
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange(e.target.value);
                }}
              />
              <SearchIcon>
                <Image
                  alt="Search"
                  className="w-4 h-4"
                  src="/search-icon.svg"
                />
              </SearchIcon>
            </SearchInputWrapper>
          </SearchInput>

          <CountryFilter>
            <FigmaSelect
              options={filterOptions.country ?? []}
              selected={selectedCountryFilter ?? []}
              onChange={setCountryFilter}
              placeholder="Country"
              pluralPlaceholder="countries"
            />
          </CountryFilter>

          <MoreFiltersButton
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            isActive={showMoreFilters}
          >
            <Image alt="Filter" className="w-4 h-4" src="/filter-icon.svg" />
          </MoreFiltersButton>
        </FiltersSection>
      </TitleAndFiltersRow>

      <FilterSection>
        <When condition={showMoreFilters}>
          <AdditionalFiltersRow>
            {/* Status Filter */}
            <FigmaSelect
              options={filterOptions.status ?? []}
              selected={selectedFilters.status ?? []}
              onChange={(options) => setFilter('status', options)}
              placeholder="Status"
              pluralPlaceholder="statuses"
            />
            {/* Region Filter */}
            <FigmaSelect
              options={filterOptions.region ?? []}
              selected={selectedFilters.region ?? []}
              onChange={(options) => setFilter('region', options)}
              placeholder="Region"
              pluralPlaceholder="regions"
            />
          </AdditionalFiltersRow>
        </When>

        <When condition={hasActiveFilters}>
          <ResetButtonContainer>
            <ResetAllButton
              onClick={resetAllFilters}
              disabled={!hasActiveFilters}
            >
              Reset All
            </ResetAllButton>
          </ResetButtonContainer>
        </When>
      </FilterSection>

      {isLoading ? (
        <TableFundingContainer>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading portfolio data...</div>
          </div>
        </TableFundingContainer>
      ) : !filteredRows?.length ? (
        <TableFundingContainer>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">No portfolio data available</div>
          </div>
        </TableFundingContainer>
      ) : (
        <TableFundingContainer>
          <TableFundingWrapper
            data={filteredRows}
            columns={columns}
            rowKey="id"
            maxBodyHeight={600}
            scroll={{ x: 1200 }}
            sorting={{ multiple: false }}
          />
        </TableFundingContainer>
      )}
    </DisbursementTriggersContainer>
  );
};

export default PortfolioDataContent;
