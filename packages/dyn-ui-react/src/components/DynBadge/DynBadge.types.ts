import type {
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode
} from 'react';
import type { BaseComponentProps } from '../../types';

export type ComponentSize = 'small' | 'medium' | 'large';

export const DYN_BADGE_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral'
] as const;

export type DynBadgeSemanticColor = (typeof DYN_BADGE_COLORS)[number];

export interface AccessibilityProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
}

export type DynBadgeVariant = 'solid' | 'soft' | 'outline' | 'dot';
export type DynBadgeColor = DynBadgeSemanticColor | (string & {});
export type DynBadgePosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface DynBadgeProps
  extends BaseComponentProps,
    AccessibilityProps,
    Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
  /** Badge content */
  children?: ReactNode;

  /** Badge variant style */
  variant?: DynBadgeVariant;

  /** Semantic color */
  color?: DynBadgeColor;

  /** Size variant */
  size?: ComponentSize;

  /** Position when used as overlay */
  position?: DynBadgePosition;

  /** Click handler (makes badge interactive) */
  onClick?: (event: ReactMouseEvent<HTMLSpanElement>) => void;

  /** Icon before text */
  startIcon?: ReactNode;

  /** Icon after text */
  endIcon?: ReactNode;

  /** Max count before showing + */
  maxCount?: number;

  /** Numeric value (for count badges) */
  count?: number;

  /** Show badge even when count is 0 */
  showZero?: boolean;

  /** Animate appearance */
  animated?: boolean;

  /** Pulse animation for notifications */
  pulse?: boolean;

  /** Accessible description for count */
  countDescription?: string;
}

export type DynBadgeRef = HTMLSpanElement;
