import React, { useState } from 'react';
import StepModal from '../StepModal';

export function SingleModalExample() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handleDeleteConfirm = () => {
    alert('Item deleted successfully!');
    setIsConfirmOpen(false);
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Single Modal Examples</h2>
      
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

          <StepModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            title="Confirm Deletion"
            size="sm"
            customButtons={{
              cancel: (
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              ),
              finish: (
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              ),
            }}
          >
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone. This will permanently delete the item.
              </p>
            </div>
          </StepModal>
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

          <StepModal
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            title="Application Information"
            size="md"
            showCloseButton={true}
          >
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-md font-medium text-blue-900 mb-2">About This Application</h4>
                <p className="text-sm text-blue-800">
                  This is a comprehensive modal component that supports both stepped workflows
                  and single modal dialogs. It includes features like progress indicators,
                  step validation, and customizable styling.
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">Key Features:</h5>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Multi-step wizard support</li>
                  <li>Single modal dialog support</li>
                  <li>Step validation and navigation</li>
                  <li>Customizable styling and sizes</li>
                  <li>Accessibility features built-in</li>
                  <li>Keyboard navigation support</li>
                </ul>
              </div>
            </div>
          </StepModal>
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

          <StepModal
            isOpen={isCustomOpen}
            onClose={() => setIsCustomOpen(false)}
            title="Custom Styled Modal"
            size="lg"
            position="top"
            className="border-4 border-purple-500"
            overlayClassName="bg-purple-900/30"
            allowBackdropClose={false}
            customButtons={{
              finish: (
                <button
                  onClick={() => setIsCustomOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Got it!
                </button>
              ),
            }}
          >
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
              <h3 className="text-xl font-bold text-gray-900">Customization Options</h3>
              <p className="text-gray-600">
                This modal demonstrates custom styling options including custom colors,
                positioning, backdrop styling, and disabled backdrop closing.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800">
                  You can customize colors, sizes, positions, animations, and much more
                  to match your application's design system.
                </p>
              </div>
            </div>
          </StepModal>
        </div>
      </div>
    </div>
  );
}