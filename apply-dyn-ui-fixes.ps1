$ErrorActionPreference = "Stop"

function Backup-And-Write($Path, $Content) {
  if (!(Test-Path $Path)) { throw "File not found: $Path" }
  Copy-Item $Path "$Path.bak" -Force
  Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8
  Write-Host "   $Path updated (backup: $Path.bak)"
}

function Safe-Replace($Path, $Replacements) {
  if (!(Test-Path $Path)) { throw "File not found: $Path" }
  $orig = Get-Content -LiteralPath $Path -Raw
  $new  = $orig
  foreach ($kv in $Replacements.GetEnumerator()) {
    $new = [regex]::Replace($new, $kv.Key, $kv.Value, 'IgnoreCase, Multiline')
  }
  if ($new -ne $orig) {
    Copy-Item $Path "$Path.bak" -Force
    Set-Content -LiteralPath $Path -Value $new -Encoding UTF8
    Write-Host "   $Path patched (backup: $Path.bak)"
  } else {
    Write-Host "  = $Path (no change)"
  }
}

# 1) REACT IMPORT FIXES
$reactImportFiles = @(
  "packages/dyn-ui-react/src/components/Button/Button.tsx",
  "packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.tsx",
  "packages/dyn-ui-react/src/components/DynLabel/DynLabel.tsx",
  "packages/dyn-ui-react/src/providers/ThemeProvider.tsx",
  "packages/dyn-ui-react/src/theme/ThemeProvider.tsx"
)
foreach ($f in $reactImportFiles) {
  if (Test-Path $f) {
    Safe-Replace $f @{
      'import\s*\{\s*React\s*\}\s*from\s*''react'';' = "import * as React from 'react';"
      'import\s*\{\s*React\s*,\s*([^\}]+)\}\s*from\s*''react'';' = "import * as React from 'react';`r`nimport {$1} from 'react';"
    }
  }
}

# 2) BARREL INDEX FIXES (ukloni default re-exports)
$barrelFixes = @(
  "packages/dyn-ui-react/src/components/index.ts",
  "packages/dyn-ui-react/src/components/DynBadge/index.ts",
  "packages/dyn-ui-react/src/components/DynAvatar/index.ts",
  "packages/dyn-ui-react/src/components/DynLabel/index.ts",
  "packages/dyn-ui-react/src/components/DynButton/index.ts",
  "packages/dyn-ui-react/src/components/DynContainer/index.ts",
  "packages/dyn-ui-react/src/components/DynDivider/index.ts",
  "packages/dyn-ui-react/src/components/ThemeSwitcher/index.ts"
)
foreach ($i in $barrelFixes) {
  if (Test-Path $i) {
    $orig = Get-Content $i -Raw
    $new = $orig `
      -replace 'export\s*\{\s*default\s*as\s*([A-Za-z0-9_]+)\s*\}\s*from\s*''\./([^'']+)''\s*;?', 'export { $1 } from ''./$2'';' `
      -replace 'export\s*\{\s*default\s*\}\s*from\s*''\./([^'']+)''\s*;?', 'export { $1 } from ''./$1'';'
    if ($new -ne $orig) {
      Copy-Item $i "$i.bak" -Force
      Set-Content $i $new -Encoding UTF8
      Write-Host "   $i normalized (no default re-exports)"
    } else {
      Write-Host "  = $i (no change)"
    }
  }
}

# 3) components/index.ts  obezbedi named exports
$componentsIndex = "packages/dyn-ui-react/src/components/index.ts"
if (Test-Path $componentsIndex) {
  $content = Get-Content $componentsIndex -Raw
  $linesToKeep = @(
    "export { DynBadge } from './DynBadge';",
    "export { DynAvatar } from './DynAvatar';",
    "export { DynLabel } from './DynLabel';",
    "export { DynContainer } from './DynContainer';"
  )
  $out = $content
  foreach ($l in $linesToKeep) {
    if ($out -notmatch [regex]::Escape($l)) {
      $out = $out + "`r`n$l"
    }
  }
  if ($out -ne $content) {
    Copy-Item $componentsIndex "$componentsIndex.bak" -Force
    Set-Content $componentsIndex $out -Encoding UTF8
    Write-Host "   enforced named exports in $componentsIndex"
  }
}

# 4) DynIcon barrel  ispravi pogrešan provider path i type re-export
$dynIconBarrel = "packages/dyn-ui-react/src/components/DynIcon/index.ts"
if (Test-Path $dynIconBarrel) {
  Safe-Replace $dynIconBarrel @{
    '\.\./\.\./providers/DynIconDictionaryProvider' = '../../providers/IconDictionaryProvider'
    'export\s+type\s+\{\s*IconDictionaryContext\s*\}\s+from\s+''[^'']+''\s*;' = "export type { IconDictionaryContext } from '../../providers/IconDictionaryProvider';"
  }
}

# 5) providers/index.ts  ukloni nepostojeći ThemeProviderProps type re-export
$providersIndex = "packages/dyn-ui-react/src/providers/index.ts"
if (Test-Path $providersIndex) {
  $orig = Get-Content $providersIndex -Raw
  $new  = ($orig -split "`r?`n") | Where-Object { $_ -notmatch 'ThemeProviderProps' } | Out-String
  if ($new -ne $orig) {
    Copy-Item $providersIndex "$providersIndex.bak" -Force
    Set-Content $providersIndex $new.TrimEnd() -Encoding UTF8
    Write-Host "   removed bad type re-export from $providersIndex"
  }
}

# 6) useIconDictionary  izbegni TS4023
$useIconHook = "packages/dyn-ui-react/src/hooks/useIconDictionary.ts"
if (Test-Path $useIconHook) {
$hook = @"
import * as React from 'react';
import { IconDictionaryContext } from '../providers/IconDictionaryProvider';

export const useIconDictionary = () => {
  return React.useContext(IconDictionaryContext as unknown as React.Context<any>);
};
"@
  Backup-And-Write $useIconHook $hook
}

# 7) DynBadge tipovi  export interfejs
$badgeTypes = "packages/dyn-ui-react/src/types/badge.types.ts"
if (Test-Path $badgeTypes) {
  $raw = Get-Content $badgeTypes -Raw
  if ($raw -notmatch 'export\s+interface\s+DynBadgeProps') {
$bt = @"
import * as React from 'react';

export type DYN_COLOR_PALETTE =
  | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | string;

export interface DynBadgeProps {
  value: number | string;
  status?: 'success' | 'warning' | 'error';
  color?: DYN_COLOR_PALETTE;
  icon?: string;
  showBorder?: boolean;
  size?: 'small' | 'medium' | 'large';
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}
"@
    Backup-And-Write $badgeTypes $bt
  } else {
    Write-Host "  = $badgeTypes already exports DynBadgeProps"
  }
}

# 8) DynBadge komponenta  forwardRef + styles import
$dynBadgeComp = "packages/dyn-ui-react/src/components/DynBadge/DynBadge.tsx"
if (Test-Path $dynBadgeComp) {
$dbc = @"
import * as React from 'react';
import classNames from 'classnames';
import { DynBadgeProps, DYN_COLOR_PALETTE } from '../../types/badge.types';
import { formatBadgeValue, isThemeColor } from '../../utils/dynFormatters';
import { DynIcon } from '../DynIcon/DynIcon';
import styles from './DynBadge.module.css';

export const DynBadge = React.forwardRef<HTMLSpanElement, DynBadgeProps>(({
  value,
  color,
  status,
  size = 'medium',
  icon,
  showBorder = false,
  ariaLabel,
  className,
  children,
  ...rest
}, ref) => {
  const displayValue = formatBadgeValue(value);
  const badgeClasses = classNames(
    styles['dyn-badge'],
    size && styles[\`dyn-badge--\${size}\`],
    status && styles[\`dyn-badge--\${status}\`],
    color && isThemeColor(color as string) && styles[\`dyn-badge--\${color}\`],
    showBorder && styles['dyn-badge--border'],
    className
  );

  return (
    <span ref={ref} className={badgeClasses} aria-label={ariaLabel} {...rest}>
      {icon ? <DynIcon name={icon} className={styles['dyn-badge__icon']} /> : null}
      <span className={styles['dyn-badge__value']}>{displayValue}</span>
      {children}
    </span>
  );
});
DynBadge.displayName = 'DynBadge';
"@
  Backup-And-Write $dynBadgeComp $dbc
}

# 9) DynBadge stories  usklađeno sa propsima
$dynBadgeStory = "packages/dyn-ui-react/src/components/DynBadge/DynBadge.stories.tsx"
if (Test-Path $dynBadgeStory) {
$dbs = @"
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynBadge } from './DynBadge';

const meta: Meta<typeof DynBadge> = {
  title: 'Display/DynBadge',
  component: DynBadge,
};
export default meta;
type Story = StoryObj<typeof DynBadge>;

export const Playground: Story = {
  args: { value: 99, size: 'medium', color: 'primary' },
};

export const StatusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <DynBadge status='success' value={5} />
      <DynBadge status='warning' value={5} />
      <DynBadge status='error' value={5} />
    </div>
  ),
};

export const WithIcon: Story = {
  args: { icon: 'check', color: 'secondary', value: 1 },
};

export const BorderVariant: Story = {
  args: { value: 3, showBorder: true, color: 'danger' },
};
"@
  Backup-And-Write $dynBadgeStory $dbs
}

# 10) import.meta.glob  dodaj vite/client referencu
$globFiles = @(
  "packages/dyn-ui-react/src/theme/bridge/themeLoader.design-tokens.ts",
  "packages/dyn-ui-react/src/theme/themeLoader.ts"
)
foreach ($gf in $globFiles) {
  if (Test-Path $gf) {
    $orig = Get-Content $gf -Raw
    if ($orig -notmatch 'vite/client') {
      $new = "/// <reference types=""vite/client"" />`r`n$orig"
      Copy-Item $gf "$gf.bak" -Force
      Set-Content $gf $new -Encoding UTF8
      Write-Host "   added vite/client reference to $gf"
    } else {
      Write-Host "  = $gf (vite/client reference already present)"
    }
  }
}

Write-Host "`nAll done. Now run:"
Write-Host "  pnpm --filter @dyn-ui/design-tokens run build"
Write-Host "  pnpm build"
