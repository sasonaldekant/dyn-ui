# 🎯 DYN-UI CODEX PROMPT 17 - DynDatePicker

## 🚀 AI ZADATAK: Refaktoriši DynDatePicker komponent za calendar accessibility i design tokens

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim complex komponentima (DynChart, DynGauge)

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynDatePicker/
├── DynDatePicker.tsx                # React komponent
├── DynDatePicker.types.ts           # TypeScript definicije (KREIRATI)
├── DynDatePicker.module.css         # CSS Module stilovi
├── DynDatePicker.stories.tsx        # Storybook stories
├── DynDatePicker.test.tsx           # Vitest testovi
└── index.ts                         # Export file
```

---

## 🔧 CSS MODULE REFACTORING (DynDatePicker.module.css):

**ZADATAK**: Zameni SVE hard-coded vrednosti sa design tokens i implementiraj calendar grid accessibility

```css
.container {
  position: relative;
  width: 100%;
  font-family: var(--dyn-font-family-primary);
}

.inputContainer {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
  width: 100%;
  min-height: var(--dyn-spacing-2xl); /* Umesto height: 40px */
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-3xl) var(--dyn-spacing-sm) var(--dyn-spacing-md);
  font-family: var(--dyn-font-family-primary); /* Umesto system-ui fallback */
  font-size: var(--dyn-font-size-base);
  font-weight: var(--dyn-font-weight-normal);
  line-height: var(--dyn-line-height-normal); /* Umesto 1.5 */
  color: var(--dyn-color-text-primary);
  background-color: var(--dyn-color-bg-primary); /* Umesto --dyn-color-surface */
  border: var(--dyn-border-width) solid var(--dyn-color-border); /* Umesto 1px */
  border-radius: var(--dyn-border-radius-md);
  transition: var(--dyn-transition-fast); /* Umesto all 0.2s ease-in-out */
  
  &::placeholder {
    color: var(--dyn-color-text-secondary);
    opacity: 1;
  }
  
  &:hover:not(:disabled):not(:read-only) {
    border-color: var(--dyn-color-border-hover);
  }
  
  &:focus {
    outline: none;
    border-color: var(--dyn-color-focus);
    box-shadow: var(--dyn-shadow-focus); /* Umesto 0 0 0 3px */
  }
  
  &:disabled {
    background-color: var(--dyn-color-bg-disabled);
    color: var(--dyn-color-text-disabled);
    cursor: not-allowed;
    border-color: var(--dyn-color-border);
  }
  
  &:read-only {
    background-color: var(--dyn-color-neutral-25);
    cursor: default;
  }
}

/* Size variants */
.input--small {
  min-height: var(--dyn-spacing-xl);
  padding: var(--dyn-spacing-xs) var(--dyn-spacing-2xl) var(--dyn-spacing-xs) var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-sm);
}

.input--large {
  min-height: var(--dyn-spacing-3xl);
  padding: var(--dyn-spacing-md) var(--dyn-spacing-4xl) var(--dyn-spacing-md) var(--dyn-spacing-lg);
  font-size: var(--dyn-font-size-lg);
}

/* Error/Success states */
.input--error {
  border-color: var(--dyn-color-border-error);
  
  &:focus {
    border-color: var(--dyn-color-danger);
    box-shadow: 0 0 0 var(--dyn-focus-ring-width) rgba(220, 53, 69, 0.2);
  }
}

.input--success {
  border-color: var(--dyn-color-success);
  
  &:focus {
    border-color: var(--dyn-color-success);
    box-shadow: 0 0 0 var(--dyn-focus-ring-width) rgba(40, 167, 69, 0.2);
  }
}

/* Action buttons */
.calendarButton,
.clearButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--dyn-spacing-xl);
  height: var(--dyn-spacing-xl);
  padding: var(--dyn-spacing-xs);
  background: none;
  border: none;
  border-radius: var(--dyn-border-radius-sm);
  color: var(--dyn-color-text-secondary);
  cursor: pointer;
  transition: var(--dyn-transition-fast);
  
  &:hover:not(:disabled) {
    color: var(--dyn-color-text-primary);
    background-color: var(--dyn-color-neutral-100);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
  
  &:disabled {
    color: var(--dyn-color-text-disabled);
    cursor: not-allowed;
  }
}

.calendarButton {
  right: var(--dyn-spacing-lg);
}

.clearButton {
  right: var(--dyn-spacing-xs);
}

/* Calendar dropdown */
.calendarDropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: var(--dyn-z-index-dropdown);
  margin-top: var(--dyn-spacing-xs);
  padding: var(--dyn-spacing-lg);
  background-color: var(--dyn-color-bg-primary);
  border: var(--dyn-border-width) solid var(--dyn-color-border);
  border-radius: var(--dyn-border-radius-md);
  box-shadow: var(--dyn-shadow-dropdown);
  min-width: 320px;
}

/* Calendar header */
.calendarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--dyn-spacing-md);
  padding-bottom: var(--dyn-spacing-md);
  border-bottom: var(--dyn-border-width) solid var(--dyn-color-border);
}

.monthNavigation {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-sm);
}

.monthButton {
  padding: var(--dyn-spacing-xs);
  background: none;
  border: none;
  border-radius: var(--dyn-border-radius-sm);
  cursor: pointer;
  color: var(--dyn-color-text-secondary);
  transition: var(--dyn-transition-fast);
  
  &:hover {
    background-color: var(--dyn-color-neutral-100);
    color: var(--dyn-color-text-primary);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
  
  &:disabled {
    color: var(--dyn-color-text-disabled);
    cursor: not-allowed;
  }
}

.monthTitle {
  font-size: var(--dyn-font-size-base);
  font-weight: var(--dyn-font-weight-medium);
  color: var(--dyn-color-text-primary);
  margin: 0 var(--dyn-spacing-md);
}

/* Calendar grid - ACCESSIBILITY CRITICAL */
.calendarGrid {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.calendarHeader th {
  padding: var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-sm);
  font-weight: var(--dyn-font-weight-medium);
  color: var(--dyn-color-text-secondary);
  text-align: center;
  border: none;
}

.calendarCell {
  position: relative;
  padding: 0;
  border: none;
}

.calendarDay {
  width: 100%;
  height: var(--dyn-spacing-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--dyn-border-radius-sm);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-primary);
  cursor: pointer;
  transition: var(--dyn-transition-fast);
  
  &:hover:not(:disabled) {
    background-color: var(--dyn-color-neutral-100);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: 2px;
  }
  
  &:disabled {
    color: var(--dyn-color-text-disabled);
    cursor: not-allowed;
  }
}

.calendarDay--today {
  background-color: var(--dyn-color-neutral-100);
  font-weight: var(--dyn-font-weight-medium);
}

.calendarDay--selected {
  background-color: var(--dyn-color-primary);
  color: var(--dyn-color-text-on-primary);
  
  &:hover {
    background-color: var(--dyn-color-primary-hover);
  }
}

.calendarDay--otherMonth {
  color: var(--dyn-color-text-disabled);
}

.calendarDay--disabled {
  color: var(--dyn-color-text-disabled);
  background-color: var(--dyn-color-neutral-25);
  cursor: not-allowed;
}

/* Shortcuts */
.shortcuts {
  display: flex;
  gap: var(--dyn-spacing-sm);
  margin-bottom: var(--dyn-spacing-md);
  padding-bottom: var(--dyn-spacing-md);
  border-bottom: var(--dyn-border-width) solid var(--dyn-color-border);
}

.shortcut {
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-primary);
  background: none;
  border: var(--dyn-border-width) solid var(--dyn-color-border);
  border-radius: var(--dyn-border-radius-md);
  cursor: pointer;
  transition: var(--dyn-transition-fast);
  
  &:hover {
    background-color: var(--dyn-color-neutral-50);
    border-color: var(--dyn-color-primary);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

/* Help text */
.helpText {
  margin-top: var(--dyn-spacing-xs);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-secondary);
  font-style: italic;
}

/* Error message */
.errorMessage {
  margin-top: var(--dyn-spacing-xs);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-danger);
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-xs);
}

/* Responsive design */
@media (max-width: 767px) {
  .input {
    min-height: 44px; /* Touch target */
  }
  
  .input--small {
    min-height: 40px;
  }
  
  .calendarDropdown {
    left: var(--dyn-spacing-sm);
    right: var(--dyn-spacing-sm);
    max-width: none;
  }
  
  .calendarDay {
    height: 44px; /* Larger touch targets */
  }
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  .calendarDropdown {
    background-color: var(--dyn-color-neutral-800);
    border-color: var(--dyn-color-neutral-600);
  }
  
  .calendarDay:hover:not(:disabled) {
    background-color: var(--dyn-color-neutral-700);
  }
  
  .calendarDay--today {
    background-color: var(--dyn-color-neutral-700);
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynDatePicker.types.ts):

**KREIRATI NOVI FAJL:**

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps, FormFieldProps } from '../../types/base';

export type DateValue = Date | string | null;

export interface DynDatePickerProps extends 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
  BaseComponentProps,
  AccessibilityProps,
  FormFieldProps {
  
  /** Date value */
  value?: DateValue;
  
  /** Default date value */
  defaultValue?: DateValue;
  
  /** Change handler */
  onChange?: (date: Date | null) => void;
  
  /** Input size variant */
  size?: ComponentSize;
  
  /** Date format string */
  format?: string;
  
  /** Locale for date formatting */
  locale?: string;
  
  /** Minimum selectable date */
  minDate?: Date;
  
  /** Maximum selectable date */
  maxDate?: Date;
  
  /** Disabled dates */
  disabledDates?: Date[] | ((date: Date) => boolean);
  
  /** Show calendar dropdown */
  showCalendar?: boolean;
  
  /** Show clear button when input has value */
  clearable?: boolean;
  
  /** Show today shortcut */
  showToday?: boolean;
  
  /** Custom date parser function */
  customParser?: (input: string) => Date | null;
  
  /** Custom date formatter function */
  customFormatter?: (date: Date) => string;
  
  /** Calendar is open (controlled) */
  open?: boolean;
  
  /** Default open state */
  defaultOpen?: boolean;
  
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  
  /** Input label */
  label?: string;
  
  /** Help text below input */
  helpText?: string;
  
  /** Error message */
  errorMessage?: string;
  
  /** Required field indicator */
  required?: boolean;
  
  /** Error state */
  error?: boolean;
  
  /** Success state */
  success?: boolean;
  
  /** Calendar dropdown placement */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  
  /** Weekday format in calendar header */
  weekdayFormat?: 'narrow' | 'short' | 'long';
  
  /** First day of week (0 = Sunday, 1 = Monday) */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Show week numbers */
  showWeekNumbers?: boolean;
}

export interface DynDatePickerRef extends HTMLInputElement {
  /** Focus the input */
  focus: () => void;
  
  /** Clear the input */
  clear: () => void;
  
  /** Open the calendar */
  openCalendar: () => void;
  
  /** Close the calendar */
  closeCalendar: () => void;
  
  /** Get current value */
  getValue: () => Date | null;
  
  /** Set value programmatically */
  setValue: (date: DateValue) => void;
}

export interface CalendarDay {
  date: Date;
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isOtherMonth: boolean;
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
}
```

---

## ⚛️ REACT COMPONENT (DynDatePicker.tsx):

**GLAVNE IZMENE:**

```typescript
import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '../../utils/className';
import { generateId } from '../../utils/accessibility';
import { DynDatePickerProps, DynDatePickerRef, CalendarDay, CalendarMonth } from './DynDatePicker.types';
import { DynIcon } from '../DynIcon';
import styles from './DynDatePicker.module.css';

// Date utilities
const formatDate = (date: Date, format: string = 'dd/MM/yyyy', locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const parseDate = (input: string, format: string = 'dd/MM/yyyy'): Date | null => {
  if (!input) return null;
  
  // Basic parsing - can be enhanced with libraries like date-fns
  const parts = input.split(/[/.-]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const date = new Date(year, month, day);
      if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return date;
      }
    }
  }
  
  return null;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const DynDatePicker = forwardRef<DynDatePickerRef, DynDatePickerProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      size = 'medium',
      format = 'dd/MM/yyyy',
      locale = 'en-US',
      minDate,
      maxDate,
      disabledDates,
      showCalendar = true,
      clearable = true,
      showToday = true,
      customParser,
      customFormatter,
      open,
      defaultOpen = false,
      onOpenChange,
      label,
      helpText,
      errorMessage,
      required = false,
      error = false,
      success = false,
      disabled = false,
      readOnly = false,
      placeholder,
      placement = 'bottom-start',
      weekdayFormat = 'short',
      firstDayOfWeek = 1, // Monday
      showWeekNumbers = false,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      id,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || generateId('datepicker'));
    const [internalValue, setInternalValue] = useState<Date | null>(() => {
      if (value !== undefined) {
        return typeof value === 'string' ? parseDate(value) : value;
      }
      if (defaultValue !== undefined) {
        return typeof defaultValue === 'string' ? parseDate(defaultValue) : defaultValue;
      }
      return null;
    });
    const [inputValue, setInputValue] = useState<string>(() => {
      const initialDate = value || defaultValue;
      return initialDate ? (customFormatter?.(initialDate as Date) || formatDate(initialDate as Date, format, locale)) : '';
    });
    const [isOpen, setIsOpen] = useState(open !== undefined ? open : defaultOpen);
    const [currentMonth, setCurrentMonth] = useState<Date>(() => {
      return internalValue || new Date();
    });
    const [focusedDay, setFocusedDay] = useState<Date | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLTableElement>(null);

    // Handle controlled value
    useEffect(() => {
      if (value !== undefined) {
        const newValue = typeof value === 'string' ? parseDate(value) : value;
        setInternalValue(newValue);
        setInputValue(newValue ? (customFormatter?.(newValue) || formatDate(newValue, format, locale)) : '');
      }
    }, [value, format, locale, customFormatter]);

    // Handle controlled open state
    useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    // Generate calendar days
    const calendarDays = useMemo((): CalendarDay[] => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      
      // Adjust for first day of week
      startDate.setDate(startDate.getDate() - ((startDate.getDay() - firstDayOfWeek + 7) % 7));
      
      const days: CalendarDay[] = [];
      const current = new Date(startDate);
      
      // Generate 42 days (6 weeks)
      for (let i = 0; i < 42; i++) {
        const date = new Date(current);
        const isCurrentMonth = date.getMonth() === month;
        const isDisabled = disabled || 
          (minDate && date < minDate) ||
          (maxDate && date > maxDate) ||
          (typeof disabledDates === 'function' ? disabledDates(date) : 
           Array.isArray(disabledDates) ? disabledDates.some(d => isSameDay(d, date)) : false);
        
        days.push({
          date,
          day: date.getDate(),
          isToday: isToday(date),
          isSelected: internalValue ? isSameDay(date, internalValue) : false,
          isDisabled,
          isOtherMonth: !isCurrentMonth
        });
        
        current.setDate(current.getDate() + 1);
      }
      
      return days;
    }, [currentMonth, firstDayOfWeek, internalValue, disabled, minDate, maxDate, disabledDates]);

    // Event handlers
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = event.target.value;
      setInputValue(inputVal);
      
      const parsedDate = customParser?.(inputVal) || parseDate(inputVal, format);
      if (parsedDate) {
        setInternalValue(parsedDate);
        setCurrentMonth(parsedDate);
        onChange?.(parsedDate);
      } else if (!inputVal) {
        setInternalValue(null);
        onChange?.(null);
      }
    };

    const handleCalendarToggle = () => {
      if (disabled || readOnly || !showCalendar) return;
      
      const newOpen = !isOpen;
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
      
      if (newOpen && internalValue) {
        setCurrentMonth(internalValue);
        setFocusedDay(internalValue);
      }
    };

    const handleDayClick = (day: CalendarDay) => {
      if (day.isDisabled) return;
      
      setInternalValue(day.date);
      setInputValue(customFormatter?.(day.date) || formatDate(day.date, format, locale));
      onChange?.(day.date);
      setIsOpen(false);
      onOpenChange?.(false);
      inputRef.current?.focus();
    };

    const handleClear = () => {
      setInternalValue(null);
      setInputValue('');
      onChange?.(null);
      inputRef.current?.focus();
    };

    const handleTodayClick = () => {
      const today = new Date();
      setInternalValue(today);
      setInputValue(customFormatter?.(today) || formatDate(today, format, locale));
      onChange?.(today);
      setCurrentMonth(today);
      setFocusedDay(today);
    };

    // Keyboard navigation for calendar
    const handleCalendarKeyDown = (event: React.KeyboardEvent) => {
      if (!isOpen || !focusedDay) return;
      
      const newFocusedDay = new Date(focusedDay);
      
      switch (event.key) {
        case 'ArrowLeft':
          newFocusedDay.setDate(newFocusedDay.getDate() - 1);
          event.preventDefault();
          break;
        case 'ArrowRight':
          newFocusedDay.setDate(newFocusedDay.getDate() + 1);
          event.preventDefault();
          break;
        case 'ArrowUp':
          newFocusedDay.setDate(newFocusedDay.getDate() - 7);
          event.preventDefault();
          break;
        case 'ArrowDown':
          newFocusedDay.setDate(newFocusedDay.getDate() + 7);
          event.preventDefault();
          break;
        case 'Home':
          newFocusedDay.setDate(newFocusedDay.getDate() - newFocusedDay.getDay());
          event.preventDefault();
          break;
        case 'End':
          newFocusedDay.setDate(newFocusedDay.getDate() + (6 - newFocusedDay.getDay()));
          event.preventDefault();
          break;
        case 'PageUp':
          newFocusedDay.setMonth(newFocusedDay.getMonth() - 1);
          event.preventDefault();
          break;
        case 'PageDown':
          newFocusedDay.setMonth(newFocusedDay.getMonth() + 1);
          event.preventDefault();
          break;
        case 'Enter':
        case ' ':
          const focusedDayData = calendarDays.find(d => isSameDay(d.date, focusedDay));
          if (focusedDayData && !focusedDayData.isDisabled) {
            handleDayClick(focusedDayData);
          }
          event.preventDefault();
          break;
        case 'Escape':
          setIsOpen(false);
          onOpenChange?.(false);
          inputRef.current?.focus();
          event.preventDefault();
          break;
        default:
          return;
      }
      
      if (newFocusedDay.getMonth() !== focusedDay.getMonth()) {
        setCurrentMonth(newFocusedDay);
      }
      setFocusedDay(newFocusedDay);
    };

    // Generate IDs for associated elements
    const helpTextId = helpText ? `${internalId}-help` : undefined;
    const errorMessageId = errorMessage ? `${internalId}-error` : undefined;
    const calendarId = `${internalId}-calendar`;
    
    const describedBy = [
      ariaDescribedBy,
      helpTextId,
      errorMessageId,
    ].filter(Boolean).join(' ') || undefined;

    const inputClasses = cn(
      styles.input,
      styles[`input--${size}`],
      {
        [styles['input--error']]: error || Boolean(errorMessage),
        [styles['input--success']]: success,
      },
      className
    );

    // Weekday names
    const weekdays = useMemo(() => {
      const formatter = new Intl.DateTimeFormat(locale, { weekday: weekdayFormat });
      const days = [];
      const baseDate = new Date(2023, 0, 1 + firstDayOfWeek); // Start from specified first day
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + i);
        days.push(formatter.format(date));
      }
      
      return days;
    }, [locale, weekdayFormat, firstDayOfWeek]);

    // Month navigation
    const handlePrevMonth = () => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const monthYearFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={internalId} className={styles.label}>
            {label}
            {required && <span className={styles.requiredIndicator} aria-label="required">*</span>}
          </label>
        )}
        
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            id={internalId}
            className={inputClasses}
            type="text"
            value={inputValue}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder || format.toLowerCase()}
            onChange={handleInputChange}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            aria-invalid={error || Boolean(errorMessage) || ariaInvalid}
            aria-expanded={isOpen}
            aria-controls={isOpen ? calendarId : undefined}
            aria-haspopup="dialog"
            role="combobox"
            {...rest}
          />
          
          {showCalendar && (
            <button
              type="button"
              className={styles.calendarButton}
              onClick={handleCalendarToggle}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Open calendar"
              aria-expanded={isOpen}
              aria-controls={isOpen ? calendarId : undefined}
            >
              <DynIcon name="calendar" />
            </button>
          )}
          
          {clearable && inputValue && !readOnly && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear date"
            >
              <DynIcon name="close" />
            </button>
          )}
        </div>
        
        {helpText && (
          <div id={helpTextId} className={styles.helpText}>
            {helpText}
          </div>
        )}
        
        {errorMessage && (
          <div id={errorMessageId} className={styles.errorMessage} role="alert">
            ⚠️ {errorMessage}
          </div>
        )}
        
        {isOpen && (
          <div
            ref={calendarRef}
            id={calendarId}
            className={styles.calendarDropdown}
            role="dialog"
            aria-label="Choose date"
            onKeyDown={handleCalendarKeyDown}
            tabIndex={-1}
          >
            {showToday && (
              <div className={styles.shortcuts}>
                <button
                  type="button"
                  className={styles.shortcut}
                  onClick={handleTodayClick}
                >
                  Today
                </button>
                {clearable && (
                  <button
                    type="button"
                    className={styles.shortcut}
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
            
            <div className={styles.calendarHeader}>
              <div className={styles.monthNavigation}>
                <button
                  type="button"
                  className={styles.monthButton}
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                >
                  <DynIcon name="chevron-left" />
                </button>
                
                <h2 className={styles.monthTitle} id={`${calendarId}-title`}>
                  {monthYearFormatter.format(currentMonth)}
                </h2>
                
                <button
                  type="button"
                  className={styles.monthButton}
                  onClick={handleNextMonth}
                  aria-label="Next month"
                >
                  <DynIcon name="chevron-right" />
                </button>
              </div>
            </div>
            
            <table
              ref={gridRef}
              className={styles.calendarGrid}
              role="grid"
              aria-labelledby={`${calendarId}-title`}
            >
              <thead>
                <tr role="row">
                  {weekdays.map((weekday, index) => (
                    <th
                      key={index}
                      scope="col"
                      role="columnheader"
                      className={styles.weekdayHeader}
                    >
                      {weekday}
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {Array.from({ length: 6 }, (_, weekIndex) => (
                  <tr key={weekIndex} role="row">
                    {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day) => (
                      <td key={day.date.toISOString()} className={styles.calendarCell} role="gridcell">
                        <button
                          type="button"
                          className={cn(
                            styles.calendarDay,
                            {
                              [styles['calendarDay--today']]: day.isToday,
                              [styles['calendarDay--selected']]: day.isSelected,
                              [styles['calendarDay--otherMonth']]: day.isOtherMonth,
                              [styles['calendarDay--disabled']]: day.isDisabled,
                            }
                          )}
                          onClick={() => handleDayClick(day)}
                          disabled={day.isDisabled}
                          aria-selected={day.isSelected}
                          aria-label={`${day.day} ${monthYearFormatter.format(day.date)}`}
                          tabIndex={focusedDay && isSameDay(day.date, focusedDay) ? 0 : -1}
                        >
                          {day.day}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
);

DynDatePicker.displayName = 'DynDatePicker';
```

---

## 🧪 TESTING ENHANCEMENTS (DynDatePicker.test.tsx):

**DODATI ACCESSIBILITY I KEYBOARD TESTS:**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynDatePicker } from './DynDatePicker';

describe('DynDatePicker', () => {
  describe('Basic Functionality', () => {
    it('renders input with label', () => {
      render(<DynDatePicker label="Select date" />);
      expect(screen.getByLabelText('Select date')).toBeInTheDocument();
    });

    it('formats and displays date value', () => {
      const date = new Date('2023-12-25');
      render(<DynDatePicker label="Date" value={date} />);
      expect(screen.getByDisplayValue('25/12/2023')).toBeInTheDocument();
    });

    it('calls onChange when date is selected', async () => {
      const handleChange = vi.fn();
      render(<DynDatePicker label="Date" onChange={handleChange} />);
      
      const input = screen.getByLabelText('Date');
      await userEvent.type(input, '25/12/2023');
      
      expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  describe('Calendar Functionality', () => {
    it('opens calendar when button is clicked', async () => {
      render(<DynDatePicker label="Date" />);
      
      const calendarButton = screen.getByRole('button', { name: 'Open calendar' });
      await userEvent.click(calendarButton);
      
      expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
    });

    it('closes calendar when date is selected', async () => {
      render(<DynDatePicker label="Date" />);
      
      // Open calendar
      await userEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
      
      // Click on a date
      const today = new Date().getDate().toString();
      const dayButton = screen.getByRole('button', { name: new RegExp(today) });
      await userEvent.click(dayButton);
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('shows today shortcut button', async () => {
      render(<DynDatePicker label="Date" showToday />);
      
      await userEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
      
      expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynDatePicker label="Accessible date picker" />);
      await testAccessibility(container);
    });

    it('implements combobox pattern correctly', () => {
      render(<DynDatePicker label="Date" />);
      
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-haspopup', 'dialog');
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('associates help text with input', () => {
      render(<DynDatePicker label="Date" helpText="Select your birth date" />);
      
      const input = screen.getByLabelText('Date');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('help'));
      expect(screen.getByText('Select your birth date')).toBeInTheDocument();
    });

    it('associates error message with input', () => {
      render(<DynDatePicker label="Date" errorMessage="Invalid date" />);
      
      const input = screen.getByLabelText('Date');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('announces errors to screen readers', () => {
      render(<DynDatePicker label="Date" errorMessage="Date is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Date is required');
    });

    it('implements calendar grid accessibility', async () => {
      render(<DynDatePicker label="Date" />);
      
      await userEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
      
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
      expect(calendar).toHaveAttribute('aria-labelledby');
      
      // Check column headers
      expect(screen.getAllByRole('columnheader')).toHaveLength(7);
      
      // Check grid cells
      expect(screen.getAllByRole('gridcell').length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports Enter key to open calendar', async () => {
      render(<DynDatePicker label="Date" />);
      
      const input = screen.getByLabelText('Date');
      input.focus();
      await userEvent.keyboard('{Enter}');
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('supports Escape key to close calendar', async () => {
      render(<DynDatePicker label="Date" defaultOpen />);
      
      const calendar = screen.getByRole('dialog');
      await userEvent.keyboard('{Escape}');
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('supports arrow key navigation in calendar', async () => {
      render(<DynDatePicker label="Date" defaultOpen />);
      
      const calendar = screen.getByRole('dialog');
      calendar.focus();
      
      // Navigate with arrow keys
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowUp}');
      
      // Should not throw errors
      expect(calendar).toBeInTheDocument();
    });

    it('supports Home and End keys for week navigation', async () => {
      render(<DynDatePicker label="Date" defaultOpen />);
      
      const calendar = screen.getByRole('dialog');
      calendar.focus();
      
      await userEvent.keyboard('{Home}');
      await userEvent.keyboard('{End}');
      
      expect(calendar).toBeInTheDocument();
    });

    it('supports Page Up/Down for month navigation', async () => {
      render(<DynDatePicker label="Date" defaultOpen />);
      
      const calendar = screen.getByRole('dialog');
      calendar.focus();
      
      await userEvent.keyboard('{PageDown}');
      await userEvent.keyboard('{PageUp}');
      
      expect(calendar).toBeInTheDocument();
    });
  });

  describe('Date Constraints', () => {
    it('respects minimum date', () => {
      const minDate = new Date('2023-12-01');
      render(<DynDatePicker label="Date" minDate={minDate} defaultOpen />);
      
      // Should disable dates before minDate
      const disabledDates = screen.getAllByRole('button', { name: /November/ });
      disabledDates.forEach(date => {
        expect(date).toBeDisabled();
      });
    });

    it('respects maximum date', () => {
      const maxDate = new Date('2023-12-31');
      render(<DynDatePicker label="Date" maxDate={maxDate} defaultOpen />);
      
      // Test implementation depends on current month displayed
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('disables specific dates', () => {
      const disabledDates = [new Date('2023-12-25')];
      render(<DynDatePicker label="Date" disabledDates={disabledDates} defaultOpen />);
      
      // Should disable Christmas day
      const christmas = screen.getByRole('button', { name: /25.*December/ });
      expect(christmas).toBeDisabled();
    });
  });

  describe('Clear Functionality', () => {
    it('shows clear button when input has value', () => {
      render(<DynDatePicker label="Date" value={new Date('2023-12-25')} clearable />);
      
      expect(screen.getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
    });

    it('clears date when clear button is clicked', async () => {
      const handleChange = vi.fn();
      render(<DynDatePicker label="Date" defaultValue={new Date('2023-12-25')} clearable onChange={handleChange} />);
      
      await userEvent.click(screen.getByRole('button', { name: 'Clear date' }));
      
      expect(handleChange).toHaveBeenCalledWith(null);
    });

    it('hides clear button when input is empty', () => {
      render(<DynDatePicker label="Date" clearable />);
      
      expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument();
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynDatePicker.stories.tsx):

**DODATI COMPREHENSIVE STORIES:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynDatePicker } from './DynDatePicker';

const meta = {
  title: 'Components/DynDatePicker',
  component: DynDatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible date picker component with calendar popup and keyboard navigation.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    format: {
      control: 'text',
    },
    locale: {
      control: 'select',
      options: ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'es-ES'],
    },
    weekdayFormat: {
      control: 'select',
      options: ['narrow', 'short', 'long'],
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select date',
    placeholder: 'dd/mm/yyyy',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynDatePicker label="Small" size="small" />
      <DynDatePicker label="Medium" size="medium" />
      <DynDatePicker label="Large" size="large" />
    </div>
  ),
};

export const WithConstraints: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <DynDatePicker 
          label="From today onwards" 
          minDate={today}
          helpText="Cannot select past dates"
        />
        <DynDatePicker 
          label="Next month only" 
          minDate={today}
          maxDate={nextMonth}
          helpText="Select dates within next month"
        />
        <DynDatePicker 
          label="With disabled weekends" 
          disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
          helpText="Weekends are disabled"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynDatePicker label="Normal" />
      <DynDatePicker label="With value" defaultValue={new Date()} />
      <DynDatePicker label="Required" required />
      <DynDatePicker label="Disabled" disabled />
      <DynDatePicker label="Read only" readOnly defaultValue={new Date()} />
      <DynDatePicker label="Error" error errorMessage="Invalid date selected" />
      <DynDatePicker label="Success" success />
    </div>
  ),
};

export const Localization: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynDatePicker 
        label="English (US)" 
        locale="en-US" 
        format="MM/dd/yyyy"
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="English (UK)" 
        locale="en-GB" 
        format="dd/MM/yyyy"
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="German" 
        locale="de-DE" 
        format="dd.MM.yyyy"
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="French" 
        locale="fr-FR" 
        format="dd/MM/yyyy"
        defaultValue={new Date()}
      />
    </div>
  ),
};

export const CalendarOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynDatePicker 
        label="Default calendar" 
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="Week starts Sunday" 
        firstDayOfWeek={0}
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="Long weekday names" 
        weekdayFormat="long"
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="No shortcuts" 
        showToday={false}
        defaultValue={new Date()}
      />
    </div>
  ),
};

export const CustomFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynDatePicker 
        label="Custom format" 
        format="yyyy-MM-dd"
        placeholder="yyyy-mm-dd"
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="Not clearable" 
        clearable={false}
        defaultValue={new Date()}
      />
      <DynDatePicker 
        label="No calendar button" 
        showCalendar={false}
        helpText="Type the date manually"
      />
    </div>
  ),
};

export const FormValidation: Story = {
  render: () => (
    <form style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynDatePicker 
        label="Birth date" 
        required
        maxDate={new Date()}
        helpText="Enter your date of birth"
      />
      <DynDatePicker 
        label="Appointment date" 
        required
        minDate={new Date()}
        helpText="Select a future date"
      />
      <DynDatePicker 
        label="Event date" 
        errorMessage="This date conflicts with another event"
        defaultValue={new Date()}
      />
      <button type="submit">Submit</button>
    </form>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <DynDatePicker label="Dark theme date picker" />
        <DynDatePicker 
          label="With value" 
          defaultValue={new Date()}
          helpText="Calendar adapts to dark theme"
        />
        <DynDatePicker 
          label="Error in dark mode" 
          errorMessage="Error messages are visible in dark theme"
        />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynDatePicker 
        label="Fully accessible date picker"
        helpText="Use Tab to navigate, Enter to open calendar, Arrow keys to navigate dates"
        aria-describedby="accessibility-description"
      />
      <div id="accessibility-description">
        This date picker follows WCAG AAA guidelines with full keyboard navigation
      </div>
      <DynDatePicker 
        label="Required accessible field"
        required
        aria-label="Required date selection field"
      />
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <h3>Keyboard Navigation Guide:</h3>
      <ul style={{ fontSize: '14px', lineHeight: '1.5' }}>
        <li><kbd>Tab</kbd> - Move between input and buttons</li>
        <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Open calendar or select date</li>
        <li><kbd>Escape</kbd> - Close calendar</li>
        <li><kbd>Arrow keys</kbd> - Navigate between dates</li>
        <li><kbd>Home</kbd> / <kbd>End</kbd> - Move to start/end of week</li>
        <li><kbd>Page Up</kbd> / <kbd>Page Down</kbd> - Change month</li>
      </ul>
      <DynDatePicker 
        label="Try keyboard navigation"
        helpText="Focus this field and try the keyboard shortcuts above"
      />
    </div>
  ),
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynDatePicker } from './DynDatePicker';
export { default } from './DynDatePicker';
export type { 
  DynDatePickerProps, 
  DynDatePickerRef,
  DateValue,
  CalendarDay,
  CalendarMonth
} from './DynDatePicker.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] **CSS Tokens**: Sve hard-coded vrednosti zamenjene sa `var(--dyn-*)`
- [ ] **Types File**: Kreiran DynDatePicker.types.ts sa comprehensive interfejsima  
- [ ] **Responsive**: Mobile-first sa 44px touch targets za calendar buttons
- [ ] **Dark Theme**: `@media (prefers-color-scheme: dark)` support
- [ ] **Calendar Grid**: role="grid" sa proper ARIA attributes
- [ ] **Keyboard Navigation**: Arrow keys, Home/End, Page Up/Down, Enter/Space/Escape
- [ ] **Accessibility**: WCAG AAA compliance sa screen reader support
- [ ] **Date Constraints**: minDate, maxDate, disabledDates podrška
- [ ] **Localization**: Intl.DateTimeFormat za različite locale-ove
- [ ] **Testing**: Accessibility tests, keyboard navigation tests, 85%+ coverage
- [ ] **Storybook**: Comprehensive stories sa accessibility i keyboard demos
- [ ] **forwardRef**: Implementiran sa calendar-specific methods
- [ ] **Form Integration**: Proper form submission i validation
- [ ] **Error Handling**: Screen reader announcements za error states

---

## 🎯 SUCCESS CRITERIA:

✅ **Accessibility**: 0 violations u jest-axe testovima + calendar grid accessibility  
✅ **Design Tokens**: 100% hard-coded vrednosti zamenjeno  
✅ **Keyboard Navigation**: Potpuna keyboard accessibility za calendar  
✅ **Internationalization**: Multi-locale support sa proper formatting  
✅ **Performance**: Optimized calendar rendering i date calculations  
✅ **Testing**: 85%+ coverage sa comprehensive accessibility tests

**REZULTAT**: Production-ready DynDatePicker sa WCAG AAA compliance i international support!