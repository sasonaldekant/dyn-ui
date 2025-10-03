import * as React from 'react';
import { DynButtonProps } from './DynButton.types';
import { cn } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';

/**
 * DynButton - Optimized version with shorter class names
 * Uses semantic class names instead of CSS Module hashes
 */
export const DynButtonOptimized = React.forwardRef<HTMLButtonElement, DynButtonProps>(
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
    const handleClick = () => {
      if (loading || disabled) return;
      onClick?.();
    };

    const handleBlur = () => {
      onBlur?.();
    };

    // Optimized short class names - more readable and smaller bundle
    const buttonClasses = cn(
      // Base class - short and semantic
      'dyn-btn',

      // Kind classes - single word
      `dyn-btn--${kind}`, // dyn-btn--primary, dyn-btn--secondary, dyn-btn--tertiary

      // Size classes - single letter
      `dyn-btn--${size[0]}`, // dyn-btn--s, dyn-btn--m, dyn-btn--l

      // State classes - short abbreviations
      {
        'dyn-btn--danger': danger,
        'dyn-btn--loading': loading,
        'dyn-btn--disabled': disabled,
        'dyn-btn--icon-only': Boolean(icon && !label),
      },

      className
    );

    const renderSpinner = () => {
      if (!loading) return null;
      return (
        <span
          className="dyn-spinner"
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
          className="dyn-btn__icon"
        />
      );
    };

    const renderLabel = () => {
      if (!label) return null;
      return (
        <span className="dyn-btn__label">
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
        <span className="dyn-btn__content">
          {renderLabel()}
        </span>
      </button>
    );
  }
);

DynButtonOptimized.displayName = 'DynButtonOptimized';

export default DynButtonOptimized;
