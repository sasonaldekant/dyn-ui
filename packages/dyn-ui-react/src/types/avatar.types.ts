import { BaseComponentProps } from './theme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarLoading = 'eager' | 'lazy';

export interface DynAvatarProps extends BaseComponentProps {
  /** Image source URL */
  src?: string;
  
  /** Avatar size */
  size?: AvatarSize;
  
  /** Image loading strategy */
  loading?: AvatarLoading;
  
  /** Alternative text for accessibility */
  alt?: string;
  
  /** Text initials to display when no image */
  initials?: string;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const AVATAR_SIZES = {
  xs: 24,
  sm: 32,
  md: 64,
  lg: 96,
  xl: 144
} as const;