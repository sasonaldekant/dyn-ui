/**
 * DynInput component exports
 * Standardized component export structure following DynAvatar pattern
 */

// Main component export
export { DynInput } from './DynInput';
export { default } from './DynInput';

// Type exports for comprehensive TypeScript support
export type {
  DynInputProps,
  DynInputRef,
  DynInputType,
  DynInputSize,
  DynInputDefaultProps,
  DynInputValidationRule,
  DynInputMask,
  DynInputValidationState,
  DynInputValidationResult,
} from './DynInput.types';

// Default props export for external usage
export { DYN_INPUT_DEFAULT_PROPS } from './DynInput.types';