# 📘 STEP 1 – Summary & Project Organization

Ovaj dokument predstavlja **sažetak Faze 1** implementacije projekta **Dyn UI**.  
Cilj je da imamo **jasan pregled onoga što je urađeno**, **problema na koje smo naišli** i **trenutnog stanja projekta** pre nego što pređemo u sledeću fazu.

---

## 🎯 Ciljevi Faze 1
- Postaviti **monorepo** arhitekturu pomoću **PNPM workspaces + Turborepo**  
- Kreirati osnovnu biblioteku komponenti: **`dyn-ui-react`**  
- Postaviti **demo aplikaciju**: **`react-demo`** (Vite)  
- Implementirati i prikazati prvu komponentu (`DynButton`)  
- Osigurati da build i dev server rade kako treba

---

## 📂 Struktura projekta (nakon čišćenja)

```
dyn-ui/
│── apps/
│   └── react-demo/         # Demo aplikacija (Vite)
│       ├── index.html
│       ├── vite.config.ts
│       ├── src/
│       │   └── main.tsx
│       └── package.json
│
│── packages/
│   ├── design-tokens/      # Placeholder paket (spreman za sledeću fazu)
│   │   └── package.json
│   └── dyn-ui-react/       # Biblioteka React komponenti
│       ├── rollup.config.mjs
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── src/
│       │   └── index.tsx   # DynButton komponenta
│       └── package.json
│
│── turbo.json              # Turborepo konfiguracija
│── pnpm-workspace.yaml     # PNPM workspace definicija
│── tsconfig.base.json      # Bazni TypeScript config
│── package.json            # Root config
│── README.md               # Glavni dokument za projekat
│── .gitignore              # Ignorisanje dist, node_modules, .turbo itd.
│── .eslintrc.js            # ESLint konfiguracija
│── .prettierrc.js          # Prettier konfiguracija
│── .editorconfig           # Editor formatting pravila
```

---

## ✅ Šta trenutno imamo
- **Monorepo podešen i funkcionalan**  
- **`dyn-ui-react` biblioteka** sa prvom komponentom:
  ```tsx
  export const DynButton: React.FC = () => <button>Dyn Button</button>;
  ```
- **Build sistem (Rollup)** radi i generiše `dist/` bundle  
- **Demo aplikacija (`react-demo`)** koristi biblioteku i prikazuje `DynButton`  
- **Dev server (Vite)** radi na `http://localhost:5173`  

---

## ⚠️ Izazovi i rešenja u Fazi 1
1. **Problem:** `rollup` nije bio pronađen u PATH →  
   **Rešenje:** instaliran globalno kao `devDependency` na root nivou (`-w` flag).  

2. **Problem:** nedostajao `tslib` →  
   **Rešenje:** instaliran `tslib` kao dependency.  

3. **Problem:** JSX kod u `index.ts` nije se parsirao →  
   **Rešenje:** promenjen u `index.tsx` (ispravna ekstenzija za JSX/TSX).  

4. **Problem:** `react-demo` build nije radio jer nije imao `index.html` →  
   **Rešenje:** dodat `index.html` u root `apps/react-demo`.  

5. **Problem:** U projektu su ostajali nepotrebni fajlovi (`dist/`, `.turbo/`, `node_modules/`) →  
   **Rešenje:** očišćeno i dodat `.gitignore`.  

---

## 📊 Trenutno stanje
Projekat je spreman za dalje faze:
- imamo validan monorepo setup  
- biblioteka komponenti se uspešno build-uje  
- demo aplikacija se uspešno pokreće  
- potvrđeno u browseru da se prva komponenta vidi  

---
