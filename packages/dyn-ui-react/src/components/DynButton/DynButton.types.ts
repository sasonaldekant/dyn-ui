import type {
  ButtonHTMLAttributes,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';
import type { BaseComponentProps } from '../../types';

export type DynButtonKind = 'primary' | 'secondary' | 'tertiary';

export type DynButtonSize = 'small' | 'medium' | 'large';

export interface DynButtonProps
  extends BaseComponentProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | 'type'
      | 'onBlur'
      | 'onClick'
      | 'onKeyDown'
      | 'children'
      | 'aria-label'
      | 'aria-expanded'
      | 'aria-controls'
      | 'aria-describedby'
      | 'aria-pressed'
      | keyof BaseComponentProps
    > {
  /** Button text label */
  label?: string;

  /** Icon - can be string (icon name) or React node */
  icon?: string | ReactNode;

  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';

  /** Loading state indicator */
  loading?: boolean;

  /** Text announced to assistive technologies while loading */
  loadingText?: string;

  /** Danger/destructive state styling */
  danger?: boolean;

  /** Button kind/variant */
  kind?: DynButtonKind;

  /** Disabled state */
  disabled?: boolean;

  /** Expand button to full width */
  fullWidth?: boolean;

  /** Hide button on viewports narrower than 768px */
  hideOnMobile?: boolean;

  /** Display as icon-only on mobile while keeping the label accessible */
  iconOnlyOnMobile?: boolean;

  /** Accessible label override */
  ariaLabel?: string;

  /** Accessible expanded state */
  ariaExpanded?: boolean;

  /** ID reference of the element controlled by the button */
  ariaControls?: string;

  /** ID reference of elements describing the button */
  ariaDescribedBy?: string;

  /** Pressed/toggled state for ARIA toggle buttons */
  ariaPressed?: boolean;

  /** Button size */
  size?: DynButtonSize;

  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLButtonElement>;

  /** Click event handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /** Key down handler */
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
}

export type DynButtonRef = HTMLButtonElement;

export type DynButtonDefaultProps = Required<
  Pick<
    DynButtonProps,
    |
      'type'
      | 'kind'
      | 'size'
      | 'loading'
      | 'loadingText'
      | 'danger'
      | 'disabled'
      | 'fullWidth'
      | 'hideOnMobile'
      | 'iconOnlyOnMobile'
  >
>;

export const DYN_BUTTON_DEFAULT_PROPS: DynButtonDefaultProps = {
  type: 'button',
  kind: 'primary',
  size: 'medium',
  loading: false,
  loadingText: 'Loading…',
  danger: false,
  disabled: false,
  fullWidth: false,
  hideOnMobile: false,
  iconOnlyOnMobile: false,
};
