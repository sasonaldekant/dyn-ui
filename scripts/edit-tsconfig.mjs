// Smarter tsconfig patcher for dyn-ui (Vitest types + jest-dom + Node)
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();

const candidates = [
  path.join(repoRoot, 'tsconfig.json'),
  path.join(repoRoot, 'tsconfig.base.json'),
];

let targetPath = null;
for (const c of candidates) {
  if (fs.existsSync(c)) { targetPath = c; break; }
}

// fallback to package tsconfig if root not found
const pkgTs = path.join(repoRoot, 'packages', 'dyn-ui-react', 'tsconfig.json');
const tried = [...candidates, pkgTs];

function patchTsconfig(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(raw);
  json.compilerOptions = json.compilerOptions || {};

  // ensure "types"
  const neededTypes = ['vitest/globals', '@testing-library/jest-dom', 'node'];
  const typesSet = new Set([...(json.compilerOptions.types || [])]);
  neededTypes.forEach(t => typesSet.add(t));
  json.compilerOptions.types = Array.from(typesSet);

  // ensure "include" contains vitest.setup.ts and env.d.ts (only if root tsconfig)
  const baseName = path.basename(filePath);
  const includeSet = new Set([...(json.include || [])]);
  includeSet.add('packages/**/*');
  includeSet.add('vitest.setup.ts');
  includeSet.add('env.d.ts');
  json.include = Array.from(includeSet);

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`✅ Patched ${path.relative(repoRoot, filePath)}`);
}

if (targetPath) {
  patchTsconfig(targetPath);
} else if (fs.existsSync(pkgTs)) {
  patchTsconfig(pkgTs);
} else {
  console.error('❌ Nije pronađen ni tsconfig.json/tsconfig.base.json u root-u, ni packages/dyn-ui-react/tsconfig.json.');
  console.error('   Ručno dodaj u odgovarajući tsconfig:');
  console.error('   "compilerOptions": { "types": ["vitest/globals", "@testing-library/jest-dom", "node"] },');
  console.error('   "include": ["packages/**/*", "vitest.setup.ts", "env.d.ts"]');
  process.exit(1);
}
