import { forwardRef, useMemo } from 'react';
import type { CSSProperties, ForwardedRef } from 'react';
import { cn } from '../../utils/classNames';
import {
  DYN_CONTAINER_DEFAULT_PROPS,
  DynContainerProps,
  DynContainerRef,
} from './DynContainer.types';
import styles from './DynContainer.module.css';

const toPascalCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const DynContainerComponent = (
  {
    title,
    subtitle,
    direction = DYN_CONTAINER_DEFAULT_PROPS.direction,
    align,
    justify,
    spacing = DYN_CONTAINER_DEFAULT_PROPS.spacing,
    size = DYN_CONTAINER_DEFAULT_PROPS.size,
    bordered = DYN_CONTAINER_DEFAULT_PROPS.bordered,
    shadow = DYN_CONTAINER_DEFAULT_PROPS.shadow,
    background = DYN_CONTAINER_DEFAULT_PROPS.background,
    height,
    maxWidth,
    noBorder,
    noPadding,
    className,
    children,
    style,
    'data-testid': dataTestId = DYN_CONTAINER_DEFAULT_PROPS['data-testid'],
    ...rest
  }: DynContainerProps,
  ref: ForwardedRef<DynContainerRef>
) => {
  const resolvedBordered = noBorder ? false : bordered;

  const containerStyle = useMemo<CSSProperties | undefined>(() => {
    const next: CSSProperties = { ...style };

    if (typeof height === 'number') {
      next.height = `${height}px`;
    } else if (typeof height === 'string') {
      next.height = height;
    }

    if (typeof maxWidth === 'number') {
      next.maxWidth = `${maxWidth}px`;
    } else if (typeof maxWidth === 'string') {
      next.maxWidth = maxWidth;
    }

    return Object.keys(next).length > 0 ? next : undefined;
  }, [height, maxWidth, style]);

  const directionClass = styles[`direction${toPascalCase(direction)}` as keyof typeof styles];
  const spacingClass = spacing
    ? styles[`spacing${toPascalCase(spacing)}` as keyof typeof styles]
    : undefined;
  const sizeClass = size
    ? styles[`size${toPascalCase(size)}` as keyof typeof styles]
    : undefined;
  const backgroundClass = background
    ? styles[`background${toPascalCase(background)}` as keyof typeof styles]
    : undefined;
  const alignClass = align
    ? styles[`align${toPascalCase(align)}` as keyof typeof styles]
    : undefined;
  const justifyClass = justify
    ? styles[`justify${toPascalCase(justify)}` as keyof typeof styles]
    : undefined;

  const containerClassName = cn(
    styles.root,
    directionClass,
    spacingClass,
    sizeClass,
    backgroundClass,
    alignClass,
    justifyClass,
    {
      [styles.bordered]: resolvedBordered,
      [styles.shadow]: shadow,
      [styles.noPadding]: !!noPadding,
      [styles.withTitle]: Boolean(title || subtitle),
    },
    className
  );

  return (
    <div
      ref={ref}
      className={containerClassName}
      style={containerStyle}
      data-testid={dataTestId}
      {...rest}
    >
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const DynContainer = forwardRef<DynContainerRef, DynContainerProps>(DynContainerComponent);

DynContainer.displayName = 'DynContainer';

export { DynContainer };
export default DynContainer;
