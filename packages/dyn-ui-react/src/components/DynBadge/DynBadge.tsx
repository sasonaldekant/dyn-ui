import  * as React from 'react';
import classNames from 'classnames';
import { DynBadgeProps, DYN_COLOR_PALETTE } from '../../types/badge.types';
import { formatBadgeValue, isThemeColor } from '../../utils/dynFormatters';
import { DynIcon } from '../DynIcon/DynIcon';
import './DynBadge.module.css';

export const DynBadge: React.FC<DynBadgeProps> = ({
  value = 0,
  color = 'color-07',
  status,
  size = 'medium',
  icon,
  showBorder = false,
  ariaLabel,
  children,
  className
}: DynBadgeProps) => {
  const displayValue = formatBadgeValue(value);
  const isCustomColor = !isThemeColor(color);
  const customStyle = isCustomColor ? { backgroundColor: color } : undefined;

  const badgeClasses = classNames(
    'dyn-badge',
    `dyn-badge-${size}`,
    isThemeColor(color) && `dyn-badge-${color}`,
    status && `dyn-badge-status-${status}`,
    showBorder && 'dyn-badge-border',
    icon && !value && 'dyn-badge-icon-only',
    value > 0 && 'dyn-badge-with-value',
    className
  );

  const renderIcon = () => {
    if (icon === true && status) {
      // Auto icon based on status
      const statusIcons = {
        positive: 'ok',
        negative: 'close',
        warning: 'warning',
        disabled: 'minus'
      };
      return <DynIcon icon={statusIcons[status]} />;
    }

    if (typeof icon === 'string') {
      return <DynIcon icon={icon} />;
    }

    return icon ? <span className="dyn-badge-custom-icon">{icon}</span> : null;
  };

  const renderContent = () => {
    if (icon && !value) {
      return renderIcon();
    }

    if (value > 0 && icon) {
      return (
        <>
          {renderIcon()}
          <span className="dyn-badge-value">{displayValue}</span>
        </>
      );
    }

    return value > 0 ? (
      <span className="dyn-badge-value">{displayValue}</span>
    ) : null;
  };

  return (
    <span
      className={badgeClasses}
      style={customStyle}
      aria-label={ariaLabel || `Badge with value ${displayValue}`}
      role="status"
    >
      {renderContent()}
    </span>
  );
};
DynBadge.displayName = 'DynBadge';
export { DynBadgeProps };

