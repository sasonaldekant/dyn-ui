import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { dts } from 'rollup-plugin-dts';
import type { RollupOptions } from 'rollup';

const packageJson = require('./package.json');

const config: RollupOptions[] = [
  // Main build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'DynUI',
        exports: 'named'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationMap: true,
        outDir: 'dist',
        exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.ts', '**/*.stories.tsx']
      }),
      postcss({
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: 'dyn-[name]__[local]___[hash:base64:5]'
        },
        extract: false,
        minimize: true,
        // Remove SCSS processing, use only CSS and PostCSS
        use: ['postcss-nested', 'autoprefixer']
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      })
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime']
  },

  // Type definitions bundle
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts({
      compilerOptions: {
        baseUrl: 'src'
      }
    })],
    external: [/\.css$/]
  }
];

export default config;