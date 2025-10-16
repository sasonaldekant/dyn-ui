# Migration Guide: v0.x → Named Exports Standardization

This release removes all default exports across `@dyn-ui/react` components and enforces a single, explicit API:

- Components: `export { Component } from './Component'`
- Types: `export type { ComponentProps } from './Component.types'`

It also removes Jest, enforces Vitest-first testing, and removes SCSS in favor of CSS Modules + design tokens.

## 1) Imports: default → named

Before:
```ts
import DynButton from '@dyn-ui/react/src/components/DynButton';
```
After:
```ts
import { DynButton } from '@dyn-ui/react/src/components/DynButton';
```

Applies to all components: DynAvatar, DynBadge, DynBox, DynBreadcrumb, DynButton, DynChart, DynCheckbox, DynContainer, DynDatePicker, DynDivider, DynFieldContainer, DynGauge, DynGrid, DynIcon, DynInput, DynLabel, DynListView, DynMenu, DynPage, DynSelect, DynStepper, DynTable, DynTabs, DynToolbar, DynTreeView, ThemeSwitcher.

## 2) Types: minimize public surface

Prefer importing only the primary props type for each component:

Before:
```ts
import type { DynTableProps, TableRow, TableColumn } from '@dyn-ui/react/src/components/DynTable';
```
After:
```ts
import type { DynTableProps } from '@dyn-ui/react/src/components/DynTable';
```
If you need secondary types (e.g., ToolbarItem), open an issue/PR and we will selectively re-export.

## 3) Design tokens usage

Ensure your app includes the tokens bundle once (e.g., in app root):
```ts
import 'packages/design-tokens/index.css';
```
All Dyn UI CSS Modules rely on `var(--dyn-*)` tokens for colors, spacing, typography, borders, shadows and animations.

## 4) Testing migration (Jest → Vitest)

- Jest config and globals are removed.
- Vitest is the primary test runner (happy-dom, jest-axe for a11y).
- Common patterns remain identical via Testing Library APIs.

Run:
```bash
pnpm test
# or
pnpm vitest --coverage
```

## 5) FAQ

- Q: My imports fail after upgrade.
  A: Replace all default imports with named imports as shown above. Codemod below can automate this.

- Q: I need additional types publicly.
  A: Please file an issue; we will re-export selectively to keep the API focused.

- Q: Do I need to add SCSS loaders?
  A: No. The library uses CSS Modules + PostCSS exclusively.
