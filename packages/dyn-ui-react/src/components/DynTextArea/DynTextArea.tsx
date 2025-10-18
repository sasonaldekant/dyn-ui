/**
 * DynTextArea - Advanced textarea component with character counting and auto-resize
 * Part of DYN UI Form Components Group - Extended for AccountingOnline ERP
 * Created: 2025-10-18
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

import type { DynTextAreaProps, DynFieldRef } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';

export const DynTextArea = forwardRef<DynFieldRef, DynTextAreaProps>(
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
      rows = 3,
      cols,
      resize = 'vertical',
      autoResize = false,
      maxLength,
      minLength,
      showCharacterCount = false,
      wrap = 'soft',
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(propValue);
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // Generate stable id for the textarea when not provided
    const generatedIdRef = useRef<string>(`dyn-textarea-${Math.random().toString(36).slice(2, 9)}`);
    const textareaId = id ?? name ?? generatedIdRef.current;

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation,
      customError: errorMessage
    });

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setValue('');
        onChange?.('');
        clearError();
      },
      getValue: () => value,
      setValue: (newValue: any) => {
        const stringValue = String(newValue);
        setValue(stringValue);
        onChange?.(stringValue);
      }
    }));

    useEffect(() => {
      setValue(propValue);
    }, [propValue]);

    // Auto-resize functionality
    const handleAutoResize = useCallback(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    useEffect(() => {
      if (autoResize) {
        handleAutoResize();
      }
    }, [value, autoResize, handleAutoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      // Enforce maxLength if set
      if (maxLength && newValue.length > maxLength) {
        return;
      }
      
      setValue(newValue);
      onChange?.(newValue);
      clearError();
      
      // Trigger auto-resize if enabled
      if (autoResize) {
        handleAutoResize();
      }
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

    if (!visible) return null;

    const textareaClasses = classNames(
      'dyn-textarea',
      {
        'dyn-textarea--focused': focused,
        'dyn-textarea--error': !!error,
        'dyn-textarea--disabled': disabled,
        'dyn-textarea--readonly': readonly,
        'dyn-textarea--auto-resize': autoResize,
        [`dyn-textarea--resize-${resize}`]: resize !== 'vertical'
      }
    );

    const containerDivClass = classNames('dyn-textarea-container', className);
    
    // Character count display
    const characterCount = value.length;
    const showCount = showCharacterCount || maxLength;
    
    const renderCharacterCount = () => {
      if (!showCount) return null;
      
      const countClasses = classNames(
        'dyn-textarea-character-count',
        {
          'dyn-textarea-character-count--warning': maxLength && characterCount > maxLength * 0.8,
          'dyn-textarea-character-count--error': maxLength && characterCount >= maxLength
        }
      );
      
      return (
        <div className={countClasses}>
          {maxLength ? `${characterCount}/${maxLength}` : characterCount}
        </div>
      );
    };

    return (
      <DynFieldContainer
        label={label}
        helpText={help}
        required={required}
        optional={optional}
        errorText={error}
        className={className}
        htmlFor={textareaId}
        id={id}
      >
        <div className={containerDivClass}>
          <textarea
            ref={textareaRef}
            id={textareaId}
            name={name}
            className={textareaClasses}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            rows={rows}
            cols={cols}
            minLength={minLength}
            maxLength={maxLength}
            wrap={wrap}
            aria-required={required}
            aria-disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{
              resize: autoResize ? 'none' : resize
            }}
          />
          {renderCharacterCount()}
        </div>
      </DynFieldContainer>
    );
  }
);

DynTextArea.displayName = 'DynTextArea';

export default DynTextArea;
