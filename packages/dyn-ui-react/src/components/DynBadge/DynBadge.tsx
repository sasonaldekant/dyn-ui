import {
  forwardRef,
  useCallback,
  useId,
  useMemo
} from 'react';
import type { ForwardedRef, KeyboardEvent, MouseEvent } from 'react';
import { cn } from '../../utils/classNames';
import type { DynBadgeProps, DynBadgeRef } from './DynBadge.types';
import styles from './DynBadge.module.css';

const DEFAULT_MAX_COUNT = 99;

const DynBadgeComponent = (
  props: DynBadgeProps,
  ref: ForwardedRef<DynBadgeRef>
) => {
  const {
    children,
    variant = 'solid',
    color = 'neutral',
    size = 'medium',
    position,
    onClick,
    startIcon,
    endIcon,
    maxCount = DEFAULT_MAX_COUNT,
    count,
    showZero = false,
    animated = false,
    pulse = false,
    countDescription,
    ariaLabel,
    ariaDescribedBy,
    ariaLive,
    className,
    'data-testid': dataTestId,
    id,
    onKeyDown: userOnKeyDown,
    role: roleProp,
    tabIndex: tabIndexProp,
    ...rest
  } = props;

  const hasCount = typeof count === 'number';
  const hasChildren = children !== undefined && children !== null;
  const shouldHideBadge = hasCount && count === 0 && !showZero && !hasChildren;

  if (shouldHideBadge) {
    return null;
  }

  const autoId = useId();
  const internalId = id ?? autoId;
  const isInteractive = typeof onClick === 'function';

  const displayCount = useMemo(() => {
    if (!hasCount) {
      return undefined;
    }

    if (typeof maxCount === 'number' && count! > maxCount) {
      return `${maxCount}+`;
    }

    return String(count);
  }, [count, hasCount, maxCount]);

  const displayContent = useMemo(() => {
    if (hasChildren) {
      return children;
    }

    if (hasCount) {
      return displayCount;
    }

    return undefined;
  }, [children, displayCount, hasChildren, hasCount]);

  const badgeClasses = cn(
    styles.badge,
    styles[`badge--${size}`],
    styles[`badge--${variant}`],
    styles[`badge--${color}`],
    {
      [styles['badge--positioned']]: Boolean(position),
      [styles[`badge--${position}`]]: Boolean(position),
      [styles['badge--clickable']]: isInteractive,
      [styles['badge--dot']]: variant === 'dot',
      [styles['badge--count']]: hasCount,
      [styles['badge--animated']]: animated,
      [styles['badge--pulse']]: pulse
    },
    className
  );

  const ariaLabelValue = ariaLabel ?? (hasCount ? `${countDescription || 'Count'}: ${displayCount}` : undefined);
  const ariaLiveValue = ariaLive ?? (hasCount ? 'polite' : undefined);
  const roleValue = roleProp ?? (isInteractive ? 'button' : undefined);
  const tabIndexValue = tabIndexProp ?? (isInteractive ? 0 : undefined);
  const dataTestIdValue = dataTestId ?? 'dyn-badge';

  const handleClick = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      onClick?.(event);
    },
    [onClick]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLSpanElement>) => {
      userOnKeyDown?.(event);

      if (!isInteractive || event.defaultPrevented) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        if (event.key === ' ') {
          event.preventDefault();
        }

        event.currentTarget.click();
      }
    },
    [isInteractive, userOnKeyDown]
  );

  const showTextContent = displayContent !== undefined && variant !== 'dot';

  return (
    <span
      ref={ref}
      id={internalId}
      className={badgeClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={roleValue}
      tabIndex={tabIndexValue}
      aria-label={ariaLabelValue}
      aria-describedby={ariaDescribedBy}
      aria-live={ariaLiveValue}
      data-testid={dataTestIdValue}
      {...rest}
    >
      <span className={styles['badge__content']}>
        {startIcon && (
          <span className={styles['badge__icon']} aria-hidden="true">
            {startIcon}
          </span>
        )}

        {showTextContent && (
          <span className={styles['badge__text']}>
            {displayContent}
          </span>
        )}

        {endIcon && (
          <span className={styles['badge__icon']} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </span>

      {hasCount && Number(count) > 0 && (
        <span className="dyn-sr-only">
          {countDescription || 'Notifications'}: {displayCount}
        </span>
      )}
    </span>
  );
};

const DynBadge = forwardRef<DynBadgeRef, DynBadgeProps>(DynBadgeComponent);

DynBadge.displayName = 'DynBadge';

export { DynBadge };
export default DynBadge;
