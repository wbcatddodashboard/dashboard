import React from 'react';
import type { StepModalStyledProps } from './StepModal.d';

export function ModalOverlay({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalContainer({ 
  size, 
  position, 
  isOpen, 
  children, 
  className = '', 
  ...props 
}: StepModalStyledProps & React.HTMLAttributes<HTMLDivElement>) {
  const sizeClasses = {
    sm: 'max-w-sm w-full mx-4',
    md: 'max-w-md w-full mx-4',
    lg: 'max-w-lg w-full mx-4',
    xl: 'max-w-xl w-full mx-4',
    full: 'w-full h-full m-0'
  };

  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
    bottom: 'items-end justify-center pb-16'
  };

  const animationClasses = isOpen 
    ? 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300' 
    : 'animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2 duration-200';

  return (
    <div
      className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} ${animationClasses} ${className}`}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalHeader({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-between p-6 border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalTitle({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-lg font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function ModalCloseButton({ 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent rounded-md hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${className}`}
      aria-label="Close modal"
      {...props}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export function ModalBody({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StepProgressBar({ 
  currentStep, 
  totalSteps, 
  className = '', 
  ...props 
}: { currentStep: number; totalSteps: number } & React.HTMLAttributes<HTMLDivElement>) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div
      className={`w-full bg-gray-200 rounded-full h-2 mb-4 ${className}`}
      {...props}
    >
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
      />
    </div>
  );
}

export function StepIndicator({ 
  currentStep, 
  totalSteps, 
  className = '', 
  ...props 
}: { currentStep: number; totalSteps: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-center space-x-2 mb-4 ${className}`}
      {...props}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
            index <= currentStep
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
          aria-label={`Step ${index + 1}${index === currentStep ? ' (current)' : index < currentStep ? ' (completed)' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}

export function StepContent({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`min-h-[200px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalFooter({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function NavigationButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: { 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; 
  size?: 'sm' | 'md' | 'lg' 
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}