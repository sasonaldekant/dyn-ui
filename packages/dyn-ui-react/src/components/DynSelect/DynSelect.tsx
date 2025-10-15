import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynSelect.module.scss';

// Types kept local to avoid breaking public API; align to DynAvatar patterns
export type DynSelectOption = { value: string; label: string; disabled?: boolean };
export interface DynSelectProps {
  options: DynSelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'data-testid'?: string;
}
export interface DynSelectRef { focus: () => void; blur: () => void; open: () => void; close: () => void; }

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynSelect = forwardRef<DynSelectRef, DynSelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      placeholder = 'Select…',
      disabled,
      onChange,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || generateId('select'));
    const isControlled = value !== undefined;
    const [current, setCurrent] = useState<string | undefined>(value ?? defaultValue);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(() => {
      const idx = options.findIndex(o => o.value === (value ?? defaultValue));
      return idx >= 0 ? idx : 0;
    });

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const listboxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => { if (isControlled) setCurrent(value); }, [isControlled, value]);
    useEffect(() => {
      if (!open) return;
      const el = document.getElementById(`${internalId}-option-${activeIndex}`);
      el?.scrollIntoView?.({ block: 'nearest' });
    }, [open, activeIndex, internalId]);

    const selectedOption = useMemo(() => options.find(o => o.value === current), [options, current]);

    const setSelected = (val: string) => {
      if (!isControlled) setCurrent(val);
      onChange?.(val);
    };

    const openList = () => { if (!disabled) setOpen(true); };
    const closeList = () => setOpen(false);
    const toggleList = () => (open ? closeList() : openList());

    const moveActive = (delta: number) => {
      if (!options.length) return;
      const len = options.length;
      let idx = activeIndex;
      for (let i = 0; i < len; i++) {
        idx = (idx + delta + len) % len;
        if (!options[idx]?.disabled) { setActiveIndex(idx); break; }
      }
    };

    const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          if (!open) openList();
          moveActive(e.key === 'ArrowDown' ? 1 : -1);
          break;
        case 'Enter':
        case ' ': // Space
          e.preventDefault();
          if (!open) openList(); else selectActive();
          break;
        case 'Escape':
          if (open) { e.preventDefault(); closeList(); }
          break;
        case 'Home':
          e.preventDefault(); setActiveIndex(0); if (!open) openList();
          break;
        case 'End':
          e.preventDefault(); setActiveIndex(Math.max(0, options.length - 1)); if (!open) openList();
          break;
        default:
          // typeahead: jump to first option starting with typed char
          if (e.key.length === 1 && /\S/.test(e.key)) {
            const ch = e.key.toLowerCase();
            const start = (activeIndex + 1) % options.length;
            const seq = [...options.slice(start), ...options.slice(0, start)];
            const found = seq.findIndex(o => !o.disabled && o.label.toLowerCase().startsWith(ch));
            if (found >= 0) setActiveIndex((start + found) % options.length);
          }
          break;
      }
    };

    const selectActive = () => {
      const opt = options[activeIndex];
      if (!opt || opt.disabled) return;
      setSelected(opt.value);
      closeList();
      triggerRef.current?.focus();
    };

    const onListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); moveActive(1); break;
        case 'ArrowUp': e.preventDefault(); moveActive(-1); break;
        case 'Home': e.preventDefault(); setActiveIndex(0); break;
        case 'End': e.preventDefault(); setActiveIndex(Math.max(0, options.length - 1)); break;
        case 'Enter':
        case ' ': e.preventDefault(); selectActive(); break;
        case 'Escape': e.preventDefault(); closeList(); triggerRef.current?.focus(); break;
      }
    };

    // activedescendant points to option id when open
    const activeOptionId = open ? `${internalId}-option-${activeIndex}` : undefined;
    const listboxId = `${internalId}-listbox`;

    return (
      <div className={cn(getStyleClass('root'), className)} data-testid={dataTestId || 'dyn-select'} {...rest}>
        <button
          ref={triggerRef}
          id={internalId}
          type="button"
          role="combobox"
          className={getStyleClass('trigger')}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          onClick={toggleList}
          onKeyDown={onTriggerKeyDown}
          disabled={disabled}
        >
          <span className={getStyleClass('trigger__label')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={getStyleClass('trigger__icon')} aria-hidden="true" />
        </button>

        {open && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            className={getStyleClass('listbox')}
            tabIndex={-1}
            onKeyDown={onListKeyDown}
          >
            {options.map((opt, idx) => {
              const selected = current === opt.value;
              const active = idx === activeIndex;
              return (
                <div
                  id={`${internalId}-option-${idx}`}
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={opt.disabled || undefined}
                  className={cn(
                    getStyleClass('option'),
                    selected && getStyleClass('option--selected'),
                    active && getStyleClass('option--active'),
                    opt.disabled && getStyleClass('option--disabled')
                  )}
                  onMouseEnter={() => !opt.disabled && setActiveIndex(idx)}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { if (!opt.disabled) { setActiveIndex(idx); setSelected(opt.value); closeList(); triggerRef.current?.focus(); }}}
                >
                  <span className={getStyleClass('option__label')}>{opt.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* SR announcements */}
        <span className="dyn-sr-only" aria-live="polite">
          {open ? 'List opened' : 'List closed'}
        </span>
      </div>
    );
  }
);

export default DynSelect;
DynSelect.displayName = 'DynSelect';
