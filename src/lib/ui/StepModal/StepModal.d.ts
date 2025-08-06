import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

export interface StepConfig {
  id: string;
  title: string;
  content: ReactNode | ((props: StepContentProps) => ReactNode);
  isValid?: boolean;
  canSkip?: boolean;
  onValidate?: () => Promise<boolean> | boolean;
}

export interface StepContentProps {
  currentStep: number;
  totalSteps: number;
  stepConfig: StepConfig;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (stepIndex: number) => void;
  closeModal: () => void;
}

export interface StepModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface StepModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  steps?: StepConfig[];
  onStepChange?: (currentStep: number, stepConfig: StepConfig) => void;
  onFinish?: () => void;
  allowBackdropClose?: boolean;
  allowEscapeKey?: boolean;
}

export interface StepModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface StepModalContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top' | 'bottom';
  children: ReactNode;
}

export interface StepModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface StepModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface StepModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface StepModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface StepModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface StepModalProgressProps extends HTMLAttributes<HTMLDivElement> {
  showBar?: boolean;
  showNumbers?: boolean;
}

export interface StepModalNavigationProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface StepModalStepProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface UseStepModalProps {
  steps?: StepConfig[];
  isOpen: boolean;
  onClose: () => void;
  onStepChange?: (currentStep: number, stepConfig: StepConfig) => void;
  onFinish?: () => void;
}

export interface UseStepModalReturn {
  currentStep: number;
  totalSteps: number;
  currentStepConfig: StepConfig | null;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToNextStep: () => Promise<void>;
  goToPreviousStep: () => void;
  goToStep: (stepIndex: number) => Promise<void>;
  closeModal: () => void;
  handleBackdropClick: (event: React.MouseEvent) => void;
  handleEscapeKey: (event: React.KeyboardEvent) => void;
}

export interface StepModalContextValue extends UseStepModalReturn {
  isOpen: boolean;
}

export interface StepModalStyledProps {
  size: NonNullable<StepModalContentProps['size']>;
  position: NonNullable<StepModalContentProps['position']>;
  isOpen: boolean;
}