import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types';

export type DynAvatarSize = Extract<ComponentSize, 'small' | 'medium' | 'large'>;
export type DynAvatarShape = 'circle' | 'square' | 'rounded';
export type DynAvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface DynAvatarProps
  extends BaseComponentProps,
    AccessibilityProps,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      keyof BaseComponentProps | keyof AccessibilityProps | 'onClick' | 'children'
    > {
  /** Image source URL */
  src?: string;

  /** Alt text for image (also used for initials generation) */
  alt: string;

  /** Avatar size */
  size?: DynAvatarSize;

  /** Avatar shape */
  shape?: DynAvatarShape;

  /** Manual initials override */
  initials?: string;

  /** Status indicator */
  status?: DynAvatarStatus;

  /** Loading state */
  loading?: boolean;

  /** Error state */
  error?: boolean;

  /** Click handler (makes avatar interactive) */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /** Custom fallback content when no image */
  fallback?: ReactNode;

  /** Image loading strategy */
  imageLoading?: 'eager' | 'lazy';

  /** Custom image props */
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading' | 'children'> & {
    'data-testid'?: string;
  };
}

export type DynAvatarRef = HTMLDivElement;

export const DYN_AVATAR_PIXEL_SIZES: Record<DynAvatarSize, number> = {
  small: 40,
  medium: 56,
  large: 72,
};

export const DYN_AVATAR_STATUS_LABELS: Record<DynAvatarStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Busy',
};
