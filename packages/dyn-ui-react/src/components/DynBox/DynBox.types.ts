import type { CSSProperties, HTMLAttributes } from 'react';
import type { BaseComponentProps } from '../../types';
import type { SxProps } from '../../system/sx';

export interface DynBoxOwnProps {
  /**
   * Design token aware styling helper similar to theme-ui `sx` prop.
   * Accepts token keys which are converted into CSS variables.
   */
  sx?: SxProps;

  /**
   * Inline style overrides. Values provided here take precedence over `sx`.
   */
  style?: CSSProperties;
}

export type DynBoxProps = BaseComponentProps &
  DynBoxOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | keyof DynBoxOwnProps>;

export type DynBoxRef = HTMLDivElement;

export interface DynBoxDefaultProps {
  'data-testid': string;
}

export const DYN_BOX_DEFAULT_PROPS: DynBoxDefaultProps = {
  'data-testid': 'dyn-box',
};

