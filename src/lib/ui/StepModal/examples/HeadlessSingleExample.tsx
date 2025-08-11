import React, { useState } from 'react';
import StepModal from '../StepModal';
import { NavigationButton } from '../StepModal.styled';

export function HeadlessSingleExample() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handleDeleteConfirm = () => {
    alert('Item deleted successfully!');
    setIsConfirmOpen(false);
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">
        Headless Single Modal Examples
      </h2>

      <div className="space-y-4">
        {/* Confirmation Modal */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Confirmation Modal</h3>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Item
          </button>

          <StepModal.Root
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
          >
            <StepModal.Overlay>
              <StepModal.Content size="sm">
                <StepModal.Header>
                  <StepModal.Title>Confirm Deletion</StepModal.Title>
                  <StepModal.Close />
                </StepModal.Header>

                <StepModal.Body>
                  <StepModal.Step>
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Are you sure?
                      </h3>
                      <p className="text-sm text-gray-500">
                        This action cannot be undone. This will permanently
                        delete the item.
                      </p>
                    </div>
                  </StepModal.Step>
                </StepModal.Body>

                <StepModal.Footer>
                  <div className="flex justify-end space-x-3">
                    <NavigationButton
                      variant="ghost"
                      onClick={() => setIsConfirmOpen(false)}
                    >
                      Cancel
                    </NavigationButton>
                    <NavigationButton
                      variant="danger"
                      onClick={handleDeleteConfirm}
                    >
                      Delete
                    </NavigationButton>
                  </div>
                </StepModal.Footer>
              </StepModal.Content>
            </StepModal.Overlay>
          </StepModal.Root>
        </div>

        {/* Information Modal */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Information Modal</h3>
          <button
            onClick={() => setIsInfoOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Show Info
          </button>

          <StepModal.Root
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
          >
            <StepModal.Overlay>
              <StepModal.Content size="md">
                <StepModal.Header>
                  <StepModal.Title>Application Information</StepModal.Title>
                  <StepModal.Close />
                </StepModal.Header>

                <StepModal.Body>
                  <StepModal.Step>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="text-md font-medium text-blue-900 mb-2">
                          About This Application
                        </h4>
                        <p className="text-sm text-blue-800">
                          This is a comprehensive headless modal component that
                          supports both stepped workflows and single modal
                          dialogs. It follows SOLID principles and provides
                          maximum flexibility.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">
                          Key Features:
                        </h5>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                          <li>
                            Headless architecture for maximum customization
                          </li>
                          <li>Compound component pattern</li>
                          <li>SOLID principles compliance</li>
                          <li>Multi-step wizard support</li>
                          <li>Single modal dialog support</li>
                          <li>Step validation and navigation</li>
                          <li>Accessibility features built-in</li>
                          <li>Keyboard navigation support</li>
                        </ul>
                      </div>
                    </div>
                  </StepModal.Step>
                </StepModal.Body>
              </StepModal.Content>
            </StepModal.Overlay>
          </StepModal.Root>
        </div>

        {/* Custom Styled Modal */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Custom Styled Modal</h3>
          <button
            onClick={() => setIsCustomOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Open Custom Modal
          </button>

          <StepModal.Root
            isOpen={isCustomOpen}
            onClose={() => setIsCustomOpen(false)}
            allowBackdropClose={false}
          >
            <StepModal.Overlay className="bg-purple-900/30">
              <StepModal.Content
                size="lg"
                position="top"
                className="border-4 border-purple-500"
              >
                <StepModal.Header>
                  <StepModal.Title>Custom Styled Modal</StepModal.Title>
                </StepModal.Header>

                <StepModal.Body>
                  <StepModal.Step>
                    <div className="text-center space-y-4">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
                        <svg
                          className="h-8 w-8 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Headless Customization
                      </h3>
                      <p className="text-gray-600">
                        This modal demonstrates the power of headless
                        architecture. You have complete control over styling,
                        behavior, and structure while keeping the logic intact.
                      </p>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-800">
                          Each component can be styled independently and
                          composed in any way you need. The compound pattern
                          provides flexibility while maintaining type safety.
                        </p>
                      </div>
                    </div>
                  </StepModal.Step>
                </StepModal.Body>

                <StepModal.Footer>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsCustomOpen(false)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Got it!
                    </button>
                  </div>
                </StepModal.Footer>
              </StepModal.Content>
            </StepModal.Overlay>
          </StepModal.Root>
        </div>
      </div>
    </div>
  );
}
