# dyn-ui — TypeScript codemods (React imports, classnames, props typing)

Ovi skriptovi rešavaju greške koje vidiš na slici:

- `react has no exported member named 'React'` → ispravan import iz `react`
- `classNames can only be imported by using a default import` → prebacuje na `import classNames from 'classnames'`
- implicit `any` za destrukturisane propse u `React.FC<...>` → dodaje anotaciju tipa uz parametar
- (bonus) podešava `size` kao `keyof typeof AVATAR_SIZES` ako prepozna tu šemu

## Kako pokrenuti

Kopiraj folder `scripts/` u root repo-a i pokreni sledeće (PowerShell ili bash):

```bash
pnpm add -w glob
node scripts/codemods/fix-react-imports.mjs "packages/dyn-ui-react/src/**/*.{ts,tsx}"
node scripts/codemods/fix-classnames-import.mjs "packages/dyn-ui-react/src/**/*.{ts,tsx}"
node scripts/codemods/annotate-props.mjs "packages/dyn-ui-react/src/**/*.{ts,tsx}"
node scripts/codemods/fix-size-keyof.mjs "packages/dyn-ui-react/src/**/*.{ts,tsx}"
```

> Pre pokretanja napravi backup ili poteri komande iz Git brancha.

Posle toga:

- Restartuj TS server u VS Code,
- Pokreni testove: `pnpm turbo run test --filter=@dyn-ui/react`

## Napomena o React importu

Ako nemaš uključeno `allowSyntheticDefaultImports`/`esModuleInterop` u `tsconfig`, **default import `React` neće raditi**. Skripta menja na **namespace import**:

```ts
// pre:
import React, { useState } from 'react';

// posle:
import * as React from 'react';
import { useState } from 'react';
```

Ovo pokriva i `React.FC`, `React.MouseEventHandler`, itd.

## Napomena o propsima

Kod oblika:

```ts
export const DynAvatar: React.FC<DynAvatarProps> = ({ src, size = 'md' }) => { ... }
```

TypeScript ne prenosi tip na destrukturisani parametar. Skripta menja u:

```ts
export const DynAvatar: React.FC<DynAvatarProps> = (
  { src, size = 'md' }: DynAvatarProps
) => { ... }
```

## Primer ručnog popravka (DynAvatar.tsx)

```ts
import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { DynAvatarProps, AVATAR_SIZES } from '../../types/avatar.types';
import { generateInitials } from '../../utils/dynFormatters';
import './DynAvatar.module.css';

export const DynAvatar: React.FC<DynAvatarProps> = (
  { src, size = 'md', loading = 'eager', alt = 'Avatar', initials, className, onClick }: DynAvatarProps
) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasClickEvent = !!onClick;
  const pixelSize = AVATAR_SIZES[size as keyof typeof AVATAR_SIZES];

  // ...
};
```

Ako `size` već ima tip `keyof typeof AVATAR_SIZES` u `DynAvatarProps`, nije potreban `as keyof ...`.
