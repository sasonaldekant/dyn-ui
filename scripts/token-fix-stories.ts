import fs from 'node:fs';
import path from 'node:path';

const SRC_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src');
const FALLBACK_TOKENS_PATH = path.resolve(SRC_ROOT, 'theme', 'themes', 'light.json');

type TokenValue = string | { value: string };
type TokenGroup = Record<string, TokenValue | TokenGroup>;
type Tokens = Record<string, TokenGroup | string[] | undefined>;

function readTokens(): Tokens | null {
  try {
    const raw = JSON.parse(fs.readFileSync(FALLBACK_TOKENS_PATH, 'utf8'));
    return raw;
  } catch { return null; }
}

const TOKENS = readTokens();
const flattenVals = (obj?: TokenGroup): Record<string,string> => {
  const out: Record<string,string> = {}; if (!obj) return out;
  for (const [k,v] of Object.entries(obj)) {
    if (typeof v === 'object' && v && !('value' in v)) Object.assign(out, flattenVals(v as TokenGroup));
    else out[k] = typeof v === 'object' && v ? String(v.value) : String(v);
  } return out;
};

const reverse: Record<string, Record<string,string>> = TOKENS ? {
  size: Object.fromEntries(Object.entries(flattenVals(TOKENS.size as TokenGroup)).map(([k,v])=>[v,k])),
  radius: Object.fromEntries(Object.entries(flattenVals(TOKENS.radius as TokenGroup)).map(([k,v])=>[v,k])),
  spacing: Object.fromEntries(Object.entries(flattenVals(TOKENS.spacing as TokenGroup)).map(([k,v])=>[v,k])),
  fontSize: Object.fromEntries(Object.entries(flattenVals(TOKENS.fontSize as TokenGroup)).map(([k,v])=>[v,k])),
  fontWeight: Object.fromEntries(Object.entries(flattenVals(TOKENS.fontWeight as TokenGroup)).map(([k,v])=>[v,k])),
  color: Object.fromEntries(Object.entries(flattenVals(TOKENS.colors as TokenGroup)).map(([k,v])=>[v,k])),
} : {};

function walk(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|mdx?)$/.test(e.name)) acc.push(full);
  } return acc;
}

const files = walk(SRC_ROOT).filter(f => /\.stories\.(tsx|mdx)$/.test(f));
let changes = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8'); let code = before;
  for (const [prop, dict] of Object.entries(reverse)) {
    for (const [raw, key] of Object.entries(dict)) {
      const rx1 = new RegExp(`(${prop}\\s*:\\s*)['"]${raw}['"]`, 'g'); code = code.replace(rx1, `$1'${key}'`);
      const num = parseInt(String(raw), 10);
      if (!Number.isNaN(num)) { const rx2 = new RegExp(`(${prop}\\s*:\\s*)${num}(?=[^\w])`, 'g'); code = code.replace(rx2, `$1'${key}'`); }
    }
  }
  if (code !== before) { fs.writeFileSync(file, code); console.log(`[token-fix-stories] Patched ${path.relative(process.cwd(), file)}`); changes++; }
}
console.log(`[token-fix-stories] Done. Files changed: ${changes}`);
