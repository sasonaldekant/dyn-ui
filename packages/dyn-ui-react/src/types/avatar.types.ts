export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarLoading = 'eager' | 'lazy';

export interface DynAvatarProps {
  src?: string;
  size?: AvatarSize;
  loading?: AvatarLoading;
  alt?: string;
  initials?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const AVATAR_SIZES = {
  xs: 24,
  sm: 32,
  md: 64,
  lg: 96,
  xl: 144
} as const;
