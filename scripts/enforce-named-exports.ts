import fs from 'node:fs';
import path from 'node:path';

const COMPONENTS_ROOT = 'packages/dyn-ui-react/src/components';
const DRY_RUN = !!process.env.DRY_RUN;
const BACKUP = !!process.env.BACKUP;

type Result = { file: string; action: string[] };

function exists(p: string) { try { fs.accessSync(p); return true; } catch { return false; } }

function ensureNamedExport(file: string, name: string): Result {
  const src = fs.readFileSync(file, 'utf8');
  const actions: string[] = [];
  let out = src;

  // export default function Name(...) -> export function Name(...)
  out = out.replace(new RegExp(`export\\s+default\\s+function\\s+${name}\\b`), (m) => {
    actions.push('default-fn->named-fn');
    return m.replace('export default function', 'export function');
  });

  // const Name = (...) => {}; export default Name;
  if (new RegExp(`\\bconst\\s+${name}\\b[\\s\\S]*?export\\s+default\\s+${name}\\s*;?`).test(out)) {
    out = out.replace(new RegExp(`\\bconst\\s+${name}\\b`), 'export const ' + name);
    out = out.replace(new RegExp(`\\n\\s*export\\s+default\\s+${name}\\s*;?`), (m) => {
      actions.push('remove-default-const');
      return '';
    });
  }

  // class Name ... export default Name;
  if (new RegExp(`\\bclass\\s+${name}\\b[\\s\\S]*?export\\s+default\\s+${name}\\s*;?`).test(out)) {
    out = out.replace(new RegExp(`\\bclass\\s+${name}\\b`), 'export class ' + name);
    out = out.replace(new RegExp(`\\n\\s*export\\s+default\\s+${name}\\s*;?`), (m) => {
      actions.push('remove-default-class');
      return '';
    });
  }

  // export default Name;  (ako smo gore već obezbedili export const/func/class)
  if (/\n\s*export\s+default\s+\w+\s*;?/.test(out)) {
    out = out.replace(/\n\s*export\s+default\s+\w+\s*;?/g, (m) => { actions.push('strip-default-line'); return '\n'; });
  }

  if (out !== src) {
    if (BACKUP) fs.writeFileSync(file + '.bak', src, 'utf8');
    if (!DRY_RUN) fs.writeFileSync(file, out, 'utf8');
  }

  return { file, action: actions };
}

if (!exists(COMPONENTS_ROOT)) {
  console.error(`[enforce-named] Not found: ${COMPONENTS_ROOT}`);
  process.exit(2);
}

const dirs = fs.readdirSync(COMPONENTS_ROOT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

const results: Result[] = [];
for (const dir of dirs) {
  const name = dir;
  const tsx = path.join(COMPONENTS_ROOT, dir, `${name}.tsx`);
  const ts = path.join(COMPONENTS_ROOT, dir, `${name}.ts`);
  const file = exists(tsx) ? tsx : (exists(ts) ? ts : '');
  if (!file) continue;
  results.push(ensureNamedExport(file, name));
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/enforce-named-exports.json', JSON.stringify(results, null, 2));
console.log(`[enforce-named] Done. Updated: ${results.filter(r=>r.action.length).length} file(s).`);
