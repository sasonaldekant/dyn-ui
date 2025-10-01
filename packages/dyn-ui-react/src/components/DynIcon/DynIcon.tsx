import React from 'react';
import { classNames } from '../../utils/classNames';
import styles from './DynIcon.module.scss';

export interface DynIconProps {
  /** Icon name (string) or React component */
  icon: string | React.ReactNode;
  /** Icon size - can be CSS value or predefined size */
  size?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for interactive icons */
  onClick?: () => void;
}

/**
 * DynIcon - Flexible icon component supporting string names and React components
 * Updated to properly use existing SCSS module classes
 */
export const DynIcon: React.FC<DynIconProps> = ({
  icon,
  size,
  className,
  onClick
}) => {
  // Handle React component icons
  if (React.isValidElement(icon)) {
    const iconClasses = classNames(
      styles.dynIcon,
      styles.dynIconCustom,
      {
        [styles.dynIconClickable]: Boolean(onClick),
      },
      className
    );

    const iconStyle: React.CSSProperties = {
      ...(size && {
        fontSize: typeof size === 'number' ? `${size}px` : size,
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }),
    };

    return (
      <span 
        className={iconClasses} 
        style={iconStyle}
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
  if (typeof icon === 'string') {
    const iconClasses = classNames(
      styles.dynIcon,
      styles.dynIconString,
      {
        [styles.dynIconClickable]: Boolean(onClick),
      },
      className
    );

    const iconStyle: React.CSSProperties = {
      ...(size && {
        fontSize: typeof size === 'number' ? `${size}px` : size,
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }),
    };

    return (
      <i 
        className={iconClasses}
        style={iconStyle}
        data-icon={icon}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-hidden={!onClick}
        title={icon}
      >
        {/* SVG icons based on name */}
        <svg 
          width="1em" 
          height="1em" 
          viewBox="0 0 16 16" 
          fill="currentColor"
          aria-hidden="true"
        >
          {getIconPath(icon)}
        </svg>
      </i>
    );
  }

  // Return null for invalid icon types
  return null;
};

/**
 * Get SVG path for common icon names
 * This matches the existing icon system from the previous implementation
 */
function getIconPath(iconName: string): React.ReactNode {
  switch (iconName) {
    case 'settings':
    case 'dyn-icon-settings':
      return (
        <>
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </>
      );
    case 'download':
    case 'dyn-icon-download':
      return (
        <path d="M8.5 1.5A.5.5 0 0 0 8 1a.5.5 0 0 0-.5.5v7.793L5.354 7.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.293V1.5zM3 14.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3z"/>
      );
    case 'ok':
    case 'check':
    case 'dyn-icon-ok':
      return (
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
      );
    case 'close':
    case 'dyn-icon-close':
      return (
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
      );
    case 'warning':
    case 'dyn-icon-warning':
      return (
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      );
    default:
      // Default icon - a simple circle
      return (
        <circle cx="8" cy="8" r="3" />
      );
  }
}

export default DynIcon;