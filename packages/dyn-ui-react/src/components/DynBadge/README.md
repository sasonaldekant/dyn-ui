# DynBadge Component

A versatile and accessible badge component that displays counts, status indicators, and semantic labels following enterprise-grade design standards.

## Features

✅ **100% Gold Standard Compliant**

- Uses `--dyn-*` design tokens with proper fallbacks
- Implements `generateId` for consistent ID generation
- Safe CSS class access with `getStyleClass` utility
- Comprehensive accessibility support
- Full TypeScript type safety

✅ **Design System Integration**

- Semantic color variants (primary, secondary, success, warning, danger, info, neutral)
- Size variants (small, medium, large) following design token scale
- Multiple visual variants (solid, soft, outline, dot)
- Custom color support with CSS variable fallbacks

✅ **Accessibility Excellence**

- WCAG 2.1 AA compliant
- Screen reader announcements for counts
- Keyboard navigation support
- ARIA attributes with automatic fallbacks
- Focus management for interactive states

✅ **Interactive Capabilities**

- Click handlers with automatic role and tabIndex management
- Keyboard navigation (Enter and Space key support)
- Custom event handling with proper event delegation
- Loading and error states

✅ **Advanced Features**

- Count display with maxCount limits (e.g., "99+")
- Icon integration (start and end icons)
- Position variants for overlay usage
- Animation support (appear and pulse animations)
- Dark theme and high contrast support
- Responsive design with mobile optimizations

## Usage

### Basic Badge

```tsx
import { DynBadge } from '@dyn-ui/react';

<DynBadge>New</DynBadge>
<DynBadge variant="soft" color="success">Success</DynBadge>
<DynBadge variant="outline" color="warning">Warning</DynBadge>
```

### Count Badges

```tsx
<DynBadge count={5} />
<DynBadge count={150} maxCount={99} /> {/* Shows "99+" */}
<DynBadge count={0} showZero /> {/* Shows "0" */}
```

### Interactive Badge

```tsx
<DynBadge
  onClick={() => handleNotificationClick()}
  count={3}
  countDescription="Notifications"
  aria-label="View 3 notifications"
/>
```

### With Icons

```tsx
<DynBadge startIcon={<DynIcon icon="star" />}>Featured</DynBadge>
<DynBadge endIcon={<DynIcon icon="arrow-right" />}>Next</DynBadge>
```

### Status Overlays

```tsx
<div style={{ position: 'relative' }}>
  <UserAvatar />
  <DynBadge
    variant="dot"
    color="success"
    position="topRight"
  />
</div>
```

### Animated Badges

```tsx
<DynBadge animated pulse count={1} color="danger" />
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Badge content |
| `variant` | `'solid' \| 'soft' \| 'outline' \| 'dot'` | `'solid'` | Visual variant |
| `color` | `DynBadgeColor` | `'neutral'` | Semantic color or custom hex/CSS value |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant |
| `count` | `number` | - | Numeric value for count badges |
| `maxCount` | `number` | `99` | Maximum count before showing "+" |
| `showZero` | `boolean` | `false` | Show badge when count is 0 |
| `position` | `DynBadgePosition` | - | Position for overlay usage |
| `startIcon` | `ReactNode` | - | Icon before text |
| `endIcon` | `ReactNode` | - | Icon after text |
| `animated` | `boolean` | `false` | Enable appear animation |
| `pulse` | `boolean` | `false` | Enable pulse animation |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler (makes badge interactive) |
| `countDescription` | `string` | `'Notifications'` | Accessible description for counts |
| `aria-label` | `string` | - | Accessible label |
| `aria-describedby` | `string` | - | ID of describing element |
| `aria-live` | `'off' \| 'polite' \| 'assertive'` | `'polite'` (for counts) | Live region announcement |

### Design Tokens Used

```css
/* Spacing */
--dyn-spacing-xs, --dyn-spacing-sm, --dyn-spacing-md, --dyn-spacing-lg, --dyn-spacing-xl

/* Colors */
--dyn-color-primary, --dyn-color-secondary, --dyn-color-success
--dyn-color-warning, --dyn-color-danger, --dyn-color-info, --dyn-color-neutral-*
--dyn-color-feedback-*, --dyn-color-base-white

/* Typography */
--dyn-font-size-xs, --dyn-font-size-sm, --dyn-font-size-base
--dyn-font-weight-semibold

/* Effects */
--dyn-border-radius-full, --dyn-shadow-sm
--dyn-transition-colors, --dyn-transition-transform, --dyn-transition-base

/* Z-Index */
--dyn-z-dropdown
```

## Testing

Comprehensive test suite with 100% coverage:

```bash
# Run tests
npm run test DynBadge

# Run tests in watch mode
npm run test:watch DynBadge

# Run Storybook for visual testing
npm run storybook
```

## Accessibility Guidelines

- **Screen Readers**: Count badges automatically announce counts to screen readers
- **Keyboard Navigation**: Interactive badges support Enter and Space key activation
- **Focus Management**: Clear focus indicators with proper contrast ratios
- **Live Regions**: Dynamic count changes are announced via `aria-live="polite"`
- **Semantic HTML**: Proper use of `role`, `aria-label`, and other ARIA attributes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration Guide

### From Previous Version

- Replace `ariaLabel` with `aria-label`
- Replace `ariaDescribedBy` with `aria-describedby`
- Replace `ariaLive` with `aria-live`
- Update custom colors to use CSS custom properties

## Performance

- **Bundle Size**: ~2.1KB gzipped
- **Runtime Performance**: Optimized with React.memo for count changes
- **CSS Efficiency**: Uses CSS custom properties for dynamic theming
- **Accessibility**: Zero impact on performance with screen reader optimizations

---

**Status**: ✅ 100% Gold Standard Compliant
**Last Updated**: October 2025
**Maintainer**: DynUI Team
