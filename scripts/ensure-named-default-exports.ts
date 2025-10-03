import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'packages/dyn-ui-react/src/components';
const DRY_RUN = !!process.env.DRY_RUN;

type Row = {
  component: string;
  file: string;
  hasNamed: boolean;
  hasDefault: boolean;
  action: 'add-named' | 'add-default' | 'ok' | 'skip';
};

function exists(p: string) { try { fs.accessSync(p); return true; } catch { return false; } }

function ensureForFile(file: string, name: string): Row {
  const src = fs.readFileSync(file, 'utf8');

  const hasNamed = new RegExp(`export\\s+(const|function)\\s+${name}\\b|export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`).test(src);
  const hasDefault = /export\s+default\b/.test(src);

  let action: Row['action'] = 'ok';
  let out = src;

  if (hasDefault && !hasNamed) {
    const hasIdentifier = new RegExp(`\\bfunction\\s+${name}\\b|\\bconst\\s+${name}\\b|\\blet\\s+${name}\\b|\\bclass\\s+${name}\\b`).test(src);
    if (hasIdentifier) {
      out = src + `\nexport { ${name} };`;
      action = 'add-named';
    } else {
      action = 'skip';
    }
  } else if (hasNamed && !hasDefault) {
    out = src + `\nexport default ${name};`;
    action = 'add-default';
  }

  if (out !== src && !DRY_RUN) {
    fs.writeFileSync(file, out, 'utf8');
  }

  return { component: name, file, hasNamed, hasDefault, action };
}

const rows: Row[] = [];
if (!exists(ROOT)) {
  console.error(`[ensure-exports] Not found: ${ROOT}`);
  process.exit(2);
}

const dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
for (const dir of dirs) {
  const compName = dir;
  const tsx = path.join(ROOT, dir, `${compName}.tsx`);
  const ts = path.join(ROOT, dir, `${compName}.ts`);
  const file = exists(tsx) ? tsx : (exists(ts) ? ts : '');
  if (!file) continue;
  rows.push(ensureForFile(file, compName));
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/export-normalizer.json', JSON.stringify(rows, null, 2));
console.log('[ensure-exports] Done. Report: reports/export-normalizer.json');
for (const r of rows) {
  console.log(`- ${r.component}: ${r.action} (${r.hasNamed?'named✓':'named×'}, ${r.hasDefault?'default✓':'default×'})`);
}
