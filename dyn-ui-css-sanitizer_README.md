# dyn-ui — CSS Sanitizer (fix `//` comments in .css + scan SCSS leftovers)

Ovaj alat:

1) **Skenira** ceo repo (ili zadate putanje) za `.css` fajlove.
2) **Pretvara** `// ...` komentare u **validne CSS komentare** `/* ... */` (bezbedno za URL-ove).
3) **Komentariše** SCSS-only direktive koje su zalutale u `.css` (`@mixin`, `@include`, `@use`, `@forward`, `@extend`).
4) (Opc.) **Heuristički** preslikava `$var` → `var(--dyn-...)` ako je ostalo u `.css`.
5) **Izveštaj** u `reports/css-sanitizer-report.json` (šta je menjano i gde).

## Instalacija

```bash
pnpm add -D tsx @types/node
```

## Korišćenje (default putanje)

```bash
pnpm tsx scripts/css-sanitize.ts
```

## Napredna upotreba

```bash
# suzi na specifične putanje (npr. samo UI paket)
pnpm tsx scripts/css-sanitize.ts packages/dyn-ui-react/src

# dry-run (bez upisa), samo report:
DRY_RUN=1 pnpm tsx scripts/css-sanitize.ts

# kreiraj .bak fajl pre izmene
BACKUP=1 pnpm tsx scripts/css-sanitize.ts
```

## PowerShell "safety" (čišćenje cache-a nakon sanitizacije)

```powershell
Remove-Item -Recurse -Force .\node_modules\.vite\
Remove-Item -Recurse -Force .\node_modules\.cache\storybook\
pnpm run storybook
```
