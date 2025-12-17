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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortfolioDataRow = Record<string, any>;

export const PortfolioDataContent = () => {
  // Get global filters from sidebar
  const { filters: globalFilters } = useFilters();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<PortfolioDataRow[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columns, setColumns] = useState<TableColumn<any>[]>([]);
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
        // Build API URL with global sidebar filters - calling the DEDICATED FULL-LIST endpoint
        const apiUrl = buildApiUrl('/api/portfolio/full-list', globalFilters);
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data) {
          const rawData = data.data;

          // Augment data for Hook compatibility (mapping CSV keys to hook expected keys)
          const augmentedRows: PortfolioDataRow[] = rawData.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => ({
              ...item,
              projectId: item['P#'],
              country: item['Country'],
              projectName: item['Description'],
              fiscalYear: item['Fiscal Year'],
              status: item['Status'],
              region: item['Region'],
              financier: item['Source'],
              globalPractice: item['Global Practice'],
              operationType: item['Standalone/Mixed'],
              activationForCovid:
                item['Activation for COVID'] || item['Activation for COVID '],
            })
          );

          setRows(augmentedRows);

          // Generate dynamic columns from the first row's keys (excluding mapped keys and ID)
          if (rawData.length > 0) {
            const firstRow = rawData[0];
            const dynamicCols = Object.keys(firstRow)
              .filter((k) => !['id', 'PDO', 'Description'].includes(k))
              .map((key, index) => {
                const sampleVal = rawData.find(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (r: any) => r[key] && r[key].toString().trim() !== ''
                )?.[key];
                const isNumericCol =
                  sampleVal &&
                  /^-?\d+(?:\.\d+)?$/.test(sampleVal.toString().trim()) &&
                  !/(?:\b(?:year|fy|id|code)\b)|p\#/i.test(key);

                return {
                  id: key,
                  key: key,
                  label: key,
                  width: 150,
                  sortable: true,
                  fixed: index < 2 ? ('left' as const) : undefined,
                  align: isNumericCol ? ('right' as const) : ('left' as const),
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  render: (v: any) => (
                    <TableCellText>
                      {isNumericCol &&
                      !isNaN(Number(v)) &&
                      v.toString().trim() !== ''
                        ? Number(v).toLocaleString('en-US')
                        : v}
                    </TableCellText>
                  ),
                };
              });
            setColumns(dynamicCols);
          }
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
    if (!filteredRows?.length || !columns.length) return;

    // Export based on visible columns
    const csvData = filteredRows.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exportRow: Record<string, any> = {};
      columns.forEach((col) => {
        if (col.key) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          exportRow[col.label as string] = (row as any)[col.key as string];
        }
      });
      return exportRow;
    });

    downloadCSV(csvData, 'portfolio-data');
  };

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
