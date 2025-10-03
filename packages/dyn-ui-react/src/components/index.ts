/**
 * Main component exports for DYN UI React
 * Updated to include Display Components Group - SCOPE 5
 */

// Basic components
export { DynButton } from './DynButton';
export { DynIcon } from './DynIcon';

// Display Components - SCOPE 5
export { default as DynBadge } from './DynBadge';
export { default as DynAvatar } from './DynAvatar';
export { default as DynLabel } from './DynLabel';

// Layout components
export { DynContainer } from './DynContainer';

// Export types
export type { DynButtonProps } from './DynButton/DynButton.types';
export type { DynIconProps } from './DynIcon/DynIcon';

// Display Components types
export type { DynBadgeProps, BadgeStatus, BadgeSize } from '../types/badge.types';
export type { DynAvatarProps, AvatarSize } from '../types/avatar.types';
export type { DynLabelProps } from '../types/label.types';
export type { DynIconProps as DynIconPropsNew } from '../types/icon.types';

// Constants
export { DYN_COLOR_PALETTE } from '../types/badge.types';
export { AVATAR_SIZES } from '../types/avatar.types';
