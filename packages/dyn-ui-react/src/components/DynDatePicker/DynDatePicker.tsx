/**
 * DynDatePicker - Advanced date picker with custom parsing
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '../../utils/classNames';
import type { DynDatePickerProps, DynFieldRef, InputSize } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { useDynDateParser } from '../../hooks/useDynDateParser';
import { DynIcon } from '../DynIcon';
import styles from './DynDatePicker.module.css';

const MAX_DATE_LENGTH = 10;

const sizeClassMap: Record<InputSize, string | undefined> = {
  small: styles.sizeSmall,
  medium: undefined,
  large: styles.sizeLarge,
};

export const DynDatePicker = forwardRef<DynFieldRef, DynDatePickerProps>((props, ref) => {
  const {
    id: idProp,
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
    onFocus,
    children: _children,
    'data-testid': dataTestId,
    ...rest
  } = props;

  const instanceId = useId();
  const inputId = idProp ?? name ?? instanceId;
  const dropdownId = `${inputId}-dropdown`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const { error, validate, clearError } = useDynFieldValidation({
    value,
    ...(required ? { required } : {}),
    ...(validation ? { validation } : {}),
  });

  const {
    displayValue,
    setDisplayValue,
    formatDate,
    parseDate,
    isValidDate,
    getRelativeDescription,
  } = useDynDateParser({
    format,
    locale,
    ...(customParser ? { customParser } : {}),
  });

  const parseExternalValue = useCallback(
    (input: DynDatePickerProps['value']): Date | null => {
      if (!input) {
        return null;
      }

      const candidate = input instanceof Date ? input : new Date(input);
      return isValidDate(candidate) ? candidate : null;
    },
    [isValidDate]
  );

  useEffect(() => {
    const nextValue = parseExternalValue(propValue);
    setValue(prev => {
      const prevTime = prev?.getTime();
      const nextTime = nextValue?.getTime();
      return prevTime === nextTime ? prev : nextValue;
    });
    setDisplayValue(nextValue ? formatDate(nextValue) : '');
  }, [propValue, formatDate, parseExternalValue, setDisplayValue]);

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen, handleDocumentClick]);

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
      const nextValue = parseExternalValue(newValue);
      setValue(nextValue);
      setDisplayValue(nextValue ? formatDate(nextValue) : '');
      onChange?.(nextValue);
    },
  }));

  const emitChange = useCallback(
    (nextValue: Date | null) => {
      setValue(nextValue);
      setDisplayValue(nextValue ? formatDate(nextValue) : '');
      onChange?.(nextValue);
    },
    [formatDate, onChange, setDisplayValue]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setDisplayValue(inputValue);

      const parsedDate = parseDate(inputValue);
      if (parsedDate && isValidDate(parsedDate)) {
        if (minDate && parsedDate < minDate) {
          return;
        }
        if (maxDate && parsedDate > maxDate) {
          return;
        }

        emitChange(parsedDate);
        clearError();
      } else if (!inputValue) {
        emitChange(null);
        clearError();
      }
    },
    [parseDate, isValidDate, minDate, maxDate, emitChange, clearError]
  );

  const handleCalendarToggle = useCallback(() => {
    if (disabled || readonly) {
      return;
    }
    setIsOpen(prev => !prev);
    inputRef.current?.focus();
  }, [disabled, readonly]);

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    emitChange(today);
    clearError();
    setIsOpen(false);
  }, [emitChange, clearError]);

  const handleClearClick = useCallback(() => {
    emitChange(null);
    clearError();
    inputRef.current?.focus();
  }, [emitChange, clearError]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    validate();
    onBlur?.();
  }, [validate, onBlur]);

  const handleFocus = useCallback(() => {
    setFocused(true);
    clearError();
    onFocus?.();
  }, [clearError, onFocus]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
            event.preventDefault();
          }
          break;
        case 'Escape':
          if (isOpen) {
            setIsOpen(false);
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    },
    [isOpen]
  );

  if (!visible) {
    return null;
  }

  const fieldError = errorMessage ?? (error || undefined);

  const inputClasses = cn(
    styles.input,
    sizeClassMap[size],
    focused && styles.stateFocused,
    Boolean(fieldError) && styles.stateError,
    disabled && styles.stateDisabled,
    readonly && styles.stateReadonly,
    isOpen && styles.stateOpen
  );

  const describedBy =
    [
      fieldError ? `${inputId}-error` : null,
      help ? `${inputId}-help` : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  const relativeText = useMemo(
    () => (value ? getRelativeDescription(value) : null),
    [value, getRelativeDescription]
  );

  return (
    <DynFieldContainer
      {...(label !== undefined ? { label } : {})}
      {...(help !== undefined ? { helpText: help } : {})}
      {...(required ? { required } : {})}
      {...(optional ? { optional } : {})}
      {...(fieldError ? { errorText: fieldError } : {})}
      {...(className !== undefined ? { className } : {})}
      htmlFor={inputId}
    >
      <div ref={containerRef} className={styles.container} data-testid={dataTestId}>
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            id={inputId}
            name={name ?? inputId}
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
            aria-invalid={Boolean(fieldError)}
            aria-describedby={describedBy}
            aria-expanded={isOpen}
            aria-controls={isOpen ? dropdownId : undefined}
            maxLength={MAX_DATE_LENGTH}
            data-size={size}
            {...rest}
          />

          <button
            type="button"
            className={styles.calendarButton}
            onClick={handleCalendarToggle}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Abrir calendário"
            aria-expanded={isOpen}
            aria-controls={isOpen ? dropdownId : undefined}
          >
            <DynIcon icon="dyn-icon-calendar" />
          </button>

          {displayValue && !readonly && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearClick}
              tabIndex={-1}
              aria-label="Limpar data"
            >
              <DynIcon icon="dyn-icon-close" />
            </button>
          )}
        </div>

        {relativeText && <div className={styles.relativeText}>{relativeText}</div>}

        {isOpen && (
          <div id={dropdownId} className={styles.dropdown} role="dialog">
            <div className={styles.shortcuts}>
              <button type="button" className={styles.shortcut} onClick={handleTodayClick}>
                Hoje
              </button>
              <button type="button" className={styles.shortcut} onClick={handleClearClick}>
                Limpar
              </button>
            </div>

            <div>
              <div className={styles.helpTitle}>Formatos aceitos:</div>
              <ul className={styles.helpList}>
                <li className={styles.helpListItem}>dd/mm/aaaa (ex: 25/12/2023)</li>
                <li className={styles.helpListItem}>hoje, amanhã, ontem</li>
                <li className={styles.helpListItem}>Texto natural</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DynFieldContainer>
  );
});

DynDatePicker.displayName = 'DynDatePicker';

export default DynDatePicker;
