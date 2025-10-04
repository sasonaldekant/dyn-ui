import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true }
    ],
    plugins: [
      postcss()
    ],
    external: ['react', 'react-dom']
  },
  {
    input: 'dist/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];

export default config;
