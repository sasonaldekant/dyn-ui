import React from 'react';
import { DynButtonProps } from './DynButton.types';
import { DynIcon } from '../DynIcon';
import { classNames } from '../../utils/classNames';
import styles from './DynButton.module.css';

export const DynButton: React.FC<DynButtonProps> = ({
  label,
  icon,
  type = 'button',
  loading = false,
  danger = false,
  kind = 'primary',
  disabled = false,
  size = 'medium',
  ariaLabel,
  ariaExpanded,
  onBlur,
  onClick,
  className,
  'data-testid': testId,
  id,
  children,
  ...rest
}) => {
  const buttonClasses = classNames(
    styles['dyn-button'],
    styles[`dyn-button--${kind}`],
    styles[`dyn-button--${size}`],
    danger && styles['dyn-button--danger'],
    loading && styles['dyn-button--loading'],
    disabled && styles['dyn-button--disabled'],
    icon && !label && styles['dyn-button--icon-only'],
    className
  );

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const renderIcon = () => {
    if (loading) {
      return <DynIcon icon="loading" />;
    }
    
    if (icon) {
      return <DynIcon icon={icon} />;
    }
    
    return null;
  };

  const renderContent = () => {
    if (children) {
      return children;
    }
    
    return (
      <>
        {renderIcon()}
        {label && <span className={styles['dyn-button__label']}>{label}</span>}
      </>
    );
  };

  return (
    <button
      id={id}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      data-testid={testId}
      onBlur={handleBlur}
      onClick={handleClick}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};

DynButton.displayName = 'DynButton';

// Named export
export default DynButton;