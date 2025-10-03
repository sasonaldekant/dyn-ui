/**
 * DynFieldContainer - Universal wrapper component for form fields
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import React from 'react';
import classNames from 'classnames';

export interface DynFieldContainerProps {
  children: React.ReactElement;
  label?: string;
  required?: boolean;
  optional?: boolean;
  helpText?: string;
  errorText?: string;
  showValidation?: boolean;
  className?: string;
  htmlFor?: string;
}

export const DynFieldContainer: React.FC<DynFieldContainerProps> = ({
  children,
  label,
  required = false,
  optional = false,
  helpText,
  errorText,
  showValidation = true,
  className,
  htmlFor
}) => {
  const containerClasses = classNames(
    'dyn-field-container',
    {
      'dyn-field-container--error': !!errorText,
      'dyn-field-container--required': required,
      'dyn-field-container--optional': optional
    },
    className
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label className="dyn-field-label" htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="dyn-field-required" aria-label="obrigatório">
              *
            </span>
          )}
          {optional && (
            <span className="dyn-field-optional" aria-label="opcional">
              (opcional)
            </span>
          )}
        </label>
      )}
      
      {children}
      
      {showValidation && (helpText || errorText) && (
        <div className="dyn-field-feedback">
          {errorText ? (
            <div 
              className="dyn-field-error" 
              id={htmlFor ? `${htmlFor}-error` : undefined}
              role="alert"
              aria-live="polite"
            >
              {errorText}
            </div>
          ) : helpText ? (
            <div 
              className="dyn-field-help"
              id={htmlFor ? `${htmlFor}-help` : undefined}
            >
              {helpText}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

DynFieldContainer.displayName = 'DynFieldContainer';

export default DynFieldContainer;
