import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['packages', '.storybook'];
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

const files = ROOTS.flatMap(r => walk(r));
let changed = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  // import Comp from '...';
  after = after.replace(/import\s+([A-Za-z_$][\w$]*)\s+from\s+(['"][^'"]+['"]);?/g, (m, def, src) => {
    // Skip storybook meta default export files - but this is an import, so safe
    return `import { ${def} } from ${src};`;
  });

  // import Comp, { X, Y } from '...';
  after = after.replace(/import\s+([A-Za-z_$][\w$]*)\s*,\s*\{([^}]+)\}\s+from\s+(['"][^'"]+['"]);?/g, (m, def, rest, src) => {
    const named = rest.split(',').map(s => s.trim()).filter(Boolean);
    return `import { ${[def, ...named].join(', ')} } from ${src};`;
  });

  if (after !== before) {
    if (BACKUP) fs.writeFileSync(file + '.bak', before, 'utf8');
    if (!DRY_RUN) fs.writeFileSync(file, after, 'utf8');
    changed++;
    console.log(`[imports->named] ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`[imports->named] Done. Files changed: ${changed}`);
