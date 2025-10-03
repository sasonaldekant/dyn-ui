# dyn-ui — Named Exports Standard (enforcement + migration)

**Standard:** koristimo **IMENOVANE (named) exporte** za UI komponente i util-e u `packages/`.
**Izuzeci:** gde je _framework zahtevao_ default (npr. Storybook `export default meta` u `*.stories.*`) — to ostaje.

## Zašto named? (kratko)

- Konzistentna imena kroz ceo kod (lakše refaktorisanje, IDE rename, greška na mismatch).
- Manje ESM/CJS interop iznenađenja.
- Lako je videti šta modul nudi bez otvaranja fajla.

(Detaljna obrazloženja i reference vidi u PR tekstu koji smo pripremili.)

## Šta je u paketu

- `scripts/enforce-named-exports.ts` — prepravlja glavne fajlove komponenti (`<Comp>/<Comp>.tsx|ts`) tako da **uklone default** i ostave named.
- `scripts/migrate-imports-to-named.ts` — menja `import Comp from '…'` u `import { Comp } from '…'` (i kombinacije).
- `scripts/fix-react-lazy-for-named.ts` — prepravlja `React.lazy(() => import('…'))` da mapira na named export (`.then(m => ({ default: m.Comp }))`).
- `scripts/verify-no-default-exports.ts` — proverava da u `src` nema više default exporta (osim izuzetaka).
- `eslint/.eslintrc.named-exports.snippet.cjs` — snippet sa pravilom `import/no-default-export` i override za `*.stories.*`.

## Brza upotreba

```bash
pnpm add -D tsx @types/node eslint-plugin-import

# 1) Enforce u fajlovima komponenti (ukloni default, ostavi named)
pnpm tsx scripts/enforce-named-exports.ts

# 2) Migriraj uvoze po repo-u na named
pnpm tsx scripts/migrate-imports-to-named.ts

# 3) Fix za React.lazy (heuristički)
pnpm tsx scripts/fix-react-lazy-for-named.ts

# 4) Verifikuj da nema default exporta (osim story fajlova)
pnpm tsx scripts/verify-no-default-exports.ts

# 5) (Opc.) Dodaj ESLint pravilo
#   - kopiraj eslint/.eslintrc.named-exports.snippet.cjs delove u tvoj .eslintrc.cjs
```

## Posle migracije

```bash
# očisti vite/storybook cache i pokreni
rimraf node_modules/.vite node_modules/.cache/storybook
pnpm run storybook
```
