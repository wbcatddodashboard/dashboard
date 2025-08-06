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
  { id: 6, value: 'raspberry', label: 'Raspberry' }
];

export function SingleSelectExample() {
  const [basicSelected, setBasicSelected] = useState<Option[]>([]);
  const [disabledSelected, setDisabledSelected] = useState<Option[]>([]);
  const [preselectedValue, setPreselectedValue] = useState<Option[]>([initialOptions[2]]);

  const renderSelectChildren = (state: SelectContextType) => (
    <>
      <button
        type="button"
        onClick={state.toggleOpen}
        className="w-full p-2 border rounded text-left flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={state.isOpen}
        disabled={state.disabled}
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
          {state.filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => state.toggleOption(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') state.toggleOption(option);
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
        </ul>
      </When>
    </>
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Single Select Examples</h1>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Basic Single Select</h2>
        <Select
          options={initialOptions}
          selected={basicSelected}
          onChange={setBasicSelected}
          placeholder="Select a fruit"
        >
          {renderSelectChildren}
        </Select>
      </div>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Disabled Single Select</h2>
        <Select
          options={initialOptions}
          selected={disabledSelected}
          onChange={setDisabledSelected}
          placeholder="Select disabled"
          disabled={true}
        >
          {renderSelectChildren}
        </Select>
      </div>

      <div className="mb-8 relative">
        <h2 className="text-lg font-semibold mb-2">Single Select with Pre-selected Value</h2>
        <Select
          options={initialOptions}
          selected={preselectedValue}
          onChange={setPreselectedValue}
          placeholder="Pre-selected example"
        >
          {renderSelectChildren}
        </Select>
      </div>
    </div>
  );
}
