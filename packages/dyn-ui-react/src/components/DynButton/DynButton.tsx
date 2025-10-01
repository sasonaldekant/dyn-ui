import React, { forwardRef } from 'react';
import { DynButtonProps } from './DynButton.types';
import { classNames } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';
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

    // Render icon using DynIcon component
    const renderIcon = () => {
      if (loading) return renderSpinner();
      if (!icon) return null;

      return (
        <DynIcon 
          icon={icon}
          className={styles.dynButtonIcon}
        />
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