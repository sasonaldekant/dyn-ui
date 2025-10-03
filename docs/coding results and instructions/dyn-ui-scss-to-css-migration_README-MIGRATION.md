# dyn-ui — SCSS → CSS (PostCSS) migracioni paket

Ovim paketom skidaš Sass, zadržavaš ugnježđivanje preko **PostCSS nesting**, a sve vrednosti idu kroz **CSS varijable** (design tokens).

## Sadržaj

- `postcss.config.cjs` — `postcss-nesting` + `autoprefixer`
- `config/migrate.map.json` — dodatna mapiranja za `$var` → `var(--dyn-*)`
- `scripts/scan-scss-features.ts` — izlistaj SCSS specifike koje traže ručni rad (mixin/include/func)
- `scripts/migrate-scss-to-css.ts` — prepiši `.scss` → `.css`, zameni `$foo-bar` u `var(--dyn-foo-bar)` + overrides
- `scripts/update-imports-scss-to-css.ts` — promeni sve `import './x.scss'` → `import './x.css'` u TS/TSX/JS

## Koraci

```bash
pnpm add -D postcss postcss-nesting autoprefixer

pnpm tsx scripts/scan-scss-features.ts
pnpm tsx scripts/migrate-scss-to-css.ts
pnpm tsx scripts/update-imports-scss-to-css.ts

rm -rf node_modules/.vite
pnpm run storybook
```
