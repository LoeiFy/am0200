import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import multiEntry from 'rollup-plugin-multi-entry'

export default {
  input: [
    'src/index.js',
  ],
  output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    multiEntry(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
