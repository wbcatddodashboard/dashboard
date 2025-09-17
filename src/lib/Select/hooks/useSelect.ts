import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Option, UseSelectProps } from '../Select.d';

const useSelect = (props: UseSelectProps) => {
  const {
    options = [],
    selected = [],
    onChange,
    isMulti = false,
    disabled = false,
    maxItems,
    autocomplete = false,
    onSearch,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      if (!selected.length) {
        setSearchTerm('');
      }
    }
  }, [isOpen, selected.length]);

  // Call onSearch callback when search term changes
  useEffect(() => {
    if (onSearch && autocomplete) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch, autocomplete]);

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  const closeSelect = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isSelected = useCallback(
    (option: Option) => {
      return selected.some((item) => item.id === option.id);
    },
    [selected]
  );

  const toggleOption = useCallback(
    (option: Option) => {
      if (disabled) return;

      if (isMulti) {
        // For multi-select mode
        if (isSelected(option)) {
          // Remove the option if already selected
          const newSelected = selected.filter((item) => item.id !== option.id);
          onChange(newSelected);
        } else {
          // Add the option if not at max capacity
          if (maxItems && selected.length >= maxItems) return;
          onChange([...selected, option]);
        }
      } else {
        // For single-select mode
        if (isSelected(option)) {
          // Clicking the same option deselects it
          onChange([]);
          setSearchTerm('');
        } else {
          // Select a new option
          onChange([option]);
          setSearchTerm(option.label);
        }
        closeSelect();
      }
    },
    [isMulti, isSelected, selected, onChange, disabled, maxItems, closeSelect]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        closeSelect();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // Focus handling for arrow keys
        e.preventDefault();

        const optionElements = Array.from(
          document.querySelectorAll('[role="option"]')
        );

        if (!optionElements.length) return;

        const currentIndex = optionElements.findIndex(
          (option) => document.activeElement === option
        );

        let nextIndex;
        if (e.key === 'ArrowDown') {
          nextIndex =
            currentIndex < optionElements.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex =
            currentIndex > 0 ? currentIndex - 1 : optionElements.length - 1;
        }

        (optionElements[nextIndex] as HTMLElement).focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeSelect, filteredOptions]);

  // Handle click outside to close the select
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeSelect();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeSelect]);

  return {
    isOpen,
    isMulti,
    disabled,
    toggleOpen,
    closeSelect,
    toggleOption,
    isSelected,
    selectRef,
    options,
    selected,
    searchTerm,
    setSearchTerm,
    filteredOptions,
    autocomplete,
  };
};

export default useSelect;
