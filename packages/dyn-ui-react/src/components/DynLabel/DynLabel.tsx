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
  // Use label element when htmlFor is provided, otherwise use span
  const ElementType = htmlFor ? 'label' : 'span';

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
        <span className={`${styles['dyn-label-requirement']} ${styles['dyn-label--optional']}`}>
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

  return (
    <div className={styles['dyn-label-container']} role="group">
      <label
        className={labelClasses}
        htmlFor={htmlFor}
        aria-describedby={helpText && htmlFor ? `${htmlFor}-help` : undefined}
        {...restProps}
      >
        <span className={styles['dyn-label-text']}>
          {children}
          {renderRequirementIndicator()}
        </span>
      </ElementType>
      {renderHelpText()}
    </div>
  );
};

DynLabel.displayName = 'DynLabel';

// Add default export
export default DynLabel;
