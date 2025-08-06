import { useState, useEffect, useCallback } from 'react';
import type { UseStepModalProps, UseStepModalReturn, StepConfig } from './StepModal.d';

export const useStepModal = ({
  steps = [],
  isOpen,
  onClose,
  onStepChange,
  onFinish,
}: UseStepModalProps): UseStepModalReturn => {
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = steps.length;
  const currentStepConfig = steps[currentStep] ?? null;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const isSingleModal = !totalSteps;

  const canGoPrevious = !isFirstStep && !isSingleModal;
  const canGoNext = !isLastStep && !isSingleModal;

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    if (!currentStepConfig?.onValidate) {
      return currentStepConfig?.isValid ?? true;
    }

    try {
      const isValid = await currentStepConfig.onValidate();
      return isValid;
    } catch (error) {
      console.error('Step validation failed:', error);
      return false;
    }
  }, [currentStepConfig]);

  const goToStep = useCallback(async (stepIndex: number): Promise<void> => {
    if (stepIndex < 0 || stepIndex >= totalSteps || stepIndex === currentStep) {
      return;
    }

    if (stepIndex > currentStep) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        return;
      }
    }

    setCurrentStep(stepIndex);
    const newStepConfig = steps[stepIndex];
    onStepChange?.(stepIndex, newStepConfig);
  }, [currentStep, totalSteps, steps, validateCurrentStep, onStepChange]);

  const goToNextStep = useCallback(async (): Promise<void> => {
    if (isLastStep || isSingleModal) {
      return;
    }

    const isValid = await validateCurrentStep();
    if (!isValid) {
      return;
    }

    const nextStepIndex = currentStep + 1;
    setCurrentStep(nextStepIndex);
    const nextStepConfig = steps[nextStepIndex];
    onStepChange?.(nextStepIndex, nextStepConfig);
  }, [currentStep, isLastStep, isSingleModal, steps, validateCurrentStep, onStepChange]);

  const goToPreviousStep = useCallback((): void => {
    if (isFirstStep || isSingleModal) {
      return;
    }

    const previousStepIndex = currentStep - 1;
    setCurrentStep(previousStepIndex);
    const previousStepConfig = steps[previousStepIndex];
    onStepChange?.(previousStepIndex, previousStepConfig);
  }, [currentStep, isFirstStep, isSingleModal, steps, onStepChange]);

  const closeModal = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleFinish = useCallback(async (): Promise<void> => {
    const isValid = await validateCurrentStep();
    if (!isValid) {
      return;
    }

    onFinish?.();
    closeModal();
  }, [validateCurrentStep, onFinish, closeModal]);

  const handleBackdropClick = useCallback((event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  const handleEscapeKey = useCallback((event: React.KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  return {
    currentStep,
    totalSteps,
    currentStepConfig,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrevious,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    closeModal: isSingleModal ? closeModal : handleFinish,
    handleBackdropClick,
    handleEscapeKey,
  };
};