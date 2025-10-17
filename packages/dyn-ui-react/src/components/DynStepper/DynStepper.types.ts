/**
 * DynStepper TypeScript type definitions
 * Complete step navigation component types with advanced progression features
 */

import type { BaseComponentProps, AccessibilityProps } from '../../types';

// Enhanced Step interface with all required properties
export interface StepItem {
  id: string;
  title?: string;
  label?: string; // alias for title
  content?: React.ReactNode | ((props: { index: number; selected: boolean }) => React.ReactNode);
  description?: string;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  completed?: boolean;
  error?: boolean;
  optional?: boolean;
  tooltip?: string;
  status?: 'inactive' | 'active' | 'completed' | 'error' | 'disabled';
  validator?: (step: StepItem) => boolean; // Custom validation function
  state?: 'pending' | 'active' | 'completed' | 'error'; // Alternative to status
}

// Complete DynStepperProps interface
export interface DynStepperProps extends BaseComponentProps, AccessibilityProps {
  /** Array of step items */
  steps: StepItem[];
  
  /** Current active step value/id (controlled mode) */
  value?: string | number;
  
  /** Default active step value/id (uncontrolled mode) */
  defaultValue?: string | number;
  
  /** Current active step index (controlled mode) */
  activeStep?: number;
  
  /** Default active step index (uncontrolled mode) */
  defaultActiveStep?: number;
  
  /** Step change handler */
  onChange?: (value: string | number, step: StepItem, index: number) => void;
  
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  
  /** Visual variant */
  variant?: 'default' | 'numbered' | 'dots' | 'progress' | 'tabs';
  
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  
  /** Whether steps must be completed in order */
  linear?: boolean;
  
  /** Show step labels/titles */
  showLabels?: boolean;
  
  /** Show step descriptions */
  showDescription?: boolean;
  
  /** Allow clicking on steps to navigate */
  clickableSteps?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** CSS class for step elements */
  stepClassName?: string;
  
  /** CSS class for content container */
  contentClassName?: string;
  
  /** Step change handler (legacy) */
  onStepChange?: (step: number, stepData: StepItem) => void;
  
  /** Step click handler - return false to prevent navigation */
  onStepClick?: (step: number, stepData: StepItem) => boolean | void;
  
  /** Custom step content renderer */
  renderStepContent?: (step: StepItem, index: number) => React.ReactNode;
  
  /** Custom step icon renderer */
  renderStepIcon?: (step: StepItem, index: number, isActive: boolean) => React.ReactNode;
  
  /** Component ID */
  id?: string;
  
  /** ARIA label */
  'aria-label'?: string;
  
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  
  /** Test ID */
  'data-testid'?: string;
}

// Complete DynStepperRef interface with proper return types
export interface DynStepperRef {
  /** Navigate to next step - returns success status */
  nextStep: () => boolean;
  
  /** Navigate to previous step - returns success status */
  prevStep: () => boolean;
  
  /** Navigate to specific step - returns success status */
  goToStep: (step: number) => boolean;
  
  /** Get current active step index */
  getCurrentStep: () => number;
  
  /** Get step data by index */
  getStepData: (step: number) => StepItem | undefined;
  
  /** Validate step by index */
  validateStep: (step: number) => boolean;
  
  /** Mark step as completed */
  completeStep: (step: number) => void;
  
  /** Set error state for step */
  errorStep: (step: number, hasError: boolean) => void;
}

// Legacy aliases for backward compatibility
export type DynStepperHandle = DynStepperRef;
export type DynStep = StepItem;

// Step interface alias (matching test expectations)
export interface Step extends StepItem {}

// Default configuration
export const STEPPER_DEFAULTS = {
  orientation: 'horizontal' as const,
  variant: 'numbered' as const,
  size: 'medium' as const,
  linear: true,
  showLabels: true,
  showDescription: false,
  clickableSteps: true,
  defaultActiveStep: 0
};

// Step variants
export const STEPPER_VARIANTS = {
  DEFAULT: 'default',
  NUMBERED: 'numbered',
  DOTS: 'dots',
  PROGRESS: 'progress',
  TABS: 'tabs'
} as const;

// Step orientations
export const STEPPER_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const;

// Step states
export const STEP_STATES = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ERROR: 'error',
  DISABLED: 'disabled',
  PENDING: 'pending'
} as const;

export type StepState = typeof STEP_STATES[keyof typeof STEP_STATES];

// Step sizes
export const STEPPER_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
} as const;

export type StepperSize = typeof STEPPER_SIZES[keyof typeof STEPPER_SIZES];

// Component validation
export interface StepValidation {
  required?: boolean;
  validator?: (step: StepItem) => boolean | string;
  message?: string;
}

// Event handlers
export interface StepEventHandlers {
  onNext?: (currentStep: number, stepData: StepItem) => boolean | void;
  onPrevious?: (currentStep: number, stepData: StepItem) => boolean | void;
  onComplete?: (steps: StepItem[]) => void;
  onValidationError?: (step: number, error: string) => void;
}

// Extended props for advanced usage
export interface DynStepperAdvancedProps extends DynStepperProps, StepEventHandlers {
  /** Enable step validation */
  enableValidation?: boolean;
  
  /** Show progress indicator */
  showProgress?: boolean;
  
  /** Animation type */
  animation?: 'none' | 'fade' | 'slide';
  
  /** Allow step skipping in linear mode */
  allowSkipping?: boolean;
  
  /** Persist step state */
  persistState?: boolean;
  
  /** Storage key for persistence */
  storageKey?: string;
}