import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../types';

export const DYN_BADGE_COLORS = [
  'color-01',
  'color-02',
  'color-03',
  'color-04',
  'color-05',
  'color-06',
  'color-07',
  'color-08',
  'color-09',
  'color-10',
  'color-11',
  'color-12',
] as const;

export type BadgeStatus = 'disabled' | 'negative' | 'positive' | 'warning';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgeIcon = string | boolean | ReactNode;

export type BadgeThemeColor = (typeof DYN_BADGE_COLORS)[number];

export interface DynBadgeProps extends BaseComponentProps {
  /** Numeric value displayed inside the badge */
  value?: number;

  /** Theme token or custom CSS color */
  color?: string;

  /** Semantic status variant */
  status?: BadgeStatus;

  /** Visual size variant */
  size?: BadgeSize;

  /** Icon displayed inside the badge */
  icon?: BadgeIcon;

  /** Optional border treatment */
  showBorder?: boolean;

  /** Accessible label override */
  ariaLabel?: string;
}

export type DynBadgeRef = HTMLSpanElement;

export type DynBadgeDefaultProps = Required<
  Pick<DynBadgeProps, 'value' | 'color' | 'size' | 'showBorder'>
>;

export const DYN_BADGE_DEFAULT_PROPS: DynBadgeDefaultProps = {
  value: 0,
  color: 'color-07',
  size: 'medium',
  showBorder: false,
};