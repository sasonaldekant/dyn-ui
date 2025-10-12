import {
  Children,
  forwardRef,
  useMemo,
} from 'react';
import type {
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import { cn } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';
import type {
  DynButtonDefaultProps,
  DynButtonKind,
  DynButtonProps,
  DynButtonSize,
  DynButtonRef,
} from './DynButton.types';
import { DYN_BUTTON_DEFAULT_PROPS } from './DynButton.types';
import styles from './DynButton.module.css';

const KIND_CLASS_MAP: Record<DynButtonKind, string> = {
  primary: styles.kindPrimary!,
  secondary: styles.kindSecondary!,
  tertiary: styles.kindTertiary!,
};

const SIZE_CLASS_MAP: Record<DynButtonSize, string> = {
  small: styles.sizeSmall!,
  medium: styles.sizeMedium!,
  large: styles.sizeLarge!,
};

type DynButtonComponentProps = DynButtonProps & DynButtonDefaultProps;

const normalizeAriaLabel = (value: string | undefined) =>
  value?.trim() ? value.trim() : undefined;

const DynButtonComponent = (
  props: DynButtonProps,
  ref: ForwardedRef<DynButtonRef>
) => {
  const {
    label,
    icon,
    type = DYN_BUTTON_DEFAULT_PROPS.type,
    kind = DYN_BUTTON_DEFAULT_PROPS.kind,
    size = DYN_BUTTON_DEFAULT_PROPS.size,
    loading = DYN_BUTTON_DEFAULT_PROPS.loading,
    loadingText = DYN_BUTTON_DEFAULT_PROPS.loadingText,
    danger = DYN_BUTTON_DEFAULT_PROPS.danger,
    disabled = DYN_BUTTON_DEFAULT_PROPS.disabled,
    fullWidth = DYN_BUTTON_DEFAULT_PROPS.fullWidth,
    hideOnMobile = DYN_BUTTON_DEFAULT_PROPS.hideOnMobile,
    iconOnlyOnMobile = DYN_BUTTON_DEFAULT_PROPS.iconOnlyOnMobile,
    ariaLabel,
    ariaExpanded,
    ariaControls,
    ariaDescribedBy,
    ariaPressed,
    onBlur,
    onClick,
    onKeyDown: userOnKeyDown,
    children,
    className,
    id,
    'data-testid': dataTestId,
    ...rest
  } = props as DynButtonComponentProps;

  const trimmedLabel = useMemo(
    () => (typeof label === 'string' ? label.trim() : ''),
    [label]
  );

  const hasLabel = trimmedLabel.length > 0;
  const childrenCount = Children.count(children);
  const hasChildrenContent = childrenCount > 0;
  const isIconOnly = Boolean(icon) && !hasLabel && !hasChildrenContent;

  const normalizedIconLabel = useMemo(() => {
    if (typeof icon !== 'string') {
      return undefined;
    }

    return icon
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, [icon]);

  const computedAriaLabel = normalizeAriaLabel(
    ariaLabel ??
      (isIconOnly ? trimmedLabel || normalizedIconLabel || 'Button' : undefined)
  );

  const isDisabled = disabled || loading;

  const normalizedLoadingText = useMemo(() => {
    if (typeof loadingText !== 'string') {
      return DYN_BUTTON_DEFAULT_PROPS.loadingText;
    }

    const trimmed = loadingText.trim();
    return trimmed || DYN_BUTTON_DEFAULT_PROPS.loadingText;
  }, [loadingText]);

  const iconSizeToken = useMemo(() => {
    switch (size) {
      case 'small':
        return 'small' as const;
      case 'large':
        return 'large' as const;
      default:
        return 'medium' as const;
    }
  }, [size]);

  const iconElement = useMemo(() => {
    if (!icon) {
      return null;
    }

    if (typeof icon === 'string') {
      return (
        <DynIcon
          icon={icon}
          aria-hidden
          className={styles.icon}
          size={iconSizeToken}
        />
      );
    }

    return (
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    );
  }, [icon, iconSizeToken]);

  const childrenContent = useMemo(() => {
    if (!hasChildrenContent) {
      return null;
    }

    if (typeof children === 'string') {
      const trimmedChildren = children.trim();
      if (!trimmedChildren) {
        return null;
      }

      return <span className={styles.label}>{trimmedChildren}</span>;
    }

    return children;
  }, [children, hasChildrenContent]);

  const labelElement = hasLabel ? (
    <span className={styles.label}>{trimmedLabel}</span>
  ) : null;

  const buttonClassName = cn(
    styles.root,
    KIND_CLASS_MAP[kind] ?? KIND_CLASS_MAP.primary,
    SIZE_CLASS_MAP[size] ?? SIZE_CLASS_MAP.medium,
    {
      [styles.danger!]: danger,
      [styles.loading!]: loading,
      [styles.iconOnly!]: isIconOnly,
      [styles.fullWidth!]: fullWidth,
      [styles.hideOnMobile!]: hideOnMobile,
      [styles.iconOnlyOnMobile!]: iconOnlyOnMobile,
    },
    className
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  const handleBlur: FocusEventHandler<HTMLButtonElement> = event => {
    onBlur?.(event);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = event => {
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();

      if (!isDisabled) {
        event.currentTarget.click();
      }
    }

    userOnKeyDown?.(event);
  };

  return (
    <button
      ref={ref}
      id={id}
      type={type}
      className={buttonClassName}
      data-testid={dataTestId ?? 'dyn-button'}
      aria-label={computedAriaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-describedby={ariaDescribedBy}
      aria-pressed={
        typeof ariaPressed === 'boolean' ? ariaPressed : undefined
      }
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className={styles.content}>
        {iconElement}
        {labelElement}
        {childrenContent}
      </span>
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span
            className={styles.visuallyHidden}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {normalizedLoadingText}
          </span>
        </>
      ) : null}
    </button>
  );
};

const DynButton = forwardRef<DynButtonRef, DynButtonProps>(DynButtonComponent);

DynButton.displayName = 'DynButton';

export { DynButton };
export default DynButton;
