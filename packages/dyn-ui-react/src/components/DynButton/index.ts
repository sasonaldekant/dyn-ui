/**
 * DynButton component exports
 * Standardized component export structure following DynAvatar pattern
 */

// Main component export
export { DynButton } from './DynButton';
export { default } from './DynButton';

// Type exports for comprehensive TypeScript support
export type {
  DynButtonProps,
  DynButtonRef,
  DynButtonKind,
  DynButtonSize,
  DynButtonDefaultProps,
} from './DynButton.types';

// Default props export for external usage
export { DYN_BUTTON_DEFAULT_PROPS } from './DynButton.types';