# 🎯 DYN-UI CODEX PROMPT 01 - DynButton

## 🚀 AI ZADATAK: Refaktoriši DynButton komponent za responsive design i enhanced accessibility

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim form komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynButton/
├── DynButton.tsx
├── DynButton.types.ts  
├── DynButton.module.css
├── DynButton.stories.tsx
├── DynButton.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynButton.module.css):

**NAPOMENA**: Trenutna implementacija već koristi CSS custom properties! Trebaju samo dodaci:

```css
/* DODATI responsive design - na kraju fajla */
/* Responsive design */
@media (max-width: 767px) {
  .root {
    min-height: 44px; /* Touch target minimum */
    font-size: var(--dyn-font-size-base, 1rem); /* Ensure readability */
    --dyn-button-padding-y: 0.625rem;
    --dyn-button-padding-x: 1rem;
  }
  
  .sizeSmall {
    min-height: 40px;
    --dyn-button-padding-y: 0.5rem;
    --dyn-button-padding-x: 0.875rem;
  }
  
  .sizeLarge {
    min-height: 52px;
    --dyn-button-padding-y: 0.875rem;
    --dyn-button-padding-x: 1.75rem;
  }
  
  .iconOnly {
    min-width: 44px;
    width: 44px;
    --dyn-button-padding-x: 0;
    --dyn-button-padding-y: 0;
  }
  
  /* Mobile-specific utilities */
  .hideOnMobile {
    display: none !important;
  }
  
  .iconOnlyOnMobile .label {
    display: none !important;
  }
  
  .iconOnlyOnMobile {
    width: 44px;
    min-width: 44px;
    --dyn-button-padding-x: 0;
    --dyn-button-padding-y: 0;
  }
}

/* DODATI dark theme support - na kraju fajla */
@media (prefers-color-scheme: dark) {
  .kindPrimary {
    --dyn-button-bg: var(--dyn-color-primary-dark, #3b82f6);
    --dyn-button-border: var(--dyn-color-primary-dark, #3b82f6);
    --dyn-button-bg-hover: var(--dyn-color-primary-dark-hover, #2563eb);
    --dyn-button-border-hover: var(--dyn-color-primary-dark-hover, #2563eb);
    --dyn-button-bg-active: var(--dyn-color-primary-dark-active, #1d4ed8);
    --dyn-button-border-active: var(--dyn-color-primary-dark-active, #1d4ed8);
  }
  
  .kindSecondary {
    --dyn-button-border: var(--dyn-color-primary-dark, #3b82f6);
    --dyn-button-color: var(--dyn-color-primary-dark, #3b82f6);
    --dyn-button-color-hover: var(--dyn-color-primary-dark-hover, #2563eb);
    --dyn-button-color-active: var(--dyn-color-primary-dark-active, #1d4ed8);
    --dyn-button-border-hover: var(--dyn-color-primary-dark-hover, #2563eb);
    --dyn-button-border-active: var(--dyn-color-primary-dark-active, #1d4ed8);
  }
  
  .kindTertiary {
    --dyn-button-color: var(--dyn-color-primary-dark, #3b82f6);
    --dyn-button-color-hover: var(--dyn-color-primary-dark-hover, #2563eb);
    --dyn-button-color-active: var(--dyn-color-primary-dark-active, #1d4ed8);
  }
  
  .danger.kindPrimary {
    --dyn-button-bg: var(--dyn-color-danger-dark, #ef4444);
    --dyn-button-border: var(--dyn-color-danger-dark, #ef4444);
    --dyn-button-bg-hover: var(--dyn-color-danger-dark-hover, #dc2626);
    --dyn-button-border-hover: var(--dyn-color-danger-dark-hover, #dc2626);
    --dyn-button-bg-active: var(--dyn-color-danger-dark-active, #b91c1c);
    --dyn-button-border-active: var(--dyn-color-danger-dark-active, #b91c1c);
  }
  
  .danger.kindSecondary {
    --dyn-button-border: var(--dyn-color-danger-dark, #ef4444);
    --dyn-button-color: var(--dyn-color-danger-dark, #ef4444);
    --dyn-button-color-hover: var(--dyn-color-danger-dark-hover, #dc2626);
    --dyn-button-color-active: var(--dyn-color-danger-dark-active, #b91c1c);
    --dyn-button-border-hover: var(--dyn-color-danger-dark-hover, #dc2626);
    --dyn-button-border-active: var(--dyn-color-danger-dark-active, #b91c1c);
  }
  
  .danger.kindTertiary {
    --dyn-button-color: var(--dyn-color-danger-dark, #ef4444);
    --dyn-button-color-hover: var(--dyn-color-danger-dark-hover, #dc2626);
    --dyn-button-color-active: var(--dyn-color-danger-dark-active, #b91c1c);
  }
}

/* DODATI screen reader loading text */
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynButton.types.ts):

**DODATI nove props u postojeći DynButtonProps interface:**

```typescript
export interface DynButtonProps
  extends BaseComponentProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | 'type'
      | 'onBlur'
      | 'onClick'
      | 'children'
      | 'aria-label'
      | 'aria-expanded'
      | keyof BaseComponentProps
    > {
  /** Button text label */
  label?: string;

  /** Icon - can be string (icon name) or React node */
  icon?: string | ReactNode;

  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';

  /** Loading state indicator */
  loading?: boolean;

  /** Danger/destructive state styling */
  danger?: boolean;

  /** Button kind/variant */
  kind?: DynButtonKind;

  /** Disabled state */
  disabled?: boolean;

  /** Accessible label override */
  ariaLabel?: string;

  /** Accessible expanded state */
  ariaExpanded?: boolean;

  /** Button size */
  size?: DynButtonSize;

  /** Expand button to full width */
  fullWidth?: boolean;

  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLButtonElement>;

  /** Click event handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  // DODATI nove responsive/accessibility props:
  
  /** Hide button on mobile devices */
  hideOnMobile?: boolean;
  
  /** Show only icon on mobile (hide label) */
  iconOnlyOnMobile?: boolean;
  
  /** Loading text for screen readers */
  loadingText?: string;
  
  /** Enhanced ARIA support */
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-pressed'?: boolean;
}
```

---

## ⚛️ REACT COMPONENT IMPROVEMENTS (DynButton.tsx):

**DODATI na početak komponente posle importa:**

```typescript
// Default loading text for screen readers
const DEFAULT_LOADING_TEXT = 'Loading...';
```

**MODIFIKOVATI props destructuring da uključi nove props:**

```typescript
const DynButtonComponent = (
  props: DynButtonProps,
  ref: ForwardedRef<DynButtonRef>
) => {
  const {
    label,
    icon,
    type = DYN_BUTTON_DEFAULT_PROPS.type,
    kind = DYN_BUTTON_DEFAULT_PROPS.kind,
    size = DYN_BUTTON_DEFAULT_PROPS.size,
    loading = DYN_BUTTON_DEFAULT_PROPS.loading,
    danger = DYN_BUTTON_DEFAULT_PROPS.danger,
    disabled = DYN_BUTTON_DEFAULT_PROPS.disabled,
    fullWidth = DYN_BUTTON_DEFAULT_PROPS.fullWidth,
    ariaLabel,
    ariaExpanded,
    // DODATI nove props:
    hideOnMobile = false,
    iconOnlyOnMobile = false,
    loadingText = DEFAULT_LOADING_TEXT,
    'aria-describedby': ariaDescribedBy,
    'aria-controls': ariaControls,
    'aria-pressed': ariaPressed,
    onBlur,
    onClick,
    children,
    className,
    id,
    'data-testid': dataTestId,
    ...rest
  } = props as DynButtonComponentProps;
```

**MODIFIKOVATI buttonClassName da uključi responsive classes:**

```typescript
const buttonClassName = cn(
  styles.root,
  KIND_CLASS_MAP[kind] ?? KIND_CLASS_MAP.primary,
  SIZE_CLASS_MAP[size] ?? SIZE_CLASS_MAP.medium,
  {
    [styles.danger!]: danger,
    [styles.loading!]: loading,
    [styles.iconOnly!]: isIconOnly,
    [styles.fullWidth!]: fullWidth,
    // DODATI nove classes:
    [styles.hideOnMobile!]: hideOnMobile,
    [styles.iconOnlyOnMobile!]: iconOnlyOnMobile,
  },
  className
);
```

**DODATI enhanced keyboard handling - zameniti postojeći handleClick:**

```typescript
const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
  if (isDisabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  onClick?.(event);
};

// DODATI keyboard handling
const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = event => {
  // Enhanced keyboard support - Space key for button activation
  if (event.key === ' ' && !isDisabled) {
    event.preventDefault();
    onClick?.(event as any);
  }
};
```

**MODIFIKOVATI button element da uključi nova ARIA attributa:**

```typescript
return (
  <button
    ref={ref}
    id={id}
    type={type}
    className={buttonClassName}
    data-testid={dataTestId ?? 'dyn-button'}
    aria-label={computedAriaLabel}
    aria-expanded={ariaExpanded}
    aria-busy={loading || undefined}
    aria-disabled={isDisabled || undefined}
    // DODATI nova ARIA attributa:
    aria-describedby={ariaDescribedBy}
    aria-controls={ariaControls}
    aria-pressed={ariaPressed}
    disabled={isDisabled}
    onClick={handleClick}
    onBlur={handleBlur}
    // DODATI keyboard handling:
    onKeyDown={handleKeyDown}
    {...rest}
  >
    <span className={styles.content}>
      {iconElement}
      {labelElement}
      {childrenContent}
    </span>
    {loading ? (
      <>
        <span className={styles.spinner} aria-hidden="true" />
        {/* DODATI screen reader loading announcement */}
        <span className={styles.srOnly} aria-live="polite">
          {loadingText}
        </span>
      </>
    ) : null}
  </button>
);
```

**AŽURIRATI DynButtonDefaultProps:**

```typescript
export const DYN_BUTTON_DEFAULT_PROPS: DynButtonDefaultProps = {
  type: 'button',
  kind: 'primary',
  size: 'medium',
  loading: false,
  danger: false,
  disabled: false,
  fullWidth: false,
  // DODATI nove defaults:
  hideOnMobile: false,
  iconOnlyOnMobile: false,
  loadingText: DEFAULT_LOADING_TEXT,
};
```

---

## 🧪 TESTING ENHANCEMENTS (DynButton.test.tsx):

**DODATI nove testove u postojeći test fajl:**

```typescript
// DODATI u accessibility describe blok:
describe('Enhanced Accessibility', () => {
  it('supports aria-describedby', () => {
    render(<DynButton label="Test" aria-describedby="description" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'description');
  });

  it('supports aria-controls', () => {
    render(<DynButton label="Toggle" aria-controls="menu" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'menu');
  });

  it('supports aria-pressed for toggle buttons', () => {
    render(<DynButton label="Toggle" aria-pressed={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('announces custom loading text to screen readers', () => {
    render(<DynButton label="Submit" loading loadingText="Submitting form..." />);
    expect(screen.getByText('Submitting form...')).toBeInTheDocument();
  });

  it('handles keyboard Space key activation', async () => {
    const handleClick = vi.fn();
    render(<DynButton label="Test" onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await userEvent.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// DODATI responsive tests:
describe('Responsive Behavior', () => {
  it('applies hideOnMobile class', () => {
    render(<DynButton label="Desktop only" hideOnMobile />);
    expect(screen.getByRole('button')).toHaveClass('hideOnMobile');
  });

  it('applies iconOnlyOnMobile class', () => {
    render(<DynButton label="Settings" icon="settings" iconOnlyOnMobile />);
    expect(screen.getByRole('button')).toHaveClass('iconOnlyOnMobile');
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynButton.stories.tsx):

**DODATI nove stories:**

```typescript
// DODATI na kraj fajla:

export const ResponsiveDesign: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p>Resize window to test responsive behavior:</p>
      <DynButton label="Hidden on mobile" hideOnMobile />
      <DynButton 
        label="Settings" 
        icon="settings" 
        iconOnlyOnMobile 
      />
      <DynButton 
        label="Full text on desktop, icon on mobile" 
        icon="download"
        iconOnlyOnMobile
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <DynButton label="Primary Dark" kind="primary" />
        <DynButton label="Secondary Dark" kind="secondary" />
        <DynButton label="Tertiary Dark" kind="tertiary" />
        <DynButton label="Danger Dark" kind="primary" danger />
      </div>
    </div>
  ),
};

export const EnhancedAccessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynButton 
        label="Toggle Menu"
        aria-expanded={false}
        aria-controls="main-menu"
      />
      <DynButton 
        label="Save Draft"
        aria-describedby="save-help"
      />
      <p id="save-help">Saves your work without publishing</p>
      <DynButton 
        label="Favorite"
        aria-pressed={false}
        icon="heart"
      />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton label="Default loading" loading />
      <DynButton 
        label="Custom loading text" 
        loading 
        loadingText="Saving your changes..."
      />
      <DynButton 
        label="Form submission" 
        loading 
        loadingText="Submitting form data..."
        kind="primary"
      />
    </div>
  ),
};
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] **Responsive Design**: Mobile-first breakpoints sa 44px touch targets
- [ ] **Dark Theme**: `@media (prefers-color-scheme: dark)` podrška dodana
- [ ] **Enhanced ARIA**: aria-describedby, aria-controls, aria-pressed podrška
- [ ] **Keyboard Navigation**: Space key handling za button aktivaciju
- [ ] **Screen Reader**: Loading state announcements sa custom text
- [ ] **Mobile Utilities**: hideOnMobile i iconOnlyOnMobile functionality
- [ ] **Testing**: Novi testovi za accessibility i responsive behavior
- [ ] **Storybook**: Dark theme, responsive, enhanced accessibility examples
- [ ] **TypeScript**: Novi props dodani u interface
- [ ] **CSS Classes**: Novi responsive i utility classes

---

## 🎯 SUCCESS CRITERIA:

✅ **Accessibility**: Enhanced ARIA support i screen reader announcements  
✅ **Responsive**: Mobile-first sa proper touch targets (44px minimum)  
✅ **Dark Theme**: Kompletna podrška za dark mode  
✅ **Keyboard**: Space key activation functionality  
✅ **Testing**: Comprehensive coverage novih funkcionalnosti  
✅ **Storybook**: Praktični primeri svih novih features

**NAPOMENA**: Trenutna implementacija je već veoma dobra - trebaju samo ovi dodaci za potpunu usklađenost sa standardima!