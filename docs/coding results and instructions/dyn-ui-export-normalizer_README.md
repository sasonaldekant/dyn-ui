# dyn-ui — Export Normalizer (default + named)

Greška:
> The requested module '<path>/DynIcon.tsx' does not provide an export named 'DynIcon'

znači da fajl nema **named export** `DynIcon` (ima samo `export default`) ili obrnuto.
Alat:

1) skenira sve komponente ` packages/dyn-ui-react/src/components/* ` ,
2) u `<Name>/<Name>.tsx|ts` osigurava **i default i named** export,
3) pravi report.

## Upotreba

```bash
pnpm add -D tsx @types/node

# dry-run (samo report)
DRY_RUN=1 pnpm tsx scripts/ensure-named-default-exports.ts

# normalizacija
pnpm tsx scripts/ensure-named-default-exports.ts

# verifikacija
pnpm tsx scripts/verify-exports.ts
```
