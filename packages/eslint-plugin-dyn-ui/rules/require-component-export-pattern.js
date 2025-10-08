const path = require('path');

const isComponentIndexFile = (filename) => {
  const normalized = filename.split(path.sep).join('/');
  return /packages\/dyn-ui-react\/src\/components\/[^/]+\/index\.ts$/.test(normalized);
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure component index.ts files follow the standardized export pattern.',
    },
    schema: [],
    messages: {
      missingNamed: 'Standardized exports require `export { {{componentName}} } from "./{{componentName}}"`.',
      missingDefault: 'Standardized exports require a default re-export from "./{{componentName}}".',
    },
  },
  create(context) {
    const filename = context.getFilename();
    if (filename === '<text>' || !isComponentIndexFile(filename)) {
      return {};
    }

    const componentName = path.basename(path.dirname(filename));
    const sourceSpecifier = `./${componentName}`;

    return {
      Program(node) {
        let hasNamedExport = false;
        let hasDefaultExport = false;

        for (const statement of node.body) {
          if (statement.type !== 'ExportNamedDeclaration') continue;
          if (!statement.source || statement.source.value !== sourceSpecifier) continue;

          for (const specifier of statement.specifiers) {
            if (specifier.type !== 'ExportSpecifier') continue;
            const exportedName = specifier.exported && specifier.exported.name;
            const localName = specifier.local && specifier.local.name;

            if (exportedName === componentName && localName === componentName) {
              hasNamedExport = true;
            }

            if (localName === 'default') {
              if (exportedName === 'default' || exportedName === componentName) {
                hasDefaultExport = true;
              }
            }
          }
        }

        if (!hasNamedExport) {
          context.report({
            node,
            messageId: 'missingNamed',
            data: { componentName },
          });
        }

        if (!hasDefaultExport) {
          context.report({
            node,
            messageId: 'missingDefault',
            data: { componentName },
          });
        }
      },
    };
  },
};
