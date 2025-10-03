#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const pattern = process.argv[2] || 'packages/dyn-ui-react/src/**/*.{ts,tsx}';
const files = await glob(pattern, { nodir: true });

const reactDefaultRegex = /import\s+React\s*,\s*{([^}]*)}\s*from\s*['"]react['"];?/g;
const reactOnlyDefaultRegex = /import\s+React\s+from\s*['"]react['"];?/g;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;

  src = src.replace(reactDefaultRegex, (_m, g1) => {
    changed = true;
    const named = g1.split(',').map(s => s.trim()).filter(Boolean).join(', ');
    return `import * as React from 'react';\nimport { ${named} } from 'react';`;
  });

  src = src.replace(reactOnlyDefaultRegex, (_m) => {
    changed = true;
    return `import * as React from 'react';`;
  });

  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log('✔ fixed React import:', path.relative(process.cwd(), file));
  }
}
