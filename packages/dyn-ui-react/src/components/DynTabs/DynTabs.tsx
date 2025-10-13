import React, { forwardRef, useState, useRef, useMemo, useCallback, useEffect, useImperativeHandle } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import type { DynTabsProps, DynTabsRef, DynTabItem, DYN_TABS_DEFAULT_PROPS } from './DynTabs.types';
import { DYN_TABS_DEFAULT_PROPS } from './DynTabs.types';
import styles from './DynTabs.module.css';

/**
 * Generate accessible tab and panel IDs
 */
const generateTabId = (baseId: string, tabId: string) => `${baseId}-tab-${tabId}`;
const generatePanelId = (baseId: string, tabId: string) => `${baseId}-panel-${tabId}`;

/**
 * Safely access CSS module classes
 */
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

/**
 * Default loading component for lazy tabs
 */
const DefaultLoadingComponent = () => (
  <div className={getStyleClass('loading-spinner')} aria-label="Loading content">
    <span className="dyn-sr-only">Loading tab content</span>
  </div>
);

export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>((
  {
    items = [],
    activeTab,
    defaultActiveTab,
    position = DYN_TABS_DEFAULT_PROPS.position,
    variant = DYN_TABS_DEFAULT_PROPS.variant,
    size = DYN_TABS_DEFAULT_PROPS.size,
    scrollable = DYN_TABS_DEFAULT_PROPS.scrollable,
    closable = DYN_TABS_DEFAULT_PROPS.closable,
    lazy = DYN_TABS_DEFAULT_PROPS.lazy,
    animated = DYN_TABS_DEFAULT_PROPS.animated,
    addable = DYN_TABS_DEFAULT_PROPS.addable,
    tabListClassName,
    contentClassName,
    loadingComponent,
    onChange,
    onTabClose,
    onTabAdd,
    className,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': dataTestId,
    ...rest
  },
  ref
) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(() => {
    if (activeTab) return activeTab;
    if (defaultActiveTab) return defaultActiveTab;
    const enabledTab = items.find(item => !item.disabled);
    return enabledTab?.id || '';
  });

  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(() => {
    const initialTab = activeTab || defaultActiveTab || items.find(item => !item.disabled)?.id || '';
    return new Set(lazy ? [initialTab] : items.map(item => item.id));
  });

  const [internalId] = useState(() => id ?? generateId('dyn-tabs'));
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const currentActiveTab = activeTab ?? internalActiveTab;
  const isControlled = activeTab !== undefined;
  const enabledItems = items.filter(item => !item.disabled);

  // Helper functions
  const setActiveTabId = useCallback((tabId: string) => {
    const targetTab = items.find(item => item.id === tabId);
    if (!targetTab || targetTab.disabled) return;

    if (!isControlled) {
      setInternalActiveTab(tabId);
    }

    if (lazy) {
      setLoadedTabs(prev => new Set([...prev, tabId]));
    }

    onChange?.(tabId);
  }, [items, isControlled, lazy, onChange]);

  const focusTab = useCallback((tabId: string) => {
    const tabElement = tabRefs.current.get(tabId);
    if (tabElement) {
      tabElement.focus();
    }
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => {
    const currentIndex = enabledItems.findIndex(item => item.id === tabId);
    if (currentIndex === -1) return;

    let targetTab: DynTabItem | undefined;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetTab = enabledItems[(currentIndex + 1) % enabledItems.length];
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetTab = enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length];
        break;
        
      case 'Home':
        event.preventDefault();
        targetTab = enabledItems[0];
        break;
        
      case 'End':
        event.preventDefault();
        targetTab = enabledItems[enabledItems.length - 1];
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        setActiveTabId(tabId);
        return;
    }

    if (targetTab) {
      focusTab(targetTab.id);
      setActiveTabId(targetTab.id);
    }
  }, [enabledItems, focusTab, setActiveTabId]);

  // Tab close handler
  const handleTabClose = useCallback((event: React.MouseEvent, tabId: string) => {
    event.stopPropagation();
    onTabClose?.(tabId);
  }, [onTabClose]);

  // Effect for controlled activeTab changes
  useEffect(() => {
    if (isControlled && activeTab && lazy) {
      setLoadedTabs(prev => new Set([...prev, activeTab]));
    }
  }, [activeTab, isControlled, lazy]);

  // Imperative handle
  useImperativeHandle(ref, () => ({
    focus: () => {
      const activeTabElement = tabRefs.current.get(currentActiveTab);
      activeTabElement?.focus();
    },
    blur: () => {
      const activeTabElement = tabRefs.current.get(currentActiveTab);
      activeTabElement?.blur();
    }
  } as any));

  // Render tab button
  const renderTab = useCallback((item: DynTabItem) => {
    const isActive = item.id === currentActiveTab;
    const isDisabled = item.disabled;
    const shouldShowCloseButton = (closable || item.closable) && !isDisabled;

    const tabClasses = cn(
      getStyleClass('tab'),
      getStyleClass(`tab--${size}`),
      getStyleClass(`tab--${variant}`),
      isActive && getStyleClass('tab--active'),
      isDisabled && getStyleClass('tab--disabled'),
      shouldShowCloseButton && getStyleClass('tab--closable')
    );

    return (
      <button
        key={item.id}
        ref={(el) => {
          if (el) {
            tabRefs.current.set(item.id, el);
          } else {
            tabRefs.current.delete(item.id);
          }
        }}
        id={generateTabId(internalId, item.id)}
        role="tab"
        tabIndex={isActive ? 0 : -1}
        aria-selected={isActive}
        aria-controls={generatePanelId(internalId, item.id)}
        aria-disabled={isDisabled}
        className={tabClasses}
        onClick={() => !isDisabled && setActiveTabId(item.id)}
        onKeyDown={(e) => handleKeyDown(e, item.id)}
        disabled={isDisabled}
        title={item.tooltip || undefined}
        data-testid={dataTestId ? `${dataTestId}-tab-${item.id}` : `tab-${item.id}`}
      >
        <span className={getStyleClass('tab__content')}>
          {item.icon && (
            <span className={getStyleClass('tab__icon')} aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className={getStyleClass('tab__label')}>
            {item.label}
          </span>
          {item.badge && (
            <span 
              className={getStyleClass('tab__badge')}
              aria-label={`${item.badge} notifications`}
            >
              {item.badge}
            </span>
          )}
        </span>
        
        {shouldShowCloseButton && (
          <button
            className={getStyleClass('tab__close')}
            onClick={(e) => handleTabClose(e, item.id)}
            aria-label={`Close ${item.label} tab`}
            tabIndex={-1}
            data-testid={dataTestId ? `${dataTestId}-close-${item.id}` : `close-${item.id}`}
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </button>
    );
  }, [currentActiveTab, size, variant, closable, internalId, dataTestId, setActiveTabId, handleKeyDown, handleTabClose, getStyleClass]);

  // Render tab content
  const renderTabContent = useCallback(() => {
    const activeItem = items.find(item => item.id === currentActiveTab);
    if (!activeItem) return null;

    const shouldShowContent = !lazy || loadedTabs.has(activeItem.id);
    const isLoading = lazy && !loadedTabs.has(activeItem.id);

    return (
      <div
        key={currentActiveTab}
        id={generatePanelId(internalId, currentActiveTab)}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={generateTabId(internalId, currentActiveTab)}
        className={cn(
          getStyleClass('panel'),
          animated && getStyleClass('panel--animated'),
          contentClassName
        )}
        data-testid={dataTestId ? `${dataTestId}-panel-${currentActiveTab}` : `panel-${currentActiveTab}`}
      >
        {isLoading ? (
          <div className={getStyleClass('panel__loading')}>
            {loadingComponent || <DefaultLoadingComponent />}
          </div>
        ) : shouldShowContent ? (
          activeItem.content
        ) : null}
      </div>
    );
  }, [items, currentActiveTab, lazy, loadedTabs, internalId, animated, contentClassName, dataTestId, loadingComponent, getStyleClass]);

  // CSS classes
  const tabsClasses = cn(
    getStyleClass('tabs'),
    getStyleClass(`tabs--${position}`),
    getStyleClass(`tabs--${variant}`),
    scrollable && getStyleClass('tabs--scrollable'),
    className
  );

  const tabListClasses = cn(
    getStyleClass('tablist'),
    tabListClassName
  );

  // Don't render if no items
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      id={internalId}
      className={tabsClasses}
      data-testid={dataTestId || 'dyn-tabs'}
      {...rest}
    >
      <div
        ref={tabListRef}
        role="tablist"
        className={tabListClasses}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-testid={dataTestId ? `${dataTestId}-tablist` : 'tablist'}
      >
        {items.map(renderTab)}
        
        {addable && (
          <button
            className={getStyleClass('tab-add')}
            onClick={onTabAdd}
            aria-label="Add new tab"
            data-testid={dataTestId ? `${dataTestId}-add-tab` : 'add-tab'}
          >
            <span aria-hidden="true">+</span>
          </button>
        )}
      </div>

      <div className={getStyleClass('content')}>
        {renderTabContent()}
      </div>

      {/* Screen reader announcements */}
      <div aria-live="polite" className="dyn-sr-only">
        {currentActiveTab && (
          `Tab ${items.findIndex(item => item.id === currentActiveTab) + 1} of ${items.length} selected`
        )}
      </div>
    </div>
  );
});

DynTabs.displayName = 'DynTabs';