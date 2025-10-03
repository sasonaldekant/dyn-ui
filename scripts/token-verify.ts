import fs from 'node:fs';
import path from 'node:path';

// We'll leverage runtime resolver via simple require fallback for tokens: read 'light' from design-tokens if present.
const SRC_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src');
const DT_THEMES_DIR = path.resolve(SRC_ROOT, 'design-tokens', 'themes');

type TokenValue = string | { value: string };
type TokenGroup = Record<string, TokenValue | TokenGroup>;
type Tokens = Record<string, TokenGroup | string[] | undefined>;

function pickOneTheme(): Tokens | null {
  try {
    const files = fs.readdirSync(DT_THEMES_DIR).filter(f => /\.(ts|js|json|tsx)$/.test(f));
    const light = files.find(f => /^light\./.test(f));
    const chosen = light ?? files[0];
    if (!chosen) return null;
    // naive JSON import if .json, otherwise skip (runtime ESM ts import isn't trivial from script)
    if (chosen.endsWith('.json')) {
      const raw = JSON.parse(fs.readFileSync(path.join(DT_THEMES_DIR, chosen), 'utf8'));
      return raw?.default ?? raw?.tokens ?? raw;
    }
  } catch {}
  // fallback: use our local fallback theme JSON
  try {
    const fallback = JSON.parse(fs.readFileSync(path.join(SRC_ROOT, 'theme', 'themes', 'light.json'), 'utf8'));
    return fallback;
  } catch {}
  return null;
}

const TOKENS = pickOneTheme();
if (!TOKENS) { console.error('[token-verify] Nema dostupne teme (design-tokens ili fallback).'); process.exit(2); }

function flattenVals(obj?: TokenGroup): Record<string,string> {
  const out: Record<string,string> = {};
  if (!obj) return out;
  for (const [k,v] of Object.entries(obj)) {
    if (typeof v === 'object' && v && !('value' in v)) Object.assign(out, flattenVals(v as TokenGroup));
    else out[k] = typeof v === 'object' && v ? String(v.value) : String(v);
  }
  return out;
}

const tokenProps = ['size','variant','tone','radius','spacing','fontSize','fontWeight','color','bg','shadow'] as const;
type TokenProp = typeof tokenProps[number];

const keySets: Record<TokenProp, string[]> = {
  size: Object.keys((TOKENS as any).size || {}),
  radius: Object.keys((TOKENS as any).radius || {}),
  spacing: Object.keys((TOKENS as any).spacing || {}),
  fontSize: Object.keys((TOKENS as any).fontSize || {}),
  fontWeight: Object.keys((TOKENS as any).fontWeight || {}),
  variant: ((TOKENS as any).variants || []) as string[],
  tone: ((TOKENS as any).tones || []) as string[],
  color: Object.keys((TOKENS as any).colors || {}),
  bg: Object.keys((TOKENS as any).colors || {}),
  shadow: Object.keys((TOKENS as any).shadow || {}),
};

const reverse = {
  size: Object.fromEntries(Object.entries(flattenVals((TOKENS as any).size)).map(([k,v])=>[v,k])),
  radius: Object.fromEntries(Object.entries(flattenVals((TOKENS as any).radius)).map(([k,v])=>[v,k])),
  spacing: Object.fromEntries(Object.entries(flattenVals((TOKENS as any).spacing)).map(([k,v])=>[v,k])),
  fontSize: Object.fromEntries(Object.entries(flattenVals((TOKENS as any).fontSize)).map(([k,v])=>[v,k])),
  fontWeight: Object.fromEntries(Object.entries(flattenVals((TOKENS as any).fontWeight)).map(([k,v])=>[v,k])),
  color: Object.fromEntries(Object.entries(flattenVals((TOKENS as any).colors)).map(([k,v])=>[v,k])),
};

function isValidToken(prop: TokenProp, val: string): boolean {
  const set = keySets[prop];
  return !set || set.includes(val);
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|mdx?|css|scss)$/.test(e.name)) acc.push(full);
  }
  return acc;
}

const files = walk(SRC_ROOT);
type Issue = { file: string; type: string; message: string };
const issues: Issue[] = [];

// stories
for (const file of files.filter(f => /\.stories\.(tsx|mdx)$/.test(f))) {
  const code = fs.readFileSync(file, 'utf8');
  for (const prop of tokenProps) {
    const reStr = new RegExp(`${prop}\\s*:\\s*['"]([^'"]+)['"]`, 'g');
    for (const m of code.matchAll(reStr)) {
      const val = m[1];
      if (!isValidToken(prop, val)) {
        issues.push({file, type: 'story-invalid-token', message: `${prop}: "${val}" nije validan token key`});
      }
    }
    const reNum = new RegExp(`${prop}\\s*:\\s*(['"]?)(\\d+(?:px)?)\\1`, 'g');
    for (const m of code.matchAll(reNum)) {
      const raw = m[2];
      const dict = (reverse as any)[prop] as Record<string,string>;
      if (!dict || !dict[raw]) issues.push({file, type: 'story-raw-value', message: `${prop}: ${raw} — zameni token ključem`});
    }
  }
  if (/args\\s*:\\s*{[^}]*#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})/s.test(code)) {
    issues.push({file, type: 'story-raw-color', message: 'args sadrže hex — koristi color token key'});
  }
}

// source
for (const file of files.filter(f => /\.(tsx|ts|css|scss)$/.test(f))) {
  const code = fs.readFileSync(file, 'utf8');
  const lines = code.split(/\r?\n/);
  for (let i=0;i<lines.length;i++){
    const ln = lines[i];
    const tokenized = /var\(--|tokens?\.|theme\(|theme\./.test(ln);
    if (/#[0-9a-fA-F]{3,6}/.test(ln) && !tokenized) {
      issues.push({file, type: 'src-raw-hex', message: `hex boja bez tokena (linija ${i+1})`});
    }
    if (/\b\d+(px|rem|em|vh|vw)\b/.test(ln) && !tokenized) {
      issues.push({file, type: 'src-raw-size', message: `veličina bez tokena (linija ${i+1})`});
    }
  }
}

if (issues.length === 0) console.log('[token-verify] No issues found 🎉');
else { console.log(`[token-verify] Found ${issues.length} potential issue(s):`); for (const it of issues) console.log(`- [${it.type}] ${it.file} :: ${it.message}`); process.exitCode = 1; }
