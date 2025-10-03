import fs from 'node:fs';
import path from 'node:path';
const SRC_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src');
const COMPONENTS_ROOT = path.join(SRC_ROOT, 'components');
const CONTEXT_PATH_SUFFIX = 'contexts/IconDictionaryContext';
const walk = (dir: string, acc: string[] = []): string[] => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|mdx?)$/.test(e.name)) acc.push(full);
  }
  return acc;
};
const posix = (p: string) => p.split(path.sep).join('/');
const exists = (p: string) => { try { fs.accessSync(p); return true; } catch { return false; } };
const isDir = (p: string) => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
if (!exists(SRC_ROOT)) { console.error(`[verify-stories] Not found: ${SRC_ROOT}`); process.exit(2); }
const files = walk(SRC_ROOT);
type Issue = { file: string; type: string; message: string };
const issues: Issue[] = [];
// Provider
for (const file of files) {
  const code = fs.readFileSync(file, 'utf8');
  const has = /IconDictionaryProvider/.test(code);
  if (has) {
    const okImport = new RegExp(`from ['"].*${CONTEXT_PATH_SUFFIX}['"]`);
    const namedOK = /import\s*{[^}]*IconDictionaryProvider[^}]*}\s*from/.test(code);
    if (!okImport.test(code) || !namedOK) {
      issues.push({ file: posix(path.relative(process.cwd(), file)), type: 'provider-import', message: 'Use named import from contexts/IconDictionaryContext' });
    }
  }
}
// Avatar invalid prop
for (const file of files.filter(f => /DynAvatar.*stories\.(tsx|mdx)$/.test(f))) {
  const code = fs.readFileSync(file, 'utf8');
  if (/[\s{,]name\s*:/.test(code)) {
    issues.push({ file: posix(path.relative(process.cwd(), file)), type: 'avatar-name-prop', message: 'Remove `name:`; use `src`, `alt`, `size`, `initials`.' });
  }
}
// Missing barrels
if (isDir(COMPONENTS_ROOT)) {
  const comps = fs.readdirSync(COMPONENTS_ROOT).filter(n => isDir(path.join(COMPONENTS_ROOT, n)));
  for (const comp of comps) {
    const dir = path.join(COMPONENTS_ROOT, comp);
    if (!exists(path.join(dir, 'index.ts'))) {
      issues.push({ file: posix(path.relative(process.cwd(), dir)), type: 'missing-barrel', message: 'Missing index.ts (barrel).' });
    }
  }
}
// Token-ish checks
const tokenProps = ['size','variant','tone','radius','spacing','fontSize','fontWeight','color','bg','shadow'];
for (const file of files.filter(f => /\.stories\.(tsx|mdx)$/.test(f))) {
  const code = fs.readFileSync(file, 'utf8');
  if (/args\s*:\s*{[^}]*?(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|\b\d+(px|rem|em)\b)/s.test(code)) {
    issues.push({ file: posix(path.relative(process.cwd(), file)), type: 'stories-raw-values', message: 'Stories use raw px/rem/hex; prefer token keys.' });
  }
  const propRegex = new RegExp(`(${tokenProps.join('|')})\\s*:\\s*\\d+`, 's');
  if (propRegex.test(code)) {
    issues.push({ file: posix(path.relative(process.cwd(), file)), type: 'stories-numeric-token-prop', message: 'Token-like prop is numeric; use token key (e.g., "md").' });
  }
}
if (issues.length === 0) console.log('[verify-stories] No issues found 🎉');
else { console.log(`[verify-stories] Found ${issues.length} potential issue(s):`); for (const it of issues) console.log(`- [${it.type}] ${it.file} :: ${it.message}`); process.exitCode = 1; }
