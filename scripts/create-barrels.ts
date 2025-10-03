import fs from 'node:fs';
import path from 'node:path';
const COMPONENTS_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src/components');
const isDir = (p: string): boolean => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
const exists = (p: string): boolean => { try { fs.accessSync(p); return true; } catch { return false; } };
if (!isDir(COMPONENTS_ROOT)) { console.error(`[create-barrels] Not found: ${COMPONENTS_ROOT}`); process.exit(2); }
const comps = fs.readdirSync(COMPONENTS_ROOT).filter(n => isDir(path.join(COMPONENTS_ROOT, n)));
let created = 0;
for (const comp of comps) {
  const dir = path.join(COMPONENTS_ROOT, comp);
  const entryTsx = path.join(dir, `${comp}.tsx`);
  const entryTs = path.join(dir, `${comp}.ts`);
  const indexTs = path.join(dir, 'index.ts');
  if (!exists(indexTs) && (exists(entryTsx) || exists(entryTs))) {
    fs.writeFileSync(indexTs, `export { default } from './${comp}';\nexport * from './${comp}';\n`);
    console.log(`[create-barrels] Created ${path.relative(process.cwd(), indexTs)}`);
    created++;
  }
}
console.log(`[create-barrels] Done. Created: ${created}`);
