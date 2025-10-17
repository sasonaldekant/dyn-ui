import React, { useMemo, useRef, useState, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynTabs.module.css';
import type { DynTabsProps, DynTabsRef, DynTabItem, TabContentFunction } from './DynTabs.types';

  // type guard for tab content function
  const isTabContentFunction = (c: any): c is TabContentFunction => typeof c === 'function';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

/**
 * DynTabs — standardized per DynAvatar gold patterns: a11y, ids, focus mgmt, memoization.
 * TypeScript-safe implementation with proper type guards and null handling.
 */
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

    // Enhanced initial value calculation with proper type handling
    const getInitialValue = (): string | undefined => {
      if (value !== undefined) return String(value);
      if (defaultValue !== undefined) return String(defaultValue);
      const firstItem = items?.[0];
      if (firstItem?.value !== undefined) return String(firstItem.value);
      if (firstItem?.id !== undefined) return String(firstItem.id);
      return undefined;
    };

    const [current, setCurrent] = useState<string | undefined>(getInitialValue());

    useEffect(() => {
      if (isControlled && value !== undefined) {
        setCurrent(String(value));
      }
    }, [isControlled, value]);

    const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

    // Enhanced onSelect with proper type safety
    const onSelect = (val: string, focusPanel = false) => {
      if (!isControlled) setCurrent(val);
      onChange?.(val);
      if (focusPanel) {
        const panel = document.getElementById(`${internalId}-panel-${val}`);
        panel?.focus?.();
      }
    };

    // Enhanced currentIndex calculation with safety checks
    const currentIndex = useMemo(() => {
      if (!current || !items?.length) return -1;
      return items.findIndex(i =>
        (i.value !== undefined && String(i.value) === current) ||
        (i.id !== undefined && String(i.id) === current)
      );
    }, [items, current]);

    const focusTabByOffset = (delta: number) => {
      if (!items?.length) return;
      const count = items.length;
      let idx = currentIndex;
      if (idx < 0) idx = 0;
      const next = (idx + delta + count) % count;
      const nextItem = items[next];
      if (nextItem?.disabled) return; // simple guard; could loop to next enabled if needed

      // Enhanced value retrieval with proper fallback
      const nextValue = nextItem?.value !== undefined
        ? String(nextItem.value)
        : nextItem?.id !== undefined
          ? String(nextItem.id)
          : undefined;

      if (nextValue) {
        onSelect(nextValue);
        tabsRef.current[next]?.focus();
      }
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
          const firstItem = items[0];
          if (firstItem) {
            const firstValue = firstItem.value !== undefined
              ? String(firstItem.value)
              : firstItem.id !== undefined
                ? String(firstItem.id)
                : undefined;
            if (firstValue) {
              onSelect(firstValue);
              tabsRef.current[0]?.focus();
            }
          }
          break;
        case 'End':
          e.preventDefault();
          const lastItem = items[items.length - 1];
          if (lastItem) {
            const lastValue = lastItem.value !== undefined
              ? String(lastItem.value)
              : lastItem.id !== undefined
                ? String(lastItem.id)
                : undefined;
            if (lastValue) {
              onSelect(lastValue);
              tabsRef.current[items.length - 1]?.focus();
            }
          }
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

    // Enhanced item processing with proper key and value handling
    const processedItems = useMemo(() => {
      return items.map((item, index) => {
        // Ensure each item has a usable key and value
        const itemValue = item.value !== undefined
          ? String(item.value)
          : item.id !== undefined
            ? String(item.id)
            : `tab-${index}`;

        const itemKey = item.id !== undefined
          ? String(item.id)
          : item.value !== undefined
            ? String(item.value)
            : `tab-${index}`;

        return {
          ...item,
          processedValue: itemValue,
          processedKey: itemKey
        };
      });
    }, [items]);

    return (
      <div
        id={internalId}
        className={cn(getStyleClass('root'), className)}
        data-testid={dataTestId || 'dyn-tabs'}
        {...(
          // only forward safe DOM props (data-*, aria-*, style)
          Object.fromEntries(
            Object.entries(rest).filter(([k]) => k.startsWith('data-') || k.startsWith('aria-') || k === 'style')
          ) as Record<string, unknown>
        )}
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
          {processedItems.map((item, index) => {
            const selected = item.processedValue === current;
            const tabId = `${internalId}-tab-${item.processedValue}`;
            const panelId = `${internalId}-panel-${item.processedValue}`;

            return (
              <button
                key={item.processedKey}
                ref={(el: HTMLButtonElement | null) => {
                  tabsRef.current[index] = el;
                }}
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
                {item.icon && (
                  <span className={getStyleClass('tab__icon')} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className={getStyleClass('tab__label')}>{item.label}</span>
                {item.badge && (
                  <span className={getStyleClass('tab__badge')} aria-hidden="true">
                    {item.badge}
                  </span>
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
              className={cn(
                getStyleClass('tabpanel'),
                selected && getStyleClass('tabpanel--active')
              )}
            >
              {isTabContentFunction(item.content)
                ? item.content({ value: item.processedValue, selected })
                : item.content
              }
            </div>
          );
        })}
      </div>
    );
  }
);

export default DynTabs;
DynTabs.displayName = 'DynTabs';
