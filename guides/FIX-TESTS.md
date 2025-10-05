# Vitest + JSDOM quick-fix (monorepo)

Simptomi u logu:

- `MISSING DEPENDENCY  Cannot find dependency 'jsdom'`
- `No test files found, exiting with code 1`
- Warning: `The condition "types" here will never be used ...` (redoslijed u `exports`)

## 1) Dev-dependencies (u rootu monorepo-a)

Koristite jedan od package managera, npr. pnpm:

```sh
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest @types/node @types/react @types/react-dom
```

Ako koristite Vite u paketu:

```sh
pnpm add -D vite @vitejs/plugin-react
```

## 2) `vitest.config.ts` (na vrhu repo-a ili u paketu)

Minimalna varijanta (u /vitest.config.ts):

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true
  }
})
```

## 3) `vitest.setup.ts` (na vrhu repo-a)

```ts
import '@testing-library/jest-dom/vitest'
```

## 4) Primjer testa (packages/dyn-ui-react/src/components/DynButton.test.tsx)

```ts
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import DynButton from './DynButton' // prilagodite putanju ako je drukčije

describe('DynButton', () => {
  it('renderuje label i hvata klik', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<DynButton label="Save" onClick={onClick} />)

    const btn = screen.getByRole('button', { name: /save/i })
    expect(btn).toBeInTheDocument()

    await user.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

> Ako test fajl ne bude pronađen, provjerite `include` glob u `vitest.config.ts` i naziv *_test.tsx /*.spec.tsx.

## 5) Scripts (root package.json)

Dodajte ili ažurirajte:

```jsonc
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui"
  }
}
```

Ako koristite TurboRepo, `turbo run test` će pokretati `test` skriptu u paketima.

## 6) Warning oko `types` u package.json (u paketu biblioteke)

Preporučeni raspored i vrijednosti:

```jsonc
{
  "name": "@dyn-ui/react",
  "version": "0.1.0",
  "types": "./dist/index.d.ts",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.esm.js",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    }
  }
}
```

Time se izbjegava upozorenje da `types` uslov „neće biti korišten“.

## 7) Pokretanje

```sh
# iz root-a monorepo-a
pnpm turbo run test       # ili
pnpm run test             # direktno
```

Ako i dalje dobijate `jsdom` grešku – provjerite gdje je instaliran (root vs. paket) i da li vitest izvršavate iz istog konteksta.
