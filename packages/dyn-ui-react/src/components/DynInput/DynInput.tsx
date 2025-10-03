/**
 * DynInput - Advanced input component with validation and masking
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import type { DynInputProps, DynFieldRef } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { useDynMask } from '../../hooks/useDynMask';
import { DynIcon } from '../DynIcon';

export const DynInput = forwardRef<DynFieldRef, DynInputProps>(
  (
    {
      name,
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
      step,
      min,
      max,
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(propValue);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setValue('');
        onChange?.('');
        clearError();
      },
      getValue: () => (mask && !maskFormatModel ? unmaskValue(value) : value),
      setValue: (newValue: any) => {
        const stringValue = String(newValue);
        setValue(stringValue);
        onChange?.(stringValue);
      }
    }));

    useEffect(() => {
      setValue(propValue);
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (mask) {
        const processedValue = handleMaskedChange(newValue);
        setValue(processedValue);
        onChange?.(maskFormatModel ? processedValue : unmaskValue(processedValue));
      } else {
        setValue(newValue);
        onChange?.(type === 'number' ? Number(newValue) : newValue);
      }
      
      clearError();
    };

    const handleBlur = () => {
      setFocused(false);
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

    if (!visible) return null;

    const inputClasses = classNames(
      'dyn-input',
      `dyn-input--${size}`,
      {
        'dyn-input--focused': focused,
        'dyn-input--error': !!error,
        'dyn-input--disabled': disabled,
        'dyn-input--readonly': readonly,
        'dyn-input--with-icon': !!icon,
        'dyn-input--cleanable': showCleanButton && value && !readonly && !disabled
      }
    );

    const displayValue = mask ? maskedValue : value;

    return (
      <DynFieldContainer
        label={label}
        helpText={help}
        required={required}
        optional={optional}
        errorText={error}
        className={className}
        htmlFor={name}
      >
        <div className="dyn-input-container">
          {icon && (
            <div className="dyn-input-icon-container">
              <DynIcon icon={icon} />
            </div>
          )}
          
          <input
            ref={inputRef}
            id={name}
            name={name}
            type={type === 'number' ? 'text' : type}
            className={inputClasses}
            placeholder={placeholder}
            value={displayValue}
            disabled={disabled}
            readOnly={readonly}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            step={step}
            min={min}
            max={max}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          
          {showCleanButton && value && !readonly && !disabled && (
            <button
              type="button"
              className="dyn-input-clean-button"
              onClick={handleClean}
              tabIndex={-1}
              aria-label="Limpar campo"
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
