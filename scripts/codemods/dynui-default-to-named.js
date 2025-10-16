/**
 * Codemod: Default → Named imports for @dyn-ui/react
 *
 * Usage:
 *  npx jscodeshift -t scripts/codemods/dynui-default-to-named.js --extensions=ts,tsx src
 */

const COMPONENTS = [
  'DynAvatar','DynBadge','DynBox','DynBreadcrumb','DynButton','DynChart','DynCheckbox','DynContainer','DynDatePicker','DynDivider','DynFieldContainer','DynGauge','DynGrid','DynIcon','DynInput','DynLabel','DynListView','DynMenu','DynPage','DynSelect','DynStepper','DynTable','DynTabs','DynToolbar','DynTreeView','ThemeSwitcher'
];

function isDynUiPath(value) {
  return typeof value === 'string' && value.includes('@dyn-ui/react/src/components/');
}

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.ImportDeclaration)
    .filter(p => isDynUiPath(p.node.source.value))
    .forEach(path => {
      const source = path.node.source.value;
      const match = source.match(/@dyn-ui\/react\/src\/components\/(\w+)/);
      if (!match) return;
      const component = match[1];
      if (!COMPONENTS.includes(component)) return;

      // Replace default import with named import
      const specifiers = path.node.specifiers || [];
      const hasDefault = specifiers.some(s => s.type === 'ImportDefaultSpecifier');
      if (!hasDefault) return;

      const localName = specifiers.find(s => s.type === 'ImportDefaultSpecifier').local.name;

      // Remove default specifier
      path.node.specifiers = specifiers.filter(s => s.type !== 'ImportDefaultSpecifier');

      // Ensure named import exists
      const alreadyNamed = path.node.specifiers.some(s => s.type === 'ImportSpecifier' && s.imported.name === component);
      if (!alreadyNamed) {
        path.node.specifiers.unshift(j.importSpecifier(j.identifier(component), j.identifier(localName)));
      }
    });

  return root.toSource({ quote: 'single' });
};
