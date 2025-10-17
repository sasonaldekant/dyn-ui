import * as React from 'react';
import { DynLabelProps } from '../../types/label.types';
import styles from './DynLabel.module.css';

// Lightweight replacement for the 'classnames' package to avoid adding an external dependency.
const classNames = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(' ');

export const DynLabel: React.FC<DynLabelProps> = ({
  children,
  htmlFor,
  disabled = false,
  required = false,
  optional = false,
  helpText,
  className,
  ...restProps
}: DynLabelProps) => {
  const labelClasses = classNames(
    styles['dyn-label'],
    disabled && styles['dyn-label--disabled'],
    (required || optional) && styles['dyn-label--with-requirement'],
    className
  );

  const renderRequirementIndicator = () => {
    if (required) {
      return (
        <span className={`${styles['dyn-label-requirement']} ${styles['dyn-label--required']}`}>
          <span className={styles['dyn-label-required-asterisk']} aria-hidden="true">*</span>
        </span>
      );
    }

    if (optional) {
      return (
        <span 
          className={`${styles['dyn-label-requirement']} ${styles['dyn-label--optional']}`}
          data-testid="optional-indicator"
        >
          <span className={styles['dyn-label-optional-text']}>(optional)</span>
        </span>
      );
    }

    return null;
  };

  const renderHelpText = () => {
    if (!helpText) return null;

    return (
      <span className={styles['dyn-label-help-text']} id={htmlFor ? `${htmlFor}-help` : undefined}>
        {helpText}
      </span>
    );
  };

  // Use React.createElement for dynamic element type to avoid ESBuild JSX parsing issues
  const elementProps = {
    className: labelClasses,
    ...(htmlFor && { htmlFor }),
    ...(helpText && htmlFor && { 'aria-describedby': `${htmlFor}-help` }),
    ...restProps
  };

  const labelContent = (
    <span className={styles['dyn-label-text']}>
      {children}
      {renderRequirementIndicator()}
    </span>
  );

  return (
    <div className={styles['dyn-label-container']} role="group">
      {htmlFor ? (
        <label {...elementProps}>
          {labelContent}
        </label>
      ) : (
        <span {...elementProps}>
          {labelContent}
        </span>
      )}
      {renderHelpText()}
    </div>
  );
};

DynLabel.displayName = 'DynLabel';

// Add default export
export default DynLabel;