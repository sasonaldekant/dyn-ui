import { BaseComponentProps } from './theme';

export interface DynIconProps extends BaseComponentProps {
  /** Icon identifier - string (icon name) or React component */
  icon: string | React.ReactNode;
  
  /** Icon size */
  size?: string | number;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface IconDictionary {
  [key: string]: string;
}

// Icon processing utility types
export interface ProcessedIcon {
  baseClass: string;
  iconClass: string;
}