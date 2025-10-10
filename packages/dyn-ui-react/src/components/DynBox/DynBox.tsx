import { forwardRef, useMemo } from 'react';
import type { CSSProperties, ForwardedRef } from 'react';
import { sxToStyle } from '../../system/sx';
import type { DynBoxProps, DynBoxRef } from './DynBox.types';
import { DYN_BOX_DEFAULT_PROPS } from './DynBox.types';
import styles from './DynBox.module.css';
import { cn } from '../../utils/classNames';

const DynBoxComponent = (
  {
    sx,
    style,
    className,
    children,
    'data-testid': dataTestId = DYN_BOX_DEFAULT_PROPS['data-testid'],
    ...rest
  }: DynBoxProps,
  ref: ForwardedRef<DynBoxRef>
) => {
  const sxStyles = useMemo(() => sxToStyle(sx), [sx]);

  const combinedStyles = useMemo<CSSProperties>(() => ({
    ...sxStyles,
    ...(style ?? {}),
  }), [sxStyles, style]);

  return (
    <div
      ref={ref}
      className={cn(styles.root, className)}
      style={combinedStyles}
      data-testid={dataTestId}
      {...rest}
    >
      {children}
    </div>
  );
};

const DynBox = forwardRef<DynBoxRef, DynBoxProps>(DynBoxComponent);

DynBox.displayName = 'DynBox';

export { DynBox };
export default DynBox;
