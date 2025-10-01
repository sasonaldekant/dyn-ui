import React, { forwardRef } from 'react';
import { DynButtonProps } from './DynButton.types';
import styles from './DynButton.module.scss';
import { classNames } from '../../utils/classNames';

/**
 * DynButton - Production-ready button component following DYN UI specification
 * 
 * @example
 * // Primary button with label
 * <DynButton kind="primary" label="Save Changes" onClick={handleSave} />
 * 
 * // Secondary button with icon and label
 * <DynButton 
 *   kind="secondary" 
 *   icon="download" 
 *   label="Download" 
 *   size="large"
 * />
 * 
 * // Icon-only button
 * <DynButton kind="tertiary" icon="settings" ariaLabel="Settings" />
 * 
 * // Loading state
 * <DynButton kind="primary" label="Saving..." loading={true} />
 * 
 * // Danger state
 * <DynButton kind="primary" label="Delete" danger={true} />
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

    // Build CSS classes
    const buttonClasses = classNames(
      styles.dynButton,
      styles[`dynButton--${kind}`],
      styles[`dynButton--${size}`],
      {
        [styles['dynButton--danger']]: danger,
        [styles['dynButton--loading']]: loading,
        [styles['dynButton--disabled']]: disabled,
        [styles['dynButton--iconOnly']]: icon && !label,
      },
      className
    );

    // Render loading spinner
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

    // Render icon
    const renderIcon = () => {
      if (loading) return renderSpinner();
      if (!icon) return null;

      // Handle string icons (icon names)
      if (typeof icon === 'string') {
        return (
          <span 
            className={styles.dynButtonIcon}
            data-icon={icon}
            aria-hidden="true"
          >
            {/* Icon placeholder - integrate with icon system */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="8" r="4" />
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

    // Render label
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