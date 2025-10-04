/** Rollup config for design-tokens (JS only, no .d.ts bundling) */
const config = [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true }
    ],
    external: []
  }
];

export default config;
