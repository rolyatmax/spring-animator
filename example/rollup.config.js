import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'index.js',
  dest: 'bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve(),
    commonjs({
      namedExports: { 'dat-gui': ['GUI'] }
    })
  ]
}
