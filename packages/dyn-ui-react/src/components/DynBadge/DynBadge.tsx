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

const sizeClassNameMap = {
  small: styles['badge--small'],
  medium: styles['badge--medium'],
  large: styles['badge--large']
} as const;

const variantClassNameMap = {
  solid: styles['badge--solid'],
  soft: styles['badge--soft'],
  outline: styles['badge--outline'],
  dot: styles['badge--dot']
} as const;

const colorClassNameMap = {
  primary: styles['badge--primary'],
  secondary: styles['badge--secondary'],
  success: styles['badge--success'],
  warning: styles['badge--warning'],
  danger: styles['badge--danger'],
  info: styles['badge--info'],
  neutral: styles['badge--neutral']
} as const;

const positionClassNameMap = {
  topRight: styles['badge--topRight'],
  topLeft: styles['badge--topLeft'],
  bottomRight: styles['badge--bottomRight'],
  bottomLeft: styles['badge--bottomLeft']
} as const;

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
    sizeClassNameMap[size],
    variantClassNameMap[variant],
    colorClassNameMap[color],
    position && styles['badge--positioned'],
    position ? positionClassNameMap[position] : undefined,
    isInteractive && styles['badge--clickable'],
    hasCount && styles['badge--count'],
    animated && styles['badge--animated'],
    pulse && styles['badge--pulse'],
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
