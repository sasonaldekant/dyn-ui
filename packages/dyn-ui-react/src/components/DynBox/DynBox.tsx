import { forwardRef, useEffect, useId, useMemo, useRef } from 'react';
import type {
  CSSProperties,
  ElementType,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  Ref,
} from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import {
  DYN_BOX_DEFAULT_PROPS,
  DynBoxProps,
  type DynBoxRef,
  type SpacingSize,
} from './DynBox.types';
import styles from './DynBox.module.css';

/**
 * Design token mapping for spacing values
 * Provides consistent spacing scale with design token fallbacks
 */
const SPACING_TOKEN_MAP: Record<Exclude<SpacingSize, '0' | 'auto'>, string> = {
  xs: 'var(--dyn-spacing-xs, var(--spacing-xs, 0.25rem))',
  sm: 'var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem))',
  md: 'var(--dyn-spacing-md, var(--spacing-md, 1rem))',
  lg: 'var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem))',
  xl: 'var(--dyn-spacing-xl, var(--spacing-xl, 2rem))',
  '2xl': 'var(--dyn-spacing-2xl, var(--spacing-2xl, 3rem))',
};

/**
 * Resolve spacing value to design token with fallback
 * Optimized utility for consistent spacing token usage
 */
const resolveSpacing = (value: SpacingSize | undefined, allowAuto = false): string | undefined => {
  if (!value) return undefined;
  if (value === '0') return '0';
  if (value === 'auto') {
    return allowAuto ? 'auto' : undefined;
  }
  return SPACING_TOKEN_MAP[value];
};

/**
 * Convert dimension values to CSS-compatible format
 * Handles numbers, strings, and undefined values consistently
 */
const toDimensionValue = (value: string | number | undefined): string | number | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}px`;
  }
  return value;
};

/**
 * Safely access CSS module classes
 * Prevents runtime errors for missing class names
 */
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

/**
 * DynBox – polymorphic, token-aware layout primitive
 *
 * A flexible container component that serves as the foundational layout primitive
 * for the dyn-ui design system. Follows the DynAvatar gold standard template
 * with comprehensive accessibility, design token integration, and type safety.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DynBox p="md" bg="tertiary" borderRadius="md">
 *   Content goes here
 * </DynBox>
 *
 * // Interactive box with accessibility
 * <DynBox
 *   interactive
 *   onClick={handleClick}
 *   aria-label="Interactive container"
 *   role="button"
 * >
 *   Click me
 * </DynBox>
 *
 * // Polymorphic rendering
 * <DynBox as="section" display="flex" gap="sm">
 *   Rendered as a section element
 * </DynBox>
 * ```
 */
const DynBoxComponent = <E extends ElementType = 'div'>(
  {
    as,
    className,
    children,
    display,
    position,

    // Spacing props
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

    // Dimension props
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,

    // Color props
    bg,
    backgroundColor,
    color,

    // Border props
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderRadius,
    customBorderRadius,

    // Visual props
    shadow,
    textAlign,

    // Overflow props
    overflow,
    overflowX,
    overflowY,

    // Flexbox props
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    rowGap,
    columnGap,

    // Grid props
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,

    // Position props
    top,
    right,
    bottom,
    left,
    zIndex,

    // Interaction props
    interactive,

    // Advanced props
    cssVars,
    hideOnMobile,
    hideOnTablet,
    hideOnDesktop,
    mobileOnly,
    tabletOnly,
    desktopOnly,

    // Standard props
    style,
    role,
    tabIndex,
    onClick,
    onKeyDown,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ariaLiveMessage,
    ariaLivePoliteness = 'polite',
    focusOnMount = false,
    'data-testid': dataTestId = DYN_BOX_DEFAULT_PROPS['data-testid'],
    id,
    ...rest
  }: DynBoxProps<E>,
  ref: ForwardedRef<DynBoxRef<E>>
) => {
  const Component = (as ?? 'div') as ElementType;
  const internalId = useId();
  const finalId = id || generateId('dyn-box');
  const liveRegionId = `${finalId}-live`;
  const shouldRenderLiveRegion = Boolean(ariaLiveMessage);

  // Compute describedBy value with live region support
  const describedBy = useMemo(() => {
    if (!shouldRenderLiveRegion) {
      return ariaDescribedBy;
    }
    if (!ariaDescribedBy) {
      return liveRegionId;
    }
    return `${ariaDescribedBy} ${liveRegionId}`;
  }, [ariaDescribedBy, liveRegionId, shouldRenderLiveRegion]);

  const innerRef = useRef<HTMLElement | null>(null);

  // Focus management effect
  useEffect(() => {
    if (focusOnMount && innerRef.current) {
      innerRef.current.focus();
    }
  }, [focusOnMount]);

  // Generate CSS custom properties with optimized memoization
  const cssVariables = useMemo<Record<string, string | number>>(() => {
    const vars: Record<string, string | number> = {
      ...(cssVars ?? {}),
    };

    // Padding variables
    const paddingValue = resolveSpacing(p);
    if (paddingValue) vars['--dyn-box-padding'] = paddingValue;

    const paddingX = resolveSpacing(px);
    if (paddingX) {
      vars['--dyn-box-padding-left'] = paddingX;
      vars['--dyn-box-padding-right'] = paddingX;
    }

    const paddingY = resolveSpacing(py);
    if (paddingY) {
      vars['--dyn-box-padding-top'] = paddingY;
      vars['--dyn-box-padding-bottom'] = paddingY;
    }

    const paddingTop = resolveSpacing(pt);
    if (paddingTop) vars['--dyn-box-padding-top'] = paddingTop;

    const paddingRight = resolveSpacing(pr);
    if (paddingRight) vars['--dyn-box-padding-right'] = paddingRight;

    const paddingBottom = resolveSpacing(pb);
    if (paddingBottom) vars['--dyn-box-padding-bottom'] = paddingBottom;

    const paddingLeft = resolveSpacing(pl);
    if (paddingLeft) vars['--dyn-box-padding-left'] = paddingLeft;

    // Margin variables
    const marginValue = resolveSpacing(m, true);
    if (marginValue) vars['--dyn-box-margin'] = marginValue;

    const marginX = resolveSpacing(mx, true);
    if (marginX) {
      vars['--dyn-box-margin-left'] = marginX;
      vars['--dyn-box-margin-right'] = marginX;
    }

    const marginY = resolveSpacing(my, true);
    if (marginY) {
      vars['--dyn-box-margin-top'] = marginY;
      vars['--dyn-box-margin-bottom'] = marginY;
    }

    const marginTop = resolveSpacing(mt, true);
    if (marginTop) vars['--dyn-box-margin-top'] = marginTop;

    const marginRight = resolveSpacing(mr, true);
    if (marginRight) vars['--dyn-box-margin-right'] = marginRight;

    const marginBottom = resolveSpacing(mb, true);
    if (marginBottom) vars['--dyn-box-margin-bottom'] = marginBottom;

    const marginLeft = resolveSpacing(ml, true);
    if (marginLeft) vars['--dyn-box-margin-left'] = marginLeft;

    // Dimension variables
    const resolvedWidth = toDimensionValue(width);
    if (resolvedWidth !== undefined) vars['--dyn-box-width'] = resolvedWidth;

    const resolvedHeight = toDimensionValue(height);
    if (resolvedHeight !== undefined) vars['--dyn-box-height'] = resolvedHeight;

    const resolvedMinWidth = toDimensionValue(minWidth);
    if (resolvedMinWidth !== undefined) vars['--dyn-box-min-width'] = resolvedMinWidth;

    const resolvedMinHeight = toDimensionValue(minHeight);
    if (resolvedMinHeight !== undefined) vars['--dyn-box-min-height'] = resolvedMinHeight;

    const resolvedMaxWidth = toDimensionValue(maxWidth);
    if (resolvedMaxWidth !== undefined) vars['--dyn-box-max-width'] = resolvedMaxWidth;

    const resolvedMaxHeight = toDimensionValue(maxHeight);
    if (resolvedMaxHeight !== undefined) vars['--dyn-box-max-height'] = resolvedMaxHeight;

    // Color variables
    if (backgroundColor) vars['--dyn-box-bg'] = backgroundColor;
    if (color) vars['--dyn-box-color'] = color;

    // Position variables
    if (position === 'static') vars['--dyn-box-position'] = 'static';
    if (customBorderRadius) vars['--dyn-box-radius'] = customBorderRadius;

    // Flexbox variables
    if (flexDirection) vars['--dyn-box-flex-direction'] = flexDirection;
    if (flexWrap) vars['--dyn-box-flex-wrap'] = flexWrap;
    if (justifyContent) vars['--dyn-box-justify-content'] = justifyContent;
    if (alignItems) vars['--dyn-box-align-items'] = alignItems;
    if (alignContent) vars['--dyn-box-align-content'] = alignContent;

    const resolvedGap = resolveSpacing(gap);
    if (resolvedGap) vars['--dyn-box-gap'] = resolvedGap;

    const resolvedRowGap = resolveSpacing(rowGap);
    if (resolvedRowGap) vars['--dyn-box-row-gap'] = resolvedRowGap;

    const resolvedColumnGap = resolveSpacing(columnGap);
    if (resolvedColumnGap) vars['--dyn-box-column-gap'] = resolvedColumnGap;

    // Grid variables
    if (gridTemplateColumns) vars['--dyn-box-grid-columns'] = gridTemplateColumns;
    if (gridTemplateRows) vars['--dyn-box-grid-rows'] = gridTemplateRows;
    if (gridTemplateAreas) vars['--dyn-box-grid-areas'] = gridTemplateAreas;

    // Position offset variables
    const topValue = toDimensionValue(top);
    if (topValue !== undefined) vars['--dyn-box-top'] = topValue;

    const rightValue = toDimensionValue(right);
    if (rightValue !== undefined) vars['--dyn-box-right'] = rightValue;

    const bottomValue = toDimensionValue(bottom);
    if (bottomValue !== undefined) vars['--dyn-box-bottom'] = bottomValue;

    const leftValue = toDimensionValue(left);
    if (leftValue !== undefined) vars['--dyn-box-left'] = leftValue;

    if (zIndex !== undefined) vars['--dyn-box-z-index'] = zIndex;

    // Text and overflow variables
    if (textAlign) vars['--dyn-box-text-align'] = textAlign;
    if (overflow) vars['--dyn-box-overflow'] = overflow;
    if (overflowX) vars['--dyn-box-overflow-x'] = overflowX;
    if (overflowY) vars['--dyn-box-overflow-y'] = overflowY;

    return vars;
  }, [
    // Dependency list optimized for performance
    alignContent,
    alignItems,
    backgroundColor,
    bottom,
    columnGap,
    color,
    cssVars,
    customBorderRadius,
    flexDirection,
    flexWrap,
    gap,
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    height,
    justifyContent,
    left,
    m,
    mb,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    ml,
    mr,
    mt,
    mx,
    my,
    overflow,
    overflowX,
    overflowY,
    p,
    pb,
    pl,
    position,
    pr,
    pt,
    px,
    py,
    right,
    rowGap,
    textAlign,
    top,
    width,
    zIndex,
  ]);

  // Generate CSS classes using safe class retrieval
  const boxClasses = cn(
    getStyleClass('box'),
    display &&
      display !== 'block' &&
      getStyleClass(`box--${display}`),
    position &&
      position !== 'static' &&
      getStyleClass(`box--${position}`),
    bg && getStyleClass(`box--bg-${bg}`),
    border && getStyleClass('box--border'),
    borderTop && getStyleClass('box--border-top'),
    borderRight && getStyleClass('box--border-right'),
    borderBottom && getStyleClass('box--border-bottom'),
    borderLeft && getStyleClass('box--border-left'),
    borderRadius && getStyleClass(`box--rounded-${borderRadius}`),
    shadow && getStyleClass(`box--shadow-${shadow}`),
    textAlign && getStyleClass(`box--text-${textAlign}`),
    overflow && getStyleClass(`box--overflow-${overflow}`),
    interactive && getStyleClass('box--interactive'),
    hideOnMobile && getStyleClass('box--mobile-hidden'),
    hideOnTablet && getStyleClass('box--tablet-hidden'),
    hideOnDesktop && getStyleClass('box--desktop-hidden'),
    mobileOnly && getStyleClass('box--tablet-hidden'),
    mobileOnly && getStyleClass('box--desktop-hidden'),
    tabletOnly && getStyleClass('box--mobile-hidden'),
    tabletOnly && getStyleClass('box--desktop-hidden'),
    desktopOnly && getStyleClass('box--mobile-hidden'),
    desktopOnly && getStyleClass('box--tablet-hidden'),
    className
  );

  // Type-safe event handlers
  type ClickHandler = DynBoxProps['onClick'];
  type KeyHandler = DynBoxProps['onKeyDown'];
  type ClickEvent = ClickHandler extends (event: infer Event, ...args: any[]) => any
    ? Event
    : MouseEvent<Element>;
  type KeyEvent = KeyHandler extends (event: infer Event, ...args: any[]) => any
    ? Event
    : KeyboardEvent<Element>;

  /**
   * Handle keyboard interactions for interactive boxes
   * Supports Enter and Space key activation following WCAG guidelines
   */
  const handleKeyDown = (event: KeyEvent) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onClick) {
        onClick(event as unknown as MouseEvent<HTMLElement>);
      }
    }

    if (onKeyDown) {
      onKeyDown(event as unknown as KeyboardEvent<HTMLElement>);
    }
  };

  // Combine styles with CSS variables
  const combinedStyle = useMemo<CSSProperties>(() => ({
    ...cssVariables,
    ...(style ?? {}),
  }), [cssVariables, style]);

  // Determine accessibility attributes
  const componentRole = interactive ? role ?? 'button' : role;
  const componentTabIndex = interactive && tabIndex === undefined ? 0 : tabIndex;
  const componentOnKeyDown = interactive ? (handleKeyDown as KeyHandler) : onKeyDown;

  /**
   * Assign refs using the same pattern as DynAvatar
   * Ensures proper ref forwarding for polymorphic components
   */
  const assignRef = (node: DynBoxRef<E> | null) => {
    innerRef.current = (node as HTMLElement | null) ?? null;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as MutableRefObject<DynBoxRef<E> | null>).current = node;
    }
  };

  return (
    <Component
      ref={assignRef}
      id={finalId}
      className={boxClasses}
      style={combinedStyle}
      role={componentRole}
      tabIndex={componentTabIndex}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={describedBy}
      onClick={onClick}
      onKeyDown={componentOnKeyDown}
      data-testid={dataTestId}
      {...rest}
    >
      {children}

      {/* Live region for screen reader announcements - following DynAvatar pattern */}
      {shouldRenderLiveRegion && (
        <span
          id={liveRegionId}
          className="dyn-sr-only"
          aria-live={ariaLivePoliteness}
          aria-atomic="true"
        >
          {ariaLiveMessage}
        </span>
      )}
    </Component>
  );
};

/**
 * Type definition for polymorphic forwardRef
 * Ensures proper typing for all element types
 */
type DynBoxForwardRef = <E extends ElementType = 'div'>(
  props: DynBoxProps<E> & { ref?: Ref<DynBoxRef<E>> }
) => ReturnType<typeof DynBoxComponent>;

/**
 * DynBox component with proper forwardRef and displayName
 * Following the exact pattern established by DynAvatar
 */
const DynBox = forwardRef(DynBoxComponent) as DynBoxForwardRef;

DynBox.displayName = 'DynBox';

export { DynBox };
export default DynBox;
