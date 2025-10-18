/**
 * DynInput - Advanced input component with validation, masking, currency and number support
 * Part of DYN UI Form Components Group - SCOPE 6
 * Extended: 2025-10-18 - Added Currency and Number input support for AccountingOnline ERP
 */

import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from 'react';

function classNames(...args: Array<string | Record<string, boolean> | undefined | null | any[]>): string {
  const classes: string[] = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      const inner = classNames(...arg);
      if (inner) classes.push(inner);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && (arg as any)[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}

import type { DynInputProps, DynFieldRef, CurrencyType } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { useDynMask } from '../../hooks/useDynMask';
import { DynIcon } from '../DynIcon';
import { 
  formatCurrencyValue, 
  parseCurrencyValue, 
  getCurrencyConfig,
  CURRENCY_SYMBOLS
} from '../../utils/currencyFormatters';

export const DynInput = forwardRef<DynFieldRef, DynInputProps>(
  (
    {
      name,
      id,
      label,
      help,
      placeholder,
      disabled = false,
      readonly = false,
      required = false,
      optional = false,
      visible = true,
      value: propValue = '',
      errorMessage,
      validation,
      className,
      type = 'text',
      size = 'medium',
      maxLength,
      minLength,
      mask,
      maskFormatModel = false,
      pattern,
      icon,
      showCleanButton = false,
      step = 1,
      min,
      max,
      showSpinButtons = false,
      currencyConfig,
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(propValue);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Generate stable id for the input when not provided
    const generatedIdRef = useRef<string>(`dyn-input-${Math.random().toString(36).slice(2, 9)}`);
    const inputId = id ?? name ?? generatedIdRef.current;

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation,
      customError: errorMessage
    });

    const { maskedValue, unmaskValue, handleMaskedChange } = useDynMask(
      mask,
      value,
      maskFormatModel
    );

    // Currency configuration setup
    const isCurrency = type === 'currency';
    const isNumber = type === 'number';
    const finalCurrencyConfig = isCurrency 
      ? { ...getCurrencyConfig((currencyConfig?.currency || 'RSD') as CurrencyType), ...currencyConfig }
      : undefined;

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setValue('');
        onChange?.('');
        clearError();
      },
      getValue: () => {
        if (isCurrency && finalCurrencyConfig) {
          return parseCurrencyValue(value, finalCurrencyConfig);
        }
        if (isNumber) {
          return parseFloat(value) || 0;
        }
        return mask && !maskFormatModel ? unmaskValue(value) : value;
      },
      setValue: (newValue: any) => {
        const stringValue = String(newValue);
        if (isCurrency && finalCurrencyConfig) {
          const formatted = formatCurrencyValue(parseFloat(stringValue) || 0, finalCurrencyConfig);
          setValue(formatted);
          onChange?.(parseFloat(stringValue) || 0);
        } else {
          setValue(stringValue);
          onChange?.(stringValue);
        }
      }
    }));

    useEffect(() => {
      if (isCurrency && finalCurrencyConfig && propValue && typeof propValue === 'number') {
        setValue(formatCurrencyValue(propValue, finalCurrencyConfig));
      } else {
        setValue(String(propValue));
      }
    }, [propValue, isCurrency, finalCurrencyConfig]);

    // Number input step handlers
    const handleStepChange = useCallback((direction: 1 | -1) => {
      if (!isNumber) return;
      
      const currentValue = parseFloat(value) || 0;
      const stepValue = step || 1;
      const newValue = currentValue + (direction * stepValue);
      
      // Check min/max bounds
      if (min !== undefined && newValue < min) return;
      if (max !== undefined && newValue > max) return;
      
      setValue(String(newValue));
      onChange?.(newValue);
    }, [isNumber, value, step, min, max, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (isCurrency && finalCurrencyConfig) {
        // For currency, allow typing and format on blur
        setValue(newValue);
        const numericValue = parseCurrencyValue(newValue, finalCurrencyConfig);
        onChange?.(numericValue);
      } else if (isNumber) {
        // For number, validate numeric input
        if (/^-?\d*\.?\d*$/.test(newValue) || newValue === '') {
          setValue(newValue);
          onChange?.(parseFloat(newValue) || 0);
        }
      } else if (mask) {
        const processedValue = handleMaskedChange(newValue);
        setValue(processedValue);
        onChange?.(maskFormatModel ? processedValue : unmaskValue(processedValue));
      } else {
        setValue(newValue);
        onChange?.(newValue);
      }

      clearError();
    };

    const handleBlur = () => {
      setFocused(false);
      
      // Format currency on blur
      if (isCurrency && finalCurrencyConfig && value) {
        const numericValue = parseCurrencyValue(value, finalCurrencyConfig);
        const formatted = formatCurrencyValue(numericValue, finalCurrencyConfig);
        setValue(formatted);
      }
      
      validate();
      onBlur?.();
    };

    const handleFocus = () => {
      setFocused(true);
      clearError();
      onFocus?.();
    };

    const handleClean = () => {
      setValue('');
      onChange?.('');
      clearError();
      inputRef.current?.focus();
    };

    // Key handlers for number inputs
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isNumber && showSpinButtons) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          handleStepChange(1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          handleStepChange(-1);
        }
      }
    };

    if (!visible) return null;

    // Render number spin buttons
    const renderNumberControls = () => {
      if (!isNumber || !showSpinButtons) return null;
      
      return (
        <div className="dyn-input-number-controls">
          <button 
            type="button"
            className="dyn-input-spin-up"
            onClick={() => handleStepChange(1)}
            disabled={disabled || readonly || (max !== undefined && parseFloat(value) >= max)}
            tabIndex={-1}
            aria-label="Increase value"
          >
            <DynIcon icon="dyn-icon-chevron-up" />
          </button>
          <button 
            type="button" 
            className="dyn-input-spin-down"
            onClick={() => handleStepChange(-1)}
            disabled={disabled || readonly || (min !== undefined && parseFloat(value) <= min)}
            tabIndex={-1}
            aria-label="Decrease value"
          >
            <DynIcon icon="dyn-icon-chevron-down" />
          </button>
        </div>
      );
    };

    // Render currency symbol
    const renderCurrencySymbol = () => {
      if (!isCurrency || !finalCurrencyConfig?.showCurrencySymbol) return null;
      
      const symbol = CURRENCY_SYMBOLS[finalCurrencyConfig.currency as CurrencyType];
      const position = finalCurrencyConfig.currencyPosition || 'after';
                  
      return (
        <span className={`dyn-input-currency-symbol dyn-input-currency-${position}`}>
          {symbol}
        </span>
      );
    };

    const inputClasses = classNames(
      'dyn-input',
      `dyn-input--${size}`,
      {
        'dyn-input--focused': focused,
        'dyn-input--error': !!error,
        'dyn-input--disabled': disabled,
        'dyn-input--readonly': readonly,
        'dyn-input--with-icon': !!icon,
        'dyn-input--currency': isCurrency,
        'dyn-input--number': isNumber,
        'dyn-input--with-spin': isNumber && showSpinButtons,
        'dyn-input--cleanable': !!(showCleanButton && value && !readonly && !disabled)
      }
    );

    const displayValue = mask ? maskedValue : value;
    const containerDivClass = classNames('dyn-input-container', className);

    return (
      <DynFieldContainer
        label={label}
        helpText={help}
        required={required}
        optional={optional}
        errorText={error}
        className={className}
        htmlFor={inputId}
        id={id}
      >
        <div className={containerDivClass}>
          {icon && (
            <div className="dyn-input-icon-container">
              <DynIcon icon={icon} />
            </div>
          )}

          {isCurrency && finalCurrencyConfig?.currencyPosition === 'before' && renderCurrencySymbol()}

          <input
            ref={inputRef}
            id={inputId}
            name={name}
            type={isCurrency || isNumber ? 'text' : type}
            className={inputClasses}
            placeholder={placeholder}
            value={displayValue}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            aria-required={required}
            aria-disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            inputMode={isCurrency || isNumber ? 'decimal' : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />

          {isCurrency && finalCurrencyConfig?.currencyPosition === 'after' && renderCurrencySymbol()}
          
          {renderNumberControls()}

          {showCleanButton && value && !readonly && !disabled && (
            <button
              type="button"
              className="dyn-input-clean-button"
              onClick={handleClean}
              tabIndex={-1}
              aria-label="Clear field"
            >
              <DynIcon icon="dyn-icon-close" />
            </button>
          )}
        </div>
      </DynFieldContainer>
    );
  }
);

DynInput.displayName = 'DynInput';

export default DynInput;
