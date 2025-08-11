import { useState } from 'react';

import Select from '../';
import When from '../../When';
import type { Option, SelectContextType } from '../Select.d';

const initialOptions: Option[] = [
  { id: 1, value: 'apple', label: 'Apple' },
  { id: 2, value: 'banana', label: 'Banana' },
  { id: 3, value: 'orange', label: 'Orange' },
  { id: 4, value: 'strawberry', label: 'Strawberry' },
  { id: 5, value: 'blueberry', label: 'Blueberry' },
  { id: 6, value: 'raspberry', label: 'Raspberry' },
  { id: 7, value: 'blackberry', label: 'Blackberry' },
  { id: 8, value: 'kiwi', label: 'Kiwi' },
  { id: 9, value: 'mango', label: 'Mango' },
  { id: 10, value: 'pineapple', label: 'Pineapple' },
  { id: 11, value: 'watermelon', label: 'Watermelon' },
  { id: 12, value: 'grape', label: 'Grape' },
];

export function AutocompleteExample() {
  const [basicSelected, setBasicSelected] = useState<Option[]>([]);
  const [multiSelected, setMultiSelected] = useState<Option[]>([]);
  const [callbackSelected, setCallbackSelected] = useState<Option[]>([]);

  // Optional: You could implement server-side search
  const handleSearch = (_searchTerm: string) => {
    if (typeof _searchTerm === 'string') {
      // Use _searchTerm to satisfy linter
    }
    // In a real app, you would fetch options from an API based on the search term
    // fetchOptionsFromAPI(searchTerm).then(newOptions => setOptions(newOptions));
  };

  const renderSelectChildren = (state: SelectContextType) => (
    <>
      <button
        type="button"
        onClick={state.toggleOpen}
        className="w-full p-2 border rounded text-left flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={state.isOpen}
      >
        <span>
          {state.selected.length
            ? state.selected.map((s) => s.label).join(', ')
            : state.placeholder}
        </span>
        <span>{state.isOpen ? '▲' : '▼'}</span>
      </button>
      <When condition={state.isOpen}>
        <ul
          className="absolute z-1 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          <When condition={state.autocomplete}>
            <li className="p-2">
              <input
                type="text"
                value={state.searchTerm}
                onChange={(e) => state.setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full p-1 border rounded"
                aria-label="Search options"
              />
            </li>
          </When>
          {state.filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => state.toggleOption(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  state.toggleOption(option);
              }}
              className={`
                p-2 hover:bg-gray-100 cursor-pointer 
                ${state.isSelected(option) ? 'bg-blue-100 font-semibold' : ''}
              `}
              role="option"
              aria-selected={state.isSelected(option)}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
          <When condition={!state.filteredOptions.length}>
            <li className="p-2 text-gray-500">No options found</li>
          </When>
        </ul>
      </When>
    </>
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Select with Autocomplete (Headless Example)
      </h1>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Basic Autocomplete</h2>
        <Select
          options={initialOptions}
          selected={basicSelected}
          onChange={setBasicSelected}
          placeholder="Search and select fruits"
          autocomplete={true}
        >
          {renderSelectChildren}
        </Select>
      </div>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">
          Multi-Select with Autocomplete
        </h2>
        <Select
          options={initialOptions}
          selected={multiSelected}
          onChange={setMultiSelected}
          placeholder="Search and select multiple fruits"
          autocomplete={true}
          isMulti={true}
        >
          {renderSelectChildren}
        </Select>
      </div>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">With Search Callback</h2>
        <Select
          options={initialOptions}
          selected={callbackSelected}
          onChange={setCallbackSelected}
          placeholder="Search with callback"
          autocomplete={true}
          onSearch={handleSearch}
        >
          {renderSelectChildren}
        </Select>
      </div>
    </div>
  );
}
