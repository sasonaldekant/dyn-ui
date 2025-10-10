import type {
  ButtonHTMLAttributes,
  FocusEvent,
  MouseEvent,
  ReactNode,
} from 'react';
import type { BaseComponentProps } from '../../types';

export type DynButtonKind = 'primary' | 'secondary' | 'tertiary';

export type DynButtonSize = 'small' | 'medium' | 'large';

export interface DynButtonProps
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | 'type'
      | 'onBlur'
      | 'onClick'
      | 'children'
      | 'aria-label'
      | 'aria-expanded'
    >,
    BaseComponentProps {
  /** Button text label */
  label?: string;

  /** Icon - can be string (icon name) or React node */
  icon?: string | ReactNode;

  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';

  /** Loading state indicator */
  loading?: boolean;

  /** Danger/destructive state styling */
  danger?: boolean;

  /** Button kind/variant */
  kind?: DynButtonKind;

  /** Disabled state */
  disabled?: boolean;

  /** Accessible label override */
  ariaLabel?: string;

  /** Accessible expanded state */
  ariaExpanded?: boolean;

  /** Button size */
  size?: DynButtonSize;

  /** Expand button to full width */
  fullWidth?: boolean;

  /** Blur event handler */
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;

  /** Click event handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export type DynButtonRef = HTMLButtonElement;

export type DynButtonDefaultProps = Required<
  Pick<
    DynButtonProps,
    'type' | 'kind' | 'size' | 'loading' | 'danger' | 'disabled' | 'fullWidth'
  >
>;

export const DYN_BUTTON_DEFAULT_PROPS: DynButtonDefaultProps = {
  type: 'button',
  kind: 'primary',
  size: 'medium',
  loading: false,
  danger: false,
  disabled: false,
  fullWidth: false,
};
