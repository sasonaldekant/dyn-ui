import { forwardRef } from 'react';
import { DynButtonProps } from './DynButton.types';
import { classNames } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';
import styles from './DynButton.module.css';

/**
 * DynButton - Production-ready button component following DYN UI specification
 * Updated for CSS Modules compatibility with simplified className logic
 */
export const DynButton = forwardRef<HTMLButtonElement, DynButtonProps>(
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
    // Handle click events
    const handleClick = () => {
      if (loading || disabled) return;
      onClick?.();
    };

    // Handle blur events
    const handleBlur = () => {
      onBlur?.();
    };

    // Simplified className logic for CSS Modules
    const buttonClasses = classNames(
      styles.dynButton,
      styles[kind],      // .primary, .secondary, .tertiary
      styles[size],      // .small, .medium, .large
      {
        [styles.danger]: danger,
        [styles.loading]: loading,
        [styles.iconOnly]: Boolean(icon && !label),
      },
      className
    );

    // Render loading spinner
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

    // Render icon
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

    // Render label
    const renderLabel = () => {
      if (!label) return null;
      return (
        <span className={styles.label}>
          {label}
        </span>
      );
    };

    // Determine effective ARIA label
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
