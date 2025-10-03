# OPTIONAL: align Vite + Storybook versions (run from repo root)
Write-Host "Upgrading all Storybook packages to 9.1.x and Vite to ^5 ..." -ForegroundColor Cyan
pnpm -w up @storybook/*@^9.1.10
pnpm -w up vite@^5 @vitejs/plugin-react@^4
Write-Host "Done. You may need to re-run install and fix any breaking changes." -ForegroundColor Green
