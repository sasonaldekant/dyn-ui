#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const pattern = process.argv[2] || 'packages/dyn-ui-react/src/**/*.{ts,tsx}';
const files = await glob(pattern, { nodir: true });

const re = /export\s+const\s+\w+\s*:\s*React\.FC<\s*([^>]+)\s*>\s*=\s*\(\s*\{([\s\S]*?)\}\s*\)\s*=>/g;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;

  src = src.replace(re, (m, propsType, destructured) => {
    changed = true;
    return m.replace('}) =>', `}: ${propsType}) =>`);
  });

  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log('✔ annotated props param:', path.relative(process.cwd(), file));
  }
}
