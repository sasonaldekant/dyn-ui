import { forwardRef, useMemo } from 'react';
import type { CSSProperties, ForwardedRef } from 'react';
import { cn } from '../../utils/classNames';
import { formatBadgeValue, isThemeColor } from '../../utils/dynFormatters';
import { DynIcon } from '../DynIcon';
import type {
  BadgeIcon,
  BadgeSize,
  BadgeStatus,
  DynBadgeProps,
  DynBadgeRef,
  DynBadgeDefaultProps,
  BadgeThemeColor,
} from './DynBadge.types';
import { DYN_BADGE_DEFAULT_PROPS } from './DynBadge.types';
import styles from './DynBadge.module.css';

const STATUS_ICON_MAP: Record<BadgeStatus, string> = {
  positive: 'ok',
  negative: 'close',
  warning: 'warning',
  disabled: 'minus',
};

const SIZE_CLASS_MAP: Record<BadgeSize, string> = {
  small: styles.sizeSmall!,
  medium: styles.sizeMedium!,
  large: styles.sizeLarge!,
};

const STATUS_CLASS_MAP: Record<BadgeStatus, string> = {
  positive: styles.statusPositive!,
  negative: styles.statusNegative!,
  warning: styles.statusWarning!,
  disabled: styles.statusDisabled!,
};

const COLOR_CLASS_MAP: Partial<Record<BadgeThemeColor, string>> = {
  'color-01': styles.color01!,
  'color-02': styles.color02!,
  'color-03': styles.color03!,
  'color-04': styles.color04!,
  'color-05': styles.color05!,
  'color-06': styles.color06!,
  'color-07': styles.color07!,
  'color-08': styles.color08!,
  'color-09': styles.color09!,
  'color-10': styles.color10!,
  'color-11': styles.color11!,
  'color-12': styles.color12!,
};

type DynBadgeComponentProps = DynBadgeProps & DynBadgeDefaultProps;

const resolveStatusIcon = (status: BadgeStatus | undefined, icon: BadgeIcon | undefined) => {
  if (icon === true && status) {
    return <DynIcon icon={STATUS_ICON_MAP[status]} />;
  }

  if (typeof icon === 'string') {
    return <DynIcon icon={icon} />;
  }

  if (icon) {
    return <span className={styles.customIcon}>{icon}</span>;
  }

  return null;
};

const DynBadgeComponent = (
  props: DynBadgeProps,
  ref: ForwardedRef<DynBadgeRef>
) => {
  const { value: providedValue } = props;
  const {
    value = DYN_BADGE_DEFAULT_PROPS.value,
    color = DYN_BADGE_DEFAULT_PROPS.color,
    status,
    size = DYN_BADGE_DEFAULT_PROPS.size,
    icon,
    showBorder = DYN_BADGE_DEFAULT_PROPS.showBorder,
    ariaLabel,
    children,
    className,
    'data-testid': dataTestId,
    id,
    ...rest
  } = props as DynBadgeComponentProps;

  const displayValue = useMemo(() => formatBadgeValue(value), [value]);
  const hasChildren = typeof children !== 'undefined' && children !== null;
  const hasExplicitValue = typeof providedValue === 'number';
  const showValue = hasExplicitValue || value > 0;
  const showIconOnly = Boolean(icon) && !hasChildren && !showValue;

  const customStyle = useMemo<CSSProperties | undefined>(() => {
    if (!color || isThemeColor(color)) {
      return undefined;
    }

    return { backgroundColor: color };
  }, [color]);

  const themeColorClass = isThemeColor(color)
    ? COLOR_CLASS_MAP[color as BadgeThemeColor]
    : undefined;

  const badgeClasses = cn(
    styles.root,
    SIZE_CLASS_MAP[size],
    themeColorClass,
    status ? STATUS_CLASS_MAP[status] : undefined,
    showBorder ? styles.withBorder : undefined,
    showIconOnly ? styles.iconOnly : undefined,
    showValue ? styles.withValue : undefined,
    className
  );

  const iconElement = resolveStatusIcon(status, icon);

  const content = (() => {
    if (hasChildren) {
      return children;
    }

    if (showIconOnly) {
      return iconElement;
    }

    if (showValue && iconElement) {
      return (
        <>
          {iconElement}
          <span className={styles.value}>{displayValue}</span>
        </>
      );
    }

    if (showValue) {
      return <span className={styles.value}>{displayValue}</span>;
    }

    return null;
  })();

  const computedAriaLabel = ariaLabel
    ? ariaLabel
    : hasChildren
    ? undefined
    : showValue
    ? `Badge with value ${displayValue}`
    : status
    ? `Badge status ${status}`
    : 'Badge';

  return (
    <span
      ref={ref}
      id={id}
      className={badgeClasses}
      style={customStyle}
      data-testid={dataTestId}
      aria-label={computedAriaLabel}
      role="status"
      {...rest}
    >
      {content}
    </span>
  );
};

const DynBadge = forwardRef<DynBadgeRef, DynBadgeProps>(DynBadgeComponent);

DynBadge.displayName = 'DynBadge';

export { DynBadge };
export default DynBadge;
export type {
  DynBadgeProps,
  BadgeStatus,
  BadgeSize,
  BadgeIcon,
} from './DynBadge.types';
