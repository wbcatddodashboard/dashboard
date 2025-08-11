import React, { useState } from 'react';
import StepModal from '../StepModal';
import type { StepConfig } from '../StepModal.d';

export function SteppedModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: '',
    terms: false,
  });

  const steps: StepConfig[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      content: ({ goToNextStep }) => (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            onClick={goToNextStep}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
      ),
      isValid: formData.name.length > 0 && formData.email.length > 0,
      onValidate: () => {
        if (!formData.name.trim()) {
          alert('Please enter your name');
          return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
          alert('Please enter a valid email address');
          return false;
        }
        return true;
      },
    },
    {
      id: 'preferences',
      title: 'Preferences',
      content: ({ goToNextStep, goToPreviousStep }) => (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="preferences"
              className="block text-sm font-medium text-gray-700"
            >
              Tell us about your preferences
            </label>
            <textarea
              id="preferences"
              rows={4}
              value={formData.preferences}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: e.target.value,
                }))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="What are you interested in?"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={goToPreviousStep}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
            <button
              onClick={goToNextStep}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Continue
            </button>
          </div>
        </div>
      ),
      isValid: true,
      canSkip: true,
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      content: ({ closeModal, goToPreviousStep }) => (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Review Your Information
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Preferences:</strong>{' '}
                {formData.preferences || 'None specified'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, terms: e.target.checked }))
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={goToPreviousStep}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
            <button
              onClick={closeModal}
              disabled={!formData.terms}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      ),
      isValid: formData.terms,
      onValidate: () => {
        if (!formData.terms) {
          alert('Please accept the terms and conditions');
          return false;
        }
        return true;
      },
    },
  ];

  const handleFinish = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', preferences: '', terms: false });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Stepped Modal Example</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Stepped Modal
      </button>

      <StepModal.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        steps={steps}
        onFinish={handleFinish}
        onStepChange={(step, config) => {
          console.log(`Moved to step ${step + 1}:`, config.title);
        }}
      >
        <StepModal.Overlay>
          <StepModal.Content size="lg">
            <StepModal.Header>
              <StepModal.Title>User Registration</StepModal.Title>
              <StepModal.Close />
            </StepModal.Header>
            <StepModal.Progress showNumbers={true} />
            <StepModal.Body>
              <StepModal.Step>
                <div>Step content placeholder</div>
              </StepModal.Step>
            </StepModal.Body>
            <StepModal.Footer>
              <StepModal.Navigation>
                <div>Navigation placeholder</div>
              </StepModal.Navigation>
            </StepModal.Footer>
          </StepModal.Content>
        </StepModal.Overlay>
      </StepModal.Root>
    </div>
  );
}
