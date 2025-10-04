import * as React from 'react';
import { DynButtonProps } from './DynButton.types';
import { cn } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';
import styles from './DynButton.module.scss';

/**
 * DynButton - A versatile button component with icon support and multiple variants
 * Supports different sizes, kinds, loading states, and accessibility features
 */
export const DynButton = React.forwardRef<HTMLButtonElement, DynButtonProps>(
  (
    {
      label,
      icon,
      type = 'button',
      loading = false,
      danger = false,
      kind = 'primary',
      disabled = false,
      ariaLabel,
      ariaExpanded,
      size = 'medium',
      className,
      onBlur,
      onClick,
      ...rest
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      onClick?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
      onBlur?.(event);
    };

    const buttonClasses = cn(
      styles.button,
      styles[`button--${kind}`],
      styles[`button--${size}`],
      {
        [styles['button--danger']]: danger,
        [styles['button--loading']]: loading,
        [styles['button--disabled']]: disabled,
        [styles['button--icon-only']]: Boolean(icon && !label),
      },
      className
    );

    const renderSpinner = () => {
      if (!loading) return null;
      return (
        <span
          className={styles.spinner}
          aria-hidden="true"
          data-testid="dyn-button-spinner"
        />
      );
    };

    const renderIcon = () => {
      if (loading) return renderSpinner();
      if (!icon) return null;

      return (
        <DynIcon
          icon={icon}
          size={size}
          className={styles.icon}
        />
      );
    };

    const renderLabel = () => {
      if (!label) return null;
      return (
        <span className={styles.label}>
          {label}
        </span>
      );
    };

    const effectiveAriaLabel = ariaLabel || (icon && !label ? 'Button' : undefined);

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-label={effectiveAriaLabel}
        aria-expanded={ariaExpanded}
        aria-busy={loading}
        onClick={handleClick}
        onBlur={handleBlur}
        data-testid="dyn-button"
        {...rest}
      >
        {renderIcon()}
        <span className={styles.content}>
          {renderLabel()}
        </span>
      </button>
    );
  }
);

DynButton.displayName = 'DynButton';

export default DynButton;