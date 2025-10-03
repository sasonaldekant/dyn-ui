/**
 * DynDatePicker - Advanced date picker with custom parsing
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from 'react';
import classNames from 'classnames';
import type { DynDatePickerProps, DynFieldRef } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { useDynDateParser } from '../../hooks/useDynDateParser';
import { DynIcon } from '../DynIcon';
import './DynDatePicker.module.scss';

export const DynDatePicker = forwardRef<DynFieldRef, DynDatePickerProps>(
  (
    {
      name,
      label,
      help,
      placeholder = 'dd/mm/aaaa',
      disabled = false,
      readonly = false,
      required = false,
      optional = false,
      visible = true,
      value: propValue,
      errorMessage,
      validation,
      className,
      format = 'dd/MM/yyyy',
      locale = 'pt-BR',
      minDate,
      maxDate,
      customParser,
      size = 'medium',
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [value, setValue] = useState<Date | null>(
      propValue ? (propValue instanceof Date ? propValue : new Date(propValue)) : null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation,
      customError: errorMessage
    });

    const {
      displayValue,
      setDisplayValue,
      formatDate,
      parseDate,
      isValidDate,
      getRelativeDescription
    } = useDynDateParser({ format, locale, customParser });

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setValue(null);
        setDisplayValue('');
        onChange?.(null);
        clearError();
      },
      getValue: () => value,
      setValue: (newValue: any) => {
        const date = newValue ? (newValue instanceof Date ? newValue : new Date(newValue)) : null;
        setValue(date);
        setDisplayValue(date ? formatDate(date, format) : '');
        onChange?.(date);
      }
    }));

    useEffect(() => {
      if (propValue) {
        const date = propValue instanceof Date ? propValue : new Date(propValue);
        setValue(date);
        setDisplayValue(formatDate(date, format));
      } else {
        setValue(null);
        setDisplayValue('');
      }
    }, [propValue, format, formatDate]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      const parsedDate = parseDate(inputValue);
      if (parsedDate && isValidDate(parsedDate)) {
        // Validate date range
        if (minDate && parsedDate < minDate) {
          return; // Don't update if before min date
        }
        if (maxDate && parsedDate > maxDate) {
          return; // Don't update if after max date
        }

        setValue(parsedDate);
        onChange?.(parsedDate);
        clearError();
      } else if (!inputValue) {
        setValue(null);
        onChange?.(null);
        clearError();
      }
    };

    const handleCalendarToggle = () => {
      if (!disabled && !readonly) {
        setIsOpen(prev => !prev);
      }
    };

    const handleTodayClick = () => {
      const today = new Date();
      setValue(today);
      setDisplayValue(formatDate(today, format));
      onChange?.(today);
      clearError();
      setIsOpen(false);
    };

    const handleClearClick = () => {
      setValue(null);
      setDisplayValue('');
      onChange?.(null);
      clearError();
      inputRef.current?.focus();
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          if (!isOpen) {
            setIsOpen(true);
            e.preventDefault();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
            e.preventDefault();
          }
          break;
      }
    };

    if (!visible) return null;

    const inputClasses = classNames(
      'dyn-datepicker-input',
      `dyn-datepicker--${size}`,
      {
        'dyn-datepicker--focused': focused,
        'dyn-datepicker--error': !!error,
        'dyn-datepicker--disabled': disabled,
        'dyn-datepicker--readonly': readonly,
        'dyn-datepicker--open': isOpen
      }
    );

    const relativeText = value ? getRelativeDescription(value) : null;

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
        <div ref={containerRef} className="dyn-datepicker-container">
          <div className="dyn-datepicker-input-container">
            <input
              ref={inputRef}
              id={name}
              name={name}
              type="text"
              className={inputClasses}
              placeholder={placeholder}
              value={displayValue}
              disabled={disabled}
              readOnly={readonly}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
              maxLength={10}
            />
            
            <button
              type="button"
              className="dyn-datepicker-calendar-button"
              onClick={handleCalendarToggle}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Abrir calendário"
            >
              <DynIcon icon="dyn-icon-calendar" />
            </button>
            
            {displayValue && !readonly && !disabled && (
              <button
                type="button"
                className="dyn-datepicker-clear-button"
                onClick={handleClearClick}
                tabIndex={-1}
                aria-label="Limpar data"
              >
                <DynIcon icon="dyn-icon-close" />
              </button>
            )}
          </div>
          
          {relativeText && (
            <div className="dyn-datepicker-relative-text">
              {relativeText}
            </div>
          )}
          
          {isOpen && (
            <div className="dyn-datepicker-dropdown">
              <div className="dyn-datepicker-shortcuts">
                <button
                  type="button"
                  className="dyn-datepicker-shortcut"
                  onClick={handleTodayClick}
                >
                  Hoje
                </button>
                <button
                  type="button"
                  className="dyn-datepicker-shortcut"
                  onClick={handleClearClick}
                >
                  Limpar
                </button>
              </div>
              
              <div className="dyn-datepicker-help">
                <div className="dyn-datepicker-help-title">Formatos aceitos:</div>
                <ul className="dyn-datepicker-help-list">
                  <li>dd/mm/aaaa (ex: 25/12/2023)</li>
                  <li>hoje, amanhã, ontem</li>
                  <li>Texto natural</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </DynFieldContainer>
    );
  }
);

DynDatePicker.displayName = 'DynDatePicker';

export default DynDatePicker;
