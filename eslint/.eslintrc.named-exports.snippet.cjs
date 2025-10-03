// eslint/.eslintrc.named-exports.snippet.cjs
module.exports = {
  plugins: ['import'],
  rules: {
    // Zabrani default export-e globalno
    'import/no-default-export': 'error',
  },
  overrides: [
    // Storybook: meta objekat je default export, dopušteno u *.stories.*
    {
      files: ['**/*.stories.@(ts|tsx|mdx)'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};
