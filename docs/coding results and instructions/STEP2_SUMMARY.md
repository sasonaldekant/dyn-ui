# STEP 2 – Design Tokens i Vizuelna Verifikacija

Ovaj dokument predstavlja **sažetak Faze 2** implementacije projekta **Dyn UI**.  
Cilj je da imamo **jasan pregled**, **problema na koje smo naišli** i **trenutnog stanja projekta** pre nego što pređemo u sledeću fazu.

---

## 🎯 Ciljevi Faze 2
- Dodati **design tokens paket** sa Style Dictionary build sistemom  
- Generisati CSS, SCSS i JS izlaze za teme i tokene  
- Omogućiti izbor više tema (light, dark, high-contrast)  
- Napraviti validaciju i kontrast test skripte  
- Testirati integraciju sa `react-demo` i vizuelno potvrditi da `DynButton` radi sa tokenima

---

## 📂 Struktura projekta (novi delovi)

```
packages/design-tokens/
├── tokens/
│   ├── color/
│   │   ├── base.json
│   │   ├── semantic.json
│   │   └── theme.json
│   ├── size/
│   │   ├── font.json
│   │   └── spacing.json
│   └── shadow/
│       └── elevation.json
├── themes/
│   ├── light.scss
│   ├── dark.scss
│   └── high-contrast.scss
├── scripts/
│   ├── test-contrast.js
│   └── validate-tokens.js
└── style-dictionary.config.js
```

---

## ✅ Šta trenutno imamo
- `design-tokens` paket sa Style Dictionary konfiguracijom  
- Generisane SCSS, CSS i JS varijante tokena (`/build`)  
- `themes/` fajlovi za light, dark i high-contrast  
- Skripte za validaciju i kontrast testove  
- `react-demo` prikazuje `DynButton` i potvrđeno vizuelno u browseru

---

## ⚠️ Izazovi i rešenja u Fazi 2
1. **Problem:** `turbo` i `pnpm` build nisu nalazili task  
   **Rešenje:** dodali smo `dev` i `build` skripte u `react-demo/package.json` i instalirali `turbo` na root nivou.  

2. **Problem:** `react-demo` build nije uspevao jer nije bilo `index.html`  
   **Rešenje:** dodat `apps/react-demo/index.html` fajl.  

3. **Problem:** `DynButton` JSX nije bio prepoznat u Rollup buildu  
   **Rešenje:** promenjen `index.ts` u `index.tsx` i podešen `@vitejs/plugin-react` u Rollup konfiguraciji.  

4. **Problem:** Nedostatak zavisnosti (`tslib`, `esbuild`, plugin-i)  
   **Rešenje:** instalirane sve neophodne devDependencies na root nivou (`pnpm add -D -w`).  

5. **Problem:** Potvrda vizuelne integracije  
   **Rešenje:** pokrenut `pnpm dev --filter react-demo`, otvoren `http://localhost:5173`, potvrđen prikaz dugmeta.

---

## 📊 Trenutno stanje
Projekat nakon Faze 2 je stabilan i spreman za dalje proširenje:
- **Design tokens sistem** radi i daje više formata  
- **DynButton** je prikazan i koristi token-e  
- **Teme** se mogu menjati kroz klase na `body`  
- **Demo aplikacija** omogućava vizuelnu proveru u browseru

---
