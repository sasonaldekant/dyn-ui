import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from 'react';
import { cn } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';
import type { BreadcrumbItem, DynBreadcrumbProps, DynBreadcrumbRef } from './DynBreadcrumb.types';
import {
  BREADCRUMB_LITERALS,
  DYN_BREADCRUMB_DEFAULT_PROPS,
} from './DynBreadcrumb.types';
import styles from './DynBreadcrumb.module.css';

const ELLIPSIS_LABEL = '...';

const DynBreadcrumb = forwardRef<DynBreadcrumbRef, DynBreadcrumbProps>((props, ref) => {
  const {
    items: itemsProp = DYN_BREADCRUMB_DEFAULT_PROPS.items,
    favorite,
    favoriteService,
    separator = DYN_BREADCRUMB_DEFAULT_PROPS.separator,
    maxItems = DYN_BREADCRUMB_DEFAULT_PROPS.maxItems,
    onFavorite,
    onItemClick,
    ariaLabel = DYN_BREADCRUMB_DEFAULT_PROPS.ariaLabel,
    className,
    id,
    children,
    'data-testid': dataTestId,
    ...rest
  } = props;

  const [internalItems, setInternalItems] = useState<BreadcrumbItem[]>(() => itemsProp);
  const [showAllItems, setShowAllItems] = useState(false);
  const [isFavorited, setIsFavorited] = useState(Boolean(favorite));

  const instanceId = useId();
  const navId = id ?? instanceId;

  useEffect(() => {
    setInternalItems(itemsProp);
    setShowAllItems(false);
  }, [itemsProp]);

  useEffect(() => {
    if (typeof favorite === 'boolean') {
      setIsFavorited(favorite);
    }
  }, [favorite]);

  useImperativeHandle(
    ref,
    () => ({
      addItem: (item: BreadcrumbItem) => {
        setInternalItems(prevItems => [...prevItems, item]);
      },
      removeItem: (index: number) => {
        setInternalItems(prevItems => prevItems.filter((_, itemIndex) => itemIndex !== index));
      },
      clear: () => {
        setInternalItems([]);
        setShowAllItems(false);
      },
    }),
    []
  );

  const handleShowAllItems = useCallback(() => {
    setShowAllItems(true);
  }, []);

  const shouldRenderFavorite = favoriteService !== undefined || typeof favorite === 'boolean';

  const displayItems = useMemo<ReadonlyArray<BreadcrumbItem>>(() => {
    if (showAllItems || internalItems.length <= maxItems) {
      return internalItems;
    }

    if (internalItems.length === 0) {
      return internalItems;
    }

    const firstItem = internalItems[0];
    if (!firstItem) {
      return internalItems;
    }
    const lastItems = internalItems.slice(-(maxItems - 2));

    const ellipsisItem: BreadcrumbItem = {
      label: ELLIPSIS_LABEL,
      action: handleShowAllItems,
    };

    return [firstItem, ellipsisItem, ...lastItems];
  }, [handleShowAllItems, internalItems, maxItems, showAllItems]);

  const handleItemActivate = useCallback(
    (
      item: BreadcrumbItem,
      index: number,
      event: MouseEvent<HTMLAnchorElement | HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>
    ) => {
      if (item.action) {
        event.preventDefault();
        item.action();
      }

      onItemClick?.(item, index);
    },
    [onItemClick]
  );

  const handleKeyDown = useCallback(
    (item: BreadcrumbItem, index: number) =>
      (event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleItemActivate(item, index, event);
        }
      },
    [handleItemActivate]
  );

  const handleFavoriteToggle = useCallback(async () => {
    const nextFavorited = !isFavorited;

    if (favoriteService) {
      try {
        const response = await fetch(favoriteService, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favorited: nextFavorited }),
        });

        if (!response.ok) {
          throw new Error('Failed to update favorite status');
        }

        setIsFavorited(nextFavorited);
        onFavorite?.(nextFavorited);
      } catch (error) {
        console.error('Failed to update favorite status:', error);
      }

      return;
    }

    setIsFavorited(nextFavorited);
    onFavorite?.(nextFavorited);
  }, [favoriteService, isFavorited, onFavorite]);

  const renderSeparator = useCallback(
    (separatorIndex: number) => {
      const key = `separator-${separatorIndex}`;

      if (typeof separator === 'string') {
        return (
          <DynIcon
            key={key}
            icon={separator}
            className={styles['dyn-breadcrumb-separator']}
          />
        );
      }

      if (separator == null) {
        return null;
      }

      if (isValidElement(separator)) {
        return cloneElement(separator as ReactElement, {
          key,
          className: cn(styles['dyn-breadcrumb-separator'], separator.props.className),
        });
      }

      return (
        <span key={key} className={styles['dyn-breadcrumb-separator']}>
          {separator}
        </span>
      );
    },
    [separator]
  );

  const breadcrumbClasses = cn(styles['dyn-breadcrumb'], className);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav
      id={navId}
      className={breadcrumbClasses}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      {...rest}
    >
      <ol className={styles['dyn-breadcrumb-list']}>
        {displayItems.map((item, index) => {
          const isLastItem = index === displayItems.length - 1;
          const isEllipsis = item.label === ELLIPSIS_LABEL;
          const link = typeof item.link === 'string' ? item.link : undefined;
          const shouldRenderLink = !isLastItem && !isEllipsis && link !== undefined;
          const isInteractive = isEllipsis || Boolean(item.action);

          const itemContent = shouldRenderLink ? (
            <a
              href={link}
              className={styles['dyn-breadcrumb-link']}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => handleItemActivate(item, index, event)}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                styles['dyn-breadcrumb-text'],
                isLastItem && styles['dyn-breadcrumb-current'],
                isEllipsis && styles['dyn-breadcrumb-ellipsis'],
                isInteractive && styles['dyn-breadcrumb-clickable']
              )}
              onClick={
                isInteractive
                  ? (event: MouseEvent<HTMLSpanElement>) => handleItemActivate(item, index, event)
                  : undefined
              }
              role={isInteractive ? 'button' : undefined}
              tabIndex={isInteractive ? 0 : undefined}
              onKeyDown={isInteractive ? handleKeyDown(item, index) : undefined}
              aria-label={isEllipsis ? BREADCRUMB_LITERALS.showMore : undefined}
              aria-current={isLastItem ? 'page' : undefined}
            >
              {item.label}
            </span>
          );

          return (
            <li key={`${item.label}-${index}`} className={styles['dyn-breadcrumb-item']}>
              {itemContent}
              {!isLastItem && renderSeparator(index)}
            </li>
          );
        })}
      </ol>

      {shouldRenderFavorite && (
        <div className={styles['dyn-breadcrumb-favorite']}>
          <button
            type="button"
            className={cn(
              styles['dyn-breadcrumb-favorite-button'],
              isFavorited && styles['dyn-breadcrumb-favorite-active']
            )}
            onClick={handleFavoriteToggle}
            aria-label={
              isFavorited
                ? BREADCRUMB_LITERALS.removeFromFavorites
                : BREADCRUMB_LITERALS.addToFavorites
            }
            title={
              isFavorited
                ? BREADCRUMB_LITERALS.removeFromFavorites
                : BREADCRUMB_LITERALS.addToFavorites
            }
          >
            <DynIcon icon={isFavorited ? 'dyn-icon-star-filled' : 'dyn-icon-star'} />
          </button>
        </div>
      )}
      {children}
    </nav>
  );
});

DynBreadcrumb.displayName = 'DynBreadcrumb';

export default DynBreadcrumb;
export { DynBreadcrumb };
