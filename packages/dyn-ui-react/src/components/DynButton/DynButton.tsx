import React, { forwardRef } from 'react';
import { DynButtonProps } from './DynButton.types';
import { classNames } from '../../utils/classNames';
import styles from './DynButton.module.scss';

/**
 * DynButton - Production-ready button component following DYN UI specification
 * Fixed to use SCSS modules and proper design token integration
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

    // Build CSS classes using SCSS modules
    const buttonClasses = classNames(
      styles.dynButton,
      styles[`dynButton--${kind}`],
      styles[`dynButton--${size}`],
      {
        [styles['dynButton--danger']]: danger,
        [styles['dynButton--loading']]: loading,
        [styles['dynButton--disabled']]: disabled,
        [styles['dynButton--iconOnly']]: Boolean(icon && !label),
      },
      className
    );

    // Render loading spinner with proper SCSS module classes
    const renderSpinner = () => {
      if (!loading) return null;
      return (
        <span 
          className={styles.dynButtonSpinner}
          aria-hidden="true"
          data-testid="dyn-button-spinner"
        />
      );
    };

    // Render icon with proper integration
    const renderIcon = () => {
      if (loading) return renderSpinner();
      if (!icon) return null;

      // Handle string icons (icon names) - will integrate with DynIcon later
      if (typeof icon === 'string') {
        return (
          <span 
            className={styles.dynButtonIcon}
            data-icon={icon}
            aria-hidden="true"
          >
            {/* Temporary placeholder - will be replaced with DynIcon integration */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1v2M8 13v2M15 8h-2M3 8H1M12.364 3.636l-1.414 1.414M5.05 10.95l-1.414 1.414M12.364 12.364l-1.414-1.414M5.05 5.05L3.636 3.636" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </span>
        );
      }

      // Handle React components
      return (
        <span className={styles.dynButtonIcon} aria-hidden="true">
          {icon}
        </span>
      );
    };

    // Render label with proper SCSS module classes
    const renderLabel = () => {
      if (!label) return null;
      return (
        <span className={styles.dynButtonLabel}>
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
        {renderLabel()}
      </button>
    );
  }
);

DynButton.displayName = 'DynButton';

export default DynButton;