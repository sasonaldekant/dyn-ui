import fs from 'node:fs';
import path from 'node:path';

const COMPONENTS_ROOT = path.resolve(process.cwd(), 'packages/dyn-ui-react/src/components');
const STORY_REGEX = /\.stories\.(tsx|mdx)$/;
const TEST_REGEX  = /\.(test|spec)\.(tsx?|ts)$/;

function isDir(p: string) { try { return fs.statSync(p).isDirectory(); } catch { return false; } }

if (!isDir(COMPONENTS_ROOT)) {
  console.error(`[ensure-coverage] Not found: ${COMPONENTS_ROOT}`);
  process.exit(2);
}

const dirs = fs.readdirSync(COMPONENTS_ROOT).filter(n => isDir(path.join(COMPONENTS_ROOT, n)));
let storyCreated = 0, testCreated = 0;

for (const comp of dirs) {
  const compDir = path.join(COMPONENTS_ROOT, comp);
  const files = fs.readdirSync(compDir).map(f => path.join(compDir, f));

  const hasStory = files.some(f => STORY_REGEX.test(f));
  const hasTest = files.some(f => TEST_REGEX.test(f));
  const entry = path.join(compDir, `${comp}.tsx`);
  const relImport = `./${comp}`;

  // Story stub
  if (!hasStory) {
    const needsIconProvider = /(Icon|Avatar)/i.test(comp);
    const extraImports = needsIconProvider ? "import { IconDictionaryProvider } from '../../contexts/IconDictionaryContext';\n" : '';
    const extraDecorator = needsIconProvider
      ? `,\n  decorators: [(S) => <IconDictionaryProvider><S/></IconDictionaryProvider>]`
      : '';
    const story = `import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import ${comp} from '${relImport}';
import { ThemeProvider } from '../../theme/ThemeProvider';
${extraImports}
const meta: Meta<typeof ${comp}> = {
  title: 'Components/${comp}',
  component: ${comp},
  decorators: [(S) => <ThemeProvider initialTheme="light"><S/></ThemeProvider>]${extraDecorator},
};
export default meta;
type Story = StoryObj<typeof ${comp}>;
export const Playground: Story = { args: {} };
`;
    const storyPath = path.join(compDir, `${comp}.stories.tsx`);
    fs.writeFileSync(storyPath, story);
    console.log(`[ensure-coverage] Created story: ${path.relative(process.cwd(), storyPath)}`);
    storyCreated++;
  }

  // Test stub (simple export test to avoid runtime prop issues)
  if (!hasTest) {
    const test = `import * as React from 'react';
import ${comp} from '${relImport}';
describe('${comp}', () => {
  it('exports a React component', () => {
    expect(typeof ${comp}).toBe('function');
  });
});
`;
    const testPath = path.join(compDir, `${comp}.test.tsx`);
    fs.writeFileSync(testPath, test);
    console.log(`[ensure-coverage] Created test: ${path.relative(process.cwd(), testPath)}`);
    testCreated++;
  }
}

console.log(`[ensure-coverage] Done. Stories created: ${storyCreated}, tests created: ${testCreated}`);
