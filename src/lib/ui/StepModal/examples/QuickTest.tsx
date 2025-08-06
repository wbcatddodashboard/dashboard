import React, { useState } from 'react';
import StepModal from '../StepModal';

// Quick test to verify the headless architecture works
export function QuickTest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">StepModal Quick Test</h2>
      
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Headless Modal
      </button>

      <StepModal.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <StepModal.Overlay className="bg-black/50">
          <StepModal.Content size="md" className="bg-white rounded-lg shadow-xl">
            <StepModal.Header className="p-4 border-b">
              <StepModal.Title className="text-lg font-semibold">
                Headless Test Modal
              </StepModal.Title>
              <StepModal.Close className="ml-auto" />
            </StepModal.Header>
            
            <StepModal.Body className="p-4">
              <StepModal.Step>
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">✅ Headless architecture working!</p>
                  <p className="text-sm text-gray-600">
                    This modal follows SOLID principles with compound components.
                  </p>
                  <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
                    <li>Single Responsibility: Each component has one purpose</li>
                    <li>Open/Closed: Easily extensible</li>
                    <li>Dependency Inversion: UI depends on abstractions</li>
                  </ul>
                </div>
              </StepModal.Step>
            </StepModal.Body>
            
            <StepModal.Footer className="p-4 border-t bg-gray-50">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </StepModal.Footer>
          </StepModal.Content>
        </StepModal.Overlay>
      </StepModal.Root>
    </div>
  );
}