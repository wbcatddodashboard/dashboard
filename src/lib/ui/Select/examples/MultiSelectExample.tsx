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
  { id: 8, value: 'kiwi', label: 'Kiwi' }
];

export function MultiSelectExample() {
  const [basicSelected, setBasicSelected] = useState<Option[]>([]);
  const [limitedSelected, setLimitedSelected] = useState<Option[]>([]);
  const [preselectedOptions, setPreselectedOptions] = useState<Option[]>([
    initialOptions[0],
    initialOptions[2]
  ]);

  const renderSelectChildren = (state: SelectContextType) => (
    <>
      <button
        type="button"
        onClick={state.toggleOpen}
        className="w-full p-2 border rounded text-left flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={state.isOpen}
      >
        <span className="truncate">
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
          aria-multiselectable="true"
        >
          {state.filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => state.toggleOption(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') state.toggleOption(option);
              }}
              className={`
                p-2 hover:bg-gray-100 cursor-pointer flex items-center 
                ${state.isSelected(option) ? 'bg-blue-100 font-semibold' : ''}
              `}
              role="option"
              aria-selected={state.isSelected(option)}
              tabIndex={0}
            >
              <input type="checkbox" checked={state.isSelected(option)} readOnly className="mr-2" />
              {option.label}
            </li>
          ))}
        </ul>
      </When>
    </>
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Multi-Select Examples</h1>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Basic Multi-Select</h2>
        <Select
          options={initialOptions}
          selected={basicSelected}
          onChange={setBasicSelected}
          placeholder="Select multiple fruits"
          isMulti={true}
        >
          {renderSelectChildren}
        </Select>
        <div className="mt-2 text-sm text-gray-600">
          Selected: {basicSelected.length ? basicSelected.map((s) => s.label).join(', ') : 'None'}
        </div>
      </div>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Multi-Select with Max Items (3)</h2>
        <Select
          options={initialOptions}
          selected={limitedSelected}
          onChange={setLimitedSelected}
          placeholder="Select up to 3 fruits"
          isMulti={true}
          maxItems={3}
        >
          {renderSelectChildren}
        </Select>
        <div className="mt-2 text-sm text-gray-600">
          Selected:{' '}
          {limitedSelected.length ? limitedSelected.map((s) => s.label).join(', ') : 'None'}(
          {limitedSelected.length}/3)
        </div>
      </div>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Multi-Select with Pre-selected Values</h2>
        <Select
          options={initialOptions}
          selected={preselectedOptions}
          onChange={setPreselectedOptions}
          placeholder="Pre-selected fruits"
          isMulti={true}
        >
          {renderSelectChildren}
        </Select>
      </div>
    </div>
  );
}
