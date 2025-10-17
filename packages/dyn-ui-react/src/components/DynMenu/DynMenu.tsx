import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynMenu.module.css';
import type { DynMenuProps, DynMenuItem } from './DynMenu.types';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynMenu: React.FC<DynMenuProps> = ({
  items,
  orientation = 'horizontal',
  className,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'data-testid': dataTestId,
  onAction,
  ...rest
}) => {
  const [internalId] = useState(() => id || generateId('menu'));
  const isHorizontal = orientation === 'horizontal';
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number>(0);

  const menubarRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (focusIndex >= 0) itemRefs.current[focusIndex]?.focus();
  }, [focusIndex]);

  const visibleMenuCount = useMemo(() => items.length, [items]);

  const moveFocus = (delta: number) => {
    if (!visibleMenuCount) return;
    setFocusIndex((prev) => {
      const next = (prev + delta + visibleMenuCount) % visibleMenuCount;
      return next;
    });
  };

  const closeAll = () => setOpenIndex(null);

  const onMenubarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const horizontal = isHorizontal;
    switch (e.key) {
      case 'ArrowRight': if (horizontal) { e.preventDefault(); moveFocus(1); } break;
      case 'ArrowLeft': if (horizontal) { e.preventDefault(); moveFocus(-1); } break;
      case 'ArrowDown': if (!horizontal) { e.preventDefault(); moveFocus(1); } else if (openIndex === focusIndex) { e.preventDefault(); /* focus first submenu item handled by browser tab */ } break;
      case 'ArrowUp': if (!horizontal) { e.preventDefault(); moveFocus(-1); } break;
      case 'Home': e.preventDefault(); setFocusIndex(0); break;
      case 'End': e.preventDefault(); setFocusIndex(Math.max(0, visibleMenuCount - 1)); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        setOpenIndex((prev) => (prev === focusIndex ? null : focusIndex));
        break;
      }
      case 'Escape':
        if (openIndex !== null) { e.preventDefault(); closeAll(); }
        break;
    }
  };

  const handleItemClick = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    setFocusIndex(index);
  };

  const onSubItemClick = (action: string | (() => void) | undefined) => {
    if (typeof action === 'string') {
      onAction?.(action);
    } else if (typeof action === 'function') {
      try {
        action();
      } catch {
        // ignore errors from provided callback
      }
    }
    closeAll();
  };

  return (
    <div
      id={internalId}
      role="menubar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation={orientation}
      className={cn(getStyleClass('menubar'), className)}
      data-testid={dataTestId || 'dyn-menu'}
      ref={menubarRef}
      onKeyDown={onMenubarKeyDown}
      {...rest}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${internalId}-item-${idx}`;
        const menuId = `${internalId}-submenu-${idx}`;
        return (
          <div key={buttonId} className={getStyleClass('menubar__item')}>
            <button
              ref={(el) => { itemRefs.current[idx] = el; }}
              id={buttonId}
              type="button"
              role="menuitem"
              className={cn(getStyleClass('menubar__button'), isOpen && getStyleClass('menubar__button--open'))}
              aria-haspopup={item.children && item.children.length ? 'menu' : undefined}
              aria-expanded={item.children && item.children.length ? isOpen : undefined}
              aria-controls={item.children && item.children.length ? menuId : undefined}
              onClick={() => handleItemClick(idx)}
            >
              {item.label}
            </button>
            {item.children && item.children.length > 0 && isOpen && (
              <div
                id={menuId}
                role="menu"
                aria-labelledby={buttonId}
                className={getStyleClass('menu')}
              >
                {item.children.map((sub, sidx) => (
                  <button
                    key={`${menuId}-opt-${sidx}`}
                    role="menuitem"
                    type="button"
                    className={getStyleClass('menu__item')}
                    onClick={() => onSubItemClick(sub.action)}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DynMenu;
