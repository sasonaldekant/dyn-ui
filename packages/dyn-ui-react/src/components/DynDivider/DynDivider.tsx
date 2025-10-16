import { forwardRef, useId } from 'react';
import type { ForwardedRef } from 'react';
import { cn } from '../../utils/classNames';
import {
  DYN_DIVIDER_DEFAULT_PROPS,
  DynDividerProps,
  DynDividerRef,
} from './DynDivider.types';
import styles from './DynDivider.module.css';

const toPascalCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const DynDividerComponent = (
  {
    label,
    labelPosition = DYN_DIVIDER_DEFAULT_PROPS.labelPosition,
    direction = DYN_DIVIDER_DEFAULT_PROPS.direction,
    thickness = DYN_DIVIDER_DEFAULT_PROPS.thickness,
    lineStyle = DYN_DIVIDER_DEFAULT_PROPS.lineStyle,
    color = DYN_DIVIDER_DEFAULT_PROPS.color,
    spacing = DYN_DIVIDER_DEFAULT_PROPS.spacing,
    children,
    className,
    id,
    'data-testid': dataTestId = DYN_DIVIDER_DEFAULT_PROPS['data-testid'],
    ...rest
  }: DynDividerProps,
  ref: ForwardedRef<DynDividerRef>
) => {
  const generatedId = useId();
  const orientation = direction === 'vertical' ? 'vertical' : 'horizontal';
  const labelContent = children ?? label;
  const labelId = labelContent ? `${id ?? `dyn-divider-${generatedId}`}-label` : undefined;
  const ariaLabel =
    !labelId && typeof labelContent === 'string' ? labelContent : undefined;

  const directionClass = styles[`direction${toPascalCase(orientation)}` as keyof typeof styles];
  const thicknessClass = styles[`thickness${toPascalCase(thickness)}` as keyof typeof styles];
  const styleClass = styles[`lineStyle${toPascalCase(lineStyle)}` as keyof typeof styles];
  const colorClass = styles[`color${toPascalCase(color)}` as keyof typeof styles];
  const spacingClass = styles[`spacing${toPascalCase(spacing)}` as keyof typeof styles];
  const labelPositionClass = labelContent
    ? styles[`label${toPascalCase(labelPosition)}` as keyof typeof styles]
    : undefined;

  const dividerClassName = cn(
    styles.root,
    directionClass,
    thicknessClass,
    styleClass,
    colorClass,
    spacingClass,
    Boolean(labelContent) && styles.withLabel,
    labelPositionClass,
    className
  );

  return (
    <div
      ref={ref}
      id={id}
      role="separator"
      aria-orientation={orientation}
      aria-labelledby={labelId}
      aria-label={ariaLabel}
      className={dividerClassName}
      data-testid={dataTestId}
      {...rest}
    >
      <span className={styles.line} aria-hidden="true" />
      {labelContent ? (
        <span className={styles.label} id={labelId}>
          {labelContent}
        </span>
      ) : null}
      <span className={styles.line} aria-hidden="true" />
    </div>
  );
};

const DynDivider = forwardRef<DynDividerRef, DynDividerProps>(DynDividerComponent);

DynDivider.displayName = 'DynDivider';

export { DynDivider };
export default DynDivider;
