import * as React from 'react';
import { DynDividerProps, DynDividerRef, DIVIDER_COORDINATES } from './DynDivider.types';
import { classNames } from '../../utils/classNames';
import './DynDivider.css';

/**
 * DynDivider - Visual separator component with optional label
 * Follows DYN UI specification for layout components
 */
export const DynDivider = React.forwardRef<DynDividerRef, DynDividerProps>(
  (
    {
      label,
      borderWidth = 'small',
      className,
      ...rest
    },
    ref
  ) => {
    const coordinates = DIVIDER_COORDINATES[borderWidth];

    // Build CSS classes
    const dividerClasses = classNames(
      'dyn-divider',
      `dyn-divider--${borderWidth}`,
      {
        'dyn-divider--with-label': !!label,
      },
      className
    );

    // Imperative API
    React.useImperativeHandle(ref, () => ({
      focus() {
        console.log('DynDivider focused');
      }
    }));

    // Divider with label
    if (label) {
      return (
        <div
          className={dividerClasses}
          role="separator"
          aria-label={label}
          data-testid="dyn-divider"
          {...rest}
        >
          <div className="dyn-divider__content">
            <div className="dyn-divider__line dyn-divider__line--left" />
            <span className="dyn-divider__label">{label}</span>
            <div className="dyn-divider__line dyn-divider__line--right" />
          </div>
        </div>
      );
    }

    // Simple divider with SVG line
    return (
      <div
        className={dividerClasses}
        role="separator"
        data-testid="dyn-divider"
        {...rest}
      >
        <svg
          className="dyn-divider__svg"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1={coordinates.x1}
            y1="0.5"
            x2={coordinates.x2}
            y2="0.5"
            className="dyn-divider__svg-line"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
);

DynDivider.displayName = 'DynDivider';
