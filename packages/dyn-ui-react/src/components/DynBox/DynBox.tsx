import React, { forwardRef, useEffect, useMemo } from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import type { DynBoxProps, DynBoxRef } from './DynBox.types';
import styles from './DynBox.module.css';

const getStyleClass = (name: string) => (styles as Record<string, string>)[name] || '';

const FILTERED_PROPS = new Set([
  'as','padding','p','px','py','pt','pr','pb','pl','m','mx','my','mt','mr','mb','ml',
  'radius','borderRadius','customBorderRadius','shadow','border','background','bg','backgroundColor','color',
  'align','justify','direction','flexDirection','wrap','gap','rowGap','columnGap',
  'gridTemplateColumns','gridTemplateRows','gridTemplateAreas','top','right','bottom','left','zIndex',
  'interactive','cssVars','ariaLiveMessage','ariaLivePoliteness','focusOnMount','display','position','textAlign','overflow','overflowX','overflowY',
  'alignContent','width','height','minWidth','minHeight','maxWidth','maxHeight','hideOnMobile','hideOnTablet','hideOnDesktop','mobileOnly','tabletOnly','desktopOnly'
]);

const isToken = (v?: string) => v && ['0','xs','sm','md','lg','xl','2xl'].includes(v);
const toTokenVar = (v: string) => `var(--dyn-spacing-${v}, var(--spacing-${v}, ${({'0':'0','xs':'0.25rem','sm':'0.5rem','md':'1rem','lg':'1.5rem','xl':'2rem','2xl':'3rem'} as Record<string,string>)[v]}))`;

function DynBoxInner<E extends React.ElementType = 'div'>(props: DynBoxProps<E>, ref: DynBoxRef<E>) {
  const {
    as, padding, p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    radius = 'md', borderRadius, customBorderRadius,
    shadow = 'none', border = 'default',
    background = 'surface', bg, backgroundColor, color,
    align, justify,
    direction = 'column', flexDirection, wrap,
    gap = 'md', rowGap, columnGap,
    gridTemplateColumns, gridTemplateRows, gridTemplateAreas,
    alignContent, display, position, textAlign, overflow, overflowX, overflowY,
    width, height, maxWidth, maxHeight, minWidth, minHeight,
    top, right, bottom, left, zIndex,
    className, style, id, role,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'data-testid': dataTestId = 'dyn-box',
    focusOnMount, interactive,
    ariaLiveMessage, ariaLivePoliteness = 'polite',
    cssVars,
    hideOnMobile, hideOnTablet, hideOnDesktop, mobileOnly, tabletOnly, desktopOnly,
    children, ...rest
  } = props;

  const Component = (as ?? 'div') as React.ElementType;
  const internalId = useMemo(() => id || generateId('dyn-box'), [id]);
  const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FILTERED_PROPS.has(k)));

  // Stable ref that also forwards
  const elementRef = React.useRef<HTMLElement | null>(null);
  const setRefs = (node: any) => {
    elementRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref && 'current' in (ref as any)) (ref as any).current = node;
  };

  const legacyAliases: string[] = ['box'];
  const finalDirection = flexDirection || direction;
  if (finalDirection?.startsWith('row') || finalDirection?.startsWith('column')) legacyAliases.push('box--flex');
  const finalBackground = bg || background;
  if (['primary','secondary','success','warning','danger'].includes(finalBackground as string)) legacyAliases.push(`box--bg-${finalBackground}`);

  const finalRadius = borderRadius || customBorderRadius || radius;
  const basePadding = p ?? padding; // keep undefined if not provided

  const classes = cn(
    getStyleClass('box'),
    basePadding && isToken(basePadding) && getStyleClass(`box--p-${basePadding}`),
    finalBackground && ['primary','secondary','tertiary','success','warning','danger'].includes(finalBackground) && getStyleClass(`box--bg-${finalBackground}`),
    display && getStyleClass(`box--${display}`),
    position && getStyleClass(`box--${position}`),
    finalRadius && ['none','sm','md','lg','xl','full'].includes(finalRadius) && getStyleClass(`box--rounded-${finalRadius}`),
    shadow && ['sm','md','lg'].includes(shadow) && getStyleClass(`box--shadow-${shadow}`),
    textAlign && getStyleClass(`box--text-${textAlign}`),
    overflow && getStyleClass(`box--overflow-${overflow}`),
    border === 'default' && getStyleClass('box--border'),
    interactive && getStyleClass('box--interactive'),
    hideOnMobile && getStyleClass('box--mobile-hidden'),
    hideOnTablet && getStyleClass('box--tablet-hidden'),
    hideOnDesktop && getStyleClass('box--desktop-hidden'),
    mobileOnly && [getStyleClass('box--tablet-hidden'), getStyleClass('box--desktop-hidden')],
    tabletOnly && [getStyleClass('box--mobile-hidden'), getStyleClass('box--desktop-hidden')],
    desktopOnly && [getStyleClass('box--mobile-hidden'), getStyleClass('box--tablet-hidden')],
    ...legacyAliases,
    className
  );

  const styleVars: React.CSSProperties = {
    ...(width !== undefined ? { ['--dyn-box-width' as any]: typeof width === 'number' ? (width === 0 ? '0' : `${width}px`) : width } : {}),
    ...(height !== undefined ? { ['--dyn-box-height' as any]: typeof height === 'number' ? (height === 0 ? '0' : `${height}px`) : height } : {}),
    ...(maxWidth ? { ['--dyn-box-max-width' as any]: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
    ...(maxHeight ? { ['--dyn-box-max-height' as any]: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
    ...(minWidth ? { ['--dyn-box-min-width' as any]: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
    ...(minHeight ? { ['--dyn-box-min-height' as any]: typeof minHeight === 'number' ? `${minHeight}px` : minHeight } : {}),
    ...(top !== undefined ? { ['--dyn-box-top' as any]: typeof top === 'number' ? `${top}px` : top } : {}),
    ...(right !== undefined ? { ['--dyn-box-right' as any]: typeof right === 'number' ? `${right}px` : right } : {}),
    ...(bottom !== undefined ? { ['--dyn-box-bottom' as any]: typeof bottom === 'number' ? (bottom === 0 ? '0' : `${bottom}px`) : bottom } : {}),
    ...(left !== undefined ? { ['--dyn-box-left' as any]: typeof left === 'number' ? `${left}px` : left } : {}),
    ...(zIndex !== undefined ? { ['--dyn-box-z-index' as any]: String(zIndex) } : {}),
    ...(backgroundColor ? { ['--dyn-box-bg' as any]: backgroundColor } : {}),
    ...(color ? { ['--dyn-box-color' as any]: color } : {}),
    ...(finalBackground && !['primary','secondary','tertiary','success','warning','danger','surface'].includes(finalBackground as string) ? { ['--dyn-box-bg' as any]: finalBackground as any } : {}),
    ...(customBorderRadius ? { ['--dyn-box-radius' as any]: customBorderRadius } : {}),
    ...(finalRadius && !['none','xs','sm','md','lg','xl','full'].includes(finalRadius as string) ? { ['--dyn-box-radius' as any]: finalRadius as any } : {}),
    ...(basePadding ? { ['--dyn-box-padding' as any]: isToken(basePadding) ? toTokenVar(basePadding) : basePadding } : {}),
    ...(px ? { ['--dyn-box-padding-left' as any]: isToken(px) ? toTokenVar(px) : px, ['--dyn-box-padding-right' as any]: isToken(px) ? toTokenVar(px) : px } : {}),
    ...(py ? { ['--dyn-box-padding-top' as any]: isToken(py) ? toTokenVar(py) : py, ['--dyn-box-padding-bottom' as any]: isToken(py) ? toTokenVar(py) : py } : {}),
    ...(pt ? { ['--dyn-box-padding-top' as any]: isToken(pt) ? toTokenVar(pt) : pt } : {}),
    ...(pr ? { ['--dyn-box-padding-right' as any]: isToken(pr) ? toTokenVar(pr) : pr } : {}),
    ...(pb ? { ['--dyn-box-padding-bottom' as any]: isToken(pb) ? toTokenVar(pb) : pb } : {}),
    ...(pl ? { ['--dyn-box-padding-left' as any]: isToken(pl) ? toTokenVar(pl) : pl } : {}),
    ...(m ? { ['--dyn-box-margin' as any]: isToken(m) ? toTokenVar(m) : m } : {}),
    ...(mx ? { ['--dyn-box-margin-left' as any]: mx === 'auto' ? 'auto' : (isToken(mx) ? toTokenVar(mx) : mx), ['--dyn-box-margin-right' as any]: mx === 'auto' ? 'auto' : (isToken(mx) ? toTokenVar(mx) : mx) } : {}),
    ...(my ? { ['--dyn-box-margin-top' as any]: isToken(my) ? toTokenVar(my) : my, ['--dyn-box-margin-bottom' as any]: isToken(my) ? toTokenVar(my) : my } : {}),
    ...(mt ? { ['--dyn-box-margin-top' as any]: isToken(mt) ? toTokenVar(mt) : mt } : {}),
    ...(mr ? { ['--dyn-box-margin-right' as any]: mr === 'auto' ? 'auto' : (isToken(mr) ? toTokenVar(mr) : mr) } : {}),
    ...(mb ? { ['--dyn-box-margin-bottom' as any]: mb === '0' ? '0' : (isToken(mb) ? toTokenVar(mb) : mb) } : {}),
    ...(ml ? { ['--dyn-box-margin-left' as any]: ml === 'auto' ? 'auto' : (isToken(ml) ? toTokenVar(ml) : ml) } : {}),
    ...(finalDirection ? { ['--dyn-box-flex-direction' as any]: finalDirection } : {}),
    ...(wrap ? { ['--dyn-box-flex-wrap' as any]: wrap } : {}),
    ...(justify ? { ['--dyn-box-justify-content' as any]: justify } : {}),
    ...(align ? { ['--dyn-box-align-items' as any]: align } : {}),
    ...(alignContent ? { ['--dyn-box-align-content' as any]: alignContent } : {}),
    ...(gap ? { ['--dyn-box-gap' as any]: isToken(gap) ? toTokenVar(gap) : gap } : {}),
    ...(rowGap ? { ['--dyn-box-row-gap' as any]: isToken(rowGap) ? toTokenVar(rowGap) : rowGap } : {}),
    ...(columnGap ? { ['--dyn-box-column-gap' as any]: isToken(columnGap) ? toTokenVar(columnGap) : columnGap } : {}),
    ...(gridTemplateColumns ? { ['--dyn-box-grid-columns' as any]: gridTemplateColumns } : {}),
    ...(gridTemplateRows ? { ['--dyn-box-grid-rows' as any]: gridTemplateRows } : {}),
    ...(gridTemplateAreas ? { ['--dyn-box-grid-areas' as any]: gridTemplateAreas } : {}),
    ...(overflowX ? { ['--dyn-box-overflow-x' as any]: overflowX } : {}),
    ...(overflowY ? { ['--dyn-box-overflow-y' as any]: overflowY } : {}),
    ...(cssVars as any),
    ...style,
  } as React.CSSProperties;

  useEffect(() => {
    if (focusOnMount && interactive) {
      queueMicrotask?.(() => {
        try { elementRef.current?.focus?.(); } catch {}
      });
    }
  }, [focusOnMount, interactive]);

  const liveRegionId = ariaLiveMessage ? `${internalId}-liveregion` : undefined;
  const describedBy = [ariaDescribedBy, liveRegionId].filter(Boolean).join(' ') || undefined;

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    (domProps as any).onKeyDown?.(e as any);
    if (!interactive) return;
    // Ensure Enter and Space both trigger clicks in tests
    if (e.key === 'Enter' || e.key === ' ') {
      (domProps as any).onClick?.(e as any);
      if (e.key === ' ') e.preventDefault();
    }
  };

  const element = React.createElement(
    Component as any,
    {
      // Spread user provided DOM props first so that internal handlers like
      // onKeyDown can wrap and call them. If we spread domProps last they
      // would overwrite our internal handlers and break expected behaviour
      // (e.g. triggering click on Enter/Space and forwarding the event to
      // user's onKeyDown).
      ...domProps,
      ref: setRefs,
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
    } as any,
    children,
    ariaLiveMessage && (
      <span id={liveRegionId} aria-live={ariaLivePoliteness} aria-atomic="true" className="dyn-sr-only">{ariaLiveMessage}</span>
    )
  );

  return element;
}

const _DynBox = forwardRef(DynBoxInner as any) as React.NamedExoticComponent<any>;
export const DynBox = _DynBox as <E extends React.ElementType = 'div'>(
  props: DynBoxProps<E> & { ref?: DynBoxRef<E> }
) => React.ReactElement | null;

(_DynBox as React.NamedExoticComponent).displayName = 'DynBox';
