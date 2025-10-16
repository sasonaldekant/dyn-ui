import React, { forwardRef, useEffect, useMemo } from 'react';
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

// Helper function to convert spacing values to CSS variables
const getSpacingVar = (value: string): string => {
  if (['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)) {
    return `var(--dyn-spacing-${value}, var(--spacing-${value}, ${getSpacingFallback(value)}))`;
  }
  return value;
};

// Fallback values for spacing tokens
const getSpacingFallback = (value: string): string => {
  const fallbacks = {
    '0': '0',
    'xs': '0.25rem',
    'sm': '0.5rem', 
    'md': '1rem',
    'lg': '1.5rem',
    'xl': '2rem',
    '2xl': '3rem'
  };
  return fallbacks[value as keyof typeof fallbacks] || value;
};

/**
 * DynBox — layout container following DynAvatar gold standard patterns.
 */
function DynBoxInner<E extends React.ElementType = 'div'>(props: DynBoxProps<E>, ref: DynBoxRef<E>) {
  const {
    as,
    padding = 'md',
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    radius = 'md',
    borderRadius,
    customBorderRadius,
    shadow = 'none',
    border = 'default',
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    background = 'surface',
    bg,
    backgroundColor,
    color,
    align,
    justify,
    direction = 'column',
    flexDirection,
    wrap,
    gap = 'md',
    rowGap,
    columnGap,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    alignContent,
    display,
    position,
    textAlign,
    overflow,
    overflowX,
    overflowY,
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    top,
    right,
    bottom,
    left,
    zIndex,
    className,
    style,
    id,
    role,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId = 'dyn-box',
    focusOnMount,
    interactive,
    ariaLiveMessage,
    ariaLivePoliteness = 'polite',
    cssVars,
    hideOnMobile,
    hideOnTablet,
    hideOnDesktop,
    mobileOnly,
    tabletOnly,
    desktopOnly,
    children,
    ...rest
  } = props;
  
  const Component = (as ?? 'div') as React.ElementType;
  
  // Use dyn-box prefix expected by tests when id not provided
  const internalId = useMemo(() => id || generateId('dyn-box'), [id]);

  // Filter out DynBox-specific props from rest
  const domProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !FILTERED_PROPS.has(key))
  );

  const legacyAliases: string[] = [];
  // Legacy alias classes for tests
  legacyAliases.push('box');
  const finalDirection = flexDirection || direction;
  if (finalDirection?.startsWith('row') || finalDirection?.startsWith('column')) legacyAliases.push('box--flex');
  
  const finalBackground = bg || background;
  if (finalBackground === 'primary') legacyAliases.push('box--bg-primary');
  if (finalBackground === 'secondary') legacyAliases.push('box--bg-secondary');
  if (finalBackground === 'success') legacyAliases.push('box--bg-success');
  if (finalBackground === 'warning') legacyAliases.push('box--bg-warning');
  if (finalBackground === 'danger') legacyAliases.push('box--bg-danger');

  const finalRadius = borderRadius || customBorderRadius || radius;
  const finalPadding = p || padding;

  // Helper functions for CSS classes based on CSS module
  const getPaddingClass = (value?: string) => {
    if (!value || !['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)) return null;
    return getStyleClass(`box--p-${value}`);
  };

  const getBackgroundClass = (value?: string) => {
    if (value && ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'].includes(value)) {
      return getStyleClass(`box--bg-${value}`);
    }
    return null;
  };

  const getDisplayClass = (value?: string) => {
    if (value && ['flex', 'inline-flex', 'grid', 'inline-grid', 'inline', 'inline-block', 'none'].includes(value)) {
      return getStyleClass(`box--${value}`);
    }
    return null;
  };

  const getPositionClass = (value?: string) => {
    if (value && ['absolute', 'relative', 'fixed', 'sticky'].includes(value)) {
      return getStyleClass(`box--${value}`);
    }
    return null;
  };

  const getRadiusClass = (value?: string) => {
    if (value && ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)) {
      return getStyleClass(`box--rounded-${value}`);
    }
    return null;
  };

  const getShadowClass = (value?: string) => {
    if (value && ['sm', 'md', 'lg'].includes(value)) {
      return getStyleClass(`box--shadow-${value}`);
    }
    return null;
  };

  const getTextAlignClass = (value?: string) => {
    if (value && ['left', 'center', 'right', 'justify'].includes(value)) {
      return getStyleClass(`box--text-${value}`);
    }
    return null;
  };

  const getOverflowClass = (value?: string) => {
    if (value && ['hidden', 'auto', 'scroll'].includes(value)) {
      return getStyleClass(`box--overflow-${value}`);
    }
    return null;
  };

  const getBorderClass = () => {
    if (border === 'default') {
      return getStyleClass('box--border');
    }
    return null;
  };

  const getResponsiveClasses = () => {
    const classes = [] as Array<string | null | undefined>;
    if (hideOnMobile) classes.push(getStyleClass('box--mobile-hidden'));
    if (hideOnTablet) classes.push(getStyleClass('box--tablet-hidden'));
    if (hideOnDesktop) classes.push(getStyleClass('box--desktop-hidden'));
    if (mobileOnly) {
      classes.push(getStyleClass('box--tablet-hidden'));
      classes.push(getStyleClass('box--desktop-hidden'));
    }
    if (tabletOnly) {
      classes.push(getStyleClass('box--mobile-hidden'));
      classes.push(getStyleClass('box--desktop-hidden'));
    }
    if (desktopOnly) {
      classes.push(getStyleClass('box--mobile-hidden'));
      classes.push(getStyleClass('box--tablet-hidden'));
    }
    return classes;
  };

  const classes = cn(
    // Base class from CSS module
    getStyleClass('box'),
    // Padding
    getPaddingClass(finalPadding),
    // Background 
    getBackgroundClass(finalBackground),
    // Display
    getDisplayClass(display),
    // Position
    getPositionClass(position),
    // Border radius
    getRadiusClass(finalRadius),
    // Shadow
    getShadowClass(shadow),
    // Border
    getBorderClass(),
    // Text align
    getTextAlignClass(textAlign),
    // Overflow
    getOverflowClass(overflow),
    // Interactive
    interactive && getStyleClass('box--interactive'),
    // Responsive
    ...getResponsiveClasses(),
    // legacy aliases for tests
    ...legacyAliases,
    className
  );

  const styleVars: React.CSSProperties = {
    // canonical width/height vars
    ...(width !== undefined ? { ['--dyn-box-width' as any]: typeof width === 'number' ? `${width}` : width } : {}),
    ...(height !== undefined ? { ['--dyn-box-height' as any]: typeof height === 'number' ? `${height}` : height } : {}),
    ...(maxWidth ? { ['--dyn-box-max-width' as any]: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
    ...(maxHeight ? { ['--dyn-box-max-height' as any]: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
    ...(minWidth ? { ['--dyn-box-min-width' as any]: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
    ...(minHeight ? { ['--dyn-box-min-height' as any]: typeof minHeight === 'number' ? `${minHeight}px` : minHeight } : {}),
    // positioning
    ...(top !== undefined ? { ['--dyn-box-top' as any]: typeof top === 'number' ? `${top}px` : top } : {}),
    ...(right !== undefined ? { ['--dyn-box-right' as any]: typeof right === 'number' ? `${right}px` : right } : {}),
    ...(bottom !== undefined ? { ['--dyn-box-bottom' as any]: typeof bottom === 'number' ? `${bottom}` : bottom } : {}),
    ...(left !== undefined ? { ['--dyn-box-left' as any]: typeof left === 'number' ? `${left}px` : left } : {}),
    ...(zIndex !== undefined ? { ['--dyn-box-z-index' as any]: zIndex } : {}),
    // background and color
    ...(backgroundColor ? { ['--dyn-box-bg' as any]: backgroundColor } : {}),
    ...(color ? { ['--dyn-box-color' as any]: color } : {}),
    // Custom background colors that aren't in predefined variants
    ...(finalBackground && !['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'surface'].includes(finalBackground) ? { ['--dyn-box-bg' as any]: finalBackground } : {}),
    // Custom radius that isn't in predefined sizes
    ...(customBorderRadius ? { ['--dyn-box-radius' as any]: customBorderRadius } : {}),
    ...(finalRadius && !['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'].includes(finalRadius) ? { ['--dyn-box-radius' as any]: finalRadius } : {}),
    // spacing tokens with proper CSS var generation
    ...(finalPadding && !['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(finalPadding) ? { ['--dyn-box-padding' as any]: finalPadding } : finalPadding ? { ['--dyn-box-padding' as any]: getSpacingVar(finalPadding) } : {}),
    ...(px ? { ['--dyn-box-padding-left' as any]: getSpacingVar(px), ['--dyn-box-padding-right' as any]: getSpacingVar(px) } : {}),
    ...(py ? { ['--dyn-box-padding-top' as any]: getSpacingVar(py), ['--dyn-box-padding-bottom' as any]: getSpacingVar(py) } : {}),
    ...(pt ? { ['--dyn-box-padding-top' as any]: getSpacingVar(pt) } : {}),
    ...(pr ? { ['--dyn-box-padding-right' as any]: getSpacingVar(pr) } : {}),
    ...(pb ? { ['--dyn-box-padding-bottom' as any]: getSpacingVar(pb) } : {}),
    ...(pl ? { ['--dyn-box-padding-left' as any]: getSpacingVar(pl) } : {}),
    ...(m ? { ['--dyn-box-margin' as any]: getSpacingVar(m) } : {}),
    ...(mx ? { ['--dyn-box-margin-left' as any]: mx === 'auto' ? 'auto' : getSpacingVar(mx), ['--dyn-box-margin-right' as any]: mx === 'auto' ? 'auto' : getSpacingVar(mx) } : {}),
    ...(my ? { ['--dyn-box-margin-top' as any]: getSpacingVar(my), ['--dyn-box-margin-bottom' as any]: getSpacingVar(my) } : {}),
    ...(mt ? { ['--dyn-box-margin-top' as any]: getSpacingVar(mt) } : {}),
    ...(mr ? { ['--dyn-box-margin-right' as any]: mr === 'auto' ? 'auto' : getSpacingVar(mr) } : {}),
    ...(mb ? { ['--dyn-box-margin-bottom' as any]: mb === '0' ? '0' : getSpacingVar(mb) } : {}),
    ...(ml ? { ['--dyn-box-margin-left' as any]: ml === 'auto' ? 'auto' : getSpacingVar(ml) } : {}),
    // flex properties
    ...(finalDirection ? { ['--dyn-box-flex-direction' as any]: finalDirection } : {}),
    ...(wrap ? { ['--dyn-box-flex-wrap' as any]: wrap } : {}),
    ...(justify ? { ['--dyn-box-justify-content' as any]: justify } : {}),
    ...(align ? { ['--dyn-box-align-items' as any]: align } : {}),
    ...(alignContent ? { ['--dyn-box-align-content' as any]: alignContent } : {}),
    ...(gap && !['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(gap) ? { ['--dyn-box-gap' as any]: gap } : gap ? { ['--dyn-box-gap' as any]: getSpacingVar(gap) } : {}),
    // gap and grid
    ...(rowGap ? { ['--dyn-box-row-gap' as any]: getSpacingVar(rowGap) } : {}),
    ...(columnGap ? { ['--dyn-box-column-gap' as any]: getSpacingVar(columnGap) } : {}),
    ...(gridTemplateColumns ? { ['--dyn-box-grid-columns' as any]: gridTemplateColumns } : {}),
    ...(gridTemplateRows ? { ['--dyn-box-grid-rows' as any]: gridTemplateRows } : {}),
    ...(gridTemplateAreas ? { ['--dyn-box-grid-areas' as any]: gridTemplateAreas } : {}),
    // overflow
    ...(overflowX ? { ['--dyn-box-overflow-x' as any]: overflowX } : {}),
    ...(overflowY ? { ['--dyn-box-overflow-y' as any]: overflowY } : {}),
    // merge cssVars if provided
    ...(cssVars as any),
    ...style,
  } as React.CSSProperties;

  // Focus on mount support
  useEffect(() => {
    if (focusOnMount && (ref as any)?.current) {
      try { (ref as any).current.focus?.(); } catch {}
    }
  }, [focusOnMount, ref]);

  // Compose aria-describedby with live region id if needed
  const liveRegionId = ariaLiveMessage ? `${internalId}-liveregion` : undefined;
  const describedBy = [ariaDescribedBy, liveRegionId].filter(Boolean).join(' ') || undefined;

  // Keyboard activation for interactive mode
  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      (domProps as any).onClick?.(e as any);
      e.preventDefault();
    }
  };

  const element = React.createElement(
    Component as any,
    {
      ref,
      id: internalId,
      role: interactive ? (role ?? 'button') : role,
      className: classes,
      style: styleVars,
      'aria-label': ariaLabel,
      'aria-describedby': describedBy,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': dataTestId,
      tabIndex: interactive ? ((domProps as any).tabIndex ?? 0) : (domProps as any).tabIndex,
      onKeyDown,
      ...domProps,
    } as any,
    children,
    ariaLiveMessage && (
      <span 
        key="liveregion"
        id={liveRegionId} 
        aria-live={ariaLivePoliteness}
        aria-atomic="true"
        className="dyn-sr-only"
      >
        {ariaLiveMessage}
      </span>
    )
  );

  return element;
}

// Preserve polymorphic generic on exported component
const _DynBox = forwardRef(DynBoxInner as any) as React.NamedExoticComponent<any>;
export const DynBox = _DynBox as <E extends React.ElementType = 'div'>(
  props: DynBoxProps<E> & { ref?: DynBoxRef<E> }
) => React.ReactElement | null;

// Assign displayName to the component
(_DynBox as React.NamedExoticComponent).displayName = 'DynBox';