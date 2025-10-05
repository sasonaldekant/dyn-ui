# DYN UI Component Type Standards

## Overview

Ovaj dokument definiše standardizovane konvencije za tipove komponenti u DYN UI React biblioteci. Cilj je osiguravanje konzistentnosti, lakšeg održavanja i bolju developer experience kroz ceo kod.

## BaseComponentProps - Osnova za sve komponente

Sve DYN UI komponente **MORAJU** da naslede od `BaseComponentProps` interfejsa:

```typescript
import { BaseComponentProps } from '../../types';

export interface DynComponentNameProps extends BaseComponentProps {
  // component-specific props here
}
```

`BaseComponentProps` sadrži:

- `id?: string` - Jedinstveni identifikator
- `className?: string` - Dodatne CSS klase
- `'data-testid'?: string` - Test identifikator
- `children?: ReactNode` - Child elementi

## Naming Conventions

### Component Props Interface

- **Format**: `DynComponentNameProps`
- **Lokacija**: `ComponentName.types.ts`
- **Export**: Eksportuje se iz `types/index.ts` i `components/index.ts`

### Supporting Types

- **Enum types**: `ComponentProperty` (bez Dyn prefiksa)
  - Primer: `ButtonVariant`, `AvatarSize`, `BadgeStatus`
- **Utility types**: `ComponentUtilityName`
  - Primer: `TableAction`, `ChartDataPoint`, `GaugeRange`

### Constants

- **Format**: `COMPONENT_CONSTANTS` (UPPER_SNAKE_CASE)
- **Primer**: `AVATAR_SIZES`, `DYN_COLOR_PALETTE`, `BUTTON_KINDS`

## Type Organization

### Per-Component Types Location

```src/types/
├── theme.ts              # BaseComponentProps + theme types
├── badge.types.ts        # DynBadgeProps + enums
├── avatar.types.ts       # DynAvatarProps + enums
├── field.types.ts        # Form components types
├── layout.types.ts       # Layout components types
└── index.ts             # Centralized export
```

### Complex Component Types Location

```src/components/DynComplexComponent/
└── DynComplexComponent.types.ts  # Complex component specific types
```

## Import Patterns

### From Components

```typescript
// ✅ Correct - Import from centralized types
import { BaseComponentProps } from '../../types';
import { DynBadgeProps } from '../../types/badge.types';

// ❌ Wrong - Direct relative imports
import { BaseComponentProps } from '../types';
import { BaseComponentProps } from '../../../types/theme';
```

### From Main Index

```typescript
// ✅ For consumers of the library
import { DynBadge, DynBadgeProps } from '@dyn-ui/react';

// ✅ For internal development
import { DynBadgeProps } from '../types';
```

## Props Standardization Rules

### 1. Base Props (naslediti od BaseComponentProps)

- `id` - uvek opcionalno
- `className` - uvek opcionalno
- `'data-testid'` - uvek opcionalno
- `children` - opcionalno ili required, zavisi od komponente

### 2. Common Props Pattern

```typescript
export interface DynComponentProps extends BaseComponentProps {
  // Size (ako podržava)
  size?: ComponentSize;  // 'small' | 'medium' | 'large'

  // Variant/Style (ako podržava)
  variant?: ComponentVariant;  // 'primary' | 'secondary' | etc.

  // State props
  disabled?: boolean;
  loading?: boolean;

  // Event handlers (prefiks "on")
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (value: string) => void;

  // Content props
  label?: string;
  placeholder?: string;
  value?: string;

  // Styling props (minimalno, većina ide kroz className)
  color?: string;
}
```

### 3. Forbidden Props

Ovi props NE SMU biti u component interfejsima jer su pokriveni od BaseComponentProps:

- `className` - nasledi od BaseComponentProps
- `children` - nasledi od BaseComponentProps (osim ako nije specifično tipizovan)
- `id` - nasledi od BaseComponentProps
- `data-testid` - nasledi od BaseComponentProps

## Export Standards

### Component Level Export (ComponentName/index.ts)

```typescript
// Unified exports for DynComponentName component
export { DynComponentName } from './DynComponentName';
export type { DynComponentNameProps } from './DynComponentName.types';
```

### Library Level Export (components/index.ts)

```typescript
// Component export
export { DynComponentName } from './DynComponentName';

// Type export
export type { DynComponentNameProps } from './DynComponentName/DynComponentName.types';
// OR for centralized types:
export type { DynComponentNameProps } from '../types/componentname.types';
```

## Validation Rules

### TypeScript Strict Mode

- Svi tipovi moraju da budu eksplicitni
- Koristiti `unknown` umesto `any`
- Union tipovi umesto string literals gde god je moguće

### Documentation Requirements

- Svaki prop mora imati JSDoc komentar
- Opciona props moraju imati jasno objašnjenje default vrednošću
- Complex tipovi moraju imati primere korišćenja

### Testing Requirements

- Tipovi moraju da budu testirani u integration testovima
- Props moraju da se testiraju za type safety
- Default vrednosti moraju da budu testirane

## Migration Guide

Za postojeće komponente koje ne prate ove standarde:

1. **Dodaj BaseComponentProps nasledstvu**:

   ```diff
   - export interface DynComponentProps {
   + export interface DynComponentProps extends BaseComponentProps {
   ```

2. **Ukloni duplikatne props**:

   ```diff
   export interface DynComponentProps extends BaseComponentProps {
   -   className?: string;
   -   children?: React.ReactNode;
       // keep only component-specific props
   }
   ```

3. **Standardizuj import putanje**:

   ```diff
   - import { BaseComponentProps } from '../types';
   + import { BaseComponentProps } from '../../types';
   ```

4. **Dodaj dokumentaciju**:

   ```typescript
   export interface DynComponentProps extends BaseComponentProps {
     /** Clear description of what this prop does */
     variant?: 'primary' | 'secondary';
   }
   ```

Ovaj pristup osigurava:

- ✅ Konzistentnost kroz sve komponente
- ✅ Lakše održavanje tipova
- ✅ Bolje IntelliSense/autocomplete
- ✅ Standardizovane testove
- ✅ Jednoznačnu hijerarhiju tipova
