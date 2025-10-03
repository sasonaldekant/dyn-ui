export interface DynIconProps {
  icon: string | React.ReactNode;
  size?: string;
  className?: string;
  onClick?: () => void;
}

export interface IconDictionary {
  [key: string]: string;
}

// Icon processing utility types
export interface ProcessedIcon {
  baseClass: string;
  iconClass: string;
}
