import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynListView.module.css';
import type { DynListViewProps, ListViewItem, ListAction } from './DynListView.types';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynListView = forwardRef<HTMLDivElement, DynListViewProps>(function DynListView(
  {
    items = [],
    data = [], // legacy alias
    value,
    defaultValue,
    multiSelect = false,
    selectable = false,
    disabled = false,
    loading = false,
    emptyText = 'No data available',
    actions = [],
    renderItem,
    size,
    height,
    bordered = false,
    selectedKeys = [],
    itemKey,
    onChange,
    onSelectionChange,
    className,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId,
    ...rest
  }, ref) {
  
  // Use items prop, fallback to data for backward compatibility
  const listItems = items.length > 0 ? items : data;
  
  const [internalId] = useState(() => id || generateId('listview'));
  const isControlled = value !== undefined;
  const [selected, setSelected] = useState<string[] | string | undefined>(
    value ?? (multiSelect ? [] : defaultValue)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { 
    if (isControlled) setSelected(value as any); 
  }, [isControlled, value]);

  const itemIds = useMemo(() => 
    listItems.map((_, i) => `${internalId}-option-${i}`), 
    [listItems, internalId]
  );

  const getItemKey = (item: ListViewItem, index: number): string => {
    if (typeof itemKey === 'function') return itemKey(item);
    if (typeof itemKey === 'string') return String(item[itemKey]);
    return item.id ? String(item.id) : item.value ? String(item.value) : String(index);
  };

  const isSelected = (val: string) => {
    return multiSelect ? Array.isArray(selected) && selected.includes(val) : selected === val;
  };

  const commit = (vals: string[] | string) => {
    if (!isControlled) setSelected(vals as any);
    
    // Find corresponding items
    const selectedItems = listItems.filter(item => {
      const key = getItemKey(item, 0);
      return multiSelect ? (vals as string[]).includes(key) : vals === key;
    });
    
    onChange?.(vals as any, multiSelect ? selectedItems : selectedItems[0]);
    onSelectionChange?.(Array.isArray(vals) ? vals : [vals], selectedItems);
  };

  const toggle = (val: string) => {
    if (disabled) return;
    if (multiSelect || selectable) {
      const current = Array.isArray(selected) ? selected : [];
      const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
      commit(next);
    } else {
      commit(val);
    }
  };

  const moveActive = (delta: number) => {
    const count = listItems.length; 
    if (!count) return;
    setActiveIndex(idx => (idx + delta + count) % count);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); moveActive(1); break;
      case 'ArrowUp': e.preventDefault(); moveActive(-1); break;
      case 'Home': e.preventDefault(); setActiveIndex(0); break;
      case 'End': e.preventDefault(); setActiveIndex(Math.max(0, listItems.length - 1)); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const item = listItems[activeIndex];
        if (item) {
          const key = getItemKey(item, activeIndex);
          toggle(key);
        }
        break;
      }
    }
  };

  const rootClasses = cn(
    getStyleClass('root'),
    size === 'small' && 'dyn-list-view--small',
    size === 'large' && 'dyn-list-view--large',
    bordered && getStyleClass('bordered'),
    className
  );

  const rootStyle = height ? { 
    height: typeof height === 'number' ? `${height}px` : String(height) 
  } : undefined;

  return (
    <div
      ref={ref}
      id={internalId}
      role="listbox"
      aria-multiselectable={multiSelect || selectable || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-activedescendant={listItems[activeIndex] ? itemIds[activeIndex] : undefined}
      className={rootClasses}
      data-testid={dataTestId || 'dyn-listview'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={rootStyle}
      {...rest}
    >
      {loading ? (
        <div role="status" className={getStyleClass('loading')}>
          Loading...
        </div>
      ) : listItems.length === 0 ? (
        <div role="note" className={getStyleClass('empty')}>
          {emptyText}
        </div>
      ) : (
        listItems.map((item, i) => {
          const key = getItemKey(item, i);
          const selectedState = isSelected(key);
          
          return (
            <div
              key={key}
              id={itemIds[i]}
              role="option"
              aria-selected={selectedState}
              className={cn(
                getStyleClass('option'),
                selectedState && getStyleClass('option--selected'),
                i === activeIndex && getStyleClass('option--active'),
                item.disabled && getStyleClass('option--disabled')
              )}
              onMouseEnter={() => !item.disabled && setActiveIndex(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => !item.disabled && toggle(key)}
            >
              {(selectable || multiSelect) && (
                <input
                  type="checkbox"
                  role="checkbox"
                  aria-checked={!!selectedState}
                  checked={!!selectedState}
                  disabled={item.disabled}
                  onChange={() => !item.disabled && toggle(key)}
                  onClick={(e) => e.stopPropagation()}
                  className={getStyleClass('option__checkbox')}
                />
              )}

              <div className={getStyleClass('option__content')}>
                {renderItem ? (
                  renderItem(item, i)
                ) : (
                  <>
                    {item.icon && (
                      <span className={getStyleClass('option__icon')}>
                        {typeof item.icon === 'string' ? <i className={item.icon} /> : item.icon}
                      </span>
                    )}
                    <span className={getStyleClass('option__label')}>
                      {item.label || item.value || String(item.id)}
                    </span>
                    {item.description && (
                      <span className={getStyleClass('option__description')}>
                        {item.description}
                      </span>
                    )}
                  </>
                )}
              </div>

              {actions && actions.length > 0 && (
                <div 
                  className={getStyleClass('option__actions')} 
                  onClick={(e) => e.stopPropagation()}
                >
                  {actions.map((action) => {
                    const isVisible = !action.visible || action.visible(item);
                    const isDisabled = action.disabled ? action.disabled(item) : false;
                    
                    if (!isVisible) return null;
                    
                    return (
                      <button
                        key={action.key}
                        type="button"
                        disabled={isDisabled}
                        className={cn(
                          getStyleClass('action-button'),
                          getStyleClass(`action-button--${action.type || 'default'}`)
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(item, i);
                        }}
                        title={action.title}
                      >
                        {action.icon && (
                          <span className={getStyleClass('action-button__icon')}>
                            {typeof action.icon === 'string' ? <i className={action.icon} /> : action.icon}
                          </span>
                        )}
                        {action.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
});

export default DynListView;