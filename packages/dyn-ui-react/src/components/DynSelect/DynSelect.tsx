/**
 * DynSelect - Advanced select component with search and virtual scrolling
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo
} from 'react';
import classNames from 'classnames';
import type { DynSelectProps, DynFieldRef, SelectOption } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { DynIcon } from '../DynIcon';
import './DynSelect.module.css';

export const DynSelect = forwardRef<DynFieldRef, DynSelectProps>(
  (
    {
      name,
      label,
      help,
      placeholder = 'Selecione...',
      disabled = false,
      readonly = false,
      required = false,
      optional = false,
      visible = true,
      value: propValue,
      errorMessage,
      validation,
      className,
      options = [],
      multiple = false,
      searchable = false,
      virtualScroll = false,
      loading = false,
      size = 'medium',
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [value, setValue] = useState<string | string[]>(propValue || (multiple ? [] : ''));
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focused, setFocused] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation,
      customError: errorMessage
    });

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setValue(multiple ? [] : '');
        onChange?.(multiple ? [] : '');
        clearError();
      },
      getValue: () => value,
      setValue: (newValue: any) => {
        setValue(newValue);
        onChange?.(newValue);
      }
    }));

    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    const selectedOptions = useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter(option => value.includes(option.value));
      } else if (!multiple) {
        return options.find(option => option.value === value) || null;
      }
      return null;
    }, [options, value, multiple]);

    useEffect(() => {
      setValue(propValue || (multiple ? [] : ''));
    }, [propValue, multiple]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleToggle = () => {
      if (!disabled && !readonly) {
        setIsOpen(prev => !prev);
        if (!isOpen) {
          inputRef.current?.focus();
        }
      }
    };

    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple && Array.isArray(value)) {
        const newValue = value.includes(option.value)
          ? value.filter(v => v !== option.value)
          : [...value, option.value];
        setValue(newValue);
        onChange?.(newValue);
      } else {
        setValue(option.value);
        onChange?.(option.value);
        setIsOpen(false);
        setSearchTerm('');
      }

      clearError();
    };

    const handleRemoveOption = (optionValue: any, event: React.MouseEvent) => {
      event.stopPropagation();
      if (multiple && Array.isArray(value)) {
        const newValue = value.filter(v => v !== optionValue);
        setValue(newValue);
        onChange?.(newValue);
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        default:
          break;
      }
    };

    if (!visible) return null;

    const resolvedError = errorMessage ?? (error || undefined);

    const selectClasses = classNames(
      'dyn-select',
      `dyn-select--${size}`,
      {
        'dyn-select--open': isOpen,
        'dyn-select--focused': focused,
        'dyn-select--error': Boolean(resolvedError),
        'dyn-select--disabled': disabled,
        'dyn-select--readonly': readonly,
        'dyn-select--searchable': searchable,
        'dyn-select--multiple': multiple,
        'dyn-select--loading': loading
      }
    );

    const getDisplayText = () => {
      if (loading) return 'Carregando...';

      if (multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        return `${selectedOptions.length} selecionado(s)`;
      } else if (!multiple && selectedOptions) {
        return (selectedOptions as SelectOption).label;
      }

      return placeholder;
    };

    const showPlaceholder = !selectedOptions ||
      (multiple && Array.isArray(selectedOptions) && selectedOptions.length === 0);

    return (
      <DynFieldContainer
        label={label}
        helpText={help}
        required={required}
        optional={optional}
        errorText={resolvedError}
        className={className}
        htmlFor={name}
      >
        <div ref={selectRef} className="dyn-select-container">
          <div
            className={selectClasses}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-invalid={Boolean(resolvedError)}
            aria-describedby={
              resolvedError ? `${name}-error` : help ? `${name}-help` : undefined
            }
            onBlur={handleBlur}
            onFocus={handleFocus}
          >
            <input
              ref={inputRef}
              type="hidden"
              id={name}
              name={name}
              value={multiple && Array.isArray(value) ? value.join(',') : value || ''}
            />

            <div className="dyn-select-content">
              {multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0 ? (
                <div className="dyn-select-tags">
                  {selectedOptions.map((option) => (
                    <span key={option.value} className="dyn-select-tag">
                      {option.label}
                      <button
                        type="button"
                        className="dyn-select-tag-remove"
                        onClick={(e) => handleRemoveOption(option.value, e)}
                        aria-label={`Remover ${option.label}`}
                      >
                        <DynIcon icon="dyn-icon-close" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className={classNames('dyn-select-text', {
                  'dyn-select-placeholder': showPlaceholder
                })}>
                  {getDisplayText()}
                </span>
              )}
            </div>

            <div className="dyn-select-arrow">
              <DynIcon
                icon={loading ? "dyn-icon-loading" : "dyn-icon-arrow-down"}
                className={classNames({
                  'dyn-select-arrow--up': isOpen && !loading
                })}
              />
            </div>
          </div>

          {isOpen && (
            <div className="dyn-select-dropdown">
              {searchable && (
                <div className="dyn-select-search">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="dyn-select-search-input"
                  />
                </div>
              )}

              <div className="dyn-select-options" role="listbox">
                {filteredOptions.length === 0 ? (
                  <div className="dyn-select-empty">
                    {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhuma opção disponível'}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = multiple && Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;

                    return (
                      <div
                        key={option.value}
                        className={classNames('dyn-select-option', {
                          'dyn-select-option--selected': isSelected,
                          'dyn-select-option--disabled': option.disabled
                        })}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {multiple && (
                          <span className={classNames('dyn-select-checkbox', {
                            'dyn-select-checkbox--checked': isSelected
                          })}>
                            {isSelected && <DynIcon icon="dyn-icon-check" />}
                          </span>
                        )}
                        <span className="dyn-select-option-text">{option.label}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </DynFieldContainer>
    );
  }
);

DynSelect.displayName = 'DynSelect';

export default DynSelect;
