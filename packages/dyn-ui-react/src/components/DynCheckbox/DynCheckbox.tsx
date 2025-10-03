/**
 * DynCheckbox - Advanced checkbox component with indeterminate state
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
import type { DynCheckboxProps, DynFieldRef } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import './DynCheckbox.module.scss';

export const DynCheckbox = forwardRef<DynFieldRef, DynCheckboxProps>(
  (
    {
      name,
      label,
      help,
      disabled = false,
      readonly = false,
      required = false,
      optional = false,
      visible = true,
      checked: propChecked = false,
      indeterminate = false,
      errorMessage,
      validation,
      className,
      size = 'medium',
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [checked, setChecked] = useState<boolean>(propChecked);
    const checkboxRef = useRef<HTMLInputElement>(null);

    const { error, validate, clearError } = useDynFieldValidation({
      value: checked,
      required,
      validation,
      customError: errorMessage
    });

    useImperativeHandle(ref, () => ({
      focus: () => checkboxRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setChecked(false);
        onChange?.(false);
        clearError();
      },
      getValue: () => checked,
      setValue: (newValue: any) => {
        const booleanValue = Boolean(newValue);
        setChecked(booleanValue);
        onChange?.(booleanValue);
      }
    }));

    useEffect(() => {
      setChecked(propChecked);
    }, [propChecked]);

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!readonly) {
        const newValue = e.target.checked;
        setChecked(newValue);
        onChange?.(newValue);
        clearError();
      }
    };

    const handleBlur = () => {
      validate();
      onBlur?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!disabled && !readonly) {
          const newValue = !checked;
          setChecked(newValue);
          onChange?.(newValue);
          clearError();
        }
      }
    };

    if (!visible) return null;

    const checkboxClasses = classNames(
      'dyn-checkbox',
      `dyn-checkbox--${size}`,
      {
        'dyn-checkbox--checked': checked && !indeterminate,
        'dyn-checkbox--indeterminate': indeterminate,
        'dyn-checkbox--error': !!error,
        'dyn-checkbox--disabled': disabled,
        'dyn-checkbox--readonly': readonly
      }
    );

    const containerClasses = classNames(
      'dyn-checkbox-container',
      {
        'dyn-checkbox-container--disabled': disabled,
        'dyn-checkbox-container--readonly': readonly
      },
      className
    );

    return (
      <DynFieldContainer
        helpText={help}
        required={required}
        optional={optional}
        errorText={error}
        className={containerClasses}
      >
        <label className="dyn-checkbox-wrapper">
          <input
            ref={checkboxRef}
            type="checkbox"
            id={name}
            name={name}
            className="dyn-checkbox-input"
            checked={checked}
            disabled={disabled}
            readOnly={readonly}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          
          <span className={checkboxClasses}>
            <span className="dyn-checkbox-checkmark">
              {indeterminate ? (
                <span className="dyn-checkbox-indeterminate-mark">-</span>
              ) : checked ? (
                <span className="dyn-checkbox-check-mark">✓</span>
              ) : null}
            </span>
          </span>
          
          {label && (
            <span className="dyn-checkbox-label">
              {label}
            </span>
          )}
        </label>
      </DynFieldContainer>
    );
  }
);

DynCheckbox.displayName = 'DynCheckbox';

export default DynCheckbox;
