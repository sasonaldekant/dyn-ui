import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynListView.module.css';
import type { DynListViewProps } from './DynListView.types';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynListView = forwardRef<HTMLDivElement, DynListViewProps>(function DynListView(
  {
    items,
    value,
    defaultValue,
    multiSelect = false,
    disabled = false,
    onChange,
    className,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId,
    ...rest
  }, ref) {
  const [internalId] = useState(() => id || generateId('listview'));
  const isControlled = value !== undefined;
  const [selected, setSelected] = useState<string[] | string | undefined>(
    value ?? (multiSelect ? [] : defaultValue)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { if (isControlled) setSelected(value as any); }, [isControlled, value]);

  const itemIds = useMemo(() => items.map((_, i) => `${internalId}-option-${i}`), [items, internalId]);
  const listboxId = `${internalId}-listbox`;

  const isSelected = (val: string) => {
    return multiSelect ? Array.isArray(selected) && selected.includes(val) : selected === val;
  };

  const commit = (vals: string[] | string) => {
    if (!isControlled) setSelected(vals as any);
    onChange?.(vals as any);
  };

  const toggle = (val: string) => {
    if (multiSelect) {
      const current = Array.isArray(selected) ? selected : [];
      const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
      commit(next);
    } else {
      commit(val);
    }
  };

  const moveActive = (delta: number) => {
    const count = items.length; if (!count) return;
    setActiveIndex(idx => (idx + delta + count) % count);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); moveActive(1); break;
      case 'ArrowUp': e.preventDefault(); moveActive(-1); break;
      case 'Home': e.preventDefault(); setActiveIndex(0); break;
      case 'End': e.preventDefault(); setActiveIndex(Math.max(0, items.length - 1)); break;
      case 'PageDown': e.preventDefault(); moveActive(5); break;
      case 'PageUp': e.preventDefault(); moveActive(-5); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const val = items[activeIndex]?.value;
        if (val) toggle(val);
        break;
      }
      case 'Escape':
        // allow parent to close popover if used inside
        break;
    }
  };

  return (
    <div
      ref={ref}
      id={internalId}
      role="listbox"
      aria-multiselectable={multiSelect || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-activedescendant={itemIds[activeIndex]}
      className={cn(getStyleClass('root'), className)}
      data-testid={dataTestId || 'dyn-listview'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {items.map((it, i) => {
        const selectedState = isSelected(it.value);
        return (
          <div
            key={it.value}
            id={itemIds[i]}
            role="option"
            aria-selected={selectedState}
            className={cn(
              getStyleClass('option'),
              selectedState && getStyleClass('option--selected'),
              i === activeIndex && getStyleClass('option--active')
            )}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggle(it.value)}
          >
            <span className={getStyleClass('option__label')}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
});

export default DynListView;
