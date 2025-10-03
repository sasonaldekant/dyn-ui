import fs from 'node:fs';
import path from 'node:path';
const SRC_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src');
function walk(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|ts|css|scss)$/.test(e.name)) acc.push(full);
  } return acc;
}
const posix = (p: string) => p.split(path.sep).join('/');
const exists = (p: string) => { try { fs.accessSync(p); return true; } catch { return false; } };
if (!exists(SRC_ROOT)) { console.error(`[scan-hardcoded-styles] Not found: ${SRC_ROOT}`); process.exit(2); }
const files = walk(SRC_ROOT);
type Issue = { file: string; type: 'hex'|'size'; line: number; text: string };
const issues: Issue[] = [];
for (const file of files) {
  const code = fs.readFileSync(file, 'utf8'); const lines = code.split(/\r?\n/);
  for (let i=0;i<lines.length;i++) {
    const ln = lines[i]; const tokenized = /var\(--|tokens?\.|theme\(|theme\./.test(ln);
    if (/#[0-9a-fA-F]{3,6}/.test(ln) && !tokenized) issues.push({file, type: 'hex', line: i+1, text: ln.trim().slice(0,160)});
    if (/\b\d+(px|rem|em|vh|vw)\b/.test(ln) && !tokenized) issues.push({file, type: 'size', line: i+1, text: ln.trim().slice(0,160)});
  }
}
if (issues.length === 0) console.log('[scan-hardcoded-styles] No issues found 🎉');
else { console.log(`[scan-hardcoded-styles] Found ${issues.length} potential issue(s):`);
  for (const it of issues) console.log(`- [${it.type}] ${it.file}:${it.line} :: ${it.text}`);
  process.exitCode = 1;
}
