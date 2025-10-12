import { forwardRef, useMemo } from 'react';
import type {
  CSSProperties,
  ElementType,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  Ref,
} from 'react';
import { cn } from '../../utils/classNames';
import {
  DYN_BOX_DEFAULT_PROPS,
  type DynBoxProps,
  type DynBoxRef,
  type SpacingSize,
} from './DynBox.types';
import styles from './DynBox.module.css';

const SPACING_TOKEN_MAP: Record<Exclude<SpacingSize, '0' | 'auto'>, string> = {
  xs: 'var(--dyn-spacing-xs, var(--spacing-xs, 0.25rem))',
  sm: 'var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem))',
  md: 'var(--dyn-spacing-md, var(--spacing-md, 1rem))',
  lg: 'var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem))',
  xl: 'var(--dyn-spacing-xl, var(--spacing-xl, 2rem))',
  '2xl': 'var(--dyn-spacing-2xl, var(--spacing-2xl, 3rem))',
};

const resolveSpacing = (value: SpacingSize | undefined, allowAuto = false): string | undefined => {
  if (!value) return undefined;
  if (value === '0') return '0';
  if (value === 'auto') {
    return allowAuto ? 'auto' : undefined;
  }
  return SPACING_TOKEN_MAP[value];
};

const toDimensionValue = (value: string | number | undefined): string | number | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}px`;
  }
  return value;
};

const DynBoxComponent = <E extends ElementType = 'div'>(
  {
    as,
    className,
    children,
    display,
    position,

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

    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,

    bg,
    backgroundColor,
    color,

    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderRadius,
    customBorderRadius,

    shadow,
    textAlign,

    overflow,
    overflowX,
    overflowY,

    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    rowGap,
    columnGap,

    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,

    top,
    right,
    bottom,
    left,
    zIndex,

    interactive,

    cssVars,
    hideOnMobile,
    hideOnTablet,
    hideOnDesktop,
    mobileOnly,
    tabletOnly,
    desktopOnly,

    style,
    role,
    tabIndex,
    onClick,
    onKeyDown,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': dataTestId = DYN_BOX_DEFAULT_PROPS['data-testid'],
    ...rest
  }: DynBoxProps<E>,
  ref: ForwardedRef<DynBoxRef<E>>
) => {
  const Component = (as ?? 'div') as ElementType;

  const cssVariables = useMemo<Record<string, string | number>>(() => {
    const vars: Record<string, string | number> = {
      ...(cssVars ?? {}),
    };

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

    if (backgroundColor) vars['--dyn-box-bg'] = backgroundColor;
    if (color) vars['--dyn-box-color'] = color;

    if (position === 'static') vars['--dyn-box-position'] = 'static';

    if (customBorderRadius) vars['--dyn-box-radius'] = customBorderRadius;

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

    if (gridTemplateColumns) vars['--dyn-box-grid-columns'] = gridTemplateColumns;
    if (gridTemplateRows) vars['--dyn-box-grid-rows'] = gridTemplateRows;
    if (gridTemplateAreas) vars['--dyn-box-grid-areas'] = gridTemplateAreas;

    const topValue = toDimensionValue(top);
    if (topValue !== undefined) vars['--dyn-box-top'] = topValue;

    const rightValue = toDimensionValue(right);
    if (rightValue !== undefined) vars['--dyn-box-right'] = rightValue;

    const bottomValue = toDimensionValue(bottom);
    if (bottomValue !== undefined) vars['--dyn-box-bottom'] = bottomValue;

    const leftValue = toDimensionValue(left);
    if (leftValue !== undefined) vars['--dyn-box-left'] = leftValue;

    if (zIndex !== undefined) vars['--dyn-box-z-index'] = zIndex;

    if (textAlign) vars['--dyn-box-text-align'] = textAlign;
    if (overflow) vars['--dyn-box-overflow'] = overflow;
    if (overflowX) vars['--dyn-box-overflow-x'] = overflowX;
    if (overflowY) vars['--dyn-box-overflow-y'] = overflowY;

    return vars;
  }, [
    alignContent,
    alignItems,
    backgroundColor,
    bottom,
    columnGap,
    color,
    cssVars,
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
    position,
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

  const boxClasses = cn(
    styles.box,
    display &&
      display !== 'block' &&
      styles[`box--${display}` as keyof typeof styles],
    position &&
      position !== 'static' &&
      styles[`box--${position}` as keyof typeof styles],
    bg && styles[`box--bg-${bg}` as keyof typeof styles],
    border && styles['box--border'],
    borderTop && styles['box--border-top'],
    borderRight && styles['box--border-right'],
    borderBottom && styles['box--border-bottom'],
    borderLeft && styles['box--border-left'],
    borderRadius && styles[`box--rounded-${borderRadius}` as keyof typeof styles],
    shadow && styles[`box--shadow-${shadow}` as keyof typeof styles],
    textAlign && styles[`box--text-${textAlign}` as keyof typeof styles],
    overflow && styles[`box--overflow-${overflow}` as keyof typeof styles],
    interactive && styles['box--interactive'],
    hideOnMobile && styles['box--mobile-hidden'],
    hideOnTablet && styles['box--tablet-hidden'],
    hideOnDesktop && styles['box--desktop-hidden'],
    mobileOnly && styles['box--tablet-hidden'],
    mobileOnly && styles['box--desktop-hidden'],
    tabletOnly && styles['box--mobile-hidden'],
    tabletOnly && styles['box--desktop-hidden'],
    desktopOnly && styles['box--mobile-hidden'],
    desktopOnly && styles['box--tablet-hidden'],
    className
  );

  type ClickHandler = DynBoxProps<E>['onClick'];
  type KeyHandler = DynBoxProps<E>['onKeyDown'];
  type ClickEvent = ClickHandler extends (event: infer Event, ...args: any[]) => any
    ? Event
    : MouseEvent<Element>;
  type KeyEvent = KeyHandler extends (event: infer Event, ...args: any[]) => any
    ? Event
    : KeyboardEvent<Element>;

  const handleKeyDown = (event: KeyEvent) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onClick) {
        onClick(event as unknown as ClickEvent);
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const combinedStyle = useMemo<CSSProperties>(() => ({
    ...cssVariables,
    ...(style ?? {}),
  }), [cssVariables, style]);

  const componentRole = interactive ? role ?? 'button' : role;
  const componentTabIndex = interactive && tabIndex === undefined ? 0 : tabIndex;
  const componentOnKeyDown = interactive ? (handleKeyDown as KeyHandler) : onKeyDown;

  return (
    <Component
      ref={ref}
      className={boxClasses}
      style={combinedStyle}
      role={componentRole}
      tabIndex={componentTabIndex}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onClick={onClick}
      onKeyDown={componentOnKeyDown}
      data-testid={dataTestId}
      {...rest}
    >
      {children}
    </Component>
  );
};

type DynBoxComponentWithRef = <E extends ElementType = 'div'>(
  props: DynBoxProps<E> & { ref?: Ref<DynBoxRef<E>> }
) => ReactElement | null;

const DynBox = forwardRef(DynBoxComponent) as DynBoxComponentWithRef;

DynBox.displayName = 'DynBox';

export { DynBox };
export default DynBox;
