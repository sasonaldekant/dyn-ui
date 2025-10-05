import React from 'react';
import { DynIconProps } from '../../types/icon.types';
import { processIconString } from '../../utils/dynFormatters';
import { useIconDictionary } from '../../hooks/useIconDictionary';
import { classNames } from '../../utils/classNames';
import styles from './DynIcon.module.css';

export const DynIcon: React.FC<DynIconProps> = ({
  icon,
  size,
  onClick,
  className,
  'data-testid': testId,
  id,
  children,
  ...rest
}) => {
  const { getIconClass } = useIconDictionary();

  if (React.isValidElement(icon)) {
    // If icon is a React component, render it directly
    return (
      <span
        id={id}
        className={classNames(styles['dyn-icon'], styles['dyn-icon--custom'], className)}
        data-testid={testId}
        onClick={onClick}
        style={{ fontSize: size }}
        {...rest}
      >
        {icon}
      </span>
    );
  }

  if (typeof icon === 'string') {
    // Process icon string to get CSS classes
    const processed = processIconString(icon);
    const iconClass = getIconClass ? getIconClass(icon) : processed.iconClass;

    return (
      <i
        id={id}
        className={classNames(
          styles['dyn-icon'],
          processed.baseClass,
          iconClass,
          className
        )}
        data-testid={testId}
        onClick={onClick}
        style={{ fontSize: size }}
        {...rest}
      />
    );
  }

  // Fallback - render children if provided
  return (
    <span
      id={id}
      className={classNames(styles['dyn-icon'], styles['dyn-icon--empty'], className)}
      data-testid={testId}
      onClick={onClick}
      style={{ fontSize: size }}
      {...rest}
    >
      {children}
    </span>
  );
};

DynIcon.displayName = 'DynIcon';

// Export named component (not default)
export default DynIcon;