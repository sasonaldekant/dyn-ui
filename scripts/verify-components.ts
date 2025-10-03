import fs from 'node:fs';
import path from 'node:path';

const COMPONENTS_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src/components');
const IGNORE_DIRS = new Set(['__mocks__','__fixtures__','__snapshots__']);
const STORY_REGEX = /\.stories\.(tsx|mdx)$/;
const TEST_REGEX  = /\.(test|spec)\.(tsx?|ts)$/;

type Row = {
  component: string;
  dir: string;
  hasStory: boolean;
  hasTest: boolean;
  stories: string[];
  tests: string[];
};

function isDir(p: string) { try { return fs.statSync(p).isDirectory(); } catch { return false; } }
function walk(dir: string, acc: string[] = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

if (!isDir(COMPONENTS_ROOT)) {
  console.error(`[verify-components] Not found: ${COMPONENTS_ROOT}`);
  process.exit(2);
}

const dirs = fs.readdirSync(COMPONENTS_ROOT).filter(n => isDir(path.join(COMPONENTS_ROOT, n)));
const rows: Row[] = [];

for (const comp of dirs) {
  const compDir = path.join(COMPONENTS_ROOT, comp);
  const files = walk(compDir);
  const stories = files.filter(f => STORY_REGEX.test(f)).map(f => path.relative(process.cwd(), f));
  const tests = files.filter(f => TEST_REGEX.test(f)).map(f => path.relative(process.cwd(), f));
  const hasStory = stories.length > 0;
  const hasTest = tests.length > 0;
  rows.push({ component: comp, dir: path.relative(process.cwd(), compDir), hasStory, hasTest, stories, tests });
}

rows.sort((a,b) => a.component.localeCompare(b.component));

console.log('Component                        Story  Test   Stories / Tests');
console.log('-------------------------------- -----  ----   ----------------------------------------------');
for (const r of rows) {
  console.log(`${(r.component+'                                ').slice(0,32)}  ${(r.hasStory?'yes':'no').padEnd(5)}  ${(r.hasTest?'yes':'no').padEnd(4)}   ${[...r.stories, ...r.tests].map(s=>path.basename(s)).join(', ')}`);
}

const outDir = path.resolve(process.cwd(), 'reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'components-verification.json'), JSON.stringify(rows, null, 2));

const mdLines: string[] = [];
mdLines.push('| Component | Story | Test |');
mdLines.push('|---|:---:|:---:|');
for (const r of rows) mdLines.push(`| ${r.component} | ${r.hasStory ? '✅' : '❌'} | ${r.hasTest ? '✅' : '❌'} |`);
fs.writeFileSync(path.join(outDir, 'components-verification.md'), mdLines.join('\n'));
console.log('\n[verify-components] Wrote reports/components-verification.{json,md}');
