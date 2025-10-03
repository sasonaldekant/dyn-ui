import React from 'react';
import classNames from 'classnames';
import { DynIconProps } from '../../types/icon.types';
import { useIconDictionary } from '../../hooks/useIconDictionary';
import { processIconString } from '../../utils/dynFormatters';
import styles from './DynIcon.module.scss';

/**
 * DynIcon - Flexible icon component with dictionary support
 */
const DynIcon: React.FC<DynIconProps> = ({
  icon,
  size,
  className,
  onClick
}) => {
  const iconDictionary = useIconDictionary();

  // Handle React component icons
  if (React.isValidElement(icon)) {
    return (
      <span 
        className={classNames(styles.dynIconCustom, className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-hidden={!onClick}
      >
        {icon}
      </span>
    );
  }

  // Handle string icon names
  if (typeof icon !== 'string') {
    return null;
  }

  const processedIcon = processIconString(icon, iconDictionary);
  
  const iconClasses = classNames(
    processedIcon.baseClass,
    processedIcon.iconClass,
    size && `dyn-icon-size-${size}`,
    onClick && 'dyn-icon-clickable',
    className
  );

  return (
    <i 
      className={iconClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-hidden={!onClick}
      title={typeof icon === 'string' ? icon : undefined}
    />
  );
};

export default DynIcon;
