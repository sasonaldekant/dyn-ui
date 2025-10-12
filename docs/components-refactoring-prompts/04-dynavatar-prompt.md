# 🎯 DYN-UI CODEX PROMPT 04 - DynAvatar

## 🚀 AI ZADATAK: Refaktoriši DynAvatar komponent za potpunu compliance sa design tokens i accessibility

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim simple komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU

```
packages/dyn-ui-react/src/components/DynAvatar/
├── DynAvatar.tsx
├── DynAvatar.types.ts  
├── DynAvatar.module.css
├── DynAvatar.stories.tsx
├── DynAvatar.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynAvatar.module.css)

**TRENUTNO STANJE**: Mešavina design tokens i hard-coded vrednosti
**POTREBNO**: Potpuna standardizacija sa design tokens

```css
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--dyn-border-radius-full);
  overflow: hidden;
  background-color: var(--dyn-color-neutral-100);
  color: var(--dyn-color-text-primary);
  font-family: var(--dyn-font-family-primary);
  font-weight: var(--dyn-font-weight-semibold);
  user-select: none;
  transition: var(--dyn-transition-fast);
  border: var(--dyn-border-width) solid var(--dyn-color-border);
}

/* Size variants using design tokens */
.avatar--small {
  width: var(--dyn-spacing-3xl);
  height: var(--dyn-spacing-3xl);
  font-size: var(--dyn-font-size-sm);
}

.avatar--medium {
  width: var(--dyn-spacing-4xl);
  height: var(--dyn-spacing-4xl);
  font-size: var(--dyn-font-size-base);
}

.avatar--large {
  width: calc(var(--dyn-spacing-4xl) * 1.5);
  height: calc(var(--dyn-spacing-4xl) * 1.5);
  font-size: var(--dyn-font-size-lg);
}

/* Shape variants */
.avatar--square {
  border-radius: var(--dyn-border-radius-md);
}

.avatar--rounded {
  border-radius: var(--dyn-border-radius-lg);
}

/* Interactive states */
.avatar--clickable {
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--dyn-shadow-md);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
  
  &:active {
    transform: scale(0.98);
  }
}

/* Status variants */
.avatar--online {
  &::after {
    content: '';
    position: absolute;
    bottom: 8%;
    right: 8%;
    width: 25%;
    height: 25%;
    background-color: var(--dyn-color-success);
    border: calc(var(--dyn-border-width) * 2) solid var(--dyn-color-bg-primary);
    border-radius: var(--dyn-border-radius-full);
    min-width: 8px;
    min-height: 8px;
  }
}

.avatar--offline {
  &::after {
    content: '';
    position: absolute;
    bottom: 8%;
    right: 8%;
    width: 25%;
    height: 25%;
    background-color: var(--dyn-color-neutral-400);
    border: calc(var(--dyn-border-width) * 2) solid var(--dyn-color-bg-primary);
    border-radius: var(--dyn-border-radius-full);
    min-width: 8px;
    min-height: 8px;
  }
}

.avatar--away {
  &::after {
    content: '';
    position: absolute;
    bottom: 8%;
    right: 8%;
    width: 25%;
    height: 25%;
    background-color: var(--dyn-color-warning);
    border: calc(var(--dyn-border-width) * 2) solid var(--dyn-color-bg-primary);
    border-radius: var(--dyn-border-radius-full);
    min-width: 8px;
    min-height: 8px;
  }
}

.avatar--busy {
  &::after {
    content: '';
    position: absolute;
    bottom: 8%;
    right: 8%;
    width: 25%;
    height: 25%;
    background-color: var(--dyn-color-danger);
    border: calc(var(--dyn-border-width) * 2) solid var(--dyn-color-bg-primary);
    border-radius: var(--dyn-border-radius-full);
    min-width: 8px;
    min-height: 8px;
  }
}

/* Image styles */
.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity var(--dyn-duration-normal) var(--dyn-timing-ease);
}

.avatar__image--loading {
  opacity: 0;
}

.avatar__image--loaded {
  opacity: 1;
}

/* Fallback content */
.avatar__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dyn-color-primary-alpha-10);
  color: var(--dyn-color-primary);
}

.avatar__initials {
  text-transform: uppercase;
  letter-spacing: var(--dyn-letter-spacing-wide);
  font-weight: var(--dyn-font-weight-semibold);
}

.avatar__icon {
  opacity: 0.7;
  font-size: 0.6em;
}

/* Loading shimmer effect */
.avatar--loading .avatar__fallback::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    var(--dyn-color-neutral-0),
    transparent
  );
  animation: shimmer var(--dyn-duration-slow) infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Error state */
.avatar--error .avatar__fallback {
  background-color: var(--dyn-color-neutral-100);
  color: var(--dyn-color-text-disabled);
}

/* Responsive design */
@media (max-width: 767px) {
  .avatar--clickable {
    /* Ensure minimum touch target size */
    min-width: 44px;
    min-height: 44px;
  }
  
  /* Slightly smaller status indicators on mobile */
  .avatar--online::after,
  .avatar--offline::after,
  .avatar--away::after,
  .avatar--busy::after {
    min-width: 6px;
    min-height: 6px;
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .avatar {
    background-color: var(--dyn-color-neutral-800);
    border-color: var(--dyn-color-neutral-700);
  }
  
  .avatar__fallback {
    background-color: var(--dyn-color-neutral-700);
    color: var(--dyn-color-text-primary);
  }
  
  .avatar--error .avatar__fallback {
    background-color: var(--dyn-color-neutral-800);
    color: var(--dyn-color-text-disabled);
  }
  
  /* Dark theme shimmer */
  .avatar--loading .avatar__fallback::after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .avatar {
    border-width: calc(var(--dyn-border-width) * 2);
  }
  
  .avatar--online::after,
  .avatar--offline::after,
  .avatar--away::after,
  .avatar--busy::after {
    border-width: calc(var(--dyn-border-width) * 3);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .avatar,
  .avatar__image,
  .avatar--clickable:hover {
    transition: none;
    transform: none;
    animation: none;
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynAvatar.types.ts)

**ZADATAK**: Standardizuj tipove sa BaseComponentProps

```typescript
import { ImgHTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types/base';

export type DynAvatarSize = ComponentSize;
export type DynAvatarShape = 'circle' | 'square' | 'rounded';
export type DynAvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface DynAvatarProps extends 
  BaseComponentProps<HTMLDivElement>,
  AccessibilityProps {
  
  /** Image source URL */
  src?: string;
  
  /** Alt text for image (also used for initials generation) */
  alt: string;
  
  /** Avatar size */
  size?: DynAvatarSize;
  
  /** Avatar shape */
  shape?: DynAvatarShape;
  
  /** Manual initials override */
  initials?: string;
  
  /** Status indicator */
  status?: DynAvatarStatus;
  
  /** Loading state */
  loading?: boolean;
  
  /** Error state */
  error?: boolean;
  
  /** Click handler (makes avatar interactive) */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Custom fallback content when no image */
  fallback?: ReactNode;
  
  /** Image loading strategy */
  imageLoading?: 'eager' | 'lazy';
  
  /** Custom image props */
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading'>;
}

export interface DynAvatarRef extends HTMLDivElement {}
```

---

## ⚛️ REACT COMPONENT (DynAvatar.tsx)

**ZADATAK**: Refaktoriši za potpunu accessibility i performance

```typescript
import React, { forwardRef, useState, useMemo } from 'react';
import { cn } from '../../utils/className';
import { generateId } from '../../utils/accessibility';
import { DynAvatarProps, DynAvatarRef } from './DynAvatar.types';
import styles from './DynAvatar.module.css';

// Default fallback icon
const DefaultFallbackIcon = () => (
  <svg
    width=\"24\"
    height=\"24\"
    viewBox=\"0 0 24 24\"
    fill=\"none\"
    xmlns=\"http://www.w3.org/2000/svg\"
    aria-hidden=\"true\"
  >
    <path
      d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"
      fill=\"currentColor\"
    />
  </svg>
);

const generateInitials = (name: string): string => {
  return name
    .trim()
    .split(/\\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

export const DynAvatar = forwardRef<DynAvatarRef, DynAvatarProps>(
  (
    {
      src,
      alt,
      size = 'medium',
      shape = 'circle',
      initials,
      status,
      loading = false,
      error = false,
      onClick,
      fallback,
      imageLoading = 'eager',
      imageProps,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [internalId] = useState(() => id || generateId('avatar'));

    const isInteractive = Boolean(onClick);
    
    // Generate initials from alt text or use provided initials
    const displayInitials = useMemo(() => {
      if (initials) return initials.slice(0, 2).toUpperCase();
      if (alt && alt !== 'Avatar') return generateInitials(alt);
      return '';
    }, [initials, alt]);

    // Determine what to show
    const showImage = src && !imageError && imageLoaded;
    const showFallback = !src || imageError || !imageLoaded;

    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageError(false);
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    };

    const avatarClasses = cn(
      styles.avatar,
      styles[`avatar--${size}`],
      styles[`avatar--${shape}`],
      {
        [styles['avatar--clickable']]: isInteractive,
        [styles['avatar--loading']]: loading || (src && !imageLoaded && !imageError),
        [styles['avatar--error']]: error || imageError,
        [styles[`avatar--${status}`]]: status,
      },
      className
    );

    // Accessibility props
    const accessibilityProps = {
      id: internalId,
      role: isInteractive ? 'button' : 'img',
      tabIndex: isInteractive ? 0 : undefined,
      'aria-label': ariaLabel || (isInteractive ? `Avatar for ${alt}` : alt),
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId || 'dyn-avatar',
    };

    return (
      <div
        ref={ref}
        className={avatarClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...accessibilityProps}
        {...rest}
      >
        {/* Image */}
        {src && (
          <img
            src={src}
            alt={showImage ? alt : ''}
            loading={imageLoading}
            className={cn(
              styles.avatar__image,
              {
                [styles['avatar__image--loading']]: !imageLoaded,
                [styles['avatar__image--loaded']]: imageLoaded,
              }
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            {...imageProps}
          />
        )}

        {/* Fallback content */}
        {showFallback && (
          <div 
            className={styles.avatar__fallback}
            aria-hidden={showImage ? 'true' : undefined}
          >
            {fallback || (
              displayInitials ? (
                <span className={styles.avatar__initials}>
                  {displayInitials}
                </span>
              ) : (
                <span className={styles.avatar__icon}>
                  <DefaultFallbackIcon />
                </span>
              )
            )}
          </div>
        )}

        {/* Loading announcement for screen readers */}
        {(loading || (src && !imageLoaded && !imageError)) && (
          <span className=\"dyn-sr-only\" aria-live=\"polite\">
            Loading avatar
          </span>
        )}
      </div>
    );
  }
);

DynAvatar.displayName = 'DynAvatar';
```

---

## 🧪 TESTING ENHANCEMENTS (DynAvatar.test.tsx)

**ZADATAK**: Dodaj accessibility testove i comprehensive coverage

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynAvatar } from './DynAvatar';

describe('DynAvatar', () => {
  describe('Basic Functionality', () => {
    it('renders with initials when no image provided', () => {
      render(<DynAvatar alt=\"John Doe\" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
    });

    it('renders with custom initials', () => {
      render(<DynAvatar alt=\"Test\" initials=\"AB\" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('renders image when src provided', async () => {
      const mockSrc = 'https://example.com/avatar.jpg';
      render(<DynAvatar src={mockSrc} alt=\"User Avatar\" />);
      
      const img = screen.getByRole('img', { hidden: true });
      expect(img).toHaveAttribute('src', mockSrc);
      expect(img).toHaveAttribute('alt', '');
      
      // Simulate image load
      fireEvent.load(img);
      
      await waitFor(() => {
        expect(img).toHaveClass('avatar__image--loaded');
      });
    });

    it('falls back to initials on image error', async () => {
      render(<DynAvatar src=\"invalid-url.jpg\" alt=\"John Doe\" />);
      
      const img = screen.getByRole('img', { hidden: true });
      fireEvent.error(img);
      
      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynAvatar alt=\"Accessible avatar\" />);
      await testAccessibility(container);
    });

    it('has proper role when non-interactive', () => {
      render(<DynAvatar alt=\"Profile picture\" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Profile picture');
    });

    it('has proper role when interactive', () => {
      render(<DynAvatar alt=\"Profile picture\" onClick={() => {}} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Avatar for Profile picture');
    });

    it('supports custom aria-label', () => {
      render(<DynAvatar alt=\"Test\" aria-label=\"Custom avatar label\" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Custom avatar label');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <DynAvatar alt=\"User\" aria-describedby=\"avatar-description\" />
          <div id=\"avatar-description\">Online user avatar</div>
        </>
      );
      expect(screen.getByRole('img')).toHaveAttribute('aria-describedby', 'avatar-description');
    });

    it('announces loading state to screen readers', () => {
      render(<DynAvatar src=\"loading.jpg\" alt=\"Loading avatar\" />);
      expect(screen.getByText('Loading avatar')).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt=\"Clickable\" onClick={handleClick} />);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt=\"Keyboard nav\" onClick={handleClick} />);
      
      const avatar = screen.getByRole('button');
      avatar.focus();
      
      // Test Enter key
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test Space key
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has proper focus indicators', () => {
      render(<DynAvatar alt=\"Focusable\" onClick={() => {}} />);
      const avatar = screen.getByRole('button');
      
      avatar.focus();
      expect(avatar).toHaveFocus();
    });

    it('is not interactive without onClick', () => {
      render(<DynAvatar alt=\"Non-interactive\" />);
      const avatar = screen.getByRole('img');
      
      expect(avatar).not.toHaveAttribute('tabIndex');
      expect(avatar).not.toHaveAttribute('role', 'button');
    });
  });

  describe('Sizes and Variants', () => {
    it('applies size classes correctly', () => {
      const { rerender } = render(<DynAvatar alt=\"Test\" size=\"small\" />);
      expect(screen.getByRole('img')).toHaveClass('avatar--small');
      
      rerender(<DynAvatar alt=\"Test\" size=\"large\" />);
      expect(screen.getByRole('img')).toHaveClass('avatar--large');
    });

    it('applies shape classes correctly', () => {
      const { rerender } = render(<DynAvatar alt=\"Test\" shape=\"square\" />);
      expect(screen.getByRole('img')).toHaveClass('avatar--square');
      
      rerender(<DynAvatar alt=\"Test\" shape=\"rounded\" />);
      expect(screen.getByRole('img')).toHaveClass('avatar--rounded');
    });

    it('applies status classes correctly', () => {
      const { rerender } = render(<DynAvatar alt=\"Test\" status=\"online\" />);
      expect(screen.getByRole('img')).toHaveClass('avatar--online');
      
      rerender(<DynAvatar alt=\"Test\" status=\"busy\" />);
      expect(screen.getByRole('img')).toHaveClass('avatar--busy');
    });
  });

  describe('Loading and Error States', () => {
    it('shows loading state', () => {
      render(<DynAvatar alt=\"Loading\" loading />);
      expect(screen.getByRole('img')).toHaveClass('avatar--loading');
      expect(screen.getByText('Loading avatar')).toBeInTheDocument();
    });

    it('shows error state', () => {
      render(<DynAvatar alt=\"Error\" error />);
      expect(screen.getByRole('img')).toHaveClass('avatar--error');
    });
  });

  describe('Custom Fallback', () => {
    it('renders custom fallback content', () => {
      const customFallback = <span data-testid=\"custom-fallback\">CF</span>;
      render(<DynAvatar alt=\"Custom\" fallback={customFallback} />);
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });
  });

  describe('Image Loading', () => {
    it('sets loading strategy correctly', () => {
      render(<DynAvatar src=\"test.jpg\" alt=\"Test\" imageLoading=\"lazy\" />);
      const img = screen.getByRole('img', { hidden: true });
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('passes through image props', () => {
      render(
        <DynAvatar 
          src=\"test.jpg\" 
          alt=\"Test\" 
          imageProps={{ crossOrigin: 'anonymous' }}
        />
      );
      const img = screen.getByRole('img', { hidden: true });
      expect(img).toHaveAttribute('crossorigin', 'anonymous');
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynAvatar.stories.tsx)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './DynAvatar';

const meta = {
  title: 'Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile avatar component with image support, fallback initials, status indicators, and full accessibility.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Avatar size'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state'
    },
    error: {
      control: 'boolean',
      description: 'Error state'
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile Picture',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar size=\"small\" alt=\"Small Avatar\" />
      <DynAvatar size=\"medium\" alt=\"Medium Avatar\" />
      <DynAvatar size=\"large\" alt=\"Large Avatar\" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants with proper scaling.'
      }
    }
  }
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face\"
        alt=\"Circle Avatar\" 
        shape=\"circle\" 
      />
      <DynAvatar 
        src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face\"
        alt=\"Square Avatar\" 
        shape=\"square\" 
      />
      <DynAvatar 
        src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face\"
        alt=\"Rounded Avatar\" 
        shape=\"rounded\" 
      />
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt=\"Online User\" status=\"online\" />
      <DynAvatar alt=\"Away User\" status=\"away\" />
      <DynAvatar alt=\"Busy User\" status=\"busy\" />
      <DynAvatar alt=\"Offline User\" status=\"offline\" />
    </div>
  ),
};

export const InitialsVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt=\"John Doe\" />
      <DynAvatar alt=\"Mary Jane Watson\" />
      <DynAvatar initials=\"AB\" alt=\"Custom Initials\" />
      <DynAvatar alt=\"SingleName\" />
    </div>
  ),
};

export const InteractiveAvatars: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        alt=\"Clickable User\" 
        onClick={() => alert('Avatar clicked!')}
      />
      <DynAvatar 
        src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face\"
        alt=\"Profile Settings\" 
        onClick={() => alert('Open profile!')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatars with click handlers and keyboard navigation.'
      }
    }
  }
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt=\"Loading User\" loading />
      <DynAvatar 
        src=\"https://slow-loading-image.example.com/avatar.jpg\"
        alt=\"Slow Loading\" 
      />
    </div>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt=\"Error User\" error />
      <DynAvatar 
        src=\"invalid-image-url.jpg\"
        alt=\"Broken Image\" 
      />
    </div>
  ),
};

export const CustomFallback: Story = {
  args: {
    alt: 'Custom Fallback',
    fallback: <span style={{ fontSize: '1.5em' }}>🦄</span>,
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme=\"dark\" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <DynAvatar alt=\"Dark Theme User\" />
        <DynAvatar 
          src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face\"
          alt=\"Dark Image\" 
        />
        <DynAvatar alt=\"Dark Online\" status=\"online\" />
        <DynAvatar alt=\"Dark Clickable\" onClick={() => {}} />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div>
        <DynAvatar 
          alt=\"User Profile\"
          aria-describedby=\"profile-description\"
        />
        <p id=\"profile-description\">Current user's profile picture</p>
      </div>
      
      <DynAvatar 
        alt=\"Manager\"
        aria-label=\"Team manager profile\"
        onClick={() => {}}
      />
      
      <DynAvatar 
        alt=\"Loading Profile\"
        loading
        aria-describedby=\"loading-description\"
      />
      <p id=\"loading-description\">Profile picture is loading</p>
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
```

---

## 📤 EXPORT STANDARDIZATION (index.ts)

```typescript
export { DynAvatar } from './DynAvatar';
export { default } from './DynAvatar';
export type { 
  DynAvatarProps, 
  DynAvatarRef,
  DynAvatarSize,
  DynAvatarShape,
  DynAvatarStatus
} from './DynAvatar.types';
```

---

## ✅ DELIVERABLE CHECKLIST

- [ ] **CSS Design Tokens**: Svi hard-coded stilovi zamenjeni sa `var(--dyn-*)`
- [ ] **Responsive Design**: Mobile touch targets i responsive behavior
- [ ] **Dark Theme**: `@media (prefers-color-scheme: dark)` support
- [ ] **High Contrast**: `@media (prefers-contrast: high)` support  
- [ ] **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` respect
- [ ] **TypeScript**: BaseComponentProps i AccessibilityProps extending
- [ ] **Accessibility**: Proper roles (img/button), ARIA support, screen reader announcements
- [ ] **Keyboard Navigation**: Enter/Space za interactive avatars
- [ ] **Image Handling**: Loading/error states, fallback logic
- [ ] **Status Indicators**: Online/offline/away/busy sa semantic colors
- [ ] **Testing**: Accessibility tests, keyboard tests, 85%+ coverage
- [ ] **Storybook**: Dark theme, accessibility examples, all variants
- [ ] **Performance**: Image loading optimization, reduced re-renders
- [ ] **Fallback Content**: Initials generation, custom fallback support

---

## 🎯 SPECIFIČNI FOKUS ZA DynAvatar

### **Image Handling Excellence**

- Proper loading/error states sa visual feedback
- Initials generation algoritam optimizovan
- Custom fallback content support
- Image optimization properties

### **Accessibility Priority**

- Proper semantic roles (img vs button)
- Screen reader announcements za loading/error
- Keyboard navigation za interactive variants
- Status indicators opisani za screen readers

### **Visual Polish**

- Smooth animations sa reduced motion respect
- Status indicators sa semantic colors
- Loading shimmer effect optimizovan
- High contrast theme support

**SUCCESS CRITERIA**: Production-ready avatar komponent sa comprehensive image handling, accessibility, i visual polish!
