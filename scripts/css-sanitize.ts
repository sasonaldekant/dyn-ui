import fs from 'node:fs';
import path from 'node:path';

const ROOTS = process.argv.slice(2).length ? process.argv.slice(2) : [
  'packages',
  '.storybook'
];

const DRY_RUN = !!process.env.DRY_RUN;
const BACKUP = !!process.env.BACKUP;
const MAP_PATH = 'config/migrate.map.json';

type Mapping = Record<string,string>;
const overrides: Mapping = fs.existsSync(MAP_PATH) ? JSON.parse(fs.readFileSync(MAP_PATH,'utf8')) : {};

type FileReport = {
  file: string;
  changed: boolean;
  fixes: {
    slashesToCssComments: number;
    scssDirectivesCommented: number;
    dollarVarsConverted: number;
  };
  warnings: string[];
};

function listCssFiles(root: string): string[] {
  const out: string[] = [];
  function walk(d: string) {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.endsWith('.css')) out.push(full);
    }
  }
  walk(root);
  return out;
}

function sanitizeCss(src: string): { text: string; fixes: FileReport['fixes']; warnings: string[] } {
  const lines = src.split(/\r?\n/);
  let slashes = 0, scssDir = 0, dollarVars = 0;
  const warnings: string[] = [];

  // Convert `// comment` -> `/* comment */` when it's at start or after whitespace
  // but do not touch URLs like http:// or https://
  for (let i=0;i<lines.length;i++){
    const ln = lines[i];
    const m = ln.match(/^(\s*)\/\/(.*)$/);
    if (m) {
      lines[i] = `${m[1]}/*${m[2]} */`;
      slashes++;
      continue;
    }
    // inline: " ...  // comment"
    // avoid urls: we check that before '//' there's no 'http:' or 'https:' on the same line
    const inlineIdx = ln.indexOf('//');
    if (inlineIdx >= 0) {
      const before = ln.slice(0, inlineIdx);
      if (!/https?:\s*\/\s*\//i.test(ln)) {
        // preserve preceding space if any
        const rep = ln.replace(/(^|[\s])\/\/(.*)$/, (_m, p1, p2) => `${p1}/*${p2} */`);
        if (rep !== ln) { lines[i] = rep; slashes++; }
      }
    }
  }

  // Comment out SCSS-only directives that must not appear in plain CSS
  for (let i=0;i<lines.length;i++){
    const ln = lines[i];
    if (/@(mixin|include|use|forward|extend)\b/.test(ln)) {
      lines[i] = `/* ${ln} */`;
      scssDir++;
    }
  }

  // Convert $vars that accidentally leaked into .css
  let text = lines.join('\n');
  const rxDollar = /\$[a-zA-Z0-9_-]+/g;
  text = text.replace(rxDollar, (m) => {
    if (overrides[m]) { dollarVars++; return overrides[m]; }
    const body = m.slice(1);
    if (/^[a-zA-Z]+-[a-zA-Z0-9_-]+$/.test(body)) { dollarVars++; return `var(--dyn-${body})`; }
    if (/^(primary|secondary|text|bg|muted|success|warning|danger|neutral)$/.test(body)) { dollarVars++; return `var(--dyn-colors-${body})`; }
    if (/^radius-/.test(body)) { dollarVars++; return `var(--dyn-radius-${body.replace(/^radius-/, '')})`; }
    if (/^spacing-/.test(body)) { dollarVars++; return `var(--dyn-spacing-${body.replace(/^spacing-/, '')})`; }
    if (/^size-/.test(body)) { dollarVars++; return `var(--dyn-size-${body.replace(/^size-/, '')})`; }
    if (/^fontSize-/.test(body)) { dollarVars++; return `var(--dyn-fontSize-${body.replace(/^fontSize-/, '')})`; }
    if (/^fontWeight-/.test(body)) { dollarVars++; return `var(--dyn-fontWeight-${body.replace(/^fontWeight-/, '')})`; }
    warnings.push(`Unmapped $var "${m}"`);
    return m; // leave as-is but warn
  });

  return { text, fixes: { slashesToCssComments: slashes, scssDirectivesCommented: scssDir, dollarVarsConverted: dollarVars }, warnings };
}

const allFiles = ROOTS.flatMap(listCssFiles);
const report: FileReport[] = [];
let changedCount = 0;

for (const file of allFiles) {
  const src = fs.readFileSync(file, 'utf8');
  const { text, fixes, warnings } = sanitizeCss(src);
  const changed = text !== src;
  if (changed) {
    if (BACKUP) fs.writeFileSync(file + '.bak', src, 'utf8');
    if (!DRY_RUN) fs.writeFileSync(file, text, 'utf8');
    changedCount++;
  }
  report.push({ file, changed, fixes, warnings });
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/css-sanitizer-report.json', JSON.stringify(report, null, 2));

console.log(`[css-sanitize] Scanned: ${allFiles.length} .css file(s). Changed: ${changedCount}. Report: reports/css-sanitizer-report.json`);
