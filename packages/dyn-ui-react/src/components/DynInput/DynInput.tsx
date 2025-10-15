import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import type {
  DynInputProps,
  DynInputRef,
  DynInputDefaultProps,
} from './DynInput.types';
import { DYN_INPUT_DEFAULT_PROPS } from './DynInput.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { useDynMask } from '../../hooks/useDynMask';
import { DynIcon } from '../DynIcon';
import styles from './DynInput.module.css';

/**
 * Safely access CSS module classes
 * Following DynAvatar pattern for consistent class name handling
 */
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

/**
 * Normalize and validate string values
 * Following DynAvatar pattern for value normalization
 */
const normalizeStringValue = (value: string | number | undefined): string => {
  if (value === null || value === undefined) return '';
  return String(value).trim();
};

/**
 * Generate appropriate ARIA label for input fields
 * Following DynAvatar accessibility pattern
 */
const generateInputAriaLabel = (
  label?: string,
  placeholder?: string,
  name?: string
): string | undefined => {
  if (label) return label;
  if (placeholder) return placeholder;
  if (name) return name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return undefined;
};

type DynInputComponentProps = DynInputProps & DynInputDefaultProps;

/**
 * DynInput - Enterprise-grade input component
 * 
 * A highly accessible and configurable input component that supports validation,
 * masking, icons, and various input types. Built following the DynAvatar gold standard
 * for consistency and reliability.
 * 
 * @example
 * ```tsx
 * <DynInput
 *   label="Email Address"
 *   type="email"
 *   required
 *   placeholder="Enter your email"
 *   validation={(value) => {
 *     if (!value.includes('@')) return 'Invalid email';
 *     return null;
 *   }}
 * />
 * ```
 */
export const DynInput = forwardRef<DynInputRef, DynInputProps>(
  (
    {
      name,
      label,
      help,
      placeholder,
      disabled = DYN_INPUT_DEFAULT_PROPS.disabled,
      readonly = DYN_INPUT_DEFAULT_PROPS.readonly,
      required = DYN_INPUT_DEFAULT_PROPS.required,
      optional = DYN_INPUT_DEFAULT_PROPS.optional,
      visible = DYN_INPUT_DEFAULT_PROPS.visible,
      value: propValue = '',
      errorMessage,
      validation,
      className,
      type = DYN_INPUT_DEFAULT_PROPS.type,
      size = DYN_INPUT_DEFAULT_PROPS.size,
      maxLength,
      minLength,
      mask,
      maskFormatModel = DYN_INPUT_DEFAULT_PROPS.maskFormatModel,
      pattern,
      icon,
      showClearButton = DYN_INPUT_DEFAULT_PROPS.showClearButton,
      step,
      min,
      max,
      onChange,
      onBlur,
      onFocus,
      onValidate,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      role,
      children,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || name || generateId('input'));
    const [value, setValue] = useState<string>(normalizeStringValue(propValue));
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

    // Memoized computations following DynAvatar pattern
    const displayValue = useMemo(() => {
      return mask ? maskedValue : value;
    }, [mask, maskedValue, value]);

    const resolvedError = useMemo(() => {
      return errorMessage ?? (error || undefined);
    }, [errorMessage, error]);

    const hasValue = useMemo(() => {
      return Boolean(value && value.length > 0);
    }, [value]);

    const showClearBtn = useMemo(() => {
      return showClearButton && hasValue && !readonly && !disabled;
    }, [showClearButton, hasValue, readonly, disabled]);

    const isDisabled = disabled;
    const isReadonly = readonly;
    const isInteractive = !isDisabled && !isReadonly;
    const hasError = Boolean(resolvedError);
    const isLoadingState = false; // Future enhancement for async validation

    // Generate appropriate ARIA label following DynAvatar accessibility pattern
    const computedAriaLabel = useMemo(() => {
      return ariaLabel ?? generateInputAriaLabel(label, placeholder, name);
    }, [ariaLabel, label, placeholder, name]);

    // Imperative handle following DynAvatar pattern
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        setValue('');
        onChange?.('');
        clearError();
      },
      getValue: () => (mask && !maskFormatModel ? unmaskValue(value) : value),
      setValue: (newValue: string | number) => {
        const stringValue = normalizeStringValue(newValue);
        setValue(stringValue);
        onChange?.(stringValue);
      },
      validate: () => {
        const isValid = validate();
        onValidate?.(isValid, error);
        return isValid;
      },
      clearError: () => clearError(),
      getElement: () => inputRef.current,
    }));

    // Effect for controlled value updates
    useEffect(() => {
      setValue(normalizeStringValue(propValue));
    }, [propValue]);

    // Event handlers with proper error handling
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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      validate();
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      clearError();
      onFocus?.(e);
    };

    const handleClear = () => {
      if (!isInteractive) return;
      
      setValue('');
      onChange?.('');
      clearError();
      inputRef.current?.focus();
    };

    const handleClearKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClear();
      }
    };

    // Early return for invisible component following DynAvatar pattern
    if (!visible) return null;

    // Generate CSS class names safely following DynAvatar pattern
    const sizeClass = getStyleClass(`input--${size}`);
    const focusedClass = getStyleClass('input--focused');
    const errorClass = getStyleClass('input--error');
    const disabledClass = getStyleClass('input--disabled');
    const readonlyClass = getStyleClass('input--readonly');
    const withIconClass = getStyleClass('input--with-icon');
    const clearableClass = getStyleClass('input--clearable');
    const loadingClass = getStyleClass('input--loading');

    const inputClasses = cn(
      getStyleClass('input'),
      sizeClass,
      {
        [focusedClass]: focused && focusedClass,
        [errorClass]: hasError && errorClass,
        [disabledClass]: isDisabled && disabledClass,
        [readonlyClass]: isReadonly && readonlyClass,
        [withIconClass]: !!icon && withIconClass,
        [clearableClass]: showClearBtn && clearableClass,
        [loadingClass]: isLoadingState && loadingClass,
      },
      className
    );

    const containerClasses = cn(
      getStyleClass('container'),
      {
        [getStyleClass('container--focused')]: focused,
        [getStyleClass('container--error')]: hasError,
        [getStyleClass('container--disabled')]: isDisabled,
        [getStyleClass('container--loading')]: isLoadingState,
      }
    );

    // Icon element rendering following DynAvatar pattern
    const iconElement = useMemo(() => {
      if (!icon) return null;

      return (
        <div className={getStyleClass('icon-container')}>
          {typeof icon === 'string' ? (
            <DynIcon icon={icon} aria-hidden="true" />
          ) : (
            <span aria-hidden="true">{icon}</span>
          )}
        </div>
      );
    }, [icon]);

    // Clear button element
    const clearButtonElement = useMemo(() => {
      if (!showClearBtn) return null;

      return (
        <button
          type="button"
          className={getStyleClass('clear-button')}
          onClick={handleClear}
          onKeyDown={handleClearKeyDown}
          tabIndex={-1}
          aria-label="Clear input"
          data-testid="dyn-input-clear-button"
        >
          <DynIcon icon="close" aria-hidden="true" />
        </button>
      );
    }, [showClearBtn]);

    return (
      <DynFieldContainer
        label={label}
        helpText={help}
        required={required}
        optional={optional}
        errorText={resolvedError}
        className={className}
        htmlFor={internalId}
      >
        <div className={containerClasses}>
          {iconElement}
          
          <input
            ref={inputRef}
            id={internalId}
            name={name}
            type={type === 'number' ? 'text' : type}
            className={inputClasses}
            placeholder={placeholder}
            value={displayValue}
            disabled={isDisabled}
            readOnly={isReadonly}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            step={step}
            min={min}
            max={max}
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-label={computedAriaLabel}
            aria-describedby={
              ariaDescribedBy ||
              (resolvedError ? `${internalId}-error` : help ? `${internalId}-help` : undefined)
            }
            aria-labelledby={ariaLabelledBy}
            aria-invalid={hasError ? 'true' : undefined}
            aria-busy={isLoadingState ? 'true' : undefined}
            data-testid={dataTestId || 'dyn-input'}
            role={role}
            {...rest}
          />
          
          {clearButtonElement}
        </div>

        {/* Children content for additional input elements or decorations */}
        {children}

        {/* Loading announcement for screen readers */}
        {isLoadingState && (
          <span className="dyn-sr-only" aria-live="polite">
            Loading input validation
          </span>
        )}

        {/* Error announcement for screen readers */}
        {hasError && (
          <span className="dyn-sr-only" aria-live="assertive">
            Input validation failed: {resolvedError}
          </span>
        )}
      </DynFieldContainer>
    );
  }
);

export default DynInput;
DynInput.displayName = 'DynInput';