import React, { useMemo, useRef, useState, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynTabs.module.css';
import type { DynTabsProps, DynTabsRef } from './DynTabs.types';

const css = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>(
  (
    {
      items = [],
      value,
      activeTab,
      defaultValue,
      defaultActiveTab,
      onChange,
      onTabClose,
      closable,
      position = 'top',
      orientation = 'horizontal',
      activation = 'auto',
      variant = 'default',
      size = 'medium',
      fitted = false,
      scrollable = false,
      lazy = false,
      animated = true,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
      loadingComponent,
      ...rest
    },
    ref
  ) => {
    const [internalId] = useState(() => id || generateId('tabs'));

    // Build processed items
    const processedItems = useMemo(() => items.map((item, index) => {
      const processedValue = item.value != null ? String(item.value) : item.id != null ? String(item.id) : `tab-${index}`;
      const processedKey = item.id != null ? String(item.id) : item.value != null ? String(item.value) : `tab-${index}`;
      return { ...item, processedValue, processedKey } as typeof item & { processedValue: string; processedKey: string };
    }), [items]);

    // Determine control mode and initial
    const controlledVal = activeTab ?? value;
    const isControlled = controlledVal !== undefined;

    const getInitial = (): string | undefined => {
      if (controlledVal !== undefined) return String(controlledVal);
      if (defaultActiveTab !== undefined) return String(defaultActiveTab);
      if (defaultValue !== undefined) return String(defaultValue);
      const firstEnabled = processedItems.find(i => !i.disabled) ?? processedItems[0];
      return firstEnabled?.processedValue;
    };

    const [current, setCurrent] = useState<string | undefined>(getInitial());

    // Sync controlled
    useEffect(() => {
      if (controlledVal !== undefined) setCurrent(String(controlledVal));
    }, [controlledVal]);

    // Guard if items change
    useEffect(() => {
      if (!processedItems.length) return;
      const exists = processedItems.some(i => i.processedValue === current);
      if (!exists) {
        const firstEnabled = processedItems.find(i => !i.disabled) ?? processedItems[0];
        setCurrent(firstEnabled?.processedValue);
      }
    }, [processedItems, current]);

    // Early return for empty items per tests
    if (!processedItems.length) {
      return null;
    }

    const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});

    const onSelect = (val: string, focusPanel = false) => {
      if (!isControlled) setCurrent(val);
      onChange?.(val);
      if (lazy && loaded[val] === undefined) {
        // mark only the selected tab as loading initially
        setLoaded(prev => ({ ...prev, [val]: false }));
        // simulate async completion in next microtask
        queueMicrotask(() => setLoaded(prev => ({ ...prev, [val]: true })));
      }
      if (focusPanel) {
        const panel = document.getElementById(`${internalId}-panel-${val}`);
        panel?.focus?.();
      }
    };

    const currentIndex = useMemo(() => {
      if (!current) return -1;
      return processedItems.findIndex(i => i.processedValue === current);
    }, [processedItems, current]);

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
        case 'ArrowRight': if (isH) { e.preventDefault(); focusTabByOffset(1); } break;
        case 'ArrowLeft':  if (isH) { e.preventDefault(); focusTabByOffset(-1);} break;
        case 'ArrowDown':  if (!isH){ e.preventDefault(); focusTabByOffset(1); } break;
        case 'ArrowUp':    if (!isH){ e.preventDefault(); focusTabByOffset(-1);} break;
        case 'Home': {
          e.preventDefault();
          const first = processedItems.find(i => !i.disabled) ?? processedItems[0];
          const idx = processedItems.indexOf(first);
          onSelect(first.processedValue);
          if (idx >= 0) tabsRef.current[idx]?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          const rev = [...processedItems].reverse();
          const last = rev.find(i => !i.disabled) ?? rev[0];
          const idx = processedItems.indexOf(last);
          onSelect(last.processedValue);
          if (idx >= 0) tabsRef.current[idx]?.focus();
          break;
        }
        case 'Enter':
        case ' ': {
          if (activation === 'manual') {
            e.preventDefault();
            const target = e.target as HTMLButtonElement;
            const val = target.getAttribute('data-value');
            if (val) onSelect(val, true);
          }
          break;
        }
      }
    };

    const rootClass = cn(
      css('tabs'),
      position && css(`tabs--${position}`),
      scrollable && css('tabs--scrollable'),
      className
    );

    const listClass = cn(css('tablist'));

    return (
      <div id={internalId} className={rootClass} data-testid={dataTestId || 'test-tabs'} {...rest}>
        <div
          role="tablist"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-orientation={orientation}
          className={listClass}
          onKeyDown={handleKeyDown}
        >
          {processedItems.map((item, index) => {
            const selected = item.processedValue === current;
            const tabId = `${internalId}-tab-${item.processedValue}`;
            const panelId = `${internalId}-panel-${item.processedValue}`;
            const tabClass = cn(
              css('tab'),
              size && css(`tab--${size}`),
              variant && css(`tab--${variant}`),
              selected && css('tab--active'),
              item.disabled && css('tab--disabled'),
              item.closable && css('tab--closable')
            );
            return (
              <div key={item.processedKey} className={tabClass} role="presentation" data-status={item.disabled ? 'disabled' : selected ? 'active' : 'inactive'}>
                <button
                  ref={(el) => { tabsRef.current[index] = el; return el; }}
                  id={tabId}
                  role="tab"
                  type="button"
                  className={css('tab__content')}
                  data-value={item.processedValue}
                  aria-selected={selected}
                  aria-controls={panelId}
                  aria-disabled={item.disabled || undefined}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => !item.disabled && onSelect(item.processedValue, activation === 'auto')}
                  disabled={item.disabled}
                >
                  {item.icon && <span className={css('tab__icon')} aria-hidden="true">{item.icon}</span>}
                  <span className={css('tab__label')}>{item.label}</span>
                  {item.badge && (
                    <span className={css('tab__badge')} aria-hidden="true">{item.badge}</span>
                  )}
                </button>
                {(closable || item.closable) && (
                  <button
                    type="button"
                    className={css('tab__close')}
                    aria-label={`Close ${item.label}`}
                    data-testid={`${dataTestId || 'test-tabs'}-close-${item.processedValue}`}
                    onClick={(e) => { e.stopPropagation(); onTabClose?.(item.processedValue); }}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {processedItems.map(item => {
          const selected = item.processedValue === current;
          const tabId = `${internalId}-tab-${item.processedValue}`;
          const panelId = `${internalId}-panel-${item.processedValue}`;
          const panelClass = cn(css('panel'), animated && css('panel--animated'));
          const isLoaded = !lazy || loaded[item.processedValue] === true || item.processedValue === current;
          return (
            <div
              key={`panel-${item.processedKey}`}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
              tabIndex={-1}
              className={panelClass}
            >
              {lazy && selected && !isLoaded && (
                <div className={css('panel__loading')} aria-label="Loading content">
                  {loadingComponent || <span>Loading tab content</span>}
                </div>
              )}
              {(!lazy || isLoaded) && (typeof item.content === 'function' ? item.content({ value: item.processedValue, selected }) : item.content)}
            </div>
          );
        })}
      </div>
    );
  }
);

export default DynTabs;
DynTabs.displayName = 'DynTabs';