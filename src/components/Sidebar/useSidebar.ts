import { useState } from 'react';
import { FILTER_SECTIONS } from './Sidebar.constants';

export const useSidebar = () => {
  const [filterSections, setFilterSections] = useState(FILTER_SECTIONS);

  const handleFilterToggle = (sectionId: string, optionId: string) => {
    setFilterSections(prevSections => 
      prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map(option => 
              option.id === optionId 
                ? { ...option, isSelected: !option.isSelected }
                : option
            )
          };
        }
        return section;
      })
    );
  };

  const handleResetFilters = () => {
    setFilterSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        options: section.options.map(option => ({ ...option, isSelected: false }))
      }))
    );
  };

  const handleUnderstandingData = () => {
    // TODO: Implement understanding data functionality
  };

  return {
    filterSections,
    handleFilterToggle,
    handleResetFilters,
    handleUnderstandingData
  };
}; 