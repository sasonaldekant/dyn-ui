import { BaseComponentProps } from './theme';

export type BadgeStatus = 'disabled' | 'negative' | 'positive' | 'warning';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeIcon = string | boolean | React.ReactNode;

export interface DynBadgeProps extends BaseComponentProps {
  value?: number;
  color?: string;
  status?: BadgeStatus;
  size?: BadgeSize;
  icon?: BadgeIcon;
  showBorder?: boolean;
  ariaLabel?: string;
}

// DYN Color Palette
export const DYN_COLOR_PALETTE = [
  'color-01', 'color-02', 'color-03', 'color-04', 'color-05', 'color-06',
  'color-07', 'color-08', 'color-09', 'color-10', 'color-11', 'color-12'
] as const;