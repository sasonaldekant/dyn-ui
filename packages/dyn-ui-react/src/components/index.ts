﻿// Standardized exports for ALL DYN-UI components
// Ovaj fajl pokriva sve komponente - ne menjaj ručno!
// Generated on: 2025-10-18 19:25:00 - Added DynTextArea for ERP
export { DynAvatar } from './DynAvatar';
export { DynBadge } from './DynBadge';
export { DynBox } from './DynBox';
export { DynBreadcrumb } from './DynBreadcrumb';
export { DynButton } from './DynButton';
export { DynChart } from './DynChart';
export { DynCheckbox } from './DynCheckbox';
export { DynContainer } from './DynContainer';
export { DynDatePicker } from './DynDatePicker';
export { DynDivider } from './DynDivider';
export { DynFieldContainer } from './DynFieldContainer';
export { DynGauge } from './DynGauge';
export { DynGrid } from './DynGrid';
export { DynIcon } from './DynIcon';
export { DynInput } from './DynInput';
export { DynLabel } from './DynLabel';
export { DynListView } from './DynListView';
export { DynMenu } from './DynMenu';
export { DynPage } from './DynPage';
export { DynSelect } from './DynSelect';
export { DynStepper } from './DynStepper';
export { DynTable } from './DynTable';
export { DynTabs } from './DynTabs';
export { DynTextArea } from './DynTextArea'; // NEW - ERP Forms Support
export { DynToolbar } from './DynToolbar';
export { DynTreeView } from './DynTreeView';
export { ThemeSwitcher } from './ThemeSwitcher';

// Re-export theme/provider utilities and helpers expected by tests
export { ThemeProvider, useTheme } from '../theme/ThemeProvider';
export { IconDictionaryProvider } from '../providers';
export { classNames, createClassNameGenerator, combineClasses } from '../utils/classNames';
export { generateInitials } from '../utils/dynFormatters';

// Currency utilities - NEW for ERP
export { 
  formatCurrencyValue,
  parseCurrencyValue,
  formatRSD,
  formatEUR,
  formatUSD,
  getCurrencyConfig,
  CURRENCY_SYMBOLS
} from '../utils/currencyFormatters';

// Type exports
export type * from './DynAvatar';
export type * from './DynBadge';
export type * from './DynBox';
export type * from './DynBreadcrumb';
export type * from './DynButton';
export type * from './DynChart';
export type * from './DynCheckbox';
export type * from './DynContainer';
export type * from './DynDatePicker';
export type * from './DynDivider';
export type * from './DynFieldContainer';
export type * from './DynGauge';
export type * from './DynGrid';
export type * from './DynIcon';
export type * from './DynInput';
export type * from './DynLabel';
export type * from './DynListView';
export type * from './DynMenu';
export type * from './DynPage';
export type * from './DynSelect';
export type * from './DynStepper';
export type * from './DynTable';
export type * from './DynTabs';
export type * from './DynTextArea'; // NEW - ERP Forms Support
export type * from './DynToolbar';
export type * from './DynTreeView';
export type * from './ThemeSwitcher';

