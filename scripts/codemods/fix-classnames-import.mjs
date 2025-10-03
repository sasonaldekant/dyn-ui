#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const pattern = process.argv[2] || 'packages/dyn-ui-react/src/**/*.{ts,tsx}';
const files = await glob(pattern, { nodir: true });

const classNamesNamed = /import\s*{\s*classNames\s*}\s*from\s*['"]classnames['"];?/g;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  if (classNamesNamed.test(src)) {
    const out = src.replace(classNamesNamed, "import classNames from 'classnames';");
    fs.writeFileSync(file, out, 'utf8');
    console.log('✔ fixed classnames import:', path.relative(process.cwd(), file));
  }
}
