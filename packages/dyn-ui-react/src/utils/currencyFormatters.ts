/**
 * Currency formatting utilities for DYN-UI ERP components
 * Created: 2025-10-18
 * Supports RSD, EUR, USD formatting with Serbian localization
 */

import type { CurrencyFormatOptions, CurrencyType } from '../types/field.types';

// Currency symbols mapping
export const CURRENCY_SYMBOLS: Record<CurrencyType, string> = {
  RSD: 'RSD',
  EUR: '€',
  USD: '$'
};

// Default currency configurations for Serbian market
export const DEFAULT_CURRENCY_CONFIGS: Record<CurrencyType, Partial<CurrencyFormatOptions>> = {
  RSD: {
    currency: 'RSD',
    precision: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    showCurrencySymbol: true,
    currencyPosition: 'after',
    allowNegative: true
  },
  EUR: {
    currency: 'EUR',
    precision: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    showCurrencySymbol: true,
    currencyPosition: 'after',
    allowNegative: true
  },
  USD: {
    currency: 'USD',
    precision: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    showCurrencySymbol: true,
    currencyPosition: 'before',
    allowNegative: true
  }
};

/**
 * Parse numeric value from formatted currency string
 */
export function parseCurrencyValue(value: string, options: Partial<CurrencyFormatOptions>): number {
  if (!value || typeof value !== 'string') return 0;
  
  const config = { ...DEFAULT_CURRENCY_CONFIGS.RSD, ...options };
  
  // Remove currency symbol and whitespace
  let cleaned = value.trim();
  if (config.showCurrencySymbol && config.currency) {
    const symbol = CURRENCY_SYMBOLS[config.currency as CurrencyType];
    cleaned = cleaned.replace(symbol, '').trim();
  }
  
  // Handle negative sign
  const isNegative = cleaned.startsWith('-');
  if (isNegative) {
    cleaned = cleaned.substring(1);
  }
  
  // Remove thousand separators
  if (config.thousandSeparator) {
    cleaned = cleaned.replace(new RegExp(`\\${config.thousandSeparator}`, 'g'), '');
  }
  
  // Replace decimal separator with dot
  if (config.decimalSeparator && config.decimalSeparator !== '.') {
    cleaned = cleaned.replace(config.decimalSeparator, '.');
  }
  
  const numValue = parseFloat(cleaned) || 0;
  return isNegative ? -numValue : numValue;
}

/**
 * Format numeric value as currency string
 */
export function formatCurrencyValue(value: number | string, options: Partial<CurrencyFormatOptions>): string {
  const numValue = typeof value === 'string' ? parseCurrencyValue(value, options) : value;
  
  if (isNaN(numValue)) return '';
  
  const config = { ...DEFAULT_CURRENCY_CONFIGS.RSD, ...options };
  
  // Handle negative values
  const isNegative = numValue < 0;
  const absValue = Math.abs(numValue);
  
  if (!config.allowNegative && isNegative) {
    return formatCurrencyValue(absValue, config);
  }
  
  // Format to fixed precision
  const fixedValue = absValue.toFixed(config.precision || 2);
  const [integerPart, decimalPart] = fixedValue.split('.');
  
  // Add thousand separators
  let formattedInteger = integerPart;
  if (config.thousandSeparator && integerPart.length > 3) {
    formattedInteger = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${config.thousandSeparator}`);
  }
  
  // Combine integer and decimal parts
  let formatted = formattedInteger;
  if (config.precision && config.precision > 0 && decimalPart) {
    formatted += config.decimalSeparator + decimalPart;
  }
  
  // Add currency symbol
  if (config.showCurrencySymbol && config.currency) {
    const symbol = CURRENCY_SYMBOLS[config.currency as CurrencyType];
    if (config.currencyPosition === 'before') {
      formatted = symbol + ' ' + formatted;
    } else {
      formatted = formatted + ' ' + symbol;
    }
  }
  
  // Add negative sign
  if (isNegative) {
    formatted = '-' + formatted;
  }
  
  return formatted;
}

/**
 * Create currency input change handler
 */
export function createCurrencyChangeHandler(
  options: Partial<CurrencyFormatOptions>,
  onChange?: (value: number) => void
) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseCurrencyValue(inputValue, options);
    onChange?.(numericValue);
  };
}

/**
 * Validate currency input string
 */
export function validateCurrencyInput(
  value: string, 
  options: Partial<CurrencyFormatOptions>
): { isValid: boolean; error?: string } {
  if (!value.trim()) {
    return { isValid: true }; // Empty is valid
  }
  
  const config = { ...DEFAULT_CURRENCY_CONFIGS.RSD, ...options };
  const numValue = parseCurrencyValue(value, config);
  
  if (isNaN(numValue)) {
    return { 
      isValid: false, 
      error: 'Invalid currency format' 
    };
  }
  
  if (!config.allowNegative && numValue < 0) {
    return { 
      isValid: false, 
      error: 'Negative values not allowed' 
    };
  }
  
  return { isValid: true };
}

/**
 * Get currency configuration by currency type
 */
export function getCurrencyConfig(currency: CurrencyType): CurrencyFormatOptions {
  return { ...DEFAULT_CURRENCY_CONFIGS[currency] } as CurrencyFormatOptions;
}

/**
 * Format number as Serbian RSD currency (most common use case)
 */
export function formatRSD(value: number): string {
  return formatCurrencyValue(value, DEFAULT_CURRENCY_CONFIGS.RSD);
}

/**
 * Format number as EUR currency
 */
export function formatEUR(value: number): string {
  return formatCurrencyValue(value, DEFAULT_CURRENCY_CONFIGS.EUR);
}

/**
 * Format number as USD currency
 */
export function formatUSD(value: number): string {
  return formatCurrencyValue(value, DEFAULT_CURRENCY_CONFIGS.USD);
}
