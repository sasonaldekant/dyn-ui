# Plan korekcija za dyn-ui projekat

## Faza 1: Čišćenje tehnološkog steka

### 1. Uklanjanje SCSS zavisnosti

```bash
# Ukloniti iz package.json
npm uninstall sass

# Ažurirati rollup.config.ts da ukloni sass procesiranje
# Ažurirati vite.config.ts da ukloni sass plugin
```

### 2. Uklanjanje Jest ostataka

```bash
# Proveriti da li postoje zaostali Jest fajlovi
find . -name "*jest*" -type f
find . -name "*.spec.js" -type f

# Ukloniti ako postoje
```

### 3. CSS Modules standardizacija

- Konvertovati sve `.scss` fajlove u `.module.css`
- Koristiti CSS custom properties (`--dyn-*`) umesto SCSS varijabli
- Ukloniti SCSS mixins i zameniti CSS rešenjima

## Faza 2: Import/Export standardizacija

### Pattern za svaku komponentu

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.module.css
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── index.ts
```

### index.ts standardizacija

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

### Glavne index.ts fajl

```typescript
// src/components/index.ts
export * from './DynAvatar';
export * from './DynButton';
// ... ostale komponente
```

## Faza 3: Testing standardizacija

### Svaka komponenta mora imati

1. **Unit testovi** - osnovni funkcionalni testovi
2. **Accessibility testovi** - axe-core integracija
3. **Interaction testovi** - user event simulacije
4. **Snapshot testovi** - za UI regresije
5. **Edge case testovi** - granične situacije

### Template za testove (based on DynAvatar)

```typescript
describe('ComponentName', () => {
  describe('Basic Functionality', () => {
    // Core features tests
  });
  
  describe('Accessibility', () => {
    // WCAG compliance tests
  });
  
  describe('Interactive Behavior', () => {
    // User interactions
  });
  
  describe('Variants and States', () => {
    // Different configurations
  });
  
  describe('Props and Customization', () => {
    // API surface tests
  });
});
```

## Faza 4: Design Tokens standardizacija

### CSS pattern za sve komponente

```css
.component {
  /* Uvek koristiti --dyn-* tokens sa fallbacks */
  background-color: var(--dyn-color-surface, var(--color-surface, #ffffff));
  padding: var(--dyn-spacing-md, 0.75rem);
  border-radius: var(--dyn-border-radius-md, 0.5rem);
  
  /* Podrška za theming */
  @media (prefers-color-scheme: dark) {
    background-color: var(--dyn-color-surface-dark, var(--color-surface-dark, #1f2937));
  }
}
```

## Faza 5: Storybook standardizacija

### Pattern za stories

```typescript
export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: { description: { component: 'Comprehensive description' } }
  }
};

export const Default = {};
export const Variants = {};
export const Interactive = {};
export const Accessibility = {};
export const DarkTheme = {};
```

## Git workflow za komitovanje

### Commit struktura

```bash
# Za svaku komponentu posebno
git add src/components/DynButton/
git commit -m "feat(DynButton): standardize to gold standard compliance
- Remove SCSS dependencies
- Implement CSS Modules with design tokens
- Add comprehensive test coverage
- Standardize import/export pattern
- Add Storybook documentation"

# Za cleanup
git commit -m "chore: remove Jest and SCSS dependencies
- Remove sass from package.json
- Update build configuration
- Clean up obsolete config files"

# Za tooling updates
git commit -m "build: update Vitest and CSS Modules configuration
- Optimize vite.config.ts for CSS Modules
- Update rollup config to exclude SCSS processing
- Ensure consistent build pipeline"
```

## Quality Gates pre komitovanja

### Obavezne provere

- [ ] `pnpm exec vitest ComponentName --run` passes 100%
- [ ] `pnpm exec axe-core ComponentName` reports 0 violations  
- [ ] `pnpm run type-check` passes without errors
- [ ] Storybook renders all stories without console errors
- [ ] Component maintains backward compatibility
- [ ] No hardcoded CSS values (only design tokens)
- [ ] Proper import/export standardization

## Prioritet implementacije

### Priority 1 (Critical)

1. DynButton - core interaction component
2. DynInput - form foundation
3. DynBox - layout primitive

### Priority 2 (High)

1. DynModal - complex interaction component
2. DynTabs - state management component
3. DynStepper - multi-step component

### Priority 3 (Medium)

1. All remaining components
2. Advanced theming support
3. Performance optimizations

## Očekivani rezultat

Nakon implementacije, svaka komponenta će:

- Biti 100% testirana sa Vitest
- Koristiti isključivo CSS Modules sa design tokens
- Imati standardizovane import/export patterns
- Biti potpuno dokumentovana u Storybook
- Poštovati accessibility standarde
- Biti optimizovana za performance

Ovaj pristup garantuje enterprise-grade kvalitet komponenti spremnih za produkciju.
