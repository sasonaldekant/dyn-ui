/**
 * DynBreadcrumb - Navigation Breadcrumb Component
 * Displays navigation path with favorites support and overflow handling
 */

import React, { forwardRef, useImperativeHandle, useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { DynBreadcrumbProps, BreadcrumbItem, DynBreadcrumbRef, DEFAULT_SEPARATOR, BREADCRUMB_LITERALS } from './DynBreadcrumb.types';
import { DynIcon } from '../DynIcon';
import styles from './DynBreadcrumb.module.css';

const DynBreadcrumb = forwardRef<DynBreadcrumbRef, DynBreadcrumbProps>((
  {
    items = [],
    favorite = false,
    favoriteService,
    separator = DEFAULT_SEPARATOR,
    maxItems = 5,
    className,
    onFavorite,
    onItemClick
  },
  ref
) => {
  const [isFavorited, setIsFavorited] = useState(favorite);
  const [internalItems, setInternalItems] = useState(items);
  const [showAllItems, setShowAllItems] = useState(false);

  useImperativeHandle(ref, () => ({
    addItem: (item: BreadcrumbItem) => {
      setInternalItems(prev => [...prev, item]);
    },
    removeItem: (index: number) => {
      setInternalItems(prev => prev.filter((_, i) => i !== index));
    },
    clear: () => {
      setInternalItems([]);
    }
  }));

  const displayItems = useMemo(() => {
    const currentItems = internalItems.length > 0 ? internalItems : items;
    
    if (showAllItems || currentItems.length <= maxItems) {
      return currentItems;
    }

    // Show first item, ellipsis, and last (maxItems - 2) items
    const firstItem = currentItems[0];
    const lastItems = currentItems.slice(-(maxItems - 2));
    
    return [
      firstItem,
      { label: '...', action: () => setShowAllItems(true) },
      ...lastItems
    ];
  }, [internalItems, items, maxItems, showAllItems]);

  const handleItemClick = useCallback((item: BreadcrumbItem, index: number, e: React.MouseEvent) => {
    if (item.action) {
      e.preventDefault();
      item.action();
    }
    onItemClick?.(item, index);
  }, [onItemClick]);

  const handleFavoriteToggle = useCallback(async () => {
    const newFavorited = !isFavorited;
    
    if (favoriteService) {
      try {
        const response = await fetch(favoriteService, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favorited: newFavorited })
        });
        
        if (response.ok) {
          setIsFavorited(newFavorited);
          onFavorite?.(newFavorited);
        }
      } catch (error) {
        console.error('Failed to update favorite status:', error);
      }
    } else {
      setIsFavorited(newFavorited);
      onFavorite?.(newFavorited);
    }
  }, [isFavorited, favoriteService, onFavorite]);

  const breadcrumbClasses = classNames(
    styles['dyn-breadcrumb'],
    className
  );

  if (displayItems.length === 0) {
    return null;
  }

  const renderSeparator = () => {
    if (typeof separator === 'string') {
      return <DynIcon icon={separator} className={styles['dyn-breadcrumb-separator']} />;
    }
    return <span className={styles['dyn-breadcrumb-separator']}>{separator}</span>;
  };

  return (
    <nav className={breadcrumbClasses} aria-label="Breadcrumb">
      <ol className={styles['dyn-breadcrumb-list']}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';
          
          return (
            <li key={`${item.label}-${index}`} className={styles['dyn-breadcrumb-item']}>
              {item.link && !isLast && !isEllipsis ? (
                <a 
                  href={item.link} 
                  className={styles['dyn-breadcrumb-link']}
                  onClick={(e) => handleItemClick(item, index, e)}
                >
                  {item.label}
                </a>
              ) : (
                <span 
                  className={classNames(
                    styles['dyn-breadcrumb-text'],
                    {
                      [styles['dyn-breadcrumb-current']]: isLast,
                      [styles['dyn-breadcrumb-ellipsis']]: isEllipsis,
                      [styles['dyn-breadcrumb-clickable']]: isEllipsis || item.action
                    }
                  )}
                  onClick={isEllipsis || item.action ? (e) => handleItemClick(item, index, e) : undefined}
                  role={isEllipsis || item.action ? 'button' : undefined}
                  tabIndex={isEllipsis || item.action ? 0 : undefined}
                  onKeyDown={isEllipsis || item.action ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemClick(item, index, e as any);
                    }
                  } : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                renderSeparator()
              )}
            </li>
          );
        })}
      </ol>
      
      {/* Favorite button */}
      {(favorite !== undefined || favoriteService) && (
        <div className={styles['dyn-breadcrumb-favorite']}>
          <button 
            className={classNames(
              styles['dyn-breadcrumb-favorite-button'],
              {
                [styles['dyn-breadcrumb-favorite-active']]: isFavorited
              }
            )}
            onClick={handleFavoriteToggle}
            aria-label={isFavorited ? BREADCRUMB_LITERALS.removeFromFavorites : BREADCRUMB_LITERALS.addToFavorites}
            title={isFavorited ? BREADCRUMB_LITERALS.removeFromFavorites : BREADCRUMB_LITERALS.addToFavorites}
          >
            <DynIcon icon={isFavorited ? 'dyn-icon-star-filled' : 'dyn-icon-star'} />
          </button>
        </div>
      )}
    </nav>
  );
});

DynBreadcrumb.displayName = 'DynBreadcrumb';

export default DynBreadcrumb;
export { DynBreadcrumb };