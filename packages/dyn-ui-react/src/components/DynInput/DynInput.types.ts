import type {
  InputHTMLAttributes,
  FocusEventHandler,
  ChangeEventHandler,
  ReactNode,
} from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

/**
 * Input size variants using design token scale
 */
export type DynInputSize = 'small' | 'medium' | 'large';

/**
 * Input type variants
 */
export type DynInputType = 
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

/**
 * Validation rule function type
 */
export type DynInputValidationRule = (value: string) => string | null | undefined;

/**
 * Input mask configuration
 */
export interface DynInputMask {
  /** Mask pattern (e.g., '(99) 9999-9999' for phone) */
  pattern: string;
  /** Whether to format the model value with mask */
  formatModel?: boolean;
  /** Custom mask character definitions */
  definitions?: Record<string, RegExp>;
}

/**
 * Props interface for DynInput component
 * Follows DynAvatar's standardized pattern with BaseComponentProps and AccessibilityProps
 */
export interface DynInputProps
  extends BaseComponentProps,
    AccessibilityProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | 'size'
      | 'value'
      | 'onChange'
      | 'onBlur'
      | 'onFocus'
      | 'type'
      | keyof BaseComponentProps
      | keyof AccessibilityProps
    > {

  /** Input name attribute (also used as ID if not provided) */
  name?: string;

  /** Label text for the input */
  label?: string;

  /** Help text displayed below the input */
  help?: string;

  /** Input type */
  type?: DynInputType;

  /** Input size */
  size?: DynInputSize;

  /** Input value */
  value?: string | number;

  /** Placeholder text */
  placeholder?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Whether the input is readonly */
  readonly?: boolean;

  /** Whether the input is required */
  required?: boolean;

  /** Whether to show optional indicator */
  optional?: boolean;

  /** Whether the input is visible */
  visible?: boolean;

  /** Custom error message */
  errorMessage?: string;

  /** Validation rule function */
  validation?: DynInputValidationRule | DynInputValidationRule[];

  /** Icon to display inside the input */
  icon?: string | ReactNode;

  /** Whether to show clear button when input has value */
  showClearButton?: boolean;

  /** Input mask configuration */
  mask?: string | DynInputMask;

  /** Whether to format the model value with mask */
  maskFormatModel?: boolean;

  /** Minimum value for number inputs */
  min?: number;

  /** Maximum value for number inputs */
  max?: number;

  /** Step value for number inputs */
  step?: number;

  /** Change event handler */
  onChange?: (value: string | number) => void;

  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /** Focus event handler */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /** Validation event handler */
  onValidate?: (isValid: boolean, errorMessage?: string) => void;
}

/**
 * Ref type for DynInput component
 */
export interface DynInputRef {
  /** Focus the input element */
  focus: () => void;
  
  /** Blur the input element */
  blur: () => void;
  
  /** Clear the input value */
  clear: () => void;
  
  /** Get the current input value */
  getValue: () => string | number;
  
  /** Set the input value programmatically */
  setValue: (value: string | number) => void;
  
  /** Validate the input and return validation result */
  validate: () => boolean;
  
  /** Clear any validation errors */
  clearError: () => void;
  
  /** Get the native input element */
  getElement: () => HTMLInputElement | null;
}

/**
 * Default props type for DynInput
 */
export type DynInputDefaultProps = Required<
  Pick<
    DynInputProps,
    | 'type'
    | 'size'
    | 'disabled'
    | 'readonly'
    | 'required'
    | 'optional'
    | 'visible'
    | 'showClearButton'
    | 'maskFormatModel'
  >
>;

/**
 * Default props values for DynInput component
 */
export const DYN_INPUT_DEFAULT_PROPS: DynInputDefaultProps = {
  type: 'text',
  size: 'medium',
  disabled: false,
  readonly: false,
  required: false,
  optional: false,
  visible: true,
  showClearButton: false,
  maskFormatModel: false,
} as const;

/**
 * Input validation states
 */
export type DynInputValidationState = 'valid' | 'invalid' | 'pending' | 'initial';

/**
 * Input validation result
 */
export interface DynInputValidationResult {
  /** Whether the input is valid */
  isValid: boolean;
  
  /** Error message if invalid */
  errorMessage?: string;
  
  /** Validation state */
  state: DynInputValidationState;
}