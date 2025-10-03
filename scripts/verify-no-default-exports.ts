import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['packages/dyn-ui-react/src'];
const FILE_RX = /\.(tsx?|jsx?)$/;
const IGNORE = /(\.stories\.(tsx|mdx)|\.story\.(tsx|mdx))$/;

function walk(d: string, a: string[] = []) {
  if (!fs.existsSync(d)) return a;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, a);
    else if (e.isFile() && FILE_RX.test(e.name)) a.push(f);
  }
  return a;
}

const files = ROOTS.flatMap(r => walk(r));
let violations = 0;

for (const file of files) {
  if (IGNORE.test(file)) continue;
  const txt = fs.readFileSync(file, 'utf8');
  if (/export\s+default\b/.test(txt)) {
    console.log(`[no-default-export] ${file}`);
    violations++;
  }
}

if (violations > 0) {
  console.error(`[no-default-export] Found ${violations} file(s) with default export.`);
  process.exit(1);
} else {
  console.log('[no-default-export] OK');
}
