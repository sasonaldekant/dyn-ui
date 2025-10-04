# dyn-ui — Vitest + TypeScript quick fix

Ovaj paket sadrži _tačno ono_ što ti treba da ukloniš VS Code greške
(`describe`/`it`/`expect`) i da `turbo run test`/`vitest` konačno pronađe i pokrene testove.

## Šta je unutra

- `vitest.config.ts` — konfig na root nivou (globals, jsdom, setup, css, include, coverage)
- `vitest.setup.ts` — aktivira jest-dom matchere u Vitest okruženju
- `env.d.ts` — doda Vitest i jest-dom tipove za TS server (nestaju crvene greške u editoru)
- `samples/` — minimalni testovi za DynIcon i DynButton (rade i sa **default** i sa **named** exportom)
- `scripts/install-dev-deps.*` — skripte za instalaciju dev zavisnosti
- `scripts/edit-tsconfig.mjs` — bezbedno upiše potrebne `types`/`include` u `tsconfig.json`

## Koraci (Windows PowerShell)

1. **Kopiraj fajlove** iz ovog ZIP-a u **root tvog monorepo-a** (pored `package.json`).
   - Ako već imaš `vitest.config.ts` / `vitest.setup.ts`, napravi backup pa prekopiraj moje.
2. Instaliraj dev deps:

   ```powershell
   pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @types/node
   ```

3. Upisi tipove u `tsconfig.json` (bez ručnog editovanja):

   ```powershell
   node ./scripts/edit-tsconfig.mjs
   ```

   Ovo će obezbediti:

   ```jsonc
   "compilerOptions": {
     "types": ["vitest/globals", "@testing-library/jest-dom", "node"]
   },
   "include": ["packages/**/*", "vitest.setup.ts", "env.d.ts"]
   ```

4. (Opc.) Prekopiraj primere testova iz `samples/` u svoj repo:
   - `samples/DynIcon.test.tsx` → `packages/dyn-ui-react/src/components/DynIcon/DynIcon.test.tsx`
   - `samples/DynButton.test.tsx` → `packages/dyn-ui-react/src/components/DynButton/DynButton.test.tsx`
   > Ovi primeri rade i ako komponenta exportuje `default` **ili** `{ named }` — testovi neće pucati na tipu eksportovanja.
5. Restartuj VS Code TypeScript server (Command Palette → “TypeScript: Restart TS Server”).
6. Pokreni testove:

   ```powershell
   pnpm turbo run test --filter=@dyn-ui/react
   ```

   ili direktno:

   ```powershell
   pnpm --filter @dyn-ui/react run test
   ```

## Napomene

- **Ne instaliraj `@types/jest`** — pravi konflikt sa Vitest tipovima.
- Ako koristiš Storybook, ovo ne remeti SB konfiguraciju.
- Ako Turbo prijavi cache hit a ti si menjao config, probaj `turbo run test --force`.

Srećno! 🚀
