/**
 * Main component exports for DYN UI React
 * Standardized exports with consistent patterns across all components
 */

// Import global theme styles
import '../styles/themes.css';
// Import component styles
import '../styles/dyn-field-container.css';
import '../styles/dyn-input.css';
import '../styles/dyn-select.css';
import '../styles/dyn-checkbox.css';
import '../styles/dyn-datepicker.css';
import '../styles/dyn-layout.css';

// Basic components
export { DynButton, default as DynButtonDefault } from './DynButton';
export { DynIcon } from './DynIcon';
export { DynBox } from './DynBox';

// Display Components
export { DynBadge } from './DynBadge';
export { DynAvatar } from './DynAvatar';
export { DynLabel } from './DynLabel';

// Form Components
export { DynInput } from './DynInput';
export { DynSelect } from './DynSelect';
export { DynCheckbox } from './DynCheckbox';
export { DynDatePicker } from './DynDatePicker';
export { DynFieldContainer } from './DynFieldContainer';

// Layout Components
export { DynContainer } from './DynContainer';
export { DynDivider } from './DynDivider';
export { DynGrid } from './DynGrid';
export { DynPage } from './DynPage';

// Data Display Components
export { DynChart } from './DynChart';
export { DynGauge } from './DynGauge';
export { DynListView } from './DynListView';
export { DynTable } from './DynTable';
export { DynTreeView } from './DynTreeView';

// Navigation Components
export { DynMenu } from './DynMenu';
export { DynBreadcrumb } from './DynBreadcrumb';
export { DynTabs } from './DynTabs';
export { DynStepper } from './DynStepper';
export { DynToolbar } from './DynToolbar';

// Utility components
export { ThemeSwitcher } from './ThemeSwitcher';

// Theme system
export { ThemeProvider, useTheme } from '../theme/ThemeProvider';
export type { ThemeProviderProps, ThemeContextValue } from '../theme/ThemeProvider';

// Export types
export type { DynButtonProps } from './DynButton/DynButton.types';
export type { DynIconProps as DynIconPropsNew } from '../types/icon.types';

// Display Components types
export type { DynBadgeProps, BadgeStatus, BadgeSize } from '../types/badge.types';
export type { DynAvatarProps, AvatarSize } from '../types/avatar.types';
export type { DynLabelProps } from '../types/label.types';

// Form Components types
export type {
  DynInputProps,
  DynSelectProps,
  DynCheckboxProps,
  DynDatePickerProps,
  DynFieldContainerProps,
  ValidationRule,
  DynFieldRef,
  DynFieldBase,
  SelectOption
} from '../types/field.types';

// Layout Components types
export type {
  DynContainerProps,
  DynDividerProps,
  DynGridProps,
  DynGridColumn,
  DynPageProps,
  DynPageBreadcrumb,
  DynPageAction,
  LayoutSize,
  LayoutSpacing,
  LayoutDirection,
  LayoutAlignment,
  LayoutJustify
} from '../types/layout.types';

// Data Display Components types
export type {
  DynChartProps,
  DynChartData,
  ChartType,
  ChartOptions
} from './DynChart/DynChart.types';
export type {
  DynGaugeProps,
  GaugeType,
  GaugeSize
} from './DynGauge/DynGauge.types';
export type {
  DynListViewProps,
  ListViewItem,
  ListViewTemplate
} from './DynListView/DynListView.types';
export type {
  DynTableProps,
  TableColumn,
  TableAction,
  TableData
} from './DynTable/DynTable.types';
export type {
  DynTreeViewProps,
  TreeNode,
  TreeViewActions
} from './DynTreeView/DynTreeView.types';

// Navigation Components types
export type {
  DynMenuProps,
  MenuItem,
  MenuBadge,
  MenuLiterals,
  DynMenuRef
} from './DynMenu/DynMenu.types';
export type {
  DynBreadcrumbProps,
  BreadcrumbItem,
  DynBreadcrumbRef
} from './DynBreadcrumb/DynBreadcrumb.types';
export type {
  DynTabsProps,
  DynTabsHandle,
  TabItem
} from './DynTabs/DynTabs.types';
export type {
  DynStepperProps,
  DynStepperHandle,
  StepItem
} from './DynStepper/DynStepper.types';
export type {
  DynToolbarProps,
  DynToolbarRef,
  ToolbarItem
} from './DynToolbar/DynToolbar.types';

// Utility types
export type { ThemeSwitcherProps } from './ThemeSwitcher/ThemeSwitcher';

// Constants
export { DYN_COLOR_PALETTE } from '../types/badge.types';
export { AVATAR_SIZES } from '../types/avatar.types';
export { DEFAULT_MENU_LITERALS } from './DynMenu/DynMenu.types';
export { DEFAULT_SEPARATOR, BREADCRUMB_LITERALS } from './DynBreadcrumb/DynBreadcrumb.types';
export { TOOLBAR_DEFAULTS, TOOLBAR_ITEM_TYPES } from './DynToolbar/DynToolbar.types';

// Form validation utilities
export { useDynFieldValidation, validators } from '../hooks/useDynFieldValidation';
export { useDynMask, MASK_PATTERNS, getMaskPattern } from '../hooks/useDynMask';
export { useDynDateParser, DATE_FORMATS, getDateFormat } from '../hooks/useDynDateParser';