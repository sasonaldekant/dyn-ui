/**
 * DynToolbar - Responsive Toolbar Component
 * Flexible toolbar with action buttons, responsive overflow, and multiple layout variants
 */

import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { DynToolbarProps, ToolbarItem, DynToolbarRef, TOOLBAR_DEFAULTS } from './DynToolbar.types';
import { DynIcon } from '../DynIcon';
import { DynBadge } from '../DynBadge';
import styles from './DynToolbar.module.css';

const DynToolbar = forwardRef<DynToolbarRef, DynToolbarProps>((
  {
    items = [],
    variant = TOOLBAR_DEFAULTS.variant,
    size = TOOLBAR_DEFAULTS.size,
    position = TOOLBAR_DEFAULTS.position,
    responsive = TOOLBAR_DEFAULTS.responsive,
    overflowMenu = TOOLBAR_DEFAULTS.overflowMenu,
    overflowThreshold = TOOLBAR_DEFAULTS.overflowThreshold,
    showLabels = TOOLBAR_DEFAULTS.showLabels,
    className,
    itemClassName,
    onItemClick,
    onOverflowToggle
  },
  ref
) => {
  const [visibleItems, setVisibleItems] = useState<ToolbarItem[]>(items);
  const [overflowItems, setOverflowItems] = useState<ToolbarItem[]>([]);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  // Filter visible items
  const filteredItems = useMemo(() => {
    return items.filter(item => item.visible !== false);
  }, [items]);

  // Handle responsive layout
  const updateLayout = useCallback(() => {
    if (!responsive || !overflowMenu || !toolbarRef.current) {
      setVisibleItems(filteredItems);
      setOverflowItems([]);
      return;
    }

    const toolbarWidth = toolbarRef.current.offsetWidth;
    const itemElements = toolbarRef.current.querySelectorAll('[data-toolbar-item]');
    let totalWidth = 0;
    let visibleCount = 0;
    const overflowButtonWidth = 48;
    const padding = 32;

    // Calculate how many items can fit
    for (let i = 0; i < itemElements.length; i++) {
      const itemWidth = itemElements[i].getBoundingClientRect().width;
      if (totalWidth + itemWidth + overflowButtonWidth + padding <= toolbarWidth) {
        totalWidth += itemWidth;
        visibleCount++;
      } else {
        break;
      }
    }

    // Apply overflow threshold
    if (filteredItems.length > overflowThreshold && visibleCount < filteredItems.length) {
      const actualVisibleCount = Math.max(1, Math.min(visibleCount, filteredItems.length - 1));
      setVisibleItems(filteredItems.slice(0, actualVisibleCount));
      setOverflowItems(filteredItems.slice(actualVisibleCount));
    } else {
      setVisibleItems(filteredItems);
      setOverflowItems([]);
    }
  }, [filteredItems, responsive, overflowMenu, overflowThreshold]);

  useEffect(() => {
    updateLayout();
  }, [updateLayout]);

  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      updateLayout();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (toolbarRef.current) {
      resizeObserver.observe(toolbarRef.current);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [responsive, updateLayout]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overflowRef.current && !overflowRef.current.contains(event.target as Node)) {
        setIsOverflowOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useImperativeHandle(ref, () => ({
    openOverflow: () => {
      setIsOverflowOpen(true);
      onOverflowToggle?.(true);
    },
    closeOverflow: () => {
      setIsOverflowOpen(false);
      onOverflowToggle?.(false);
    },
    toggleOverflow: () => {
      const newState = !isOverflowOpen;
      setIsOverflowOpen(newState);
      onOverflowToggle?.(newState);
    },
    refreshLayout: updateLayout
  }));

  const handleItemClick = useCallback((item: ToolbarItem, event?: React.MouseEvent) => {
    if (item.disabled) return;

    if (item.type === 'dropdown') {
      event?.preventDefault();
      setActiveDropdown(prev => prev === item.id ? null : item.id);
      return;
    }

    if (item.action) {
      item.action();
    }

    onItemClick?.(item);

    // Close overflow menu after action
    if (isOverflowOpen) {
      setIsOverflowOpen(false);
      onOverflowToggle?.(false);
    }
  }, [isOverflowOpen, onItemClick, onOverflowToggle]);

  const handleOverflowToggle = () => {
    const newState = !isOverflowOpen;
    setIsOverflowOpen(newState);
    onOverflowToggle?.(newState);
  };

  const renderBadge = useCallback((badge: ToolbarItem['badge']) => {
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

  const renderToolbarItem = (item: ToolbarItem, isInOverflow = false) => {
    if (item.type === 'separator') {
      return (
        <div
          key={item.id}
          className={styles['toolbar-separator']}
          data-toolbar-item
        />
      );
    }

    if (item.type === 'search') {
      return (
        <div
          key={item.id}
          className={styles['toolbar-search']}
          data-toolbar-item
        >
          <input
            type="search"
            placeholder={item.label || 'Search...'}
            className={styles['search-input']}
          />
        </div>
      );
    }

    if (item.type === 'custom' && item.component) {
      return (
        <div
          key={item.id}
          className={styles['toolbar-custom']}
          data-toolbar-item
        >
          {item.component}
        </div>
      );
    }

    const itemClasses = classNames(
      styles['toolbar-item'],
      {
        [styles['toolbar-item-disabled']]: item.disabled,
        [styles['toolbar-item-active']]: activeDropdown === item.id,
        [styles['toolbar-item-overflow']]: isInOverflow,
        [styles['toolbar-item-dropdown']]: item.type === 'dropdown'
      },
      itemClassName
    );

    return (
      <div key={item.id} className={styles['toolbar-item-wrapper']}>
        <button
          className={itemClasses}
          onClick={(e) => handleItemClick(item, e)}
          disabled={item.disabled}
          title={item.tooltip || item.label}
          data-toolbar-item
          aria-label={item.label}
          aria-expanded={item.type === 'dropdown' ? activeDropdown === item.id : undefined}
          aria-haspopup={item.type === 'dropdown' ? 'menu' : undefined}
        >
          {item.icon && (
            <span className={styles['toolbar-item-icon']}>
              {typeof item.icon === 'string' ? (
                <DynIcon icon={item.icon} />
              ) : (
                item.icon
              )}
            </span>
          )}
          {showLabels && item.label && (
            <span className={styles['toolbar-item-label']}>
              {item.label}
            </span>
          )}
          {item.badge && (
            <span className={styles['toolbar-item-badge']}>
              {renderBadge(item.badge)}
            </span>
          )}
          {item.type === 'dropdown' && (
            <span className={styles['toolbar-dropdown-arrow']}>
              <DynIcon icon="dyn-icon-chevron-down" />
            </span>
          )}
        </button>

        {/* Dropdown menu */}
        {item.type === 'dropdown' && item.items && activeDropdown === item.id && (
          <div className={styles['toolbar-dropdown-menu']} role="menu">
            {item.items.map(subItem => (
              <button
                key={subItem.id}
                className={styles['toolbar-dropdown-item']}
                onClick={() => handleItemClick(subItem)}
                disabled={subItem.disabled}
                role="menuitem"
              >
                {subItem.icon && (
                  <span className={styles['toolbar-item-icon']}>
                    {typeof subItem.icon === 'string' ? (
                      <DynIcon icon={subItem.icon} />
                    ) : (
                      subItem.icon
                    )}
                  </span>
                )}
                <span className={styles['toolbar-item-label']}>
                  {subItem.label}
                </span>
                {subItem.badge && (
                  <span className={styles['toolbar-item-badge']}>
                    {renderBadge(subItem.badge)}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const toolbarClasses = classNames(
    styles['dyn-toolbar'],
    {
      [styles[`variant-${variant}`]]: variant,
      [styles[`size-${size}`]]: size,
      [styles[`position-${position}`]]: position,
      [styles['responsive']]: responsive,
      [styles['show-labels']]: showLabels
    },
    className
  );

  return (
    <div className={toolbarClasses} ref={toolbarRef} role="toolbar">
      <div className={styles['toolbar-content']}>
        <div className={styles['toolbar-items']}>
          {visibleItems.map(item => renderToolbarItem(item))}
        </div>

        {overflowItems.length > 0 && (
          <div className={styles['toolbar-overflow']} ref={overflowRef}>
            <button
              className={classNames(
                styles['toolbar-overflow-button'],
                {
                  [styles['active']]: isOverflowOpen
                }
              )}
              onClick={handleOverflowToggle}
              aria-haspopup="menu"
              aria-expanded={isOverflowOpen}
              aria-label="More actions"
              title="More actions"
            >
              <DynIcon icon="dyn-icon-more-horizontal" />
            </button>

            {isOverflowOpen && (
              <div className={styles['toolbar-overflow-menu']} role="menu">
                {overflowItems.map(item => renderToolbarItem(item, true))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

DynToolbar.displayName = 'DynToolbar';

export default DynToolbar;
export { DynToolbar };