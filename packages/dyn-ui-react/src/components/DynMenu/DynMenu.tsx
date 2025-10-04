/**
 * DynMenu - Navigation Menu Component
 * Hierarchical menu system with collapse/expand functionality, search, and responsive design
 */

import React, { forwardRef, useImperativeHandle, useState, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { DynMenuProps, MenuItem, MenuLiterals, DynMenuRef, DEFAULT_MENU_LITERALS } from './DynMenu.types';
import { DynIcon } from '../DynIcon';
import { DynBadge } from '../DynBadge';
import { DynInput } from '../DynInput';
import styles from './DynMenu.module.css';

const DynMenu = forwardRef<DynMenuRef, DynMenuProps>((
  {
    menus = [],
    collapsed: propCollapsed = false,
    collapsedIcon = 'dyn-icon-menu',
    filter = false,
    shortLogo,
    logo,
    literals: customLiterals = {},
    automaticToggle = true,
    className,
    onCollapse,
    onMenuClick
  },
  ref
) => {
  const [collapsed, setCollapsed] = useState(propCollapsed);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');
  const [activeItem, setActiveItem] = useState<string>('');

  const literals = { ...DEFAULT_MENU_LITERALS, ...customLiterals };

  useImperativeHandle(ref, () => ({
    collapse: () => {
      setCollapsed(true);
      onCollapse?.(true);
    },
    expand: () => {
      setCollapsed(false);
      onCollapse?.(false);
    },
    toggle: () => {
      const newCollapsed = !collapsed;
      setCollapsed(newCollapsed);
      onCollapse?.(newCollapsed);
    }
  }));

  useEffect(() => {
    setCollapsed(propCollapsed);
  }, [propCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (automaticToggle) {
        setCollapsed(window.innerWidth < 768);
      }
    };

    if (automaticToggle) {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [automaticToggle]);

  const filteredMenus = useMemo(() => {
    if (!filterText) return menus;

    const filterItems = (items: MenuItem[]): MenuItem[] => {
      return items.reduce<MenuItem[]>((acc, item) => {
        if (item.type === 'divider') {
          acc.push(item);
          return acc;
        }

        const matchesFilter =
          item.label.toLowerCase().includes(filterText.toLowerCase()) ||
          item.shortLabel?.toLowerCase().includes(filterText.toLowerCase());

        if (matchesFilter) {
          acc.push(item);
        } else if (item.subItems) {
          const filteredSubItems = filterItems(item.subItems);
          if (filteredSubItems.length > 0) {
            acc.push({ ...item, subItems: filteredSubItems });
          }
        }
        return acc;
      }, []);
    };

    return filterItems(menus);
  }, [menus, filterText]);

  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const handleItemClick = useCallback((item: MenuItem, path: string) => {
    if (item.disabled) return;

    setActiveItem(path);

    if (item.subItems && item.subItems.length > 0) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(path)) {
          newSet.delete(path);
        } else {
          newSet.add(path);
        }
        return newSet;
      });
    } else {
      if (item.action) {
        item.action();
      } else if (item.link) {
        window.location.href = item.link;
      }
      onMenuClick?.(item);
    }
  }, [onMenuClick]);

  const renderMenuItem = (item: MenuItem, level = 0, parentPath = ''): React.ReactNode => {
    if (!item.visible && item.visible !== undefined) return null;

    const path = `${parentPath}/${item.label}`;
    const isExpanded = expandedItems.has(path);
    const isActive = activeItem === path;
    const hasSubItems = item.subItems && item.subItems.length > 0;

    if (item.type === 'divider') {
      return <div key={path} className={styles['dyn-menu-divider']} />;
    }

    const itemClasses = classNames(
      styles['dyn-menu-item'],
      {
        [styles['dyn-menu-item-active']]: isActive,
        [styles['dyn-menu-item-expanded']]: isExpanded,
        [styles['dyn-menu-item-disabled']]: item.disabled,
        [styles['dyn-menu-item-with-sub']]: hasSubItems,
        [styles[`dyn-menu-item-level-${level}`]]: level > 0
      }
    );

    return (
      <div key={path} className={styles['dyn-menu-item-container']}>
        <div
          className={itemClasses}
          onClick={() => handleItemClick(item, path)}
          role="menuitem"
          tabIndex={item.disabled ? -1 : 0}
          aria-expanded={hasSubItems ? isExpanded : undefined}
        >
          <div className={styles['dyn-menu-item-content']}>
            {item.icon && (
              <div className={styles['dyn-menu-item-icon']}>
                {typeof item.icon === 'string' ? (
                  <DynIcon icon={item.icon} />
                ) : (
                  item.icon
                )}
              </div>
            )}
            <span className={styles['dyn-menu-item-label']}>
              {collapsed && item.shortLabel ? item.shortLabel : item.label}
            </span>
            {item.badge && (
              <div className={styles['dyn-menu-item-badge']}>
                <DynBadge
                  value={item.badge.value}
                  color={item.badge.color}
                  size="small"
                />
              </div>
            )}
            {hasSubItems && (
              <div className={styles['dyn-menu-item-arrow']}>
                <DynIcon
                  icon="dyn-icon-arrow-down"
                  className={classNames({
                    [styles['dyn-menu-arrow-expanded']]: isExpanded
                  })}
                />
              </div>
            )}
          </div>
        </div>
        {hasSubItems && isExpanded && (
          <div className={styles['dyn-menu-subitems']}>
            {item.subItems!.map(subItem =>
              renderMenuItem(subItem, level + 1, path)
            )}
          </div>
        )}
      </div>
    );
  };

  const menuClasses = classNames(
    styles['dyn-menu'],
    {
      [styles['dyn-menu-collapsed']]: collapsed
    },
    className
  );

  return (
    <nav className={menuClasses} role="navigation">
      <div className={styles['dyn-menu-header']}>
        <div className={styles['dyn-menu-logo']}>
          {collapsed && shortLogo ? (
            <img src={shortLogo} alt="Logo" className={styles['dyn-menu-logo-image']} />
          ) : logo ? (
            <img src={logo} alt="Logo" className={styles['dyn-menu-logo-image']} />
          ) : null}
        </div>
        <button
          className={styles['dyn-menu-toggle']}
          onClick={handleToggleCollapse}
          aria-label={collapsed ? literals.expand : literals.collapse}
        >
          {typeof collapsedIcon === 'string' ? (
            <DynIcon icon={collapsedIcon} />
          ) : (
            collapsedIcon
          )}
        </button>
      </div>
      {filter && !collapsed && (
        <div className={styles['dyn-menu-filter']}>
          <DynInput
            placeholder={literals.search}
            value={filterText}
            onChange={setFilterText}
            icon="dyn-icon-search"
            size="small"
          />
        </div>
      )}
      <div className={styles['dyn-menu-content']}>
        <div className={styles['dyn-menu-items']} role="menu">
          {filteredMenus.map(item => renderMenuItem(item))}
        </div>
      </div>
    </nav>
  );
});

DynMenu.displayName = 'DynMenu';

export default DynMenu;
export { DynMenu };
