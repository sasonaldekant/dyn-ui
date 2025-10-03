import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'packages/dyn-ui-react/src/components';

type Row = {
  component: string;
  file: string;
  hasNamed: boolean;
  hasDefault: boolean;
};

function exists(p: string) { try { fs.accessSync(p); return true; } catch { return false; } }

const rows: Row[] = [];
if (!exists(ROOT)) { console.error(`[verify-exports] Not found: ${ROOT}`); process.exit(2); }
const dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

for (const dir of dirs) {
  const compName = dir;
  const tsx = path.join(ROOT, dir, `${compName}.tsx`);
  const ts = path.join(ROOT, dir, `${compName}.ts`);
  const file = exists(tsx) ? tsx : (exists(ts) ? ts : '');
  if (!file) continue;
  const src = fs.readFileSync(file, 'utf8');
  const hasNamed = new RegExp(`export\\s+(const|function)\\s+${compName}\\b|export\\s*\\{[^}]*\\b${compName}\\b[^}]*\\}`).test(src);
  const hasDefault = /export\s+default\b/.test(src);
  rows.push({ component: compName, file, hasNamed, hasDefault });
}

rows.sort((a,b)=> a.component.localeCompare(b.component));

console.log('Component                        Named  Default  File');
console.log('-------------------------------- -----  -------  ----');
for (const r of rows) {
  console.log(`${(r.component+'                                ').slice(0,32)}  ${(r.hasNamed?'yes':'no').padEnd(5)}  ${(r.hasDefault?'yes':'no').padEnd(7)}  ${r.file}`);
}
