import type { FC } from 'react';
import { cn } from '../../utils/classNames';
import {
  DYN_FIELD_CONTAINER_DEFAULT_PROPS,
  type DynFieldContainerProps,
} from './DynFieldContainer.types';
import styles from './DynFieldContainer.module.css';

export const DynFieldContainer: FC<DynFieldContainerProps> = props => {
  const {
    children,
    label,
    required = false,
    optional = false,
    helpText,
    errorText,
    showValidation = DYN_FIELD_CONTAINER_DEFAULT_PROPS.showValidation,
    className,
    htmlFor,
    id,
    'data-testid': dataTestId = DYN_FIELD_CONTAINER_DEFAULT_PROPS['data-testid'],
    ...rest
  } = props;

  const containerClasses = cn(
    styles.container,
    errorText && styles.containerError,
    required && styles.containerRequired,
    optional && styles.containerOptional,
    className
  );

  return (
    <div
      {...rest}
      id={id}
      className={containerClasses}
      data-testid={dataTestId}
    >
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && (
            <span className={styles.required} aria-label="obrigatório">
              *
            </span>
          )}
          {optional && (
            <span className={styles.optional} aria-label="opcional">
              (opcional)
            </span>
          )}
        </label>
      )}

      {children}

      {showValidation && (helpText || errorText) && (
        <div className={styles.feedback}>
          {errorText ? (
            <div
              className={styles.error}
              id={htmlFor ? `${htmlFor}-error` : undefined}
              role="alert"
              aria-live="polite"
            >
              {errorText}
            </div>
          ) : helpText ? (
            <div
              className={styles.help}
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
