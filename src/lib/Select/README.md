# Headless Select Component

A truly headless select component that provides functionality without dictating visual representation, following SOLID principles.

## Features

- **Single Responsibility Principle**: Logic separated into hooks, UI into styled components, and state management into context
- **Open/Closed Principle**: Extremely customizable with render props for all visual elements
- **Liskov Substitution Principle**: Component parts can be swapped and customized without breaking functionality
- **Interface Segregation Principle**: Clean, focused interfaces for each component part
- **Dependency Inversion Principle**: Components depend on abstractions, not concrete implementations
- **Autocomplete**: Search through options to quickly find what you need

## Structure

- **Select.tsx**: Main component orchestrating behavior via composition
- **Select.d.ts**: TypeScript interfaces for props and data structures
- **hooks/useSelect.ts**: Headless business logic isolated into a hook
- **context/SelectContext.tsx**: Context for sharing state across parts

This component is headless; bring your own styles (e.g., Tailwind, CSS Modules, or styled-components).

## Usage Examples

### Basic Usage

```tsx
import { useState } from 'react';
import { Select } from 'vizonomy-ui';

const options = [
  { id: 1, value: 'apple', label: 'Apple' },
  { id: 2, value: 'banana', label: 'Banana' },
  { id: 3, value: 'orange', label: 'Orange' },
];

function ExampleSelect() {
  const [selected, setSelected] = useState([]);

  return (
    <Select
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="Select fruits"
    />
  );
}
```

### Multi-Select

```tsx
<Select
  options={options}
  selected={selected}
  onChange={setSelected}
  placeholder="Select multiple fruits"
  isMulti={true}
  maxItems={3} // Optional limit on selection
/>
```

### With Autocomplete

```tsx
<Select
  options={options}
  selected={selected}
  onChange={setSelected}
  placeholder="Search and select fruits"
  autocomplete={true}
  onSearch={(searchTerm) => {
    // Optional callback for when search term changes
    console.log('Searching for:', searchTerm);

    // You could also fetch options from an API based on the search term
    // fetchOptionsFromAPI(searchTerm).then(newOptions => setOptions(newOptions));
  }}
/>
```

### Custom Rendering

```tsx
<Select
  options={options}
  selected={selected}
  onChange={setSelected}
  placeholder="Select fruits"
  renderOption={(option, isSelected) => (
    <div className="flex items-center">
      {isSelected && <CheckIcon className="w-4 h-4 mr-2" />}
      <span>{option.label}</span>
      <span className="ml-2 text-gray-400">({option.value})</span>
    </div>
  )}
  renderSelected={(selected) => (
    <div className="font-bold text-blue-600">
      Selected: {selected.map((option) => option.label).join(', ')}
    </div>
  )}
/>
```

### Using with Form Libraries

Works seamlessly with form libraries like React Hook Form or Formik:

```tsx
import { Controller, useForm } from 'react-hook-form';

function FormWithSelect() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fruits"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            options={options}
            selected={field.value}
            onChange={field.onChange}
            placeholder="Select fruits"
            isMulti
            autocomplete={true}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Accessibility

This component implements proper accessibility features:

- Keyboard navigation
- ARIA attributes
- Focus management
- Screen reader support
