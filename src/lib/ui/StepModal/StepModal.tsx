import React from 'react';
import type {
  StepModalProps,
  StepModalRootProps,
  StepModalOverlayProps,
  StepModalContentProps,
  StepModalHeaderProps,
  StepModalTitleProps,
  StepModalCloseProps,
  StepModalBodyProps,
  StepModalFooterProps,
  StepModalProgressProps,
  StepModalNavigationProps,
  StepModalStepProps,
  StepContentProps,
} from './StepModal.d';
import { useStepModal } from './useStepModal';
import { StepModalProvider, useStepModalContext } from './StepModalContext';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  StepProgressBar,
  StepIndicator,
  StepContent,
  ModalFooter,
} from './StepModal.styled';
import When from '../When';

// Root component that provides context
function StepModalRoot({
  isOpen,
  onClose,
  steps = [],
  onStepChange,
  onFinish,
  allowBackdropClose = true,
  allowEscapeKey = true,
  children,
}: StepModalRootProps & { children: React.ReactNode }) {
  const stepModalState = useStepModal({
    steps,
    isOpen,
    onClose,
    onStepChange,
    onFinish,
  });

  const contextValue = {
    ...stepModalState,
    isOpen,
  };

  if (!isOpen) return null;

  return (
    <StepModalProvider value={contextValue}>
      {children}
    </StepModalProvider>
  );
}

// Overlay component
function StepModalOverlay({ 
  children, 
  className = '', 
  onClick,
  ...props 
}: StepModalOverlayProps) {
  const { handleBackdropClick, handleEscapeKey } = useStepModalContext();

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleBackdropClick(event);
    onClick?.(event);
  };

  return (
    <ModalOverlay
      className={className}
      onClick={handleOverlayClick}
      onKeyDown={handleEscapeKey}
      tabIndex={-1}
      {...props}
    >
      {children}
    </ModalOverlay>
  );
}

// Content container
function StepModalContent({ 
  size = 'md',
  position = 'center',
  children, 
  className = '', 
  onClick,
  ...props 
}: StepModalContentProps) {
  const { isOpen } = useStepModalContext();

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  return (
    <ModalContainer
      size={size}
      position={position}
      isOpen={isOpen}
      className={className}
      onClick={handleContentClick}
      {...props}
    >
      {children}
    </ModalContainer>
  );
}

// Header component
function StepModalHeader_({ children, ...props }: StepModalHeaderProps) {
  return (
    <ModalHeader {...props}>
      {children}
    </ModalHeader>
  );
}

// Title component
function StepModalTitle_({ children, ...props }: StepModalTitleProps) {
  return (
    <ModalTitle {...props}>
      {children}
    </ModalTitle>
  );
}

// Close button component
function StepModalClose({ children, onClick, ...props }: StepModalCloseProps) {
  const { closeModal } = useStepModalContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    closeModal();
    onClick?.(event);
  };

  return (
    <ModalCloseButton onClick={handleClick} {...props}>
      {children}
    </ModalCloseButton>
  );
}

// Body component
function StepModalBody_({ children, ...props }: StepModalBodyProps) {
  return (
    <ModalBody {...props}>
      {children}
    </ModalBody>
  );
}

// Footer component
function StepModalFooter_({ children, ...props }: StepModalFooterProps) {
  return (
    <ModalFooter {...props}>
      {children}
    </ModalFooter>
  );
}

// Progress component
function StepModalProgress({ showBar = true, showNumbers = true, ...props }: StepModalProgressProps) {
  const { currentStep, totalSteps } = useStepModalContext();

  if (totalSteps === 0) return null;

  return (
    <div {...props}>
      <When condition={showBar}>
        <StepProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </When>
      <When condition={showNumbers}>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </When>
    </div>
  );
}

// Navigation component
function StepModalNavigation({ children, ...props }: StepModalNavigationProps) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}

// Step content component
function StepModalStep({ children, ...props }: StepModalStepProps) {
  const { 
    currentStepConfig, 
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    closeModal
  } = useStepModalContext();

  const renderContent = () => {
    if (!currentStepConfig) return children;

    const stepContentProps: StepContentProps = {
      currentStep,
      totalSteps,
      stepConfig: currentStepConfig,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      closeModal,
    };

    return typeof currentStepConfig.content === 'function'
      ? currentStepConfig.content(stepContentProps)
      : currentStepConfig.content;
  };

  return (
    <StepContent {...props}>
      {renderContent()}
    </StepContent>
  );
}

// Main component with compound pattern
function StepModal({ children, ...props }: StepModalProps) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}

// Attach compound components
StepModal.Root = StepModalRoot;
StepModal.Overlay = StepModalOverlay;
StepModal.Content = StepModalContent;
StepModal.Header = StepModalHeader_;
StepModal.Title = StepModalTitle_;
StepModal.Close = StepModalClose;
StepModal.Body = StepModalBody_;
StepModal.Footer = StepModalFooter_;
StepModal.Progress = StepModalProgress;
StepModal.Navigation = StepModalNavigation;
StepModal.Step = StepModalStep;
StepModal.useContext = useStepModalContext;

export default StepModal;