# 🎯 DYN-UI CODEX PROMPT - DynDivider (Minor Refactoring)

## 🚀 AI ZADATAK: Dopuni DynDivider komponent da bude 100% usklađen sa standardima

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim simple komponentima

**NAPOMENA**: DynDivider je već **80% implementiran** prema standardima! Potrebne su samo manje dopune.

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynDivider/
├── DynDivider.tsx                # ✅ Već dobro - manje izmene
├── DynDivider.types.ts           # ✅ Već dobro - bez izmena  
├── DynDivider.module.css         # 🔧 Dodaj dark theme support
├── DynDivider.stories.tsx        # 🔧 Dodaj dark theme i accessibility
├── DynDivider.test.tsx           # 🔧 Dodaj accessibility testove
└── index.ts                      # ✅ Već dobro - bez izmena
```

---

## 🔧 POTREBNE IZMENE:

### 1. CSS MODULE DOPUNE (DynDivider.module.css):

**DODAJ na kraj postojećeg CSS-a:**

```css
/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .colorDefault {
    --dyn-divider-color: var(--dyn-color-neutral-600, rgba(148, 163, 184, 0.3));
    --dyn-divider-text-color: var(--dyn-color-neutral-300, #cbd5e1);
  }

  .label {
    background: var(--dyn-color-neutral-900, #0f172a);
  }
}

/* Focus styles for interactive dividers */
.root:focus-visible {
  outline: var(--dyn-focus-ring-width, 2px) solid var(--dyn-color-focus, #2563eb);
  outline-offset: var(--dyn-focus-ring-offset, 2px);
}

/* Ensure proper contrast in high contrast mode */
@media (prefers-contrast: high) {
  .line {
    border-color: currentColor;
  }
  
  .label {
    border: 1px solid currentColor;
  }
}
```

### 2. REACT COMPONENT MANJE IZMENE (DynDivider.tsx):

**ZAMENI import liniju:**
```typescript
// STARO:
import { cn } from '../../utils/classNames';

// NOVO:
import { cn } from '../../utils/className';
```

**DODAJ support za tabIndex (dodaj posle `data-testid={dataTestId}`:**
```typescript
tabIndex={rest.tabIndex}
```

### 3. TESTING POBOLJŠANJA (DynDivider.test.tsx):

**DODAJ ove testove na postojeće:**

```typescript
// Dodaj import
import { testAccessibility } from '../../test-utils';

// Dodaj u describe blok
describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<DynDivider />);
    await testAccessibility(container);
  });

  it('has proper role and orientation', () => {
    render(<DynDivider direction="vertical" data-testid="vertical-divider" />);
    const divider = screen.getByTestId('vertical-divider');
    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('associates label correctly', () => {
    render(<DynDivider label="Section divider" data-testid="labeled-divider" />);
    const divider = screen.getByTestId('labeled-divider');
    const labelId = divider.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(screen.getByText('Section divider')).toHaveAttribute('id', labelId);
  });

  it('supports keyboard focus when interactive', () => {
    render(<DynDivider tabIndex={0} data-testid="focusable-divider" />);
    const divider = screen.getByTestId('focusable-divider');
    divider.focus();
    expect(divider).toHaveFocus();
  });
});
```

### 4. STORYBOOK POBOLJŠANJA (DynDivider.stories.tsx):

**DODAJ ove stories:**

```typescript
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <DynDivider />
        <DynDivider label="Dark theme section" />
        <DynDivider color="primary" label="Primary in dark" />
        <div style={{ display: 'flex', height: '100px', gap: '2rem' }}>
          <DynDivider direction="vertical" />
          <DynDivider direction="vertical" label="Vertical" />
        </div>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p>Semantic dividers with proper ARIA attributes:</p>
        <DynDivider label="Main Content" />
        <p>Content section 1</p>
        <DynDivider />
        <p>Content section 2</p>
      </div>
      
      <div>
        <p>Interactive divider (focusable):</p>
        <DynDivider 
          label="Collapsible Section" 
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        />
      </div>
      
      <div style={{ display: 'flex', height: '200px' }}>
        <div>Left content</div>
        <DynDivider 
          direction="vertical" 
          label="Vertical separator" 
          aria-label="Separates left and right content"
        />
        <div>Right content</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples demonstrating accessibility features and ARIA attributes.'
      }
    }
  }
};

export const HighContrast: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ 
      padding: '2rem', 
      background: '#000', 
      color: '#fff',
      filter: 'contrast(200%)'  
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <DynDivider label="High contrast mode" />
        <DynDivider color="primary" label="Primary color" />
        <DynDivider lineStyle="dashed" label="Dashed style" />
      </div>
    </div>
  ),
};
```

---

## ✅ DELIVERABLE CHECKLIST:

**Postojeći kod je već dobar za:**
- [x] CSS design tokens implementirani
- [x] Accessibility role="separator" i aria-orientation  
- [x] forwardRef pattern
- [x] TypeScript tipovi
- [x] Responsive design
- [x] All variants (direction, thickness, color, etc.)

**Potrebno dodati:**
- [ ] Dark theme CSS support
- [ ] Focus styles za interactive mode
- [ ] High contrast improvements  
- [ ] Accessibility testovi
- [ ] Dark theme Storybook stories
- [ ] Accessibility Storybook examples
- [ ] tabIndex support za interactivity

---

## 🎯 SUCCESS CRITERIA:

✅ **Design Tokens**: 100% - već implementirano  
✅ **Accessibility**: 95% → 100% sa accessibility testovima  
✅ **Responsive**: 100% - već implementirano  
✅ **Dark Theme**: 70% → 100% sa CSS dopunama  
✅ **Testing**: 80% → 95% sa accessibility testovima  
✅ **Storybook**: 85% → 100% sa dark theme i a11y examples  

**REZULTAT**: Potpuno usklađen DynDivider sa comprehensive accessibility i theming podrška!