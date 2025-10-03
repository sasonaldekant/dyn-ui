#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const pattern = process.argv[2] || 'packages/dyn-ui-react/src/**/*.{ts,tsx}';
const files = await glob(pattern, { nodir: true });

const re = /AVATAR_SIZES\[(\s*size\s*)\]/g;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  if (re.test(src)) {
    const out = src.replace(re, 'AVATAR_SIZES[$1 as keyof typeof AVATAR_SIZES]');
    if (out !== src) {
      fs.writeFileSync(file, out, 'utf8');
      console.log('✔ patched AVATAR_SIZES indexing:', path.relative(process.cwd(), file));
    }
  }
}
