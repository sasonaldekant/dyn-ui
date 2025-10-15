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
 */
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

type DynInputComponentProps = DynInputProps & DynInputDefaultProps;

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
    const [value, setValue] = useState<string>(String(propValue));
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

    // Memoized computations
    const displayValue = useMemo(() => {
      return mask ? maskedValue : value;
    }, [mask, maskedValue, value]);

    const resolvedError = useMemo(() => {
      return errorMessage ?? (error || undefined);
    }, [errorMessage, error]);

    const hasValue = Boolean(value && value.length > 0);
    const showClearBtn = showClearButton && hasValue && !readonly && !disabled;

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
        const stringValue = String(newValue);
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

    useEffect(() => {
      setValue(String(propValue));
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
      setValue('');
      onChange?.('');
      clearError();
      inputRef.current?.focus();
    };

    if (!visible) return null;

    // Generate CSS classes safely
    const inputClasses = cn(
      getStyleClass('input'),
      getStyleClass(`input--${size}`),
      {
        [getStyleClass('input--focused')]: focused,
        [getStyleClass('input--error')]: Boolean(resolvedError),
        [getStyleClass('input--disabled')]: disabled,
        [getStyleClass('input--readonly')]: readonly,
        [getStyleClass('input--with-icon')]: !!icon,
        [getStyleClass('input--clearable')]: showClearBtn
      },
      className
    );

    const containerClasses = cn(
      getStyleClass('container'),
      {
        [getStyleClass('container--focused')]: focused,
        [getStyleClass('container--error')]: Boolean(resolvedError),
        [getStyleClass('container--disabled')]: disabled,
      }
    );

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
          {icon && (
            <div className={getStyleClass('icon-container')}>
              {typeof icon === 'string' ? (
                <DynIcon icon={icon} aria-hidden="true" />
              ) : (
                <span aria-hidden="true">{icon}</span>
              )}
            </div>
          )}
          
          <input
            ref={inputRef}
            id={internalId}
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
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-label={ariaLabel}
            aria-describedby={
              ariaDescribedBy ||
              (resolvedError ? `${internalId}-error` : help ? `${internalId}-help` : undefined)
            }
            aria-labelledby={ariaLabelledBy}
            aria-invalid={Boolean(resolvedError)}
            data-testid={dataTestId || 'dyn-input'}
            role={role}
            {...rest}
          />
          
          {showClearBtn && (
            <button
              type="button"
              className={getStyleClass('clear-button')}
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <DynIcon icon="close" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Children content for additional input elements or decorations */}
        {children}
      </DynFieldContainer>
    );
  }
);

export default DynInput;
DynInput.displayName = 'DynInput';