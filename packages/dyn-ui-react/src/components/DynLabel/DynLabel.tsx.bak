import { React } from 'react';
import classNames from 'classnames';
import { DynLabelProps } from '../../types/label.types';
import './DynLabel.module.css';

export const DynLabel: React.FC<DynLabelProps> = ({
  children,
  htmlFor,
  disabled = false,
  required = false,
  optional = false,
  helpText,
  className
}: DynLabelProps) => {
  const labelClasses = classNames(
    'dyn-label',
    disabled && 'dyn-label-disabled',
    (required || optional) && 'dyn-label-with-requirement',
    className
  );

  const renderRequirementIndicator = () => {
    if (required) {
      return (
        <span className="dyn-label-requirement dyn-label-required">
          <span className="dyn-label-required-asterisk" aria-hidden="true">*</span>
        </span>
      );
    }

    if (optional) {
      return (
        <span className="dyn-label-requirement dyn-label-optional">
          <span className="dyn-label-optional-text">(optional)</span>
        </span>
      );
    }

    return null;
  };

  const renderHelpText = () => {
    if (!helpText) return null;

    return (
      <span className="dyn-label-help-text" id={htmlFor ? `${htmlFor}-help` : undefined}>
        {helpText}
      </span>
    );
  };

  return (
    <div className="dyn-label-container">
      <label 
        className={labelClasses} 
        htmlFor={htmlFor}
        aria-describedby={helpText && htmlFor ? `${htmlFor}-help` : undefined}
      >
        <span className="dyn-label-text">
          {children}
          {renderRequirementIndicator()}
        </span>
      </label>
      {renderHelpText()}
    </div>
  );
};
