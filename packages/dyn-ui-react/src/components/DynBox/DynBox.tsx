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
      focusOnMount,
      interactive,
      ariaLiveMessage,
      ariaLivePoliteness = 'polite',
      children,
      ...rest
    },
    ref
  ) => {
    // Use dyn-box prefix expected by tests when id not provided
    const internalId = useMemo(() => id || generateId('dyn-box'), [id]);

    // Filter out DynBox-specific props from rest
    const domProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !FILTERED_PROPS.has(key))
    );

    const legacyAliases: string[] = [];
    // Legacy alias classes for tests
    legacyAliases.push('box');
    if (direction?.startsWith('row') || direction?.startsWith('column')) legacyAliases.push('box--flex');
    if (background === 'primary') legacyAliases.push('box--bg-primary');
    if (background === 'secondary') legacyAliases.push('box--bg-secondary');
    if (background === 'success') legacyAliases.push('box--bg-success');
    if (background === 'warning') legacyAliases.push('box--bg-warning');
    if (background === 'danger') legacyAliases.push('box--bg-danger');

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
      // background and color
      ...(rest.backgroundColor ? { ['--dyn-box-bg' as any]: rest.backgroundColor as any } : {}),
      ...(rest.color ? { ['--dyn-box-color' as any]: rest.color as any } : {}),
      // radius
      ...(radius ? { ['--dyn-box-radius' as any]: typeof radius === 'number' ? `${radius}px` : radius } : {}),
      // padding/margin tokens (basic)
      ...(padding ? { ['--dyn-box-padding' as any]: String(padding) } : {}),
      ...(rest.m ? { ['--dyn-box-margin' as any]: String(rest.m) } : {}),
      // merge cssVars if provided
      ...(rest.cssVars as any),
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
);

DynBox.displayName = 'DynBox';
