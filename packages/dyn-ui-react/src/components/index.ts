// Component exports
export { DynBadge } from './DynBadge';
export { DynButton } from './DynButton';
export { DynIcon } from './DynIcon';
export { DynAvatar } from './DynAvatar';
export { DynLabel } from './DynLabel';
export { DynCheckbox } from './DynCheckbox';
export { DynInput } from './DynInput';
export { DynContainer } from './DynContainer';
export { DynGrid } from './DynGrid';
export { DynPage } from './DynPage';
export { DynDivider } from './DynDivider';
export { DynBox } from './DynBox';
export { DynBreadcrumb } from './DynBreadcrumb';

// Basic Component Types
export type { DynBoxProps, DynBoxRef } from './DynBox/DynBox.types';
export type {
  DynButtonProps,
  DynButtonKind,
  DynButtonSize,
} from './DynButton/DynButton.types';
export { DYN_BUTTON_DEFAULT_PROPS } from './DynButton/DynButton.types';
export type { DynIconProps, DynIconSizeToken, DynIconTone } from '../types/icon.types';
export { DYN_ICON_DEFAULT_PROPS } from '../types/icon.types';

// Display Component Types - SCOPE 5
export type {
  DynBadgeProps,
  DynBadgeRef,
  DynBadgeVariant,
  DynBadgeColor,
  DynBadgePosition,
  DynBadgeSize,
  DynBadgeAccessibilityProps
} from '../types/badge.types';
export type {
  DynAvatarProps,
  DynAvatarRef,
  DynAvatarSize,
  DynAvatarShape,
  DynAvatarStatus
} from './DynAvatar';
export {
  DYN_AVATAR_PIXEL_SIZES,
  DYN_AVATAR_STATUS_LABELS,
} from './DynAvatar';
export type { DynLabelProps } from '../types/label.types';

// Form Component Types - SCOPE 6
export type {
  DynInputProps,
  DynSelectProps,
  DynDatePickerProps,
  DynFieldContainerProps,
  ValidationRule,
  DynFieldRef,
  DynFieldBase,
  SelectOption
} from '../types/field.types';
export type {
  DynCheckboxProps,
  DynCheckboxRef,
  DynCheckboxSize,
} from './DynCheckbox/DynCheckbox.types';
export { DYN_CHECKBOX_DEFAULT_PROPS } from './DynCheckbox/DynCheckbox.types';

// Layout Component Types - SCOPE 7
export type {
  DynContainerProps,
  DynPageProps,
  DynPageBreadcrumb,
  DynPageAction,
  LayoutSize,
  LayoutSpacing,
  LayoutDirection,
  LayoutAlignment,
  LayoutJustify
} from '../types/layout.types';

export type {
  DynGridProps,
  DynGridColumn,
  DynGridPagination,
  DynGridSelectable,
  DynGridSortDirection,
} from './DynGrid';
export { DYN_GRID_DEFAULT_PROPS } from './DynGrid';

// Data Display Component Types
export type {
  DynChartProps,
  DynChartData,
  ChartType,
  ChartDataPoint,
  ChartSeries,
  ChartAxis,
  DynChartOptions,
  DynChartLegendItem
} from './DynChart/DynChart.types';
export type {
  DynGaugeProps,
  GaugeSize,
  GaugeRange,
  GaugeType
} from './DynGauge/DynGauge.types';
export type {
  DynListViewProps,
  ListViewItem,
  ListViewTemplate,
  ListAction,
  ListViewSize
} from './DynListView/DynListView.types';
export type {
  DynTableProps,
  DynTableColumn,
  TableAction,
  TablePagination,
  TableSortDirection,
  TableCellType,
  TableCellAlign,
  TableSelectionType,
  TableSize
} from './DynTable/DynTable.types';
export type {
  DynTreeViewProps,
  TreeNode,
  TreeViewActions,
  TreeSelectInfo,
  TreeCheckInfo
} from './DynTreeView/DynTreeView.types';

// Navigation Component Types
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
  DynBreadcrumbRef,
  BreadcrumbSeparator,
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

// Utility Component Types
export type { ThemeSwitcherProps } from './ThemeSwitcher/ThemeSwitcher';

// ===== THEME SYSTEM EXPORTS =====
export { ThemeProvider, useTheme } from '../theme/ThemeProvider';
export type { ThemeProviderProps, ThemeContextValue } from '../theme/ThemeProvider';

// ===== PROVIDER EXPORTS =====
export { IconDictionaryProvider } from '../providers';

// ===== HOOKS EXPORTS =====
export { useDynFieldValidation, validators } from '../hooks/useDynFieldValidation';
export { useDynMask, MASK_PATTERNS, getMaskPattern } from '../hooks/useDynMask';
export { useDynDateParser, DATE_FORMATS, getDateFormat } from '../hooks/useDynDateParser';

// ===== CONSTANTS EXPORTS =====
export { DYN_COLOR_PALETTE } from '../types/badge.types';
export { DEFAULT_MENU_LITERALS } from './DynMenu/DynMenu.types';
export { TOOLBAR_DEFAULTS, TOOLBAR_ITEM_TYPES } from './DynToolbar/DynToolbar.types';

// ===== UTILITY EXPORTS =====
export { classNames, createClassNameGenerator, combineClasses } from '../utils/classNames';
export { generateInitials, formatBadgeValue, isThemeColor, processIconString } from '../utils/dynFormatters';
