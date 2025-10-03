# dyn-ui — Coverage Suite (verifikacija + auto-generisanje)

Ovaj paket ima dva ključna alata:

1) **verify-components.ts** — proveri da li svaka kontrola ima *storybook* i *test*.
2) **ensure-coverage.ts** — napravi nedostajuće *stories* i *tests* sa pametnim dekoratorima:
   - Uvek: `ThemeProvider` dekorator (light tema).
   - Ako je ime sadrži `Icon` ili `Avatar`: dodaje `IconDictionaryProvider` dekorator.
   - Kreira `*.stories.tsx` i `*.test.tsx` samo ako **ne postoje**.

## Upotreba

```bash
pnpm add -D tsx @types/node

# 1) Provera pokrivenosti
pnpm tsx scripts/verify-components.ts

# 2) Auto-kreiraj nedostajuće story/test fajlove
pnpm tsx scripts/ensure-coverage.ts

# Ponovo proveri
pnpm tsx scripts/verify-components.ts
```
