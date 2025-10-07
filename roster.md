| ComponentName | Path | .tsx | .types.ts | .module.css | .stories.tsx | .test.tsx | index.ts | BaseComponentProps | CSS Modules | TS status | Tests | Storybook | A11y napomene |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DynAvatar | src/components/DynAvatar | DA | NE | DA | DA | DA | DA | DA | DA | OK | Comprehensive coverage for fallbacks, interactive states, and aria labelling. | Shows image/initials variants, sizes, click handling, and error fallback demos. | Adds role/button semantics when clickable and keeps alt text for screen readers. |
| DynBadge | src/components/DynBadge | DA | DA | DA | DA | DA | DA | DA | DA | OK | Extensive status/value/icon assertions under provider wrapper. | Multiple displays for status, border, icon, size, and text badges. | Uses role="status" with auto aria-label when value present. |
| DynBox | src/components/DynBox | DA | NE | NE | DA | DA | DA | NE | NE | OK | Smoke test only checks export. | Single playground story demonstrating sx token usage. | Bare div wrapper; consumers must manage semantics. |
| DynBreadcrumb | src/components/DynBreadcrumb | DA | DA | DA | DA | DA | DA | NE | DA | OK | Full suite for links, ellipsis expansion, favorites, and API calls. | Rich docs with default, favorites, overflow, and custom separator examples. | nav/ol markup with keyboard handling for truncation controls. |
| DynButton | src/components/DynButton | DA | DA | DA | DA | DA | DA | DA | DA | ISSUES | Only validates placeholder text rendering. | Single placeholder story. | Placeholder button ignores documented props. |
| DynChart | src/components/DynChart | DA | DA | DA | DA | DA | DA | DA | DA | OK | Canvas mocked tests cover chart types, legends, tooltips, and aria. | Stories for default, legends, size and type variations. | Canvas marked role="presentation"; tooltip container toggles aria-hidden. |
| DynCheckbox | src/components/DynCheckbox | DA | NE | DA | DA | DA | DA | NE | DA | OK | Covers checked/indeterminate flows, keyboard, validation, and aria. | Extensive matrix across checked, disabled, validation, and size states. | Wraps input with DynFieldContainer and maintains aria-invalid/describedby. |
| DynContainer | src/components/DynContainer | DA | DA | DA | DA | DA | DA | NE | DA | ISSUES | Suite asserts unsupported size props; basic render tests pass. | Stories demonstrate variants but rely on missing sizing API. | No semantic roles; imperative handle only logs console. |
| DynDatePicker | src/components/DynDatePicker | DA | NE | DA | DA | DA | DA | NE | DA | OK | Covers parsing, shortcuts, keyboard controls, and validation. | Variants for required, masked, sizes, and helper text. | Provides labelled textbox, aria-invalid, and focus management. |
| DynDivider | src/components/DynDivider | DA | DA | DA | DA | DA | DA | NE | DA | OK | Smoke test only. | Examples for sizes, labels, and decorative variants. | role="separator" applied; labelled variant reads accessible text. |
| DynFieldContainer | src/components/DynFieldContainer | DA | NE | DA | DA | DA | DA | NE | DA | OK | Erroneous test imports DynContainer so coverage is ineffective. | Stories show label/help/error permutations. | Outputs label/feedback markup with aria-live for errors. |
| DynGauge | src/components/DynGauge | DA | DA | DA | DA | DA | DA | DA | DA | ISSUES | Expectations for role="progressbar" and data-testids not implemented. | Stories describe circular/linear props that component does not support. | Missing progressbar role/aria attributes despite spec. |
| DynGrid | src/components/DynGrid | DA | NE | NE | DA | DA | DA | NE | NE | OK | Covers loading, empty, sorting, selection, and custom cell rendering. | Storybook covers pagination, variants, and dense tables. | Checkbox selection includes aria-labels; table semantics rely on div/table markup. |
| DynIcon | src/components/DynIcon | DA | NE | DA | DA | DA | DA | DA | DA | ISSUES | Placeholder text assertion only. | Default story renders placeholder. | Icon implementation missing; placeholder span lacks useful semantics. |
| DynInput | src/components/DynInput | DA | NE | DA | DA | DA | DA | NE | DA | OK | Thorough tests for masking, clean button, validation, and events. | Wide coverage of types, sizes, icons, masking, and validation states. | Connects label/help/error with aria props; clean button labelled. |
| DynLabel | src/components/DynLabel | DA | NE | DA | DA | DA | DA | DA | DA | ISSUES | Assertions expect span fallback and optional indicator toggles that mismatch markup. | Stories highlight required/optional/help cases. | Always renders <label>; optional indicator text differs from tests. |
| DynListView | src/components/DynListView | DA | DA | DA | DA | DA | DA | DA | DA | OK | Broad coverage for loading, selection, actions, and expansion but relies on jest globals. | Stories include selectable lists, custom renderers, and empty/loading states. | Selection checkboxes and expand buttons present; needs manual aria if required. |
| DynMenu | src/components/DynMenu | DA | DA | DA | DA | DA | DA | NE | DA | OK | Detailed interactions for collapse, filtering, and badges but use jest mocks. | Storybook demonstrates collapsed, filterable, and badge scenarios. | menuitem roles with aria-expanded; filter input uses DynInput. |
| DynPage | src/components/DynPage | DA | NE | NE | DA | DA | DA | NE | NE | ISSUES | Checks for banner/main/navigation roles that markup does not provide. | Stories cover breadcrumbs, actions, loading/error shells. | Lacks explicit landmark roles; breadcrumbs nav missing accessible label text locale handling. |
| DynSelect | src/components/DynSelect | DA | NE | DA | DA | DA | DA | NE | DA | OK | Thorough scenarios for multi-select, search, disabled, and keyboard. | Stories show default, multiple, searchable, loading, and validation states. | Combobox div simulates select; ensure announced placeholder/aria manually. |
| DynStepper | src/components/DynStepper | DA | DA | DA | DA | DA | DA | NE | DA | OK | Comprehensive coverage for navigation, callbacks, imperative API, and variants. | Stories include horizontal/vertical, numbered, progress, and custom icons. | Uses tablist/tab semantics with aria-current; optional badges rely on text. |
| DynTable | src/components/DynTable | DA | DA | DA | DA | DA | DA | DA | DA | OK | Large suite for selection, sorting, pagination, and render overrides. | Storybook walks through pagination, selection, density, and custom cells. | Table markup uses div wrappers; checkboxes provide aria labels. |
| DynTabs | src/components/DynTabs | DA | DA | DA | DA | DA | DA | DA | DA | OK | Thorough interactions for tab switching, closing, addable tabs, and keyboard. | Stories for default, variants, icons/badges, and async panels. | Implements tablist/tab roles with aria-selected management. |
| DynToolbar | src/components/DynToolbar | DA | DA | DA | DA | DA | DA | DA | DA | OK | Wide coverage for overflow, dropdowns, search, and imperative ref but use jest mocks. | Stories feature responsive/overflow, variants, and custom items. | Toolbar wrapper has role="toolbar"; overflow menu buttons need additional labelling. |
| DynTreeView | src/components/DynTreeView | DA | DA | DA | DA | DA | DA | DA | DA | OK | Covers rendering, expand/select/check flows with vitest spies. | Stories display selectable, checkable, searchable tree scenarios. | Renders tree as nested lists with toggle buttons; icons fallback to emoji. |
| ThemeSwitcher | src/components/ThemeSwitcher | DA | NE | NE | DA | DA | DA | NE | NE | OK | Smoke test only asserts export. | Storybook offers theme toggles by size/rounding. | Implements tablist/tab roles with aria-selected per theme button. |

## Summary
- Total components: **26**
- Pilot (Faza B): DynChart
- Batch 1: DynAvatar, DynBadge, DynBox, DynBreadcrumb, DynButton
- Batch 2: DynCheckbox, DynContainer, DynDatePicker, DynDivider, DynFieldContainer
- Batch 3: DynGauge, DynGrid, DynIcon, DynInput, DynLabel
- Batch 4: DynListView, DynMenu, DynPage, DynSelect, DynStepper
- Batch 5: DynTable, DynTabs, DynToolbar, DynTreeView, ThemeSwitcher

## Risk analysis
- DynButton and DynIcon remain placeholder implementations that do not deliver the documented props, so consumers cannot exercise real behaviors yet.
- DynContainer and DynGauge diverge from their specs (missing sizing/a11y wiring), which will keep automated suites red until addressed.
- DynFieldContainer’s test suite imports DynContainer by mistake, leaving the component effectively untested.
- Several suites (DynListView, DynMenu, DynToolbar) still depend on `jest` globals and will fail in Vitest unless shims or rewrites land.
- DynLabel and DynPage need accessibility fixes (label semantics and landmark roles) to meet the intended guidance.

## Commands
- `npm run test`
- `npm run build-storybook`
