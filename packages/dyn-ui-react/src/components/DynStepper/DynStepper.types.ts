/**
 * DynStepper TypeScript type definitions
 * Step navigation component types with advanced progression features
 */

import type { BaseComponentProps, AccessibilityProps } from '../../types';

export interface StepItem {
  id: string;
  title?: string;
  label?: string; // alias for title
  description?: string;
  icon?: string | React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  completed?: boolean;
  error?: boolean;
  optional?: boolean;
  tooltip?: string;
  status?: 'inactive' | 'active' | 'completed' | 'error' | 'disabled';
}

export interface DynStepperProps extends BaseComponentProps, AccessibilityProps {
  /** Array of step items */
  steps?: StepItem[];
  
  /** Current active step value/id */
  value?: string | number;
  
  /** Default active step value/id */
  defaultValue?: string | number;
  
  /** Current active step index */
  activeStep?: number;
  
  /** Default active step index */
  defaultActiveStep?: number;
  
  /** Step change handler */
  onChange?: (value: string | number, step: StepItem, index: number) => void;
  
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  
  /** Visual variant */
  variant?: 'default' | 'numbered' | 'dots' | 'progress';
  
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
  
  /** Step click handler */
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

export interface DynStepperRef {
  nextStep: () => boolean;
  prevStep: () => boolean;
  goToStep: (step: number) => boolean;
  getCurrentStep: () => number;
  getStepData: (step: number) => StepItem | undefined;
  validateStep: (step: number) => boolean;
  completeStep: (step: number) => void;
  errorStep: (step: number, hasError: boolean) => void;
}

// Legacy alias
export type DynStepperHandle = DynStepperRef;
export type DynStep = StepItem;

// Default configuration
export const STEPPER_DEFAULTS = {
  orientation: 'horizontal' as const,
  variant: 'default' as const,
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
  PROGRESS: 'progress'
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
  DISABLED: 'disabled'
} as const;

export type StepState = typeof STEP_STATES[keyof typeof STEP_STATES];