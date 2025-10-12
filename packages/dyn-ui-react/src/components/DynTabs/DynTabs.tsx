/**
 * DynTabs - Tab Navigation Component
 * Flexible tab system with multiple positions, variants, and advanced features
 */

import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { DynTabsProps, TabItem, DynTabsHandle, TABS_DEFAULTS } from './DynTabs.types';
import { DynIcon } from '../DynIcon';
import { DynBadge } from '../DynBadge';
import styles from './DynTabs.module.css';

const DynTabs = forwardRef<DynTabsHandle, DynTabsProps>((
  {
    tabs = [],
    activeTab,
    defaultActiveTab,
    position = TABS_DEFAULTS.position,
    variant = TABS_DEFAULTS.variant,
    size = TABS_DEFAULTS.size,
    scrollable = TABS_DEFAULTS.scrollable,
    lazyLoad = TABS_DEFAULTS.lazyLoad,
    closable = TABS_DEFAULTS.closable,
    addable = TABS_DEFAULTS.addable,
    className,
    tabClassName,
    panelClassName,
    onTabChange,
    onTabClose,
    onTabAdd,
    renderTabContent
  },
  ref
) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(() => {
    if (activeTab) return activeTab;
    if (defaultActiveTab) return defaultActiveTab;
    return tabs.length > 0 ? tabs[0].id : '';
  });

  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set([internalActiveTab]));
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabListRef = useRef<HTMLDivElement>(null);

  const currentActiveTab = activeTab ?? internalActiveTab;

  useEffect(() => {
    if (activeTab && activeTab !== internalActiveTab) {
      setInternalActiveTab(activeTab);
      if (lazyLoad) {
        setLoadedTabs(prev => new Set([...prev, activeTab]));
      }
    }
  }, [activeTab, internalActiveTab, lazyLoad]);

  useEffect(() => {
    if (scrollable && tabListRef.current) {
      const checkScroll = () => {
        const element = tabListRef.current!;
        setCanScrollLeft(element.scrollLeft > 0);
        setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth);
      };
      
      checkScroll();
      const element = tabListRef.current;
      element.addEventListener('scroll', checkScroll);
      return () => element.removeEventListener('scroll', checkScroll);
    }
  }, [scrollable, tabs]);

  useImperativeHandle(ref, () => ({
    setActiveTab: (tabId: string) => {
      handleTabClick(tabId);
    },
    getActiveTab: () => currentActiveTab,
    closeTab: (tabId: string) => {
      onTabClose?.(tabId);
    },
    addTab: (tab: TabItem) => {
      onTabAdd?.();
    }
  }));

  const handleTabClick = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.disabled) return;

    if (!activeTab) {
      setInternalActiveTab(tabId);
    }
    
    if (lazyLoad) {
      setLoadedTabs(prev => new Set([...prev, tabId]));
    }
    
    onTabChange?.(tabId);
  }, [activeTab, lazyLoad, onTabChange]);

  const handleTabClose = useCallback((e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose?.(tabId);
  }, [onTabClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        const nextTab = tabs[nextIndex];
        if (!nextTab.disabled) {
          handleTabClick(nextTab.id);
        }
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        const prevTab = tabs[prevIndex];
        if (!prevTab.disabled) {
          handleTabClick(prevTab.id);
        }
        break;
        
      case 'Home':
        e.preventDefault();
        const firstEnabled = tabs.find(tab => !tab.disabled);
        if (firstEnabled) {
          handleTabClick(firstEnabled.id);
        }
        break;
        
      case 'End':
        e.preventDefault();
        const lastEnabled = [...tabs].reverse().find(tab => !tab.disabled);
        if (lastEnabled) {
          handleTabClick(lastEnabled.id);
        }
        break;
    }
  }, [tabs, handleTabClick]);

  const scrollTabs = useCallback((direction: 'left' | 'right') => {
    if (!tabListRef.current) return;
    
    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? tabListRef.current.scrollLeft - scrollAmount
      : tabListRef.current.scrollLeft + scrollAmount;
      
    tabListRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  }, []);

  const renderBadge = useCallback((badge: TabItem['badge']) => {
    if (!badge) {
      return null;
    }

    if (typeof badge === 'object') {
      const count = badge.count ?? badge.value;
      return (
        <DynBadge
          count={typeof count === 'number' ? count : undefined}
          maxCount={badge.maxCount}
          showZero={badge.showZero}
          color={badge.color}
          variant={badge.variant}
          size="small"
        >
          {badge.label}
        </DynBadge>
      );
    }

    if (typeof badge === 'number') {
      return <DynBadge count={badge} size="small" />;
    }

    return <DynBadge size="small">{badge}</DynBadge>;
  }, []);

  const renderTab = useCallback((tab: TabItem) => {
    const isActive = tab.id === currentActiveTab;
    const tabClasses = classNames(
      styles['tab'],
      {
        [styles['active']]: isActive,
        [styles['disabled']]: tab.disabled
      },
      tabClassName
    );

    return (
      <button
        key={tab.id}
        className={tabClasses}
        onClick={() => handleTabClick(tab.id)}
        onKeyDown={(e) => handleKeyDown(e, tab.id)}
        disabled={tab.disabled}
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${tab.id}`}
        id={`tab-${tab.id}`}
        tabIndex={isActive ? 0 : -1}
        title={tab.tooltip || tab.label}
      >
        {tab.icon && (
          <span className={styles['tab-icon']}>
            {typeof tab.icon === 'string' ? (
              <DynIcon icon={tab.icon} />
            ) : (
              tab.icon
            )}
          </span>
        )}
        <span className={styles['tab-label']}>{tab.label}</span>
        {tab.badge && (
          <span className={styles['tab-badge']}>
            {renderBadge(tab.badge)}
          </span>
        )}
        {(closable || tab.closable) && !tab.disabled && (
          <button
            className={styles['tab-close']}
            onClick={(e) => handleTabClose(e, tab.id)}
            aria-label={`Close ${tab.label} tab`}
            tabIndex={-1}
          >
            <DynIcon icon="dyn-icon-close" />
          </button>
        )}
      </button>
    );
  }, [currentActiveTab, tabClassName, handleTabClick, handleKeyDown, handleTabClose, closable, renderBadge]);

  const renderActiveTabContent = () => {
    const activeTabData = tabs.find(tab => tab.id === currentActiveTab);
    if (!activeTabData) return null;

    if (lazyLoad && !loadedTabs.has(currentActiveTab)) {
      return (
        <div className={styles['loading']}>
          <DynIcon icon="dyn-icon-loading" />
          <span>Loading...</span>
        </div>
      );
    }

    const content = renderTabContent?.(activeTabData) ?? activeTabData.content;

    return (
      <div
        className={classNames(styles['panel'], panelClassName)}
        role="tabpanel"
        aria-labelledby={`tab-${currentActiveTab}`}
        id={`panel-${currentActiveTab}`}
        tabIndex={0}
      >
        {content}
      </div>
    );
  };

  const tabsClasses = classNames(
    styles['dyn-tabs'],
    {
      [styles[`position-${position}`]]: position,
      [styles[`variant-${variant}`]]: variant,
      [styles[`size-${size}`]]: size,
      [styles['scrollable']]: scrollable
    },
    className
  );

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={tabsClasses}>
      <div className={styles['tab-list-container']}>
        {scrollable && canScrollLeft && (
          <button
            className={styles['scroll-button']}
            onClick={() => scrollTabs('left')}
            aria-label="Scroll tabs left"
          >
            <DynIcon icon="dyn-icon-chevron-left" />
          </button>
        )}
        
        <div className={styles['tab-list']} role="tablist" ref={tabListRef}>
          {tabs.map(renderTab)}
        </div>
        
        {scrollable && canScrollRight && (
          <button
            className={styles['scroll-button']}
            onClick={() => scrollTabs('right')}
            aria-label="Scroll tabs right"
          >
            <DynIcon icon="dyn-icon-chevron-right" />
          </button>
        )}
        
        {addable && (
          <button
            className={styles['add-button']}
            onClick={onTabAdd}
            aria-label="Add new tab"
          >
            <DynIcon icon="dyn-icon-plus" />
          </button>
        )}
      </div>
      
        {renderActiveTabContent()}
    </div>
  );
});

DynTabs.displayName = 'DynTabs';

export default DynTabs;
export { DynTabs };