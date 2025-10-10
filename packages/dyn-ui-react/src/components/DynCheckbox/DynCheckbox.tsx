import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent, ForwardedRef, KeyboardEvent } from 'react';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { cn } from '../../utils/classNames';
import type { DynCheckboxProps, DynCheckboxRef } from './DynCheckbox.types';
import { DYN_CHECKBOX_DEFAULT_PROPS } from './DynCheckbox.types';
import styles from './DynCheckbox.module.scss';

const DynCheckboxComponent = (
  {
    name,
    label,
    help,
    disabled = DYN_CHECKBOX_DEFAULT_PROPS.disabled,
    readonly = DYN_CHECKBOX_DEFAULT_PROPS.readonly,
    required = DYN_CHECKBOX_DEFAULT_PROPS.required,
    optional = DYN_CHECKBOX_DEFAULT_PROPS.optional,
    visible = DYN_CHECKBOX_DEFAULT_PROPS.visible,
    checked: checkedProp = DYN_CHECKBOX_DEFAULT_PROPS.checked,
    indeterminate = DYN_CHECKBOX_DEFAULT_PROPS.indeterminate,
    errorMessage,
    validation,
    className,
    size = DYN_CHECKBOX_DEFAULT_PROPS.size,
    onChange,
    onBlur,
    onFocus,
    id,
    'data-testid': dataTestId = DYN_CHECKBOX_DEFAULT_PROPS['data-testid'],
  }: DynCheckboxProps,
  ref: ForwardedRef<DynCheckboxRef>
) => {
  const [checked, setChecked] = useState<boolean>(checkedProp);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const fallbackId = useId();
  const fieldId = id ?? name ?? `${fallbackId}-checkbox`;

  const { error, validate, clearError } = useDynFieldValidation({
    value: checked ? 'checked' : '',
    required,
    validation,
    customError: errorMessage,
  });

  const resolvedError = errorMessage ?? error;

  useImperativeHandle(
    ref,
    () => ({
      focus: () => checkboxRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setChecked(false);
        onChange?.(false);
        clearError();
      },
      getValue: () => checked,
      setValue: (newValue: unknown) => {
        const booleanValue = Boolean(newValue);
        setChecked(booleanValue);
        onChange?.(booleanValue);
      },
    }),
    [checked, clearError, onChange, validate]
  );

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (readonly || disabled) {
      event.preventDefault();
      return;
    }

    const nextValue = event.target.checked;
    setChecked(nextValue);
    onChange?.(nextValue);
    clearError();
  };

  const handleBlur = () => {
    void validate();
    onBlur?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();

      if (disabled || readonly) {
        return;
      }

      const nextValue = !checked;
      setChecked(nextValue);
      onChange?.(nextValue);
      clearError();
    }
  };

  if (!visible) {
    return null;
  }

  const sizeClassMap: Record<NonNullable<DynCheckboxProps['size']>, string | undefined> = {
    small: styles.boxSmall,
    medium: undefined,
    large: styles.boxLarge,
  };

  const checkboxClasses = cn(styles.box, sizeClassMap[size], {
    [styles.boxChecked]: checked && !indeterminate,
    [styles.boxIndeterminate]: indeterminate,
    [styles.boxError]: Boolean(resolvedError),
    [styles.boxDisabled]: disabled,
    [styles.boxReadonly]: readonly,
  });

  const containerClasses = cn(
    styles.container,
    {
      [styles.containerDisabled]: disabled,
      [styles.containerReadonly]: readonly,
    },
    className
  );

  const wrapperClasses = cn(styles.wrapper, {
    [styles.wrapperDisabled]: disabled,
    [styles.wrapperReadonly]: readonly,
  });

  const describedById = resolvedError
    ? `${fieldId}-error`
    : help
    ? `${fieldId}-help`
    : undefined;

  const visualState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';

  return (
    <DynFieldContainer
      helpText={help}
      required={required}
      optional={optional}
      errorText={resolvedError}
      className={containerClasses}
      htmlFor={fieldId}
    >
      <label className={wrapperClasses} htmlFor={fieldId}>
        <input
          ref={checkboxRef}
          type="checkbox"
          id={fieldId}
          name={name}
          className={styles.input}
          checked={checked}
          disabled={disabled}
          readOnly={readonly}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
          aria-invalid={Boolean(resolvedError)}
          aria-describedby={describedById}
          aria-required={required || undefined}
          data-testid={dataTestId}
        />

        <span
          className={checkboxClasses}
          aria-hidden="true"
          data-state={visualState}
          data-size={size}
        >
          <span className={styles.checkmark}>
            {indeterminate ? (
              <span className={styles.indeterminateMark}>-</span>
            ) : checked ? (
              <span className={styles.checkMark}>✓</span>
            ) : null}
          </span>
        </span>
        {label && (
          <span className={styles.label}>
            {label}
            {required && (
              <span className={styles.requiredIndicator} aria-hidden="true">
                *
              </span>
            )}
            {optional && !required && (
              <span className={styles.optionalIndicator} aria-label="opcional">
                (opcional)
              </span>
            )}
          </span>
        )}
      </label>
    </DynFieldContainer>
  );
};

const DynCheckbox = forwardRef<DynCheckboxRef, DynCheckboxProps>(DynCheckboxComponent);

DynCheckbox.displayName = 'DynCheckbox';

export { DynCheckbox };
export default DynCheckbox;
