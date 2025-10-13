import { ImgHTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types';

export type DynAvatarSize = ComponentSize;
export type DynAvatarShape = 'circle' | 'square' | 'rounded';
export type DynAvatarStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * Props interface for DynAvatar component
 * Extends BaseComponentProps for consistency across the design system
 */
export interface DynAvatarProps extends 
  BaseComponentProps,
  AccessibilityProps {
  
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
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading'> & {
    'data-testid'?: string;
  };
}

/**
 * Ref type for DynAvatar component
 */
export interface DynAvatarRef extends HTMLDivElement {}

/**
 * Status labels for accessibility
 */
export const DYN_AVATAR_STATUS_LABELS: Record<DynAvatarStatus, string> = {
  online: 'Online',
  offline: 'Offline', 
  away: 'Away',
  busy: 'Busy',
} as const;