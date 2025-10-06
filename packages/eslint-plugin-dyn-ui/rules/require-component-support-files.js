const fs = require('fs');
const path = require('path');

const isComponentIndexFile = (filename) => {
  const normalized = filename.split(path.sep).join('/');
  return /packages\/dyn-ui-react\/src\/components\/[^/]+\/index\.ts$/.test(normalized);
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure every component directory contains corresponding .stories.tsx and .test.tsx files.',
    },
    schema: [],
    messages: {
      missingStories:
        'Expected "{{file}}" to exist for component stories. Please add a Storybook story.',
      missingTests:
        'Expected "{{file}}" to exist for component tests. Please add a Vitest suite.',
    },
  },
  create(context) {
    const filename = context.getFilename();
    if (filename === '<text>' || !isComponentIndexFile(filename)) {
      return {};
    }

    const componentDir = path.dirname(filename);
    const componentName = path.basename(componentDir);

    const storiesFile = path.join(componentDir, `${componentName}.stories.tsx`);
    const testsFile = path.join(componentDir, `${componentName}.test.tsx`);

    return {
      Program(node) {
        if (!fs.existsSync(storiesFile)) {
          context.report({
            node,
            messageId: 'missingStories',
            data: { file: path.basename(storiesFile) },
          });
        }

        if (!fs.existsSync(testsFile)) {
          context.report({
            node,
            messageId: 'missingTests',
            data: { file: path.basename(testsFile) },
          });
        }
      },
    };
  },
};
