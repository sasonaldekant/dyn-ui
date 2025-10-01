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
 * Provides foundation for icon dictionary system integration
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

    // For now, render a placeholder SVG that will be replaced with proper icon system
    // This provides visual feedback while maintaining the interface
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
        {/* Placeholder icon - will be replaced with proper icon font/system */}
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
 * This is a temporary solution until proper icon system is integrated
 */
function getIconPath(iconName: string): React.ReactNode {
  switch (iconName) {
    case 'settings':
    case 'dyn-icon-settings':
      return (
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
      );
    case 'download':
    case 'dyn-icon-download':
      return (
        <path d="M8.5 1.5A.5.5 0 0 0 8 1a.5.5 0 0 0-.5.5v7.793L5.354 7.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/>
      );
    case 'ok':
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
    case 'user':
    case 'dyn-icon-user':
      return (
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
      );
    case 'home':
    case 'dyn-icon-home':
      return (
        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
      );
    case 'arrow-down':
    case 'dyn-icon-arrow-down':
      return (
        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      );
    case 'arrow-up':
    case 'dyn-icon-arrow-up':
      return (
        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
      );
    case 'arrow-right':
    case 'dyn-icon-arrow-right':
      return (
        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      );
    default:
      // Default icon - a simple circle
      return (
        <circle cx="8" cy="8" r="3" />
      );
  }
}

export default DynIcon;