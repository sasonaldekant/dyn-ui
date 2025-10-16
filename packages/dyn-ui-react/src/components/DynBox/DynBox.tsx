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

  const classes = cn(
    getStyleClass('root'),
    finalPadding && getStyleClass(`pad-${finalPadding}`),
    finalRadius && getStyleClass(`rad-${finalRadius}`),
    shadow && getStyleClass(`shadow-${shadow}`),
    border && getStyleClass(`border-${border}`),
    finalBackground && getStyleClass(`bg-${finalBackground}`),
    finalDirection && getStyleClass(`dir-${finalDirection}`),
    align && getStyleClass(`align-${align}`),
    justify && getStyleClass(`justify-${justify}`),
    gap && getStyleClass(`gap-${gap}`),
    wrap && getStyleClass(`wrap-${wrap}`),
    display && getStyleClass(`display-${display}`),
    position && getStyleClass(`position-${position}`),
    textAlign && getStyleClass(`text-${textAlign}`),
    overflow && getStyleClass(`overflow-${overflow}`),
    // Responsive visibility
    hideOnMobile && getStyleClass('hide-mobile'),
    hideOnTablet && getStyleClass('hide-tablet'), 
    hideOnDesktop && getStyleClass('hide-desktop'),
    mobileOnly && getStyleClass('mobile-only'),
    tabletOnly && getStyleClass('tablet-only'),
    desktopOnly && getStyleClass('desktop-only'),
    // legacy aliases for tests
    ...legacyAliases,
    className
  );

  const styleVars: React.CSSProperties = {
    // canonical width/height vars
    ...(width ? { ['--dyn-box-width' as any]: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { ['--dyn-box-height' as any]: typeof height === 'number' ? `${height}px` : height } : {}),
    ...(maxWidth ? { ['--dyn-box-max-width' as any]: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
    ...(maxHeight ? { ['--dyn-box-max-height' as any]: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
    ...(minWidth ? { ['--dyn-box-min-width' as any]: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
    ...(minHeight ? { ['--dyn-box-min-height' as any]: typeof minHeight === 'number' ? `${minHeight}px` : minHeight } : {}),
    // positioning
    ...(top !== undefined ? { ['--dyn-box-top' as any]: typeof top === 'number' ? `${top}px` : top } : {}),
    ...(right !== undefined ? { ['--dyn-box-right' as any]: typeof right === 'number' ? `${right}px` : right } : {}),
    ...(bottom !== undefined ? { ['--dyn-box-bottom' as any]: typeof bottom === 'number' ? `${bottom}px` : bottom } : {}),
    ...(left !== undefined ? { ['--dyn-box-left' as any]: typeof left === 'number' ? `${left}px` : left } : {}),
    ...(zIndex !== undefined ? { ['--dyn-box-z-index' as any]: zIndex } : {}),
    // background and color
    ...(backgroundColor ? { ['--dyn-box-bg' as any]: backgroundColor } : {}),
    ...(color ? { ['--dyn-box-color' as any]: color } : {}),
    // spacing tokens
    ...(px ? { ['--dyn-box-padding-x' as any]: px } : {}),
    ...(py ? { ['--dyn-box-padding-y' as any]: py } : {}),
    ...(pt ? { ['--dyn-box-padding-top' as any]: pt } : {}),
    ...(pr ? { ['--dyn-box-padding-right' as any]: pr } : {}),
    ...(pb ? { ['--dyn-box-padding-bottom' as any]: pb } : {}),
    ...(pl ? { ['--dyn-box-padding-left' as any]: pl } : {}),
    ...(m ? { ['--dyn-box-margin' as any]: m } : {}),
    ...(mx ? { ['--dyn-box-margin-x' as any]: mx } : {}),
    ...(my ? { ['--dyn-box-margin-y' as any]: my } : {}),
    ...(mt ? { ['--dyn-box-margin-top' as any]: mt } : {}),
    ...(mr ? { ['--dyn-box-margin-right' as any]: mr } : {}),
    ...(mb ? { ['--dyn-box-margin-bottom' as any]: mb } : {}),
    ...(ml ? { ['--dyn-box-margin-left' as any]: ml } : {}),
    // gap and grid
    ...(rowGap ? { ['--dyn-box-row-gap' as any]: rowGap } : {}),
    ...(columnGap ? { ['--dyn-box-column-gap' as any]: columnGap } : {}),
    ...(gridTemplateColumns ? { ['--dyn-box-grid-template-columns' as any]: gridTemplateColumns } : {}),
    ...(gridTemplateRows ? { ['--dyn-box-grid-template-rows' as any]: gridTemplateRows } : {}),
    ...(gridTemplateAreas ? { ['--dyn-box-grid-template-areas' as any]: gridTemplateAreas } : {}),
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
      <span id={liveRegionId} aria-live={ariaLivePoliteness} className="sr-only">
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