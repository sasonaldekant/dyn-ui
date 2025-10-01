import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'] // Exclude Storybook files
    })
  ],
  external: [
    'react', 
    'react-dom',
    /node_modules/
  ],
  onwarn: function(warning, warn) {
    // Skip CSS module warnings for now
    if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('.scss')) {
      return;
    }
    warn(warning);
  }
};