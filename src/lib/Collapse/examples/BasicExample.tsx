import React from 'react';
import Collapse, {
  CollapseTrigger,
  CollapseContent,
  CollapseContainer,
} from '../index';

function BasicExample() {
  return (
    <div style={{ width: '300px', padding: '20px' }}>
      <Collapse defaultOpen={false} animated={true} duration={300}>
        {({ isOpen }) => (
          <CollapseContainer>
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderBottom: isOpen ? '1px solid #e2e8f0' : 'none',
                }}
              >
                <CollapseTrigger>
                  <div
                    style={{
                      padding: '16px',
                      fontWeight: '500',
                      color: '#374151',
                    }}
                  >
                    Click to expand
                  </div>
                </CollapseTrigger>
              </div>

              <CollapseContent>
                <div style={{ padding: '16px', backgroundColor: 'white' }}>
                  <p style={{ margin: 0, color: '#6b7280' }}>
                    This content can be collapsed and expanded with smooth
                    animation. You can put any content here including forms,
                    lists, or other components.
                  </p>
                </div>
              </CollapseContent>
            </div>
          </CollapseContainer>
        )}
      </Collapse>
    </div>
  );
}

export default BasicExample;
