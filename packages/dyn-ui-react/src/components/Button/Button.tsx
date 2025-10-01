import React, { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { BaseComponentProps, ColorVariant, Size } from '../../types/theme';
import styles from './Button.module.scss';

export interface ButtonProps extends BaseComponentProps {
  /** Button visual variant */
  variant?: ColorVariant | 'ghost' | 'outline';
  /** Button size */
  size?: Size;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Full width button */
  fullWidth?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button content */
  children: React.ReactNode;
}

/**
 * Versatile button component with multiple variants and states
 */
export const DynButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      type = 'button',
      className,
      onClick,
      children,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const buttonClasses = classNames(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      {
        [styles['button--disabled']]: disabled,
        [styles['button--loading']]: loading,
        [styles['button--full-width']]: fullWidth,
        [styles['button--icon-only']]: icon && !children,
      },
      className
    );

    const renderIcon = () => {
      if (loading) {
        return <span className={styles.spinner} aria-hidden="true" />;
      }
      return icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null;
    };

    const renderContent = () => {
      if (loading && !children) {
        return <span className="sr-only">Loading...</span>;
      }

      return (
        <>
          {iconPosition === 'left' && renderIcon()}
          {children && <span className={styles.content}>{children}</span>}
          {iconPosition === 'right' && renderIcon()}
        </>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        data-testid={testId}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {renderContent()}
      </button>
    );
  }
);

DynButton.displayName = 'DynButton';

export default DynButton;