import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import type { DynBoxProps, DynBoxRef } from './DynBox.types';
import styles from './DynBox.module.css';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

// Props that should NOT be passed to DOM
const FILTERED_PROPS = new Set([
  'as', 'padding', 'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'radius', 'borderRadius', 'customBorderRadius', 'shadow', 'border',
  'background', 'bg', 'backgroundColor', 'color',
  'align', 'justify', 'direction', 'flexDirection', 'wrap', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas',
  'top', 'right', 'bottom', 'left', 'zIndex',
  'interactive', 'cssVars', 'ariaLiveMessage', 'ariaLivePoliteness', 'focusOnMount',
  'display', 'position', 'textAlign', 'overflow', 'overflowX', 'overflowY',
  'alignContent', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'hideOnMobile', 'hideOnTablet', 'hideOnDesktop', 'mobileOnly', 'tabletOnly', 'desktopOnly'
]);

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
      'data-testid': dataTestId = 'dyn-box',
      children,
      ...rest
    },
    ref
  ) => {
    const internalId = useMemo(() => id || generateId('box'), [id]);

    // Filter out DynBox-specific props from rest
    const domProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !FILTERED_PROPS.has(key))
    );

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

    // Use React.createElement to avoid complex union types with polymorphic components
    return React.createElement(
      Component,
      {
        ref,
        id: internalId,
        role,
        className: classes,
        style: styleVars,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-labelledby': ariaLabelledBy,
        'data-testid': dataTestId,
        ...domProps // Only clean DOM props
      } as any,
      children
    );
  }
);

DynBox.displayName = 'DynBox';