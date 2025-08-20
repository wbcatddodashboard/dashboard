import { useState, useEffect } from 'react';
import { useFetchFilters } from '@/hooks/useFetchFilters';
import { REGION_LABELS } from './Sidebar.constants';

export type FilterSection = {
  id: string;
  title: string;
  hasFilterIcon: boolean;
  options: Array<{
    id: string;
    label: string;
    isSelected: boolean;
  }>;
};

export const useSidebar = () => {
  const { filterData, isLoading, error } = useFetchFilters();
  const [filterSections, setFilterSections] = useState<FilterSection[]>([]);

  useEffect(() => {
    if (filterData) {
      const sections: FilterSection[] = [
        {
          id: 'project-status',
          title: 'Project Status',
          hasFilterIcon: true,
          options: filterData.statuses.map((status) => ({
            id: status.toLowerCase().replace(/\s+/g, '-'),
            label: status,
            isSelected: false,
          })),
        },
        {
          id: 'region',
          title: 'Region',
          hasFilterIcon: true,
          options: filterData.regions.map((region) => ({
            id: region.toLowerCase().replace(/\s+/g, '-'),
            label: REGION_LABELS[region] || region,
            isSelected: false,
          })),
        },
        {
          id: 'country',
          title: 'Country',
          hasFilterIcon: true,
          options: filterData.countries.map((country) => ({
            id: country.toLowerCase().replace(/\s+/g, '-'),
            label: country,
            isSelected: false,
          })),
        },
      ];
      setFilterSections(sections);
    }
  }, [filterData]);

  const handleFilterToggle = (sectionId: string, optionId: string) => {
    setFilterSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map((option) =>
              option.id === optionId
                ? { ...option, isSelected: !option.isSelected }
                : option
            ),
          };
        }
        return section;
      })
    );
  };

  const handleResetFilters = () => {
    setFilterSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        options: section.options.map((option) => ({
          ...option,
          isSelected: false,
        })),
      }))
    );
  };

  const handleUnderstandingData = () => {
    // TODO: Implement understanding data functionality
  };

  return {
    filterSections,
    isLoading,
    error,
    handleFilterToggle,
    handleResetFilters,
    handleUnderstandingData,
  };
};
