import React, { useMemo, useRef, useState, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynTabs.module.css';
import type { DynTabsProps, DynTabsRef } from './DynTabs.types';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>(
  (
    {
      items = [],
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

    // Build processed items once per items change
    const processedItems = useMemo(() => {
      return items.map((item, index) => {
        const processedValue =
          item.value != null ? String(item.value)
          : item.id != null ? String(item.id)
          : `tab-${index}`;
        const processedKey =
          item.id != null ? String(item.id)
          : item.value != null ? String(item.value)
          : `tab-${index}`;
        return { ...item, processedValue, processedKey } as typeof item & { processedValue: string; processedKey: string };
      });
    }, [items]);

    // Initial current based on processedItems
    const getInitialValue = (): string | undefined => {
      if (value !== undefined) return String(value);
      if (defaultValue !== undefined) return String(defaultValue);
      return processedItems[0]?.processedValue;
    };

    const [current, setCurrent] = useState<string | undefined>(getInitialValue());

    // Keep current in sync for controlled usage
    useEffect(() => {
      if (isControlled && value !== undefined) setCurrent(String(value));
    }, [isControlled, value]);

    // If items change and current becomes invalid, reset to first enabled tab
    useEffect(() => {
      if (!processedItems.length) return;
      const exists = processedItems.some(i => i.processedValue === current);
      if (!exists) {
        const firstEnabled = processedItems.find(i => !i.disabled) ?? processedItems[0];
        setCurrent(firstEnabled.processedValue);
      }
    }, [processedItems, current]);

    const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const onSelect = (val: string, focusPanel = false) => {
      if (!isControlled) setCurrent(val);
      onChange?.(val);
      if (focusPanel) {
        const panel = document.getElementById(`${internalId}-panel-${val}`);
        panel?.focus?.();
      }
    };

    const currentIndex = useMemo(() => {
      if (!current) return -1;
      return processedItems.findIndex(i => i.processedValue === current);
    }, [processedItems, current]);

    // Loop-to-next-enabled navigation
    const moveFocus = (startIndex: number, delta: number) => {
      const count = processedItems.length;
      if (count === 0) return;
      let idx = startIndex;
      for (let step = 0; step < count; step++) {
        idx = (idx + delta + count) % count;
        const cand = processedItems[idx];
        if (!cand?.disabled) {
          onSelect(cand.processedValue);
          tabsRef.current[idx]?.focus();
          return;
        }
      }
    };

    const focusTabByOffset = (delta: number) => {
      const count = processedItems.length;
      if (!count) return;
      const idx = currentIndex < 0 ? 0 : currentIndex;
      moveFocus(idx, delta);
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
        case 'Home': {
          e.preventDefault();
          if (!processedItems.length) return;
          const first = processedItems.find(i => !i.disabled) ?? processedItems[0];
          const idx = processedItems.indexOf(first);
          onSelect(first.processedValue);
          if (idx >= 0) tabsRef.current[idx]?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          if (!processedItems.length) return;
          const rev = [...processedItems].reverse();
          const last = rev.find(i => !i.disabled) ?? rev[0];
          const idx = processedItems.indexOf(last);
          onSelect(last.processedValue);
          if (idx >= 0) tabsRef.current[idx]?.focus();
          break;
        }
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
      <div id={internalId} className={cn(getStyleClass('root'), className)} data-testid={dataTestId || 'dyn-tabs'} {...rest}>
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
          {processedItems.map((item, index) => {
            const selected = item.processedValue === current;
            const tabId = `${internalId}-tab-${item.processedValue}`;
            const panelId = `${internalId}-panel-${item.processedValue}`;
            return (
              <button
                key={item.processedKey}
                ref={(el) => { tabsRef.current[index] = el; return el; }}
                id={tabId}
                role="tab"
                type="button"
                className={cn(
                  getStyleClass('tab'),
                  selected && getStyleClass('tab--selected'),
                  item.disabled && getStyleClass('tab--disabled')
                )}
                data-value={item.processedValue}
                aria-selected={selected}
                aria-controls={panelId}
                aria-disabled={item.disabled || undefined}
                tabIndex={selected ? 0 : -1}
                onClick={() => onSelect(item.processedValue, activation === 'auto')}
                disabled={item.disabled}
              >
                {item.icon && <span className={getStyleClass('tab__icon')} aria-hidden="true">{item.icon}</span>}
                <span className={getStyleClass('tab__label')}>{item.label}</span>
                {item.badge && (
                  <span className={getStyleClass('tab__badge')} aria-hidden="true">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        {processedItems.map(item => {
          const selected = item.processedValue === current;
          const tabId = `${internalId}-tab-${item.processedValue}`;
          const panelId = `${internalId}-panel-${item.processedValue}`;
          return (
            <div
              key={`panel-${item.processedKey}`}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
              tabIndex={-1}
              className={cn(getStyleClass('tabpanel'), selected && getStyleClass('tabpanel--active'))}
            >
              {typeof item.content === 'function' ? item.content({ value: item.processedValue, selected }) : item.content}
            </div>
          );
        })}
      </div>
    );
  }
);

export default DynTabs;
DynTabs.displayName = 'DynTabs';
