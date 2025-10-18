/**
 * Base types for form field components
 * Part of DYN UI Form Components Group - SCOPE 6
 * Updated: 2025-10-18 - Added Currency and TextArea support for AccountingOnline ERP
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from './theme';
export type { DynFieldContainerProps } from '../components/DynFieldContainer/DynFieldContainer.types';

export interface ValidationRule {
  type: 'required' | 'email' | 'url' | 'pattern' | 'minLength' | 'maxLength' | 'custom';
  message: string;
  value?: any;
  validator?: (value: any) => boolean | Promise<boolean>;
}

export interface DynFieldBase extends BaseComponentProps {
  id?: string;
  className?: string;
  'data-testid'?: string;
  children?: ReactNode;
  name?: string;
  label?: string;
  help?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  optional?: boolean;
  visible?: boolean;
  value?: any;
  errorMessage?: string;
  validation?: ValidationRule[];
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface DynFieldRef {
  focus: () => void;
  validate: () => Promise<boolean>;
  clear: () => void;
  getValue: () => any;
  setValue: (value: any) => void;
}

// Input specific types - EXTENDED for ERP
export type InputType = 'text' | 'email' | 'password' | 'number' | 'currency' | 'tel' | 'url';
export type InputSize = 'small' | 'medium' | 'large';
export type CurrencyPosition = 'before' | 'after';
export type ResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';

// Currency configuration for ERP financial inputs
export interface CurrencyInputConfig {
  currency?: 'RSD' | 'EUR' | 'USD';
  precision?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  showCurrencySymbol?: boolean;
  currencyPosition?: CurrencyPosition;
  autoFormat?: boolean;
  allowNegative?: boolean;
}

export interface DynInputProps extends DynFieldBase {
  type?: InputType;
  size?: InputSize;
  maxLength?: number;
  minLength?: number;
  mask?: string;
  maskFormatModel?: boolean;
  pattern?: string;
  icon?: string;
  showCleanButton?: boolean;
  
  // Number/Currency specific
  step?: number;
  min?: number;
  max?: number;
  showSpinButtons?: boolean;
  
  // Currency specific
  currencyConfig?: CurrencyInputConfig;
}

// TextArea specific types - NEW for ERP
export interface DynTextAreaProps extends DynFieldBase {
  rows?: number;
  cols?: number;
  resize?: ResizeMode;
  autoResize?: boolean;
  maxLength?: number;
  minLength?: number;
  showCharacterCount?: boolean;
  wrap?: 'soft' | 'hard' | 'off';
}

// Select specific types
export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface DynSelectProps extends DynFieldBase {
  options: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
  virtualScroll?: boolean;
  loading?: boolean;
  size?: InputSize;
}

// DatePicker specific types
export interface DynDatePickerProps extends DynFieldBase {
  format?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  customParser?: (input: string) => Date | null;
  size?: InputSize;
}

// Utility types for currency formatting
export interface CurrencyFormatOptions {
  currency: string;
  precision: number;
  thousandSeparator: string;
  decimalSeparator: string;
  showCurrencySymbol: boolean;
  currencyPosition: CurrencyPosition;
  allowNegative?: boolean;
}

// Export currency symbols mapping
export const CURRENCY_SYMBOLS = {
  RSD: 'RSD',
  EUR: '€',
  USD: '$'
} as const;

export type CurrencyType = keyof typeof CURRENCY_SYMBOLS;
