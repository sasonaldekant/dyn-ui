# dyn-ui — Bridge ka postojećem `design-tokens` (isto što koristi DynButton)

Cilj: **ne duplirati** mehanizam tema/tokens, već sve komponente (Avatar, Box, ThemeSwitcher, …) osloniti na **isti**
izvor istine i runtime kao `DynButton` — tj. na modul `packages/dyn-ui-react/src/design-tokens/*`.

## Šta dobijate ovim paketom
- `themeLoader.design-tokens.ts` — **dinamički** učitava teme direktno iz `design-tokens/themes/*.(ts|js|json)` preko `import.meta.glob`.
- `normalize.ts` — adapter koji normalizuje različite nazive/strukture (npr. `space` → `spacing`, `radii` → `radius`, `fontSizes` → `fontSize`, …) u jedinstven oblik koji koriste komponente.
- `applyCssVars.ts` (bridge varijanta) — pretvara normalizovane tokene u CSS varijable. Prefiks uzima iz `design-tokens/config` ako postoji (`CSS_VAR_PREFIX`), u suprotnom koristi `'dyn'`.
- `index.additions.ts` — exporti koje je potrebno dodati u `src/index.ts` biblioteke.

> **VAŽNO:** Ovaj bridge **ne menja** vaš postojeći `design-tokens` — samo ga koristi. Ako kasnije promenite strukturu tokena, dovoljno je da ažurirate mapiranje u `normalize.ts`.

## Putanje (projektni layout)

```
packages/dyn-ui-react/
  src/
    theme/
      bridge/
        themeLoader.design-tokens.ts   ← loader koji gleda u design-tokens/themes/*
        normalize.ts                   ← mapira vaše nazive na standardizovane
      applyCssVars.ts                  ← (isti API) koristi prefiks iz design-tokens/config ako postoji
    index.additions.ts                 ← šta dodati u src/index.ts (exporti)
```

## Kako da uključite
1) Prekopirajte sadržaj ovog paketa u vaš repo na gore navedene putanje.
2) U `packages/dyn-ui-react/src/index.ts` dodajte exporte iz `index.additions.ts`.
3) U Storybook `.storybook/preview.tsx` koristite **ovaj** loader (preko ThemeProvider-a) — ne trebaju JSON teme iz posebnog foldera.

## Primer upotrebe
```tsx
import { ThemeProvider } from '../theme/ThemeProvider';        // vaš postojeći
import { loadThemeTokens, getAvailableThemes } from '../theme/bridge/themeLoader.design-tokens';

// u ThemeProvider efektu umesto "local JSON" pozovite:
const tokens = await loadThemeTokens(activeName); // učitava iz design-tokens
applyCssVars(tokens, { prefix: /* čita iz configa ili 'dyn' */ });
```

## Šta ako je struktura vaših tokena drugačija?
U `normalize.ts` su mapiranja/aliasi. Ako npr. koristite `sizes` umesto `size`, samo dodajte:

```ts
alias(tokens, 'sizes', 'size');
```

Isto važi za `space → spacing`, `radii → radius`, `fontSizes → fontSize`, `fontWeights → fontWeight`, `palette → colors`, itd.
