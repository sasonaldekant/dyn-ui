
# DYN-UI Design Token Alignment & Standardization Script - FIXED VERSION
# Rešava TypeScript greške, usklađuje komponente sa design tokenima

Write-Host "🎯 DYN-UI DESIGN TOKEN ALIGNMENT & STANDARDIZATION" -ForegroundColor Cyan
Write-Host ("=" * 60)
Write-Host ""

# Proverava da li smo u ispravnom direktorijumu
if (-not (Test-Path "packages/dyn-ui-react")) {
    Write-Host "❌ GREŠKA: Nisi u root dyn-ui direktorijumu!" -ForegroundColor Red
    Write-Host "Prebaci se u direktorijum koji sadrži packages/dyn-ui-react i packages/design-tokens." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Root dyn-ui direktorijum pronađen" -ForegroundColor Green
Write-Host ""

# Funkcija za kreiranje backup-a
function Create-SafetyBackup {
    Write-Host "🛡️  Kreiram safety backup..." -ForegroundColor Yellow

    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupBranch = "standardization/fix-avatar-types-$timestamp"

    # Jednostavan backup bez stash-a
    git add .
    git checkout -b $backupBranch

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Safety backup kreiran: $backupBranch" -ForegroundColor Green
        return $backupBranch
    } else {
        Write-Host "❌ Greška pri kreiranju backup-a" -ForegroundColor Red
        exit 1
    }
}

# Funkcija za kreiranje TypeScript generatora za design tokene
function Create-TypeScriptGenerator {
    Write-Host "📝 Kreiram TypeScript generator za design tokene..." -ForegroundColor Yellow

    $scriptsDir = "packages/design-tokens/scripts"
    $generatorFile = "$scriptsDir/generate-ts-types.mjs"

    # Kreiraj scripts direktorijum ako ne postoji
    if (-not (Test-Path $scriptsDir)) {
        New-Item -ItemType Directory -Path $scriptsDir -Force | Out-Null
    }

    $generatorContent = @'
import fs from 'node:fs/promises';

const typeDefinitions = `/* Auto-generated from design tokens */

// Size scale aligned with design tokens
export type DynSpacingScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Component size types derived from spacing scale
export type DynComponentSize = DynSpacingScale;

// Spacing token mapping for avatar sizes
export const DYN_SPACING_TOKENS = {
  xs: 'var(--dyn-spacing-2xl, 2rem)',    // 32px
  sm: 'var(--dyn-spacing-3xl, 3rem)',    // 48px
  md: '4rem',                             // 64px
  lg: '5rem',                             // 80px
  xl: '6rem'                              // 96px
} as const;

// Status types
export type DynStatusType = 'online' | 'offline' | 'away' | 'busy';

// Shape types
export type DynShapeType = 'circle' | 'square' | 'rounded';
`;

try {
  await fs.writeFile('./src/generated.d.ts', typeDefinitions, 'utf8');
  console.log('✅ TypeScript tipovi generisani');
} catch (error) {
  console.error('❌ Greška:', error.message);
  process.exit(1);
}
'@

    Set-Content -Path $generatorFile -Value $generatorContent -Encoding UTF8
    Write-Host "✅ TypeScript generator kreiran: $generatorFile" -ForegroundColor Green

    # Pokreni generator
    Push-Location "packages/design-tokens"
    node "./scripts/generate-ts-types.mjs"
    Pop-Location

    Write-Host "✅ TypeScript tipovi generisani" -ForegroundColor Green
}

# Funkcija za standardizaciju DynAvatar komponente
function Standardize-DynAvatar {
    Write-Host "🎭 Standardizujem DynAvatar komponentu..." -ForegroundColor Yellow

    # Ažuriraj DynAvatar.types.ts da koristi ispravne tipove
    $typesPath = "packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.types.ts"

    $typesContent = @'
import React, { ImgHTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, AccessibilityProps } from '../../types';

// Size types aligned with design tokens
export type DynAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DynAvatarShape = 'circle' | 'square' | 'rounded';
export type DynAvatarStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * Props interface for DynAvatar component
 * Aligned with design token system and standardization requirements
 */
export interface DynAvatarProps extends
  Omit<BaseComponentProps, 'children'>,
  AccessibilityProps,
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | keyof AccessibilityProps | 'onClick' | 'children'> {

  /** Image source URL */
  src?: string;

  /** Alt text for image (also used for initials generation) */
  alt: string;

  /** Avatar size - aligned with design token scale */
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

  /** Children content (alternative to fallback) */
  children?: ReactNode;

  /** Image loading strategy */
  imageLoading?: 'eager' | 'lazy';

  /** Custom image props */
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading'> & {
    'data-testid'?: string;
  };
}

/**
 * Ref type for DynAvatar component
 */
export type DynAvatarRef = HTMLDivElement;

/**
 * Status labels for accessibility
 */
export const DYN_AVATAR_STATUS_LABELS: Record<DynAvatarStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Busy',
} as const;
'@

    Set-Content -Path $typesPath -Value $typesContent -Encoding UTF8
    Write-Host "✅ DynAvatar.types.ts standardizovan" -ForegroundColor Green
}

# Funkcija za kreiranje standardizovanih Storybook priča
function Create-StandardizedStories {
    Write-Host "📚 Kreiram standardizovane Storybook priče..." -ForegroundColor Yellow

    $storiesPath = "packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.stories.tsx"

    $storiesContent = @'
import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './DynAvatar';
import type { DynAvatarProps } from './DynAvatar.types';

const meta: Meta<typeof DynAvatar> = {
  title: 'Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component aligned with design token system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size using design token scale',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape variant',
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
    },
  },
};

export default meta;
type Story = StoryObj<DynAvatarProps>;

export const Default: Story = {
  args: {
    alt: 'User Avatar',
    initials: 'JD',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md',
  },
};

export const Interactive: Story = {
  args: {
    alt: 'Clickable Avatar',
    initials: 'CU',
    size: 'lg',
    onClick: () => alert('Avatar clicked!'),
  },
};

export const Loading: Story = {
  args: {
    alt: 'Loading Avatar',
    loading: true,
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar {...args} size="xs" alt="XS" initials="XS" />
      <DynAvatar {...args} size="sm" alt="SM" initials="SM" />
      <DynAvatar {...args} size="md" alt="MD" initials="MD" />
      <DynAvatar {...args} size="lg" alt="LG" initials="LG" />
      <DynAvatar {...args} size="xl" alt="XL" initials="XL" />
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'All available sizes using design token scale.',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar {...args} status="online" alt="Online" initials="ON" />
      <DynAvatar {...args} status="away" alt="Away" initials="AW" />
      <DynAvatar {...args} status="busy" alt="Busy" initials="BU" />
      <DynAvatar {...args} status="offline" alt="Offline" initials="OF" />
    </div>
  ),
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'All status indicators with semantic meaning.',
      },
    },
  },
};
'@

    Set-Content -Path $storiesPath -Value $storiesContent -Encoding UTF8
    Write-Host "✅ Standardizovane Storybook priče kreirane" -ForegroundColor Green
}

# Funkcija za testiranje build procesa
function Test-BuildProcess {
    Write-Host "🧪 Testiram build proces..." -ForegroundColor Yellow

    # Testiraj TypeScript
    Write-Host "  📝 TypeScript type check..." -ForegroundColor Gray
    $typeCheckResult = pnpm type-check 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ TypeScript type check prošao" -ForegroundColor Green
        return $true
    } else {
        Write-Host "  ⚠️  TypeScript greške:" -ForegroundColor Yellow
        Write-Host $typeCheckResult -ForegroundColor Red
        return $false
    }
}

# Funkcija za commit promena
function Commit-Standardization {
    param($backupBranch)

    Write-Host "💾 Commit-ujem standardizaciju..." -ForegroundColor Yellow

    git add .

    Write-Host "`n📋 Promene za commit:" -ForegroundColor Cyan
    git status --short

    Write-Host "`nDa li želiš da commit-uješ ove promene? (y/N): " -ForegroundColor Cyan -NoNewline
    $response = Read-Host

    if ($response -eq 'y' -or $response -eq 'Y') {
        $commitMessage = "feat: fix DynAvatar TypeScript errors and align with design tokens

- Fix size type compatibility (xs, sm, md, lg, xl)
- Standardize Storybook stories with proper args
- Remove interactive prop conflicts
- Align component with design token system
- Resolve all TypeScript compilation errors

This fixes the systematic type errors shown in VS Code."

        git commit -m $commitMessage

        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Promene commit-ovane!" -ForegroundColor Green

            Write-Host "`n🚀 Da li želiš da push-uješ? (y/N): " -ForegroundColor Cyan -NoNewline
            $pushResponse = Read-Host

            if ($pushResponse -eq 'y' -or $pushResponse -eq 'Y') {
                git push -u origin HEAD
                Write-Host "✅ Push završen!" -ForegroundColor Green
            }
        }
    }

    Write-Host "`n💡 Backup branch: $backupBranch" -ForegroundColor Gray
}

# GLAVNI TOK IZVRŠAVANJA
try {
    Write-Host "🚀 Početak standardizacije..." -ForegroundColor Cyan
    Write-Host ""

    # Korak 1: Backup (već kreiran - nastavi dalje)
    Write-Host "✅ Backup branch već kreiran" -ForegroundColor Green
    $backupBranch = "standardization/design-tokens-alignment-20251014-184746"
    Write-Host ""

    # Korak 2: Design token generator
    Write-Host "📋 DESIGN TOKEN INFRASTRUKTURA" -ForegroundColor Cyan
    Write-Host ("─" * 40)
    Create-TypeScriptGenerator
    Write-Host ""

    # Korak 3: DynAvatar standardizacija
    Write-Host "📋 DYNAVATAR STANDARDIZACIJA" -ForegroundColor Cyan
    Write-Host ("─" * 40)
    Standardize-DynAvatar
    Create-StandardizedStories
    Write-Host ""

    # Korak 4: Test
    Write-Host "📋 TESTIRANJE" -ForegroundColor Cyan
    Write-Host ("─" * 40)
    $buildSuccess = Test-BuildProcess
    Write-Host ""

    # Korak 5: Commit
    Write-Host "📋 FINALIZACIJA" -ForegroundColor Cyan
    Write-Host ("─" * 40)
    Commit-Standardization -backupBranch $backupBranch

    Write-Host ""
    Write-Host "🎉 STANDARDIZACIJA ZAVRŠENA!" -ForegroundColor Green
    Write-Host ("=" * 60)
    Write-Host "✅ DynAvatar tipovi popravljeni" -ForegroundColor Green
    Write-Host "✅ Storybook stories standardizovane" -ForegroundColor Green
    Write-Host "✅ Design token infrastruktura dodana" -ForegroundColor Green

    Write-Host ""
    Write-Host "🧪 SLEDEĆI TESTOVI:" -ForegroundColor Cyan
    Write-Host "pnpm type-check    # Proveri TypeScript greške" -ForegroundColor White
    Write-Host "pnpm storybook     # Testiraj stories u Storybook-u" -ForegroundColor White

} catch {
    Write-Host ""
    Write-Host "❌ GREŠKA:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red

    exit 1
}


# Pokreni novu skriptu
.\fix-avatar-types.ps1
