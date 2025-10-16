import React, { useMemo, useRef, useState, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynTabs.module.css';
import type { DynTabsProps, DynTabsRef, DynTabItem } from './DynTabs.types';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

/**
 * DynTabs — standardized per DynAvatar gold patterns: a11y, ids, focus mgmt, memoization.
 */
export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>(
  (
    {
      items,
      value,
      defaultValue,
      onChange,
      orientation = 'horizontal',
      activation = 'auto',
      fitted = false,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || generateId('tabs'));
    const isControlled = value !== undefined;
    const [current, setCurrent] = useState<string | undefined>(
      value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : items?.[0]?.value !== undefined ? String(items[0].value) : undefined
    );

    useEffect(() => {
      if (isControlled) setCurrent(value);
    }, [isControlled, value]);

    const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const onSelect = (val: string, focusPanel = false) => {
      if (!isControlled) setCurrent(val);
      onChange?.(val);
      if (focusPanel) {
        const panel = document.getElementById(`${internalId}-panel-${val}`);
        panel?.focus?.();
      }
    };

    const currentIndex = useMemo(() => items.findIndex(i => i.value === current), [items, current]);

    const focusTabByOffset = (delta: number) => {
      if (!items.length) return;
      const count = items.length;
      let idx = currentIndex;
      if (idx < 0) idx = 0;
      const next = (idx + delta + count) % count;
      const nextItem = items[next];
      if (nextItem?.disabled) return; // simple guard; could loop to next enabled if needed
      if (nextItem?.value) {
        onSelect(nextItem.value);
      }
      tabsRef.current[next]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const isH = orientation === 'horizontal';
      switch (e.key) {
        case 'ArrowRight':
          if (isH) { e.preventDefault(); focusTabByOffset(1); }
          break;
        case 'ArrowLeft':
          if (isH) { e.preventDefault(); focusTabByOffset(-1); }
          break;
        case 'ArrowDown':
          if (!isH) { e.preventDefault(); focusTabByOffset(1); }
          break;
        case 'ArrowUp':
          if (!isH) { e.preventDefault(); focusTabByOffset(-1); }
          break;
        case 'Home':
          e.preventDefault();
          if (items[0]?.value) {
            onSelect(items[0].value);
          }
          tabsRef.current[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          onSelect(items[items.length - 1].value);
          tabsRef.current[items.length - 1]?.focus();
          break;
        case 'Enter':
        case ' ': // Space
          if (activation === 'manual') {
            e.preventDefault();
            const target = e.target as HTMLButtonElement;
            const val = target.getAttribute('data-value');
            if (val) onSelect(val, true);
          }
          break;
      }
    };

    return (
      <div
        id={internalId}
        className={cn(getStyleClass('root'), className)}
        data-testid={dataTestId || 'dyn-tabs'}
        {...rest}
      >
        <div
          role="tablist"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-orientation={orientation}
          className={cn(
            getStyleClass('tablist'),
            orientation === 'vertical' && getStyleClass('tablist-vertical'),
            fitted && getStyleClass('tablist-fitted')
          )}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => {
            const selected = item.value === current;
            const tabId = `${internalId}-tab-${item.value}`;
            const panelId = `${internalId}-panel-${item.value}`;
            return (
              <button
                key={item.value}
                ref={el => (tabsRef.current[index] = el)}
                id={tabId}
                role="tab"
                type="button"
                className={cn(
                  getStyleClass('tab'),
                  selected && getStyleClass('tab--selected'),
                  item.disabled && getStyleClass('tab--disabled')
                )}
                data-value={item.value}
                aria-selected={selected}
                aria-controls={panelId}
                aria-disabled={item.disabled || undefined}
                tabIndex={selected ? 0 : -1}
                onClick={() => onSelect(item.value, activation === 'auto')}
                disabled={item.disabled}
              >
                {item.icon && <span className={getStyleClass('tab__icon')} aria-hidden="true">{item.icon}</span>}
                <span className={getStyleClass('tab__label')}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {items.map(item => {
          const selected = item.value === current;
          const tabId = `${internalId}-tab-${item.value}`;
          const panelId = `${internalId}-panel-${item.value}`;
          return (
            <div
              key={item.value}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
              tabIndex={-1}
              className={cn(getStyleClass('tabpanel'), selected && getStyleClass('tabpanel--active'))}
            >
              {typeof item.content === 'function' ? item.content({ value: item.value, selected }) : item.content}
            </div>
          );
        })}
      </div>
    );
  }
);

export default DynTabs;
DynTabs.displayName = 'DynTabs';
