import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import multiEntry from 'rollup-plugin-multi-entry'

export default {
  input: [
    './node_modules/whatwg-fetch/fetch.js',
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
