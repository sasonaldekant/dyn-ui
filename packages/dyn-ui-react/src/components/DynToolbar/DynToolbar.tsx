import React from 'react';
import { cn } from '../../utils/classNames';
import { generateId } from '../../utils/accessibility';
import styles from './DynToolbar.module.css';
import type { DynToolbarProps } from './DynToolbar.types';

const getStyleClass = (n: string) => (styles as Record<string, string>)[n] || '';

export const DynToolbar: React.FC<DynToolbarProps> = ({
  children,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'data-testid': dataTestId,
  ...rest
}) => {
  const internalId = React.useMemo(() => id || generateId('toolbar'), [id]);
  return (
    <div
      id={internalId}
      role="toolbar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(getStyleClass('root'), className)}
      data-testid={dataTestId || 'dyn-toolbar'}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DynToolbar;
