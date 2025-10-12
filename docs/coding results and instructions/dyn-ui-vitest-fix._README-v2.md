# dyn-ui — Vitest + TS fix (v2)

Dodatci u odnosu na prethodni ZIP:

- `scripts/edit-tsconfig.mjs` sada automatski traži **tsconfig.json** *ili* **tsconfig.base.json** u root-u.
- Ako ni to ne postoji, pokušaće da **patch-uje `packages/dyn-ui-react/tsconfig.json`**.
- Uključen je i `scripts/align-tooling.ps1` (opciono) za usklađivanje Vite/Storybook verzija.

## Brzi koraci

1) Iskopiraj sadržaj ZIP-a u **root repo-a** (pored `package.json`).
2) Pokreni:

   ```powershell
   node ./scripts/edit-tsconfig.mjs
   ```

   Skripta će prijaviti šta je ažurirala (root `tsconfig.json`, ili `tsconfig.base.json`, ili paket `packages/dyn-ui-react/tsconfig.json`).
3) Restartuj VS Code TS server.
4) Pokreni testove:

   ```powershell
   pnpm turbo run test --filter=@dyn-ui/react
   ```

## Peer dependency WARN-ovi koje vidiš

- `@vitest/mocker` i Storybook Vite builder traže **vite >= 5**. Tvoj repo ima **vite 4.5.x**.
- Takođe imaš mešane Storybook verzije (**core 9.1.x** + addon-i **8.6.x**).

To **ne sprečava** Vitest testove da rade, ali preporučujem da kasnije poravnaš verzije:

- ili **sve na SB 9.1.x** + `vite@^5`,
- ili sve na SB 8.6.x (nije preporučeno).

Za pomoć tu je `scripts/align-tooling.ps1` (opciono).

> Nemoj instalirati `@types/jest` — drži se Vitest tipova.
