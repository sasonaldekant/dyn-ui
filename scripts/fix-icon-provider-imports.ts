import fs from 'node:fs';
import path from 'node:path';
const SRC_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src');
const CONTEXT_FILE = path.join(SRC_ROOT, 'contexts', 'IconDictionaryContext.tsx');
type Dirent = import('node:fs').Dirent;
function walk(dir: string, acc: string[] = []): string[] {
  const entries: Dirent[] = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|mdx?)$/.test(e.name)) acc.push(full);
  }
  return acc;
}
const toPosix = (p: string) => p.split(path.sep).join('/');
function relImport(fromFile: string, toFile: string): string {
  const rel = path.relative(path.dirname(fromFile), toFile).replace(/\.(tsx?|jsx?)$/, '');
  return toPosix(rel.startsWith('.') ? rel : './' + rel);
}
if (!fs.existsSync(SRC_ROOT)) { console.error(`[fix-icon-provider-imports] Not found: ${SRC_ROOT}`); process.exit(2); }
const files = walk(SRC_ROOT);
let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let code = before;
  const correct = relImport(file, CONTEXT_FILE);
  code = code.replace(/import\s+IconDictionaryProvider\s+from\s+['"].*IconDictionary\/IconDictionaryProvider['"]\s*;?/g, `import { IconDictionaryProvider } from '${correct}';`);
  code = code.replace(/import\s*{[^}]*IconDictionaryProvider[^}]*}\s*from\s*['"].*IconDictionary\/IconDictionaryProvider['"]\s*;?/g, `import { IconDictionaryProvider } from '${correct}';`);
  code = code.replace(/import\s+IconDictionaryProvider\s+from\s+['"].*contexts\/IconDictionaryContext['"]\s*;?/g, `import { IconDictionaryProvider } from '${correct}';`);
  code = code.replace(/import\s*{[^}]*IconDictionaryProvider[^}]*}\s*from\s*['"].*contexts\/IconDictionaryContext['"]\s*;?/g, `import { IconDictionaryProvider } from '${correct}';`);
  if (code !== before) { fs.writeFileSync(file, code); console.log(`[fix-icon-provider-imports] Rewrote in ${path.relative(process.cwd(), file)}`); changed++; }
}
console.log(`[fix-icon-provider-imports] Done. Files changed: ${changed}`);
