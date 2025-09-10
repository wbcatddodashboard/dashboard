import React from 'react';
import Collapse, {
  CollapseTrigger,
  CollapseContent,
  CollapseContainer,
} from '../index';

function FilterSectionExample() {
  const filterOptions = [
    { id: 'option1', label: 'Option 1', selected: false },
    { id: 'option2', label: 'Option 2', selected: true },
    { id: 'option3', label: 'Option 3', selected: false },
  ];

  return (
    <div style={{ width: '256px', padding: '16px' }}>
      <Collapse defaultOpen={true} animated={true} duration={300}>
        {() => (
          <CollapseContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginBottom: '8px',
              }}
            >
              <CollapseTrigger>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#89a3c5' }}>
                  Filter Category
                </h3>
              </CollapseTrigger>
            </div>

            <CollapseContent>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
              >
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: option.selected
                        ? '#edeff0'
                        : 'transparent',
                      color: '#295e84',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: option.selected ? 600 : 400,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </CollapseContent>
          </CollapseContainer>
        )}
      </Collapse>
    </div>
  );
}

export default FilterSectionExample;
