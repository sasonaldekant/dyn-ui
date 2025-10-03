import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['packages'];
const DRY_RUN = !!process.env.DRY_RUN;
const BACKUP = !!process.env.BACKUP;
const FILE_RX = /\.(tsx?|jsx?)$/;

function walk(d: string, a: string[] = []) {
  if (!fs.existsSync(d)) return a;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, a);
    else if (e.isFile() && FILE_RX.test(e.name)) a.push(f);
  }
  return a;
}

function baseNameFromImport(spec: string): string {
  const m = spec.match(/([^\/'"]+)(?:['"])?$/);
  return m ? m[1].replace(/\.(tsx?|jsx?)$/, '') : 'Component';
}

const files = ROOTS.flatMap(r => walk(r));
let changed = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  // const X = lazy(() => import('path/to/Comp'));
  after = after.replace(/lazy\(\s*\(\s*\)\s*=>\s*import\((['"])([^'"]+)\1\)\s*\)/g, (m, q, spec) => {
    const guess = baseNameFromImport(spec);
    return `lazy(() => import(${q}${spec}${q}).then(m => ({ default: m.${guess} })))`;
  });

  if (after !== before) {
    if (BACKUP) fs.writeFileSync(file + '.bak', before, 'utf8');
    if (!DRY_RUN) fs.writeFileSync(file, after, 'utf8');
    changed++;
    console.log(`[fix-lazy] ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`[fix-lazy] Done. Files changed: ${changed}`);
