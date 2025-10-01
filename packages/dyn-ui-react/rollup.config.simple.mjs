import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({ 
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    })
  ],
  external: [
    'react', 
    'react-dom'
  ]
};