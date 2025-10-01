/**
 * TypeScript interfaces for DynButton component
 * Follows the exact specification from DYN UI documentation
 */

export interface DynButtonProps {
  /** Button text label */
  label?: string;
  
  /** Icon - can be string (icon name) or React component */
  icon?: string | React.ReactNode;
  
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  
  /** Loading state with spinner */
  loading?: boolean;
  
  /** Danger/destructive state styling */
  danger?: boolean;
  
  /** Button kind/variant */
  kind?: 'primary' | 'secondary' | 'tertiary';
  
  /** Disabled state */
  disabled?: boolean;
  
  /** ARIA label for accessibility */
  ariaLabel?: string;
  
  /** ARIA expanded state */
  ariaExpanded?: boolean;
  
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Blur event handler */
  onBlur?: () => void;
  
  /** Click event handler */
  onClick?: () => void;
}