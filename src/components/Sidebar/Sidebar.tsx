'use client';

import type { SidebarProps } from './Sidebar.d';
import { useSidebar } from './useSidebar';
import {
  SIDEBAR_LOGO_IMAGE,
  FILTER_ICON_GROUP,
  FILTER_ICON_IMAGE,
} from './Sidebar.constants';
import {
  SidebarContainer,
  SidebarContent,
  LogoContainer,
  LogoImage,
  FilterSectionContainer,
  FilterSectionHeader,
  FilterSectionTitle,
  FilterIconContainer,
  FilterIconWrapper,
  FilterIcon,
  FilterOptionsContainer,
  FilterOptionButton,
  FilterOptionLabel,
  FilterOptionText,
  ActionButtonsContainer,
  ButtonContainer,
  SidebarBorder,
} from './Sidebar.styled';
import { ResetFiltersButton, UnderstandingDataButton } from './SidebarButtons';

function Sidebar({ className }: SidebarProps) {
  const {
    filterSections,
    isLoading,
    error,
    handleFilterToggle,
    handleResetFilters,
    handleUnderstandingData,
  } = useSidebar();

  return (
    <SidebarContainer className={className}>
      <SidebarContent>
        <LogoContainer>
          <LogoImage src={SIDEBAR_LOGO_IMAGE} />
        </LogoContainer>

        {isLoading && (
          <div className="p-4 text-sm text-gray-500">Loading filters...</div>
        )}

        {error && (
          <div className="p-4 text-sm text-red-500">
            Error loading filters: {error}
          </div>
        )}

        {!isLoading &&
          !error &&
          filterSections.map((section) => {
            let sectionSize: 'small' | 'default' | 'large' = 'default';

            if (section.id === 'project-status') {
              sectionSize = 'small'; // Only 3 options
            } else if (section.id === 'country') {
              sectionSize = 'large'; // Many country options
            } else {
              sectionSize = 'default'; // Regions
            }

            return (
              <FilterSectionContainer key={section.id} size={sectionSize}>
                <FilterSectionHeader>
                  <FilterSectionTitle>{section.title}</FilterSectionTitle>
                  {section.hasFilterIcon && (
                    <FilterIconContainer>
                      <FilterIconWrapper>
                        <FilterIcon
                          groupSrc={FILTER_ICON_GROUP}
                          imageSrc={FILTER_ICON_IMAGE}
                        />
                      </FilterIconWrapper>
                    </FilterIconContainer>
                  )}
                </FilterSectionHeader>

                <FilterOptionsContainer>
                  {section.options.map((option) => (
                    <FilterOptionButton
                      key={option.id}
                      isSelected={option.isSelected}
                      onClick={() => handleFilterToggle(section.id, option.id)}
                    >
                      <FilterOptionLabel>
                        <FilterOptionText isSelected={option.isSelected}>
                          {option.label}
                        </FilterOptionText>
                      </FilterOptionLabel>
                    </FilterOptionButton>
                  ))}
                </FilterOptionsContainer>
              </FilterSectionContainer>
            );
          })}

        <ActionButtonsContainer>
          <ButtonContainer>
            <ResetFiltersButton onClick={handleResetFilters}>
              Reset Filters
            </ResetFiltersButton>
          </ButtonContainer>
          <ButtonContainer>
            <UnderstandingDataButton onClick={handleUnderstandingData}>
              Understanding the Data
            </UnderstandingDataButton>
          </ButtonContainer>
        </ActionButtonsContainer>
      </SidebarContent>
      <SidebarBorder />
    </SidebarContainer>
  );
}

export default Sidebar;
