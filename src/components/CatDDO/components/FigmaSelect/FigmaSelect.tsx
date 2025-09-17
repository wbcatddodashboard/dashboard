import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'vizonomy';
import type { Option } from 'vizonomy-ui';
import {
  FilterSelectContainer,
  FilterSelectButton,
  FilterSelectContent,
  FilterSelectText,
  FilterSelectIcon,
  CountrySelectContainer,
  CountrySelectHeader,
  CountrySelectTitle,
  SelectAllButton,
  CountrySelectContent,
  CountryOption,
  CountrySelectFooter,
  ClearButton,
  ApplyButton,
} from '../../styled';

export interface FigmaSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (options: Option[]) => void;
  placeholder: string;
  disabled?: boolean;
}

export const FigmaSelect: React.FC<FigmaSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<Option[]>(
    selected || []
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPendingSelection(selected || []);
  }, [selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setPendingSelection(selected || []);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, selected]);

  const handleSelectAll = () => {
    setPendingSelection(options);
  };

  const handleClear = () => {
    setPendingSelection([]);
    onChange([]);
    setIsOpen(false);
  };

  const handleApply = () => {
    onChange(pendingSelection);
    setIsOpen(false);
  };

  const toggleOption = (option: Option) => {
    const isSelected = pendingSelection.some((item) => item.id === option.id);
    if (isSelected) {
      setPendingSelection(
        pendingSelection.filter((item) => item.id !== option.id)
      );
    } else {
      setPendingSelection([...pendingSelection, option]);
    }
  };

  const isSelected = (option: Option) => {
    return pendingSelection.some((item) => item.id === option.id);
  };

  const getDisplayValue = () => {
    if (!selected || selected.length === 0) {
      return placeholder;
    }

    if (selected.length === 1) {
      return selected[0].label;
    }

    return `${selected.length} ${placeholder.toLowerCase()} selected`;
  };

  return (
    <FilterSelectContainer ref={dropdownRef}>
      <FilterSelectButton onClick={() => !disabled && setIsOpen(!isOpen)}>
        <FilterSelectContent>
          {placeholder === 'Country' && (
            <FilterSelectIcon>
              <Image
                alt="Globe"
                className="w-4 h-4 flex-shrink-0"
                src="/globe.svg"
              />
            </FilterSelectIcon>
          )}
          <FilterSelectText>{getDisplayValue()}</FilterSelectText>
        </FilterSelectContent>
        <FilterSelectIcon>
          <Image
            alt="Arrow Down"
            className="w-4 h-4 flex-shrink-0"
            src="/chevron.svg"
          />
        </FilterSelectIcon>
      </FilterSelectButton>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-80">
          <CountrySelectContainer>
            <CountrySelectHeader>
              <CountrySelectTitle>{placeholder}</CountrySelectTitle>
              <SelectAllButton onClick={handleSelectAll} />
            </CountrySelectHeader>

            <CountrySelectContent>
              {options && options.length > 0 ? (
                options.map((option) => (
                  <CountryOption
                    key={option.id}
                    isSelected={isSelected(option)}
                    onClick={() => toggleOption(option)}
                  >
                    {option.label}
                  </CountryOption>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No options available
                </div>
              )}
            </CountrySelectContent>

            <CountrySelectFooter>
              <ClearButton
                onClick={handleClear}
                disabled={pendingSelection.length === 0}
              />
              <ApplyButton
                onClick={handleApply}
                disabled={pendingSelection.length === 0}
              />
            </CountrySelectFooter>
          </CountrySelectContainer>
        </div>
      )}
    </FilterSelectContainer>
  );
};
