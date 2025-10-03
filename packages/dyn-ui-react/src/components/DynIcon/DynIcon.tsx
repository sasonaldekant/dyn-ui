import * as React from 'react';
import classNames from 'classnames';
import { DynIconProps } from '../../types/icon.types';
import { useIconDictionary } from '../../hooks/useIconDictionary';
import { processIconString } from '../../utils/dynFormatters';
import { iconRegistry, getIcon } from './icons';
import styles from './DynIcon.module.css';

/**
 * DynIcon - Flexible icon component with dictionary and SVG fallback support
 */
export const DynIcon: React.FC<DynIconProps> = ({
  icon,
  size,
  className,
  onClick
}: DynIconProps) => {
  const iconDictionary = useIconDictionary();

  // Handle React component icons
  if (React.isValidElement(icon)) {
    return (
      <span
        className={classNames(styles.dynIcon, styles.dynIconCustom, className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-hidden={!onClick}
        style={{
          width: size || '1em',
          height: size || '1em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </span>
    );
  }

  // Handle string icon names
  if (typeof icon !== 'string') {
    return null;
  }

  // Try built-in SVG icons first
  const svgIcon = getIcon(icon);
  if (svgIcon) {
    return (
      <span
        className={classNames(styles.dynIcon, styles.dynIconSvg, className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-hidden={!onClick}
        style={{
          width: size || '1em',
          height: size || '1em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {React.cloneElement(svgIcon, {
          width: size || '1em',
          height: size || '1em',
          style: { display: 'block' }
        })}
      </span>
    );
  }

  // Fallback to dictionary-based icons (for external icon fonts)
  try {
    const processedIcon = processIconString(icon, iconDictionary);

    const iconClasses = classNames(
      styles.dynIcon,
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
        title={icon}
      />
    );
  } catch (error) {
    // Ultimate fallback - render icon name as text
    return (
      <span
        className={classNames(styles.dynIcon, styles.dynIconFallback, className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-hidden={!onClick}
        title={`Icon: ${icon}`}
        style={{
          fontSize: size || '1em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        [{icon}]
      </span>
    );
  }
};

DynIcon.displayName = 'DynIcon';
