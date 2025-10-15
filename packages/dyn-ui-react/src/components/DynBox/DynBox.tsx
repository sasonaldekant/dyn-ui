import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import type { DynBoxProps, DynBoxRef } from './DynBox.types';
import styles from './DynBox.module.css';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

/**
 * DynBox — layout container following DynAvatar gold standard patterns.
 */
export const DynBox = forwardRef<DynBoxRef, DynBoxProps>(
  (
    {
      as: Component = 'div',
      padding = 'md',
      radius = 'md',
      shadow = 'none',
      border = 'default',
      background = 'surface',
      align,
      justify,
      direction = 'column',
      gap = 'md',
      wrap,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      className,
      style,
      id,
      role,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      children,
      ...rest
    },
    ref
  ) => {
    const internalId = useMemo(() => id || generateId('box'), [id]);

    const classes = cn(
      getStyleClass('root'),
      getStyleClass(`pad-${padding}`),
      getStyleClass(`rad-${radius}`),
      getStyleClass(`shadow-${shadow}`),
      getStyleClass(`border-${border}`),
      getStyleClass(`bg-${background}`),
      getStyleClass(`dir-${direction}`),
      align && getStyleClass(`align-${align}`),
      justify && getStyleClass(`justify-${justify}`),
      gap && getStyleClass(`gap-${gap}`),
      wrap && getStyleClass(`wrap-${wrap}`),
      className
    );

    const styleVars: React.CSSProperties = {
      ...(width ? { ['--dyn-box-w' as any]: typeof width === 'number' ? `${width}px` : width } : {}),
      ...(height ? { ['--dyn-box-h' as any]: typeof height === 'number' ? `${height}px` : height } : {}),
      ...(maxWidth ? { ['--dyn-box-max-w' as any]: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
      ...(maxHeight ? { ['--dyn-box-max-h' as any]: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
      ...(minWidth ? { ['--dyn-box-min-w' as any]: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
      ...(minHeight ? { ['--dyn-box-min-h' as any]: typeof minHeight === 'number' ? `${minHeight}px` : minHeight } : {}),
      ...style,
    } as React.CSSProperties;

    return (
      <Component
        ref={ref as any}
        id={internalId}
        role={role}
        className={classes}
        style={styleVars}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        data-testid={rest['data-testid'] || 'dyn-box'}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default DynBox;
DynBox.displayName = 'DynBox';
